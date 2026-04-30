import { Route } from "react-router-dom";
import AnalyticsPage from '../pages/analytics/AnalyticsPage.tsx';
import AdminUploadPage from '../pages/admin/AdminUploadPage.tsx';
import FamilyPage from "./family/FamilyPage.tsx";
import { InvitationsPage } from "./account/index.ts";
import { ProfileSettingsPage } from "./account/index.ts";


export const Subroutes = () => {
    return (
        <>
            <Route path="/main/analytics" element={<AnalyticsPage />} />
            <Route path="/admin/upload" element={<AdminUploadPage />} />
            <Route path="/family/main" element={<FamilyPage />} />
            <Route path="/account/invitations" element={<InvitationsPage />} />
            <Route path="/account/profile-settings" element={<ProfileSettingsPage />} />
        </>
    );
}