import { OrganizationSwitcher } from "@clerk/nextjs";

export default function OrganizationPage() {
  return (
    <div>
      <OrganizationSwitcher hidePersonal />
    </div>
  )
}
