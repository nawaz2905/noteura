import type { ReactElement } from "react";

export function SidebarItem({ text, icon }: {
    text: string;
    icon: ReactElement;
}) {
    return <div className="flex items-center py-3 px-6 text-gray-600 cursor-pointer hover:bg-purple-50 hover:text-purple-700 rounded-xl mx-4 transition-all duration-300 group">
        <div className="pr-4 transition-transform duration-300 group-hover:scale-110">
            {icon}
        </div>
        <div className="font-medium">
            {text}
        </div>
    </div>
}