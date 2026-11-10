import { Card } from '~/components/ui/Card';
import type { Scheme } from '~/styles/tokens';

type ToolsProps = {
  scheme: Scheme;
  onScheme: (scheme: Scheme) => void;
};

const Tools = ({ scheme, onScheme }: ToolsProps) => (
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
  </Card.Root>
);

export default Tools;
