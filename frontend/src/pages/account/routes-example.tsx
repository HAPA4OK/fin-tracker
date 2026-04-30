import { Navigate, Route, Routes } from 'react-router-dom';
import { InvitationsPage, ProfileSettingsPage } from './index';

export function AccountRoutesExample() {
  return (
    <Routes>
      <Route path="/invitations" element={<InvitationsPage />} />
      <Route path="/account" element={<Navigate to="/invitations" replace />} />
      <Route path="/profile/settings" element={<ProfileSettingsPage />} />
      <Route path="/profile-settings" element={<Navigate to="/profile/settings" replace />} />
      <Route path="/account2" element={<Navigate to="/profile/settings" replace />} />
    </Routes>
  );
}
