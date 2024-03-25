import { OrganizationList } from '@clerk/nextjs'

export default function CreateOrganizationPage() {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl='/organizations/:id'
      afterCreateOrganizationUrl='/organizations/:id'
    />
  )
}
