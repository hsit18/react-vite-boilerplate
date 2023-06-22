import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import './styles/index.css';
import {
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";
import { routeConfig } from './routes';

const queryClient = new QueryClient();
const router = createBrowserRouter(routeConfig);

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)