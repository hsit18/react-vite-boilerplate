import { Link, Outlet } from "@tanstack/react-router"

export const AppShell = () => {
    return (
        <div className="main-container overflow-auto h-full">
            <header className="sticky p-2 sticky p-2 bg-gray-50 dark:bg-gray-800 text-white">
                HEADER
            </header>
            <aside className="bg-gray-50 dark:bg-gray-800" aria-label="Sidebar">
                <ul className="space-y-2 font-medium">
                    <li>
                        <Link to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <span className="ms-3">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/payments" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <span className="ms-3">Payments</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/users" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <span className="ms-3">Users</span>
                        </Link>
                    </li>
                </ul>
            </aside>
            <main className="overflow-auto">
                <Outlet />
            </main>
        </div>

    )
}