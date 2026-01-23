import { useEffect } from "react";
import { DeleteIcon } from "./icons/DeleteIcon";

import { ShareIcon } from "./icons/ShareIcon";
import { XIcon } from "./icons/XIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { NotesIcon } from "./icons/NotesIcon";

interface CardProps {
    title: string;
    link: string;
    type: "youtube" | "twitter" | "notes";
    id: string;
    text?: string;
    onDelete: (id: string) => void;
    onShare?: () => void;
}

export function Card({ title, link, type, id, text, onDelete }: CardProps) {
    useEffect(() => {
        if (type === "twitter") {
            // @ts-ignore
            window.twttr?.widgets?.load();
        }
    }, [type, link]);

    return (
        <div className={`group bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-6 w-72 ${type === 'youtube' ? 'min-h-[220px]' : 'min-h-[320px]'} shadow-sm hover:shadow-xl hover:shadow-purple-500/5 dark:hover:shadow-purple-900/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col`}>
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 dark:bg-slate-800 text-purple-600 dark:text-purple-400 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                        {type === "youtube" && <YoutubeIcon />}
                        {type === "twitter" && <XIcon />}
                        {type === "notes" && <NotesIcon />}
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">{title}</h3>
                </div>
                <div className="flex items-center gap-1">
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-lg transition-all"
                    >
                        <ShareIcon />
                    </a>
                    <button
                        onClick={() => onDelete(id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all cursor-pointer"
                    >
                        <DeleteIcon />
                    </button>
                </div>
            </div>

            <div className="flex-grow overflow-hidden rounded-2xl bg-gray-50/50 dark:bg-slate-950/50">
                {type === "youtube" && (
                    <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-inner">
                        <iframe
                            className="w-full h-full"
                            src={link?.replace("watch", "embed").replace("?v=", "/")}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}

                {type === "twitter" && (
                    <div className="overflow-y-auto max-h-[350px] scrollbar-hide">
                        {link?.includes("/status/") ? (
                            <blockquote className="twitter-tweet">
                                <a href={link?.replace("x.com", "twitter.com")}></a>
                            </blockquote>
                        ) : (
                            <a
                                className="twitter-timeline"
                                href={link?.replace("x.com", "twitter.com")}
                            ></a>
                        )}
                    </div>
                )}

                {type === "notes" && (
                    <div className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed p-4 h-full overflow-y-auto scrollbar-hide max-h-[350px]">
                        {text}
                    </div>
                )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-500 dark:text-purple-400 bg-purple-50 dark:bg-slate-800 px-2 py-1 rounded-md">
                    {type}
                </span>
            </div>
        </div>
    );
}
