import { Route, Routes } from 'react-router';
import AppShell from '~/components/layout/AppShell';
import AddFood from '~/pages/AddFood';
import History from '~/pages/History';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Profile from '~/pages/Profile';
import SearchFood from '~/pages/SearchFood';
import { routes } from '~/types/Navigation';

const AppRoutes = () => (
  <AppShell>
    <Routes>
      <Route path={routes.home} element={<Home />} />
      <Route path={routes.history} element={<History />} />
      <Route path={routes.profile} element={<Profile />} />
      <Route path={routes.searchFood} element={<SearchFood />} />
      <Route path={routes.addFood} element={<AddFood />} />
      <Route path={routes.login} element={<Login />} />
    </Routes>
  </AppShell>
);

export default AppRoutes;
