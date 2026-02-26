import type { ReactElement } from "react";

export interface ButtonProps {
    variant: "primary" | "secondary";
    text: string;
    startIcon?: ReactElement;
    onClick?: () => void;
    fullwidth?: boolean;
    loading?: boolean;
}
const variantClasses = {
    "primary": "bg-purple-700 text-white hover:bg-purple-800 transition-colors",
    "secondary": "bg-purple-200 text-purple-600 hover:bg-purple-300 transition-colors"
};
const defaultStyle = "px-4 py-2 rounded-md font-medium flex items-center justify-center gap-2 transition-all duration-200";

export function Button({ variant, text, startIcon, onClick, fullwidth, loading }: ButtonProps) {
    return <button
        onClick={onClick}
        className={`${variantClasses[variant]} ${defaultStyle} ${fullwidth ? "w-full" : ""} ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer active:scale-95"} relative`}
        disabled={loading}
    >
        {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
            </div>
        )}
        <div className={`flex items-center gap-2 ${loading ? "opacity-0" : "opacity-100"}`}>
            {startIcon}
            <span>{text}</span>
        </div>
    </button>
}