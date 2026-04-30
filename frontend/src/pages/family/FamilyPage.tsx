import { DashboardLayout } from './components/DashboardLayout';
import { FamilyCreateModal } from './components/FamilyCreateModal';
import { FamilyPromptModal } from './components/FamilyPromptModal';
import { useBodyClass } from './hooks/useBodyClass';

export type FamilyPageVariant = 'menu' | 'prompt' | 'create';

type FamilyPageProps = {
  variant?: FamilyPageVariant;
};

export function FamilyPage({ variant = 'menu' }: FamilyPageProps) {
  useBodyClass('body-dim');

  const isFamilyMenu = variant === 'menu';

  return (
    <>
      <DashboardLayout headerMode={isFamilyMenu ? 'family' : 'user'} />
      {variant === 'prompt' && <FamilyPromptModal />}
      {variant === 'create' && <FamilyCreateModal />}
    </>
  );
}

export default FamilyPage;
