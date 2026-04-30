import type { ViewMode } from '../data';

type ViewToggleProps = {
  views: ViewMode[];
};

export function ViewToggle({ views }: ViewToggleProps) {
  return (
    <div className="segmented">
      {views.map((view) => (
        <a
          key={view.label}
          className={view.active ? 'active' : undefined}
          href={view.href}
        >
          {view.label}
        </a>
      ))}
    </div>
  );
}
