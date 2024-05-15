'use server'

import { auth, currentUser } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { absoluteUrl } from '@/lib/utils'

import { StripeRedirect } from './schema'
import { InputType, ReturnType } from './type'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()
  const user = await currentUser()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized!'
    }
  }

  const settingsUrl = absoluteUrl(`/organizations/${orgId}`)

  let url = ''

  try {
    const orgSubscription = await db.orgSubscription.findUnique({
      where: { orgId }
    })

    if (orgSubscription && orgSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: orgSubscription.stripeCustomerId,
        return_url: settingsUrl
      })

      url = stripeSession.url
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ['card'],
        mode: 'subscription',
        billing_address_collection: 'auto',
        customer_email: user?.emailAddresses[0].emailAddress,
        line_items: [
          {
            price_data: {
              currency: 'USD',
              product_data: {
                name: 'WorkFlow Pro',
                description: 'Unlimited boards for organizations'
              },
              unit_amount: 2000,
              recurring: {
                interval: 'month'
              }
            },
            quantity: 1
          }
        ],
        metadata: {
          orgId
        }
      })

      url = stripeSession.url || ''
    }
  } catch (error) {
    return {
      error: 'Something went wrong! Please try again later.'
    }
  }

  revalidatePath(`/organizations/${orgId}`)
  return { data: url }
}

export const stripeRedirect = createSafeAction(StripeRedirect, handler)
