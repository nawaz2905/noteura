import { useNavigate } from "react-router-dom";
import { Logo } from "./icons/Logo";
import { XIcon } from "./icons/XIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { HamburgerIcon } from "./icons/HamburgerIcon";
import { AllIcon } from "./icons/AllIcon";
import { NotesIcon } from "./icons/NotesIcon";

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
        <div className={`h-screen w-72 bg-white border-r border-gray-100 fixed left-0 top-0 z-50 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`} >
            <div className="flex pt-8 items-center justify-between px-8 mb-10">
                <div className="flex items-center gap-3">
                    <div className="text-purple-700">
                        <Logo />
                    </div>
                    <span className="text-2xl font-['Germania_One'] text-gray-900">Noteura</span>
                </div>
                <div className="cursor-pointer text-gray-400 hover:text-gray-600 md:hidden" onClick={() => setSidebarOpen(false)}>
                    <HamburgerIcon />
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

            <div className="p-6">
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/signin")
                    }}
                    className="w-full py-3 px-4 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all duration-300 font-medium flex items-center justify-center gap-2 border border-transparent hover:border-red-100 cursor-pointer"
                >

                    Logout
                </button>
            </div>
        </div>
    </>
}