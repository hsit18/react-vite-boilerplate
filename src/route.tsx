import { RootRoute, Route, Router } from "@tanstack/react-router";
import { AppShell } from "./AppShell";
import Payments from "./pages/Payments";
import Users from "./pages/Users";
import HomePage from "./pages/Home";

const rootRoute = new RootRoute({
    component: () => <AppShell />,
});

const homeRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <HomePage />,
});

const paymentRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'payments',
    component: () => <Payments />,
});

const userRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'users',
    component: () => <Users />,
});

const routeTree = rootRoute.addChildren([paymentRoute, userRoute, homeRoute])

export const router = new Router({ routeTree })


declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}