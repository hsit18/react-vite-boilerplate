import {
  createBrowserRouter,
} from "react-router-dom";
import Payments from './pages/Payments';
import Home from './pages/Home';
import Users from './pages/Users';

export const router = createBrowserRouter([
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
]);