import { create } from "@/actions/create-board"

export default function OrganizationPage() {
  return <div>
    <form action={create}>
      <input type="text" name="title" className="border"/>
      <button type="submit">Create</button>
    </form>
  </div>
}
