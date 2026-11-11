import { Card } from '~/components/ui/Card';
import { DAILY_BARS, barColorForKcal } from '../history';
import { toneColor } from '../tones';

const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

const DailyCalories = () => (
  <Card.Root>
    <div className="split">
      <Card.SectionTitle title="Calorias por dia" />
      <span>2.000 kcal</span>
    </div>
    <div className="bars" aria-label="Calorias por dia">
      {DAILY_BARS.map((kcal, index) => (
        <div key={days[index]} className="bar-col">
          <i
            style={{
              height: `${(kcal / 2500) * 160}px`,
              background: toneColor[barColorForKcal(kcal)],
            }}
          />
          <span>{days[index]}</span>
        </div>
      ))}
    </div>
  </Card.Root>
);

export default DailyCalories;
