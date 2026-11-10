import type { User } from '~/modules/User/services/user';
import { Card } from '~/components/ui/Card';
import { formatKcal } from '../formatKcal';

import styles from './styles.module.css';

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

const formatGrams = (grams: number) => {
  const rounded = Math.round(grams * 10) / 10;
  return `${rounded}g`;
};

const macroFraction = (consumed: number, goal: number) =>
  goal > 0 ? Math.min(1, Math.max(0, consumed / goal)) : 0;

type MacroColumnProps = {
  emoji: string;
  grams: number;
  label: string;
  goal: number;
  color: string;
};

const MacroColumn = ({ emoji, grams, label, goal, color }: MacroColumnProps) => (
  <div className={styles.column}>
    <div className={styles.header}>
      <span>{emoji}</span>
      <span className={styles.grams}>{formatGrams(grams)}</span>
    </div>
    <div className={styles.track}>
      <div
        className={styles.fill}
        style={{ width: `${macroFraction(grams, goal) * 100}%`, background: color }}
      />
    </div>
    <span className={styles.caption}>
      {label} / {formatGrams(goal)}
    </span>
  </div>
);

const DailyProgress = ({ totals, user, arcs }: DailyProgressProps) => (
  <Card.Root className="progress-card" aria-label="Progresso do dia">
    <div className={styles.layout}>
      <div className={styles.top}>
        <div className={styles.chart}>
          <svg width="128" height="128" viewBox="0 0 128 128" aria-hidden>
            <circle cx="64" cy="64" r="54" fill="none" stroke="var(--border)" strokeWidth="8" />
            {arcs.map((fraction, index) => {
              if (fraction <= 0) {
                return null;
              }

              const radius = 54;
              const length = 2 * Math.PI * radius;
              const start = arcs.slice(0, index).reduce((sum, value) => sum + value, 0);
              const colors = ['var(--carb)', 'var(--protein)', 'var(--fat)'];
              return (
                <circle
                  key={colors[index]}
                  cx="64"
                  cy="64"
                  r={radius}
                  fill="none"
                  stroke={colors[index]}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${fraction * length} ${length}`}
                  strokeDashoffset={-start * length}
                  transform="rotate(90 64 64)"
                />
              );
            })}
          </svg>
          <div className={styles.center}>
            <span className={styles.kcal}>{formatKcal(totals.kcal)}</span>
            <span className={styles.unit}>kcal</span>
          </div>
        </div>
        <div>
          <h2 className={styles.goalTitle}>Meta diária</h2>
          <p className={styles.goalValue}>{user.goal_kcal} kcal</p>
        </div>
      </div>
      <div className={styles.macros}>
        <MacroColumn
          emoji="🍞"
          grams={totals.carb}
          label="Carb"
          goal={user.goal_carb}
          color="var(--carb)"
        />
        <MacroColumn
          emoji="🍗"
          grams={totals.protein}
          label="Prot"
          goal={user.goal_prot}
          color="var(--protein)"
        />
        <MacroColumn
          emoji="🥑"
          grams={totals.fat}
          label="Gord"
          goal={user.goal_fat}
          color="var(--fat)"
        />
      </div>
    </div>
  </Card.Root>
);

export default DailyProgress;
