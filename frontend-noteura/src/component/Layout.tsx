import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";

export function Layout() {
    const location = useLocation();
    // Only make navbar transparent on the home page (Landing Page)
    const isHomePage = location.pathname === "/";

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-slate-950 text-gray-900 dark:text-white transition-colors duration-300">
            <Navbar transparent={isHomePage} />
            <div className="pt-0">
                <Outlet />
            </div>
        </div>
    );
}
