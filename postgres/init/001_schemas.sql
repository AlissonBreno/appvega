CREATE SCHEMA IF NOT EXISTS "user";
CREATE SCHEMA IF NOT EXISTS food;
CREATE SCHEMA IF NOT EXISTS meal;

CREATE TABLE IF NOT EXISTS "user".users (
  id_user integer PRIMARY KEY,
  email text NOT NULL,
  password text NOT NULL,
  name text NOT NULL,
  age integer NOT NULL,
  weight numeric NOT NULL,
  goal_kcal numeric NOT NULL,
  goal_carb numeric NOT NULL,
  goal_prot numeric NOT NULL,
  goal_fat numeric NOT NULL,
  created_at timestamptz NOT NULL,
  edited_at timestamptz NOT NULL
);

CREATE TABLE IF NOT EXISTS food.foods (
  id_food integer PRIMARY KEY,
  name text NOT NULL,
  emoji text NOT NULL,
  kcal numeric NOT NULL,
  carb numeric NOT NULL,
  protein numeric NOT NULL,
  fat numeric NOT NULL,
  humidity numeric NOT NULL,
  cholesterol numeric NOT NULL,
  fiber numeric NOT NULL,
  ash numeric NOT NULL,
  calcium numeric NOT NULL,
  magnesium numeric NOT NULL
);

CREATE TABLE IF NOT EXISTS food.user_food_favorites (
  id_user integer NOT NULL REFERENCES "user".users (id_user),
  id_food integer NOT NULL REFERENCES food.foods (id_food),
  PRIMARY KEY (id_user, id_food)
);

CREATE TABLE IF NOT EXISTS meal.meals (
  id_meal integer PRIMARY KEY,
  id_user integer NOT NULL REFERENCES "user".users (id_user),
  name text NOT NULL,
  emoji text NOT NULL,
  created_at timestamptz NOT NULL,
  edited_at timestamptz NOT NULL
);

CREATE TABLE IF NOT EXISTS meal.meals_foods (
  id_meal integer NOT NULL REFERENCES meal.meals (id_meal),
  id_food integer NOT NULL REFERENCES food.foods (id_food),
  id_user integer NOT NULL REFERENCES "user".users (id_user),
  grams numeric NOT NULL,
  kcal numeric NOT NULL,
  protein numeric NOT NULL,
  fat numeric NOT NULL,
  carb numeric NOT NULL,
  created_at timestamptz NOT NULL,
  edited_at timestamptz NOT NULL,
  PRIMARY KEY (id_meal, id_food, created_at)
);
