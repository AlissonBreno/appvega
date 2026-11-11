import { Card } from '~/components/ui/Card';

const GamifiedGoals = () => (
  <div className="stat-row">
    <Card.Root className="stat-card">
      <strong>1.822</strong>
      <span>Média diária</span>
    </Card.Root>
    <Card.Root className="stat-card">
      <strong>5/7</strong>
      <span>Dias cumpridos</span>
    </Card.Root>
    <Card.Root className="stat-card">
      <strong>5</strong>
      <span>dias 🔥</span>
      <span>Sequência</span>
    </Card.Root>
  </div>
);

export default GamifiedGoals;
