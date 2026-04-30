import { useNavigate } from 'react-router-dom';

import type { ViewMode } from '../data';

type ViewToggleProps = {
  views: ViewMode[];
};

function getTargetRoute(href: string) {
  return href && href !== '#' ? href : '/not-ready';
}

export function ViewToggle({ views }: ViewToggleProps) {
  const navigate = useNavigate();

  return (
    <div className="segmented">
      {views.map((view) => (
        <button
          key={view.label}
          type="button"
          className={view.active ? 'active' : undefined}
          onClick={() => navigate(getTargetRoute(view.href))}
        >
          {view.label}
        </button>
      ))}
    </div>
  );
}