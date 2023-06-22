import Payments from './pages/Payments';
import Home from './pages/Home';
import Users from './pages/Users';

export const routeConfig = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/payments",
    element: <Payments />,
  },
  {
    path: "/users",
    element: <Users />,
  },
];