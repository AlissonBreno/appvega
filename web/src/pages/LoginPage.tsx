import { useNavigate } from 'react-router';
import { Icon } from '../components/Icons';

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <main className="login-screen">
      <div className="login-column">
        <header>
          <h1 className="login-title">Bem-vindo ao appvega.</h1>
          <p className="login-subtitle">Seu assistente de rastreamento nutricional.</p>
        </header>
        <form className="login-form" onSubmit={event => event.preventDefault()}>
          <label className="field">
            <span className="field-label">E-mail</span>
            <span className="field-box">
              <Icon name="mail" size={16} />
              <input aria-label="E-mail" autoCapitalize="none" autoCorrect="off" placeholder="seu@email.com" />
            </span>
          </label>
          <label className="field">
            <span className="field-label">Senha</span>
            <span className="field-box">
              <Icon name="lock" size={16} />
              <input aria-label="Senha" type="password" placeholder="••••••••" />
            </span>
          </label>
          <button className="btn btn-signin" type="button" disabled>
            Entrar
            <Icon name="arrow" size={16} />
          </button>
          <div className="divider">
            <span />
            ou
            <span />
          </div>
          <button className="btn btn-google" type="button" onClick={() => navigate('/', { replace: true })}>
            Continuar com Google
          </button>
        </form>
      </div>
    </main>
  );
};
