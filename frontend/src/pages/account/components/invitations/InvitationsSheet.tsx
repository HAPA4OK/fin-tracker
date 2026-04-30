import { InviteCard } from "./InviteCard";
import { InvitationsHeader } from "./InvitationsHeader";

export function InvitationsSheet() {
  return (
    <section className="sheet" style={{ paddingBottom: 48 }}>
      <InvitationsHeader />
      <InviteCard />
    </section>
  );
}
