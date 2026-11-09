import { useState } from 'react';
import { useNavigate } from 'react-router';
import { getUser, updateUserGoals } from '../dados';
import {
  GOAL_STEPS,
  draftIsValid,
  gramsPerKg,
  macroKcal,
  stepGoal,
  sumMacroKcal,
  type GoalDraft,
  type GoalKey,
} from '../app/goals';
import { useSession } from '../app/session';

const rows: { key: GoalKey; emoji: string; label: string }[] = [
  { key: 'goal_kcal', emoji: '🔥', label: 'Calorias' },
  { key: 'goal_carb', emoji: '🍞', label: 'Carboidratos' },
  { key: 'goal_prot', emoji: '🍗', label: 'Proteínas' },
  { key: 'goal_fat', emoji: '🥑', label: 'Gorduras' },
];

const toDraft = (): GoalDraft => {
  const user = getUser();

  return {
    goal_kcal: String(user.goal_kcal),
    goal_carb: String(user.goal_carb),
    goal_prot: String(user.goal_prot),
    goal_fat: String(user.goal_fat),
  };
};

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { scheme, setScheme, showToast } = useSession();
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
    draftIsValid(draft) &&
    (Object.keys(draft) as GoalKey[]).some(key => draft[key] !== saved[key]);
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
    showToast('alterações salvas!');
  };

  return (
    <main>
      <header className="screen-header">
        <h1 className="screen-title">Perfil & metas</h1>
        <p className="screen-subtitle">Configure suas metas nutricionais</p>
      </header>
      <div className="screen-body profile-grid">
        <div className="stack">
          <section className="card">
            <h2 className="goal-title">{user.name}</h2>
            <p>Rastreando há 7 dias 🔥</p>
            <p>{user.goal_kcal} kcal · {user.age} anos · {user.weight} kg</p>
          </section>
          <section className="card" style={{ background: 'var(--border-subtle)' }}>
            <h2 className="section-title">VEGA · Nutrição fácil</h2>
            <p>v1.0.0 · by Alisson Goulart</p>
            <p className="muted">Este app não substitui orientação de um profissional de saúde.</p>
          </section>
        </div>
        <div className="stack">
          <section className="card">
            {rows.map(row => (
              <div key={row.key} className="goal-row">
                <span>{row.emoji} {row.label}</span>
                {row.key !== 'goal_kcal' ? (
                  <span className="muted">
                    {gramsPerKg(draft[row.key], user.weight)} g/kg ({macroKcal(draft[row.key], row.key)}kcal)
                  </span>
                ) : null}
                <div className="goal-controls">
                  <button type="button" disabled={saving} onClick={() => setDraft({ ...draft, [row.key]: stepGoal(draft[row.key], -GOAL_STEPS[row.key]) })}>−</button>
                  <input
                    aria-label={row.label}
                    inputMode="decimal"
                    disabled={saving}
                    value={draft[row.key]}
                    onChange={event => setDraft({ ...draft, [row.key]: event.target.value })}
                  />
                  <button type="button" disabled={saving} onClick={() => setDraft({ ...draft, [row.key]: stepGoal(draft[row.key], GOAL_STEPS[row.key]) })}>+</button>
                </div>
              </div>
            ))}
            <button className="btn btn-signin" type="button" disabled={!changed || saving} onClick={save}>
              {label}
            </button>
          </section>
          <section className="card">
            <label className="split">
              Modo Escuro
              <input
                type="checkbox"
                role="switch"
                aria-label="Modo Escuro"
                checked={scheme === 'dark'}
                onChange={event => setScheme(event.target.checked ? 'dark' : 'light')}
              />
            </label>
            <button className="btn" type="button" onClick={() => navigate('/login', { replace: true })}>
              Sair da conta
            </button>
          </section>
        </div>
      </div>
    </main>
  );
};
