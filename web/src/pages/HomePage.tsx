import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getCatalog, getMealsWithFoods, getUser, removeMealFoodEntry, type Meal, type User } from '../dados';
import { formatToday } from '../app/formatToday';
import { resolveCatalogFoodId } from '../app/filterCatalog';
import { useSession } from '../app/session';
import { weekDaysAround } from '../app/weekDays';
import { ScreenHeader } from '../components/shared/ScreenHeader';
import { Card } from '../components/ui/Card';
import { Collapse } from '../components/ui/Collapse';
import Icon from '../components/ui/Icon';

import pageStyles from './HomePage.module.css';

const CALORIES_EATEN = 1108;
const DAILY_GOAL_KCAL = 2600;

const formatKcal = (value: number) =>
  Math.round(value).toLocaleString('pt-BR');

const sameDay = (left: Date, right: Date) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate();

const HomePage = () => {
  const navigate = useNavigate();
  const { selectedDate, setSelectedDate, showToast } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [meals, setMeals] = useState<Meal[] | null>(null);
  const [openMealId, setOpenMealId] = useState<string | null>(null);
  const today = new Date();

  useEffect(() => {
    let active = true;
    setMeals(null);
    setUser(getUser());
    getMealsWithFoods(selectedDate).then(next => {
      if (active) {
        setMeals(next);
      }
    });

    return () => {
      active = false;
    };
  }, [selectedDate]);

  const totals = (meals ?? []).reduce(
    (sum, meal) => {
      meal.foods.forEach(food => {
        sum.kcal += food.kcal;
        sum.carb += food.carb;
        sum.protein += food.protein;
        sum.fat += food.fat;
      });
      return sum;
    },
    { kcal: 0, carb: 0, protein: 0, fat: 0 },
  );

  const goalSum = (user?.goal_carb ?? 0) + (user?.goal_prot ?? 0) + (user?.goal_fat ?? 0);
  const fractions = [totals.carb, totals.protein, totals.fat].map(grams =>
    goalSum === 0 ? 0 : grams / goalSum,
  );
  const fractionSum = fractions.reduce((sum, value) => sum + Math.max(value, 0), 0);
  const scale = fractionSum > 1 ? 1 / fractionSum : 1;
  const arcs = fractions.map(value => Math.max(value, 0) * scale);

  const removeFood = async (meal: Meal, food: Meal['foods'][number]) => {
    const confirmed = window.confirm(`Confirma a exclusão de ${food.name}?`);
    if (!confirmed) {
      return;
    }

    await removeMealFoodEntry(meal.id, food, selectedDate);
    setMeals(await getMealsWithFoods(selectedDate));
    showToast({ message: 'Exclusão realizada com sucesso', variant: 'success' });
  };

  return (
    <main>
      <ScreenHeader.Root>
        <ScreenHeader.Row>
          <ScreenHeader.Icon name="heart-rate" />
          <ScreenHeader.TextColumn>
            <ScreenHeader.Title>VEGA</ScreenHeader.Title>
            <ScreenHeader.Subtitle>{formatToday(today)}</ScreenHeader.Subtitle>
          </ScreenHeader.TextColumn>
        </ScreenHeader.Row>
      </ScreenHeader.Root>
      <div className="screen-body">
        <div className="week">
          {weekDaysAround(selectedDate).map(day => {
            const selected = sameDay(day.date, selectedDate);
            const isToday = sameDay(day.date, today);
            return (
              <button
                key={day.date.toISOString()}
                type="button"
                aria-pressed={selected}
                onClick={() => setSelectedDate(day.date)}
              >
                <small>{day.initial}</small>
                <strong>{day.label}</strong>
                {isToday && CALORIES_EATEN >= DAILY_GOAL_KCAL ? <small>✓</small> : null}
              </button>
            );
          })}
        </div>
        {meals === null || user === null ? (
          <div className="skeleton" aria-label="Carregando refeições" />
        ) : (
          <div className="home-grid">
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
            <section className="meals-column">
              <Card.SectionTitle title="Refeições" />
              {meals.map(meal => {
                const mealKcal = meal.foods.reduce((sum, food) => sum + food.kcal, 0);
                const mealMacros = meal.foods.reduce(
                  (sum, food) => ({
                    carb: sum.carb + food.carb,
                    protein: sum.protein + food.protein,
                    fat: sum.fat + food.fat,
                  }),
                  { carb: 0, protein: 0, fat: 0 },
                );
                const mealFractions = [mealMacros.carb, mealMacros.protein, mealMacros.fat].map(grams =>
                  goalSum === 0 ? 0 : grams / goalSum,
                );
                const mealScale =
                  mealFractions.reduce((sum, value) => sum + value, 0) > 1
                    ? 1 / mealFractions.reduce((sum, value) => sum + value, 0)
                    : 1;
                const mealArcs = mealFractions.map(value => value * mealScale);
                const open = openMealId === meal.id;
                return (
                  <Card.Root key={meal.id} className={pageStyles.mealCard}>
                    <Collapse.Root
                      expanded={open}
                      onToggle={() => setOpenMealId(open ? null : meal.id)}
                    >
                      <div className={pageStyles.mealHeader}>
                        <Collapse.Trigger className={pageStyles.mealSummary}>
                          <span>{meal.emoji}</span>
                          <span>
                            <strong>{meal.title}</strong>
                            <div className="muted">{meal.foods.length} itens</div>
                          </span>
                          <strong className={pageStyles.mealKcal}>{formatKcal(mealKcal)} kcal</strong>
                          <Collapse.Chevron name={meal.title} />
                        </Collapse.Trigger>
                        <button
                          className={pageStyles.mealPlus}
                          type="button"
                          aria-label={`Adicionar em ${meal.title}`}
                          onClick={() =>
                            navigate(
                              `/buscar?mealId=${meal.id}&subtitle=${encodeURIComponent(`${meal.emoji} ${meal.title}`)}`,
                            )
                          }
                        >
                          <Icon name="plus" size={16} color="var(--primary)" />
                        </button>
                      </div>
                      <div className={pageStyles.macroTrack} aria-hidden>
                        <i style={{ width: `${mealArcs[0] * 100}%`, background: 'var(--carb)' }} />
                        <i style={{ width: `${mealArcs[1] * 100}%`, background: 'var(--protein)' }} />
                        <i style={{ width: `${mealArcs[2] * 100}%`, background: 'var(--fat)' }} />
                      </div>
                      <Collapse.Panel>
                        {meal.foods.map(food => (
                          <div className={pageStyles.foodRow} key={food.id}>
                            <div>
                              <strong>
                                {food.emoji} {food.name}
                              </strong>
                              <div className="muted">
                                {food.grams} g · C {food.carb} · P {food.protein} · G {food.fat}
                              </div>
                            </div>
                            <div className={pageStyles.foodActions}>
                              <strong>{formatKcal(food.kcal)}</strong>
                              <button
                                className={pageStyles.foodAction}
                                type="button"
                                aria-label={`Editar ${food.name}`}
                                onClick={() => {
                                  const catalogFoodId = resolveCatalogFoodId(
                                    food.catalogFoodId,
                                    food.name,
                                    getCatalog(),
                                  );
                                  navigate(
                                    `/adicionar?mealId=${meal.id}&subtitle=${encodeURIComponent(`${meal.emoji} ${meal.title}`)}&catalogFoodId=${catalogFoodId}&mealFoodId=${food.id}`,
                                  );
                                }}
                              >
                                <Icon name="pencil" size={16} color="var(--primary-text)" />
                              </button>
                              <button
                                className={pageStyles.foodAction}
                                type="button"
                                aria-label={`Excluir ${food.name}`}
                                onClick={() => removeFood(meal, food)}
                              >
                                <Icon name="trash" size={16} color="var(--primary-text)" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </Collapse.Panel>
                    </Collapse.Root>
                  </Card.Root>
                );
              })}
            </section>
          </div>
        )}
      </div>
    </main>
  );
};

export default HomePage;
