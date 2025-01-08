import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import {
  RouterProvider, createMemoryRouter,
} from "react-router-dom";
import { ReactElement, ReactNode, isValidElement } from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
// import { routeConfig } from '../routes';

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  const options = isValidElement(children)
    ? [{ element: children, path: "/" }]
    : [];

  const router = createMemoryRouter([...options], {
    initialEntries: ["/"],
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}><RouterProvider router={router} /></QueryClientProvider>
  )
}

const customRender = (ui: ReactElement, options = {}) =>
  render(ui, {
    wrapper: AllTheProviders,
    ...options,
  });

export * from "@testing-library/react";

export { default as userEvent } from "@testing-library/user-event";

export { customRender as render };