import type { User } from '~/modules/User/services/user';
import { Card } from '~/components/ui/Card';

type ProfileSummaryProps = {
  user: User;
};

const ProfileSummary = ({ user }: ProfileSummaryProps) => (
  <Card.Root>
    <h2 className="goal-title">{user.name}</h2>
    <p>Rastreando há 7 dias 🔥</p>
    <p>
      {user.goal_kcal} kcal · {user.age} anos · {user.weight} kg
    </p>
  </Card.Root>
);

export default ProfileSummary;
