import { OrganizationProfile } from '@clerk/nextjs'

export default function SettingsPage() {
  return (
    <div className='w-full'>
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: 'w-full shadow-none',
            card: 'w-full shadow-none border border-[#e5e5e5] dark:border-[#e5e5e533] dark:bg-[#0f172a50]',
            navbar: 'dark:bg-[#0f172a] dark:md:bg-[#0f172a50] rounded-[16px]'
          }
        }}
      />
    </div>
  )
}
