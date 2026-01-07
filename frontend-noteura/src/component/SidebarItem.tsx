import type { ReactElement } from "react";

export function SidebarItem({ text, icon }: {
    text: string;
    icon: ReactElement;
}) {
    return <div className="flex items-center py-2 text-gray-700 cursor-pointer hover:bg-gray-200 rounded mx-w-48 pl-8 transition-all duration-400">
        <div className="pr-2">

            {icon}
        </div>
        <div >
            {text}
        </div>

    </div>
}