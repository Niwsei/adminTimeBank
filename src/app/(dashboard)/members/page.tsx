import { MembersView } from "@/components/members-view"
import { members } from "@/data/members"

export const dynamic = "force-static"

export default function MembersPage() {
  return <MembersView initialMembers={members} />
}
