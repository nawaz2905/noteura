import { useNavigate } from "react-router-dom";
import { Logo } from "./icons/Logo";
import { XIcon } from "./icons/XIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { HamburgerIcon } from "./icons/HamburgerIcon";

interface SidebarProps {
    setTypeFilter: (type: string | null) => void;
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

export function Sidebar({ setTypeFilter, sidebarOpen, setSidebarOpen }: SidebarProps) {
    const navigate = useNavigate();


    return <>
        {!sidebarOpen && (
            <div className="fixed top-6 left-4 z-50 cursor-pointer text-gray-600 hover:bg-slate-200 p-1 rounded md:hidden" onClick={() => setSidebarOpen(true)}>
                <HamburgerIcon />
            </div>
        )}
        <div className={`h-screen w-72 bg-white border-r border-gray-300 fixed left-0 top-0 z-50 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`} >
            <div className="flex pt-4 items-center justify-between p-4 font-['Germania_One'] font-normal not-italic text-4xl">
                <div className="flex items-center">
                    <div className="pr-2 text-purple-700">
                        <Logo />
                    </div>
                    Noteura
                </div>
                <div className="cursor-pointer text-gray-600 hover:bg-slate-200 p-1 rounded md:hidden" onClick={() => setSidebarOpen(false)}>
                    <HamburgerIcon />
                </div>
            </div>
            <div className="flex-grow">
                <div onClick={() => setTypeFilter("twitter")} className="cursor-pointer p-2">
                    <SidebarItem icon={<XIcon />} text="X(Twitter)" />
                </div>
                <div onClick={() => setTypeFilter("youtube")} className="cursor-pointer p-2">
                    <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
                </div>
            </div>

            <div className="p-4 mb-4 flex justify-center">
                <button onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/signin")

                }} className="w-40 h-10 text-white bg-black border rounded-xl hover:cursor-pointer hover:bg-gray-800"  >Logout</button>
            </div>
        </div>
    </>
}