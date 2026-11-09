import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { addMealFoodEntry, getCatalog, getMealsWithFoods, updateMealFoodEntry } from '../dados';
import { decreaseGrams, gramsAtLeastTen } from '../app/quantity';
import { scalePortion } from '../app/portion';
import { useSession } from '../app/session';
import { ScreenHeader } from '../components/shared/ScreenHeader';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Collapse } from '../components/ui/Collapse';
import { Pill } from '../components/ui/Pill';

import loginStyles from './Login/styles.module.css';

const PILLS = [50, 100, 150, 200, 250, 300];

const decimal = (value: number) =>
  value.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export const AddPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { selectedDate, showToast } = useSession();
  const mealId = params.get('mealId') ?? '';
  const subtitle = params.get('subtitle') ?? '';
  const catalogFoodId = params.get('catalogFoodId') ?? '';
  const mealFoodId = params.get('mealFoodId');
  const food = getCatalog().find(item => item.id === catalogFoodId);
  const [grams, setGrams] = useState(100);
  const [ready, setReady] = useState(!mealFoodId);
  const [openFacts, setOpenFacts] = useState(false);

  useEffect(() => {
    if (!mealFoodId) {
      return;
    }

    let active = true;
    getMealsWithFoods(selectedDate).then(meals => {
      const current = meals.flatMap(meal => meal.foods).find(item => item.id === mealFoodId);
      if (active && current) {
        setGrams(current.grams);
      }
      if (active) {
        setReady(true);
      }
    });

    return () => {
      active = false;
    };
  }, [mealFoodId, selectedDate]);

  useEffect(() => {
    if (!food) {
      navigate(-1);
    }
  }, [food, navigate]);

  if (!food || !ready) {
    return null;
  }

  const portion = scalePortion(food, grams);
  const confirm = async () => {
    const entry = {
      id: mealFoodId ?? `${food.id}-${Date.now()}`,
      catalogFoodId: food.id,
      name: food.name,
      emoji: food.emoji,
      grams,
      kcal: portion.kcal,
      carb: portion.carb,
      protein: portion.protein,
      fat: portion.fat,
    };

    if (mealFoodId) {
      await updateMealFoodEntry(mealId, entry, selectedDate);
      showToast({ message: 'Alteração realizada com sucesso', variant: 'success' });
      navigate(-1);
      return;
    }

    await addMealFoodEntry(mealId, entry, selectedDate);
    showToast({ message: 'Inclusão realizada com sucesso', variant: 'success' });
    navigate('/');
  };

  return (
    <main>
      <ScreenHeader.Root>
        <ScreenHeader.Row>
          <ScreenHeader.Back onClick={() => navigate(-1)} />
          <ScreenHeader.TextColumn>
            <ScreenHeader.Title>Adicionando em</ScreenHeader.Title>
            <ScreenHeader.Subtitle>{subtitle}</ScreenHeader.Subtitle>
          </ScreenHeader.TextColumn>
        </ScreenHeader.Row>
      </ScreenHeader.Root>
      <div className="screen-body add-grid">
        <section>
          <h2 className="goal-title">{food.emoji} {food.name}</h2>
          <p className="kcal-value">{portion.kcal}</p>
          <p className="muted">kcal</p>
          <div className="macros">
            <span>🍞 Carboidratos {decimal(portion.carb)}</span>
            <span>🍗 Proteínas {decimal(portion.protein)}</span>
            <span>🥑 Gorduras {decimal(portion.fat)}</span>
          </div>
          <Collapse.Root expanded={openFacts} onToggle={() => setOpenFacts(open => !open)}>
            <Collapse.Trigger>
              <Collapse.Chevron name="tabela" />
              {openFacts ? ' Recolher tabela' : ' Expandir tabela'}
            </Collapse.Trigger>
            <Collapse.Panel>
              {portion.facts.map(fact => (
                <p key={fact.label}>
                  {fact.label} {fact.amount === null ? `NA ${fact.unit}` : `${decimal(fact.amount)} ${fact.unit}`}
                </p>
              ))}
            </Collapse.Panel>
          </Collapse.Root>
        </section>
        <Card.Root className="quantity">
          <div className="goal-controls">
            <button type="button" aria-label="Menos" disabled={!gramsAtLeastTen(grams)} onClick={() => setGrams(decreaseGrams(grams))}>−</button>
            <strong>{grams} g</strong>
            <button type="button" aria-label="Mais" onClick={() => setGrams(grams + 10)}>+</button>
          </div>
          <div className="pills">
            {PILLS.map(pill => (
              <Pill.Root key={pill} selected={grams === pill} onClick={() => setGrams(pill)}>
                <Pill.Label>{pill}g</Pill.Label>
              </Pill.Root>
            ))}
          </div>
        </Card.Root>
      </div>
      <Button.Root className={loginStyles.signIn} onClick={confirm}>
        <Button.Label className={loginStyles.signInLabel}>
          {mealFoodId ? 'SALVAR NA REFEIÇÃO' : 'ADICIONAR À REFEIÇÃO'}
        </Button.Label>
      </Button.Root>
    </main>
  );
};
