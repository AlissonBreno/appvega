import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ScreenHeader } from '~/components/shared/ScreenHeader';
import { Card } from '~/components/ui/Card';
import { useSelectedDate } from '~/hooks/useSelectedDate';
import { useToast } from '~/hooks/useToast';
import { getCatalog } from '~/modules/Food/services/catalog';
import { getMealsWithFoods, removeMealFoodEntry, type Meal, type MealFood } from '~/modules/Meal/services/meal';
import { getUser, type User } from '~/modules/User/services/user';
import { addFoodPath, searchFoodPath } from '~/types/Navigation';
import DailyProgress from './DailyProgress';
import { formatToday } from './WeekDaySelector/formatToday';
import MealCollapseCard from './Meals/MealCollapseCard';
import { resolveCatalogFoodId } from '../SearchFood/filterCatalogFoods';
import WeekDaySelector from './WeekDaySelector';

const Home = () => {
  const navigate = useNavigate();
  const { selectedDate, setSelectedDate } = useSelectedDate();
  const { showToast } = useToast();
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

  const removeFood = async (meal: Meal, food: MealFood) => {
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
        <WeekDaySelector selectedDate={selectedDate} today={today} onSelect={setSelectedDate} />
        {meals === null || user === null ? (
          <div className="skeleton" aria-label="Carregando refeições" />
        ) : (
          <div className="home-grid">
            <DailyProgress totals={totals} user={user} arcs={arcs} />
            <section className="meals-column">
              <Card.SectionTitle title="Refeições" />
              {meals.map(meal => (
                <MealCollapseCard
                  key={meal.id}
                  meal={meal}
                  goalSum={goalSum}
                  open={openMealId === meal.id}
                  onToggle={() => setOpenMealId(openMealId === meal.id ? null : meal.id)}
                  onAdd={() =>
                    navigate(searchFoodPath({ mealId: meal.id, subtitle: `${meal.emoji} ${meal.title}` }))
                  }
                  onEdit={food => {
                    const catalogFoodId = resolveCatalogFoodId(food.catalogFoodId, food.name, getCatalog());
                    navigate(
                      addFoodPath({
                        mealId: meal.id,
                        subtitle: `${meal.emoji} ${meal.title}`,
                        catalogFoodId,
                        mealFoodId: food.id,
                      }),
                    );
                  }}
                  onRemove={food => removeFood(meal, food)}
                />
              ))}
            </section>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
