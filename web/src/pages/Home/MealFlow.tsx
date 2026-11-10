import { Outlet, useLocation } from 'react-router';
import { useDesktop } from '~/hooks/useDesktop';
import { routes } from '~/types/Navigation';
import Home from '.';

const MealFlow = () => {
  const desktop = useDesktop();
  const { pathname } = useLocation();
  const onSearch = pathname === routes.searchFood;
  const onAdd = pathname === routes.addFood;
  const foreground = (onSearch || onAdd) && !desktop;

  return (
    <>
      <div hidden={foreground}>
        <Home />
      </div>
      <Outlet />
    </>
  );
};

export default MealFlow;
