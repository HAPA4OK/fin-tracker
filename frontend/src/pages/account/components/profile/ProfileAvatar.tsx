import { Link } from 'react-router-dom';

export function ProfileAvatar() {
  return (
    <>
      <div className="avatar"></div>

      <Link className="change-photo" to="/not-ready">
        Сменить фото
      </Link>
    </>
  );
}
