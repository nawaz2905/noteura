import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../Button";
import { Logo } from "../icons/Logo";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { XIcon } from "../icons/XIcon";
import { NotesIcon } from "../icons/NotesIcon";
import { ShareIcon } from "../icons/ShareIcon";

export function LandingPage() {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-slate-950 overflow-x-hidden">
            {/* Navbar is now handled by Layout */}

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                    <span className="inline-block py-1 px-3 mb-6 text-sm font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/30 rounded-full animate-fade-in">
                        The ultimate Second Brain
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight tracking-tight">
                        Capture your thoughts, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
                            organize your world.
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl leading-relaxed">
                        Noteura is the minimalist collective for your links, tweets, and personal reflections. Keep everything that matters in one stunningly organized place.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => navigate("/signup")}
                            className="px-8 py-4 bg-purple-700 text-white rounded-xl font-semibold text-lg hover:bg-purple-800 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-purple-200 dark:shadow-purple-900/30 cursor-pointer"
                        >
                            Start for Free
                        </button>
                        <button
                            onClick={() => navigate("/signin")}
                            className="px-8 py-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 rounded-xl font-semibold text-lg hover:border-purple-600 dark:hover:border-purple-500 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                        >
                            Login to Account
                        </button>
                    </div>

                    {/* Visual Decor */}
                    <div className="mt-20 w-full relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-purple-400/20 blur-[100px] -z-10 rounded-full"></div>
                        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 md:p-8 animate-float">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <FeatureCard
                                    icon={<YoutubeIcon />}
                                    title="YouTube Videos"
                                    desc="Save inspiration and reference later."
                                />
                                <FeatureCard
                                    icon={<XIcon />}
                                    title="Twitter (X)"
                                    desc="Keep track of viral threads and news."
                                />
                                <FeatureCard
                                    icon={<NotesIcon />}
                                    title="Personal Notes"
                                    desc="Quick thoughts, long reflections."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Noteura Section */}
            <section className="py-24 bg-gray-50 dark:bg-slate-900/50 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Everything you need</h2>
                        <p className="text-gray-600 dark:text-gray-400">Designed for speed, built for focus.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <SmallFeature icon={<ShareIcon />} title="One-Click Share" desc="Share your entire collection or specific topics with a secure link." />
                        <SmallFeature icon={<Logo />} title="Clean UI" desc="No clutter. Just you and your thoughts, beautifully presented." />
                        <SmallFeature icon={<NotesIcon />} title="Tag System" desc="Categorize anything instantly with our intuitive tagging system." />
                        <SmallFeature icon={<XIcon />} title="Cross-Platform" desc="Seamlessly save from X, YouTube, and the web." />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto bg-gradient-to-br from-purple-700 to-indigo-800 rounded-3xl overflow-hidden shadow-2xl relative">
                    <div className="px-8 py-16 text-center relative z-10">
                        <h2 className="text-4xl font-bold text-white mb-6">Read enough? Ready to capture?</h2>
                        <p className="text-purple-100 mb-10 text-lg">Join 1000+ creators who use Noteura to build their second brain.</p>
                        <button
                            onClick={() => navigate("/signup")}
                            className="bg-white text-purple-700 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-purple-50 transition-transform active:scale-95 shadow-xl cursor-pointer"
                        >
                            Get Started Now
                        </button>
                    </div>
                    {/* Background patterns */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 blur-[60px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-gray-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 text-xl font-['Germania_One'] text-gray-900 dark:text-white">
                        <div className="text-purple-700 dark:text-purple-500 scale-75">
                            <Logo />
                        </div>
                        Noteura
                    </div>
                    <div className="text-gray-500 text-sm">
                        &copy; 2026 Noteura. Build your second brain today.
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Twitter</a>
                        <a href="#" className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Github</a>
                        <a href="#" className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Privacy</a>

                    </div>
                    <p className="text-xs text-gray-500">
                        ~made by Nawaz Khan
                    </p>

                </div>

            </footer>

            <style>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }
            `}</style>
        </div>
    );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="flex flex-col items-center p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-slate-700 text-center">
            <div className="w-12 h-12 flex items-center justify-center bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-lg mb-4">
                {icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
        </div>
    );
}

function SmallFeature({ icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 hover:shadow-lg dark:hover:shadow-purple-900/10 transition-all">
            <div className="text-purple-600 dark:text-purple-400 mb-4 scale-110 origin-left">
                {icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{desc}</p>
        </div>
    );
}
