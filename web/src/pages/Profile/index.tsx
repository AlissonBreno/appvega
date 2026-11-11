import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ScreenHeader } from '~/components/shared/ScreenHeader';
import { Button } from '~/components/ui/Button';
import { useTheme } from '~/hooks/useTheme';
import { useToast } from '~/hooks/useToast';
import { getUser, updateUserGoals } from '~/modules/User/services/user';
import { routes } from '~/types/Navigation';
import AppAbout from './AppAbout';
import DailyGoals from './DailyGoals';
import { draftIsValid, sumMacroKcal, type GoalDraft, type GoalKey } from './DailyGoals/goalDraft';
import ProfileSummary from './ProfileSummary';
import styles from './Logout/styles.module.css';
import Tools from './Tools';

const toDraft = (): GoalDraft => {
  const user = getUser();

  return {
    goal_kcal: String(user.goal_kcal),
    goal_carb: String(user.goal_carb),
    goal_prot: String(user.goal_prot),
    goal_fat: String(user.goal_fat),
  };
};

const Profile = () => {
  const navigate = useNavigate();
  const { scheme, setScheme } = useTheme();
  const { showToast } = useToast();
  const [user, setUser] = useState(() => getUser());
  const [draft, setDraft] = useState<GoalDraft>(toDraft);
  const [saving, setSaving] = useState(false);
  const saved: GoalDraft = {
    goal_kcal: String(user.goal_kcal),
    goal_carb: String(user.goal_carb),
    goal_prot: String(user.goal_prot),
    goal_fat: String(user.goal_fat),
  };
  const changed =
    draftIsValid(draft) && (Object.keys(draft) as GoalKey[]).some(key => draft[key] !== saved[key]);
  const label = saving ? 'Salvando...' : changed ? 'Salvar alterações' : 'Sem alterações';

  const save = async () => {
    if (!changed || saving) {
      return;
    }

    const next = { ...draft, goal_kcal: String(sumMacroKcal(draft)) };
    setDraft(next);
    setSaving(true);
    const updated = await updateUserGoals({
      goal_kcal: Number(next.goal_kcal),
      goal_carb: Number(next.goal_carb),
      goal_prot: Number(next.goal_prot),
      goal_fat: Number(next.goal_fat),
    });
    setUser(updated);
    setDraft({
      goal_kcal: String(updated.goal_kcal),
      goal_carb: String(updated.goal_carb),
      goal_prot: String(updated.goal_prot),
      goal_fat: String(updated.goal_fat),
    });
    setSaving(false);
    showToast({ message: 'alterações salvas!', variant: 'success' });
  };

  return (
    <main>
      <ScreenHeader.Root>
        <ScreenHeader.Row>
          <ScreenHeader.Icon name="user-cog" />
          <ScreenHeader.TextColumn>
            <ScreenHeader.Title>Perfil & metas</ScreenHeader.Title>
            <ScreenHeader.Subtitle>Configure suas metas nutricionais</ScreenHeader.Subtitle>
          </ScreenHeader.TextColumn>
        </ScreenHeader.Row>
      </ScreenHeader.Root>
      <div className="screen-body profile-grid">
        <div className="profile-side">
          <div className="profile-slot profile-slot-summary">
            <ProfileSummary user={user} />
          </div>
          <div className="profile-slot profile-slot-appearance">
            <Tools scheme={scheme} onScheme={setScheme} />
          </div>
          <div className="profile-slot profile-slot-about">
            <AppAbout />
          </div>
          <div className="profile-slot profile-slot-logout">
            <Button.Root
              accessibilityLabel="Sair da conta"
              className={styles.root}
              onClick={() => navigate(routes.login, { replace: true })}
            >
              <Button.Icon name="sign-out-alt" color="var(--error)" className={styles.icon} />
              <Button.Label className={styles.label}>Sair da conta</Button.Label>
            </Button.Root>
          </div>
        </div>
        <div className="profile-goals">
          <div className="profile-slot profile-slot-goals">
            <DailyGoals
              draft={draft}
              weight={user.weight}
              saving={saving}
              changed={changed}
              label={label}
              onChange={(key, value) => setDraft({ ...draft, [key]: value })}
              onSave={save}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
