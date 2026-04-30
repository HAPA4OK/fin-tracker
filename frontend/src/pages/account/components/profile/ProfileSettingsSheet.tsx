import { ProfileActions } from "./ProfileActions";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileFields } from "./ProfileFields";
import { ProfileHeader } from "./ProfileHeader";

export function ProfileSettingsSheet() {
  return (
    <section className="sheet">
      <ProfileHeader />
      <ProfileAvatar />
      <ProfileFields />
      <ProfileActions />
    </section>
  );
}
