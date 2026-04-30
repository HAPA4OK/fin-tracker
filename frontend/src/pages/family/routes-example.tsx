import { Navigate, Route } from 'react-router-dom';
import {
  FamilyCreateModalPage,
  FamilyMenuPage,
  FamilyPromptPage,
  FamilySettingsPage,
} from './index';

export const familyRoutes = (
  <>
    <Route path="/family" element={<FamilyMenuPage />} />
    <Route path="/family-menu" element={<Navigate to="/family" replace />} />
    <Route path="/family/prompt" element={<FamilyPromptPage />} />
    <Route path="/family-prompt" element={<Navigate to="/family/prompt" replace />} />
    <Route path="/family/create" element={<FamilyCreateModalPage />} />
    <Route path="/family-create" element={<Navigate to="/family/create" replace />} />
    <Route path="/family/settings" element={<FamilySettingsPage />} />
    <Route path="/family-settings" element={<Navigate to="/family/settings" replace />} />
  </>
);
