import type { User } from '~/modules/User/services/user';
import { Card } from '~/components/ui/Card';
import { formatKcal } from '../formatKcal';

type Totals = {
  kcal: number;
  carb: number;
  protein: number;
  fat: number;
};

type DailyProgressProps = {
  totals: Totals;
  user: User;
  arcs: number[];
};

const DailyProgress = ({ totals, user, arcs }: DailyProgressProps) => (
  <Card.Root className="progress-card" aria-label="Progresso do dia">
    <div className="progress-layout">
      <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden>
        <circle cx="60" cy="60" r="46" fill="none" stroke="var(--border)" strokeWidth="10" />
        {arcs.map((fraction, index) => {
          const radius = 46;
          const length = 2 * Math.PI * radius;
          const start = arcs.slice(0, index).reduce((sum, value) => sum + value, 0);
          const colors = ['var(--carb)', 'var(--protein)', 'var(--fat)'];
          return (
            <circle
              key={colors[index]}
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke={colors[index]}
              strokeWidth="10"
              strokeDasharray={`${fraction * length} ${length}`}
              strokeDashoffset={-start * length}
              transform="rotate(90 60 60)"
            />
          );
        })}
      </svg>
      <div>
        <div className="kcal-value">{formatKcal(totals.kcal)}</div>
        <div className="kcal-unit">kcal</div>
        <h2 className="goal-title">Meta diária</h2>
        <p className="muted">{formatKcal(user.goal_kcal)} kcal</p>
      </div>
    </div>
    <div className="macros">
      <div className="macro-col">
        <span>🍞 Carb</span>
        <strong>{Math.round(totals.carb)} / {user.goal_carb}g</strong>
      </div>
      <div className="macro-col">
        <span>🍗 Prot</span>
        <strong>{Math.round(totals.protein)} / {user.goal_prot}g</strong>
      </div>
      <div className="macro-col">
        <span>🥑 Gord</span>
        <strong>{Math.round(totals.fat)} / {user.goal_fat}g</strong>
      </div>
    </div>
  </Card.Root>
);

export default DailyProgress;
