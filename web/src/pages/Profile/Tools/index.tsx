import { Card } from '~/components/ui/Card';
import Icon from '~/components/ui/Icon';
import type { Scheme } from '~/styles/tokens';

import styles from './styles.module.css';

type ToolsProps = {
  scheme: Scheme;
  onScheme: (scheme: Scheme) => void;
};

const Tools = ({ scheme, onScheme }: ToolsProps) => {
  const isDark = scheme === 'dark';

  return (
    <Card.Root>
      <Card.SectionTitle title="⚙️ Ferramentas" />
      <div className={styles.row}>
        <span className={styles.iconWell}>
          <Icon
            name={isDark ? 'lightbulb-on' : 'lightbulb'}
            size={18}
            color={isDark ? 'var(--toast-warning)' : 'var(--secondary-text)'}
          />
        </span>
        <span className={styles.copy}>
          <span className={styles.title}>Modo Escuro</span>
          <span className={styles.caption}>{isDark ? 'Tema escuro ativo' : 'Tema claro ativo'}</span>
        </span>
        <input
          className={styles.switch}
          type="checkbox"
          role="switch"
          aria-label="Modo Escuro"
          checked={scheme === 'dark'}
          onChange={event => onScheme(event.target.checked ? 'dark' : 'light')}
        />
      </div>
    </Card.Root>
  );
};

export default Tools;
