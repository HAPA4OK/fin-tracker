import { Link } from 'react-router-dom';

type ParticipantCardProps = {
  label: string;
};

export function ParticipantCard({ label }: ParticipantCardProps) {
  return (
    <div className="participant-card">
      <div className="participant-label">{label}</div>

      <Link className="close-participant" to="/not-ready">×</Link>

      <input className="compact-input" placeholder="Имя (например, Бабушка, Дедушка, Илюша)" />
      <input className="compact-input" placeholder="Email (если есть аккаунт) — необязательно" />
    </div>
  );
}
