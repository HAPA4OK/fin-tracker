import type { ReactNode } from "react";

type StandalonePageProps = {
  children: ReactNode;
};

export function StandalonePage({ children }: StandalonePageProps) {
  return <div className="standalone-page">{children}</div>;
}
