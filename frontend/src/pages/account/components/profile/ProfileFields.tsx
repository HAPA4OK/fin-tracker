import { ProfileField } from "./ProfileField";

export function ProfileFields() {
  return (
    <div className="stack-fields">
      <ProfileField label="ФИО">Шмурденко Ылаыы Ылааевич</ProfileField>
      <ProfileField label="Логин">jija</ProfileField>
      <ProfileField label="Электронная почта">oleg@mail.ru</ProfileField>
      <ProfileField label="Пароль" bottomLink="Сменить пароль">
        <span>****</span>
        <span className="eye-icon"></span>
      </ProfileField>
    </div>
  );
}
