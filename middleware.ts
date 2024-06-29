import { authMiddleware, redirectToSignIn } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export default authMiddleware({
  // Allow signed out users to access the specified routes:
  publicRoutes: ['/'],
  
  afterAuth(auth, req) {
    if (auth.userId && auth.isPublicRoute) {
      let path = '/select-org'

      if (auth.orgId) {
        path = `/organizations/${auth.orgId}`
      }

      const orgSelection = new URL(path, req.url)

      return NextResponse.redirect(orgSelection)
    }

    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url})
    }

    // if user is signed in and is not have orgId
    // if (auth.userId && !auth.orgId) {
    //   console.log(auth.userId)
    //   console.log(auth.orgId)
    //   const orgSelection = new URL('/select-org', req.url)
    //   return NextResponse.redirect(orgSelection)
    // }
  }
})

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/(api|trpc)(.*)'
  ]
}
