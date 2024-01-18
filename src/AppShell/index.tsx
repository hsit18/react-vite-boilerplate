import { Outlet } from "@tanstack/react-router"

export const AppShell = () => {
    return (
        <>
            <div>HEADER</div>
            <Outlet />
        </>

    )
}