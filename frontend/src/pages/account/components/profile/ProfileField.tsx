import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { accountRoutes } from '../../routes';

type ProfileFieldProps = {
  label: string;
  children: ReactNode;
  bottomLink?: string;
};

export function ProfileField({ label, children, bottomLink }: ProfileFieldProps) {
  return (
    <div>
      <label className="field-label large">{label}</label>
      <div className="input-shell">{children}</div>
      {bottomLink ? (
        <Link className="inline-link" to={accountRoutes.notReady}>
          {bottomLink}
        </Link>
      ) : null}
    </div>
  );
}
