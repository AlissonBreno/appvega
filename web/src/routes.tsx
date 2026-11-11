import { Route, Routes } from 'react-router';
import AppShell from '~/components/layout/AppShell';
import AddFoodRoute from '~/pages/AddFood/AddFoodRoute';
import History from '~/pages/History';
import MealFlow from '~/pages/Home/MealFlow';
import Login from '~/pages/Login';
import Profile from '~/pages/Profile';
import SearchFoodRoute from '~/pages/SearchFood/SearchFoodRoute';
import { routes } from '~/types/Navigation';

const AppRoutes = () => (
  <AppShell>
    <Routes>
      <Route element={<MealFlow />}>
        <Route path={routes.home} element={null} />
        <Route path={routes.searchFood} element={<SearchFoodRoute />} />
        <Route path={routes.addFood} element={<AddFoodRoute />} />
      </Route>
      <Route path={routes.history} element={<History />} />
      <Route path={routes.profile} element={<Profile />} />
      <Route path={routes.login} element={<Login />} />
    </Routes>
  </AppShell>
);

export default AppRoutes;
