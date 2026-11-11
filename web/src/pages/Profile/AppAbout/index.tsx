import { Card } from '~/components/ui/Card';

import styles from './styles.module.css';

const AppAbout = () => (
  <Card.Root className={styles.card}>
    <Card.SectionTitle className={styles.title} title="VEGA · Nutrição fácil" />
    <p className={styles.version}>v1.0.0 · by Alisson Goulart</p>
    <p className={styles.body}>
      Auxilia o monitoramento nutricional e não substitui acompanhamento clínico.
    </p>
  </Card.Root>
);

export default AppAbout;
