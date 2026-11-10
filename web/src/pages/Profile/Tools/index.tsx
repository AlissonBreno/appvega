import { Button } from '~/components/ui/Button';
import { Card } from '~/components/ui/Card';
import type { Scheme } from '~/styles/tokens';

type ToolsProps = {
  scheme: Scheme;
  onScheme: (scheme: Scheme) => void;
  onSignOut: () => void;
};

const Tools = ({ scheme, onScheme, onSignOut }: ToolsProps) => (
  <Card.Root>
    <label className="split">
      Modo Escuro
      <input
        type="checkbox"
        role="switch"
        aria-label="Modo Escuro"
        checked={scheme === 'dark'}
        onChange={event => onScheme(event.target.checked ? 'dark' : 'light')}
      />
    </label>
    <Button.Root onClick={onSignOut}>
      <Button.Icon name="sign-out-alt" />
      <Button.Label>Sair da conta</Button.Label>
    </Button.Root>
  </Card.Root>
);

export default Tools;
