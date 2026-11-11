import { Card } from '~/components/ui/Card';
import { WEEKLY_ROWS } from '../history';
import { toneColor } from '../tones';

const WeeklyPerformance = () => (
  <Card.Root>
    <Card.SectionTitle title="Desempenho semanal" />
    {WEEKLY_ROWS.map(row => (
      <p key={row.day} className="week-row">
        <span>{row.day}</span>
        <span style={{ color: toneColor[row.tone] }}>{row.kcal.toLocaleString('pt-BR')}</span>
        <span className="muted">kcal / 2200</span>
      </p>
    ))}
    <p className="muted">Dentro · Próximo · Acima</p>
  </Card.Root>
);

export default WeeklyPerformance;
