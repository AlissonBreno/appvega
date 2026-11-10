import { Card } from '~/components/ui/Card';

const AppAbout = () => (
  <Card.Root style={{ background: 'var(--border)' }}>
    <Card.SectionTitle title="VEGA · Nutrição fácil" />
    <p className="mono">v1.0.0 · by Alisson Goulart</p>
    <p className="muted">Este app não substitui orientação de um profissional de saúde.</p>
  </Card.Root>
);

export default AppAbout;
