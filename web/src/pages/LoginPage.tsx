import { useNavigate } from 'react-router';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

import loginStyles from './Login/styles.module.css';

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
          <Input.Field>
            <Input.Label>E-mail</Input.Label>
            <Input.Content>
              <Input.Icon name="envelope" />
              <Input.TextInput
                aria-label="E-mail"
                autoCapitalize="none"
                autoCorrect="off"
                placeholder="seu@email.com"
              />
            </Input.Content>
          </Input.Field>
          <Input.Field>
            <Input.Label>Senha</Input.Label>
            <Input.Content>
              <Input.Icon name="lock" />
              <Input.TextInput aria-label="Senha" type="password" placeholder="••••••••" />
            </Input.Content>
          </Input.Field>
          <Button.Root className={loginStyles.signIn} disabled>
            <Button.Label className={loginStyles.signInLabel}>Entrar</Button.Label>
            <Button.Icon name="arrow-right" color="var(--background)" className={loginStyles.signInIcon} />
          </Button.Root>
          <div className={loginStyles.divider}>
            <span className={loginStyles.dividerLine} />
            ou
            <span className={loginStyles.dividerLine} />
          </div>
          <Button.Root
            className={loginStyles.google}
            onClick={() => navigate('/', { replace: true })}
          >
            <Button.Icon name="google" color="var(--primary-text)" />
            <Button.Label className={loginStyles.googleLabel}>Continuar com Google</Button.Label>
          </Button.Root>
        </form>
      </div>
    </main>
  );
};
