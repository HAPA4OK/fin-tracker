export default function RegisterSuccess() {
    return (
    <div className="form">
        <div>
            <h1>Регистрация завершена</h1>
            <p className="textCentered">Регистрация прошла успешно<br />и теперь вы можете войти в аккаунт.</p>
        </div>
        <div>
            <button>Войти</button>
            <p className="smallLabel textCentered"><a href="/index.html">На главную</a></p>
        </div>
    </div>
    );
}