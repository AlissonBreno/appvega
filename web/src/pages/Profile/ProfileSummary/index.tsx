import { Card } from '~/components/ui/Card';
import Icon from '~/components/ui/Icon';
import type { User } from '~/modules/User/services/user';

import styles from './styles.module.css';

type ProfileSummaryProps = {
  user: User;
};

const ProfileSummary = ({ user }: ProfileSummaryProps) => {
  const stats = [
    { value: String(user.goal_kcal), label: 'meta kcal', tone: styles.kcal },
    { value: String(user.age), label: 'idade', tone: styles.age },
    { value: `${user.weight}kg`, label: 'kilos', tone: styles.weight },
  ];

  return (
    <Card.Root>
      <div className={styles.identity}>
        <div className={styles.avatarGlow}>
          <div className={styles.avatar}>
            <Icon name="sparkles" color="var(--primary-text)" size={28} />
          </div>
        </div>
        <div className={styles.identityCopy}>
          <h2 className={styles.name}>{user.name}</h2>
          <p className={styles.subtitle}>Rastreando há 7 dias 🔥</p>
        </div>
      </div>
      <div className={styles.stats}>
        {stats.map(stat => (
          <div key={stat.label} className={styles.stat}>
            <p className={`${styles.statValue} ${stat.tone}`}>{stat.value}</p>
            <p className={styles.caption}>{stat.label}</p>
          </div>
        ))}
      </div>
    </Card.Root>
  );
};

export default ProfileSummary;
