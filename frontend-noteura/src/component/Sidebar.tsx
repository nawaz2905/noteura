import { useNavigate } from "react-router-dom";
import { Logo } from "./icons/Logo";
import { XIcon } from "./icons/XIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { HamburgerIcon } from "./icons/HamburgerIcon";
import { AllIcon } from "./icons/AllIcon";
import { NotesIcon } from "./icons/NotesIcon";
import { ThemeToggle } from "./ThemeToggle";

interface SidebarProps {
    setTypeFilter: (type: string | null) => void;
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

export function Sidebar({ setTypeFilter, sidebarOpen, setSidebarOpen }: SidebarProps) {
    const navigate = useNavigate();


    return <>
        {!sidebarOpen && (
            <div className="fixed top-6 left-4 z-50 cursor-pointer text-gray-600 hover:bg-gray-100 p-2 rounded-xl md:hidden transition-all duration-300" onClick={() => setSidebarOpen(true)}>
                <HamburgerIcon />
            </div>
        )}
        <div className={`h-screen w-72 bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800 fixed left-0 top-0 z-50 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`} >
            <div className="flex pt-8 items-center justify-between px-8 mb-6">
                <div className="flex items-center gap-3">
                    <div className="text-purple-700 dark:text-purple-500">
                        <Logo />
                    </div>
                    <span className="text-2xl font-['Germania_One'] text-gray-900 dark:text-white">Noteura</span>
                </div>
                <div className="cursor-pointer text-gray-400 hover:text-gray-600 md:hidden" onClick={() => setSidebarOpen(false)}>
                    <HamburgerIcon />
                </div>
            </div>

            <div className="px-6 mb-4 flex gap-2">
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/signin")
                    }}
                    className="flex-1 py-2 px-4 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300 font-medium flex items-center justify-start gap-2 border border-transparent hover:border-red-100 dark:hover:border-red-900 cursor-pointer text-sm"
                >
                    <span className="rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                        </svg>
                    </span>
                    Logout
                </button>
                <div className="flex items-center justify-center">
                    <ThemeToggle />
                </div>
            </div>

            <div className="flex-grow space-y-2">
                <div onClick={() => { setTypeFilter(null); setSidebarOpen(false); }} className="block">
                    <SidebarItem icon={<AllIcon />} text="All Content" />
                </div>
                <div onClick={() => { setTypeFilter("twitter"); setSidebarOpen(false); }} className="block">
                    <SidebarItem icon={<XIcon />} text="X (Twitter)" />
                </div>
                <div onClick={() => { setTypeFilter("youtube"); setSidebarOpen(false); }} className="block">
                    <SidebarItem text="YouTube" icon={<YoutubeIcon />} />
                </div>
                <div onClick={() => { setTypeFilter("notes"); setSidebarOpen(false); }} className="block">
                    <SidebarItem text="Notes" icon={<NotesIcon />} />
                </div>
            </div>
        </div>
    </>
}