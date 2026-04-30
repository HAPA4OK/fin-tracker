import { Link } from 'react-router-dom';
import { routes } from '../routes';

export function FamilyPromptModal() {
  return (
    <div className="overlay">
      <div className="modal small-center">
        <h1 className="modal-title">Общий бюджет для своих</h1>
        <p className="modal-text">
          Создайте семью, где каждый участник вносит свои доходы и расходы, а остальные видят их в общих отчётах.
        </p>
        <div className="modal-actions">
          <Link className="primary-button" to={routes.familyCreate}>Создать семью</Link>
          <Link className="secondary-button" to={routes.home}>Не сейчас</Link>
        </div>
      </div>
    </div>
  );
}
