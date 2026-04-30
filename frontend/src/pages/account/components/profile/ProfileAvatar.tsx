import { Link } from 'react-router-dom';
import { accountRoutes } from '../../routes';

export function ProfileAvatar() {
  return (
    <>
      <div className="avatar"></div>
      <Link className="change-photo" to={accountRoutes.notReady}>
        Сменить фото
      </Link>
    </>
  );
}
