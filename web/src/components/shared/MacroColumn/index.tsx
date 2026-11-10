import styles from './styles.module.css';

const formatGrams = (grams: number) => {
  const rounded = Math.round(grams * 10) / 10;
  return `${rounded}g`;
};

const macroFraction = (consumed: number, goal: number) =>
  goal > 0 ? Math.min(1, Math.max(0, consumed / goal)) : 0;

type MacroColumnProps = {
  emoji: string;
  grams: number;
  goal: number;
  color: string;
  caption: string;
};

const MacroColumn = ({ emoji, grams, goal, color, caption }: MacroColumnProps) => (
  <div className={styles.column}>
    <div className={styles.header}>
      <span aria-hidden>{emoji}</span>
      <span className={styles.grams}>{formatGrams(grams)}</span>
    </div>
    <div className={styles.track}>
      <div
        className={styles.fill}
        style={{ width: `${macroFraction(grams, goal) * 100}%`, background: color }}
      />
    </div>
    <span className={styles.caption}>{caption}</span>
  </div>
);

export default MacroColumn;
