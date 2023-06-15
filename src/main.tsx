import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import Home from './pages/Home';
import './styles/index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Payments from './pages/Payments';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/payments",
    element: <Payments />,
  },
]);

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)