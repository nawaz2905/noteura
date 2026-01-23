import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { Logo } from "./icons/Logo";
import { ThemeToggle } from "./ThemeToggle";
import { useEffect, useState } from "react";

export function Navbar({ transparent = false }: { transparent?: boolean }) {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isTransparent = transparent && !scrolled;

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 ${!isTransparent
            ? "bg-white/70 dark:bg-slate-950/70 backdrop-blur-lg py-3 shadow-sm border-b border-gray-100 dark:border-slate-800"
            : "bg-transparent py-5"
            }`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div onClick={() => navigate("/")} className="flex items-center gap-2 text-2xl font-['Germania_One'] text-gray-900 dark:text-white transition-transform duration-300 origin-left cursor-pointer"
                    style={{ transform: scrolled ? 'scale(0.9)' : 'scale(1)' }}>
                    <div className="text-purple-700 dark:text-purple-500">
                        <Logo />
                    </div>
                    Noteura
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <button
                        onClick={() => navigate("/signin")}
                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors cursor-pointer"
                    >
                        Sign In
                    </button>
                    <Button
                        variant="primary"
                        text="Get Started"
                        onClick={() => navigate("/signup")}
                    />
                </div>
            </div>
        </nav>
    );
}
