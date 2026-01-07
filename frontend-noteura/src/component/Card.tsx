import { DeleteIcon } from "./icons/DeleteIcon";

import { ShareIcon } from "./icons/ShareIcon";
import { XIcon } from "./icons/XIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";

interface CardProps {
    title: string;
    link: string;
    type: "youtube" | "twitter";
    id: string;
    onDelete: (id: string) => void;
    onShare?: () => void;
}

export function Card({ title, link, type, id, onDelete }: CardProps) {
    return <div >

        <div className="p-4 bg-white rounded-md border max-w-72 border-gray-200 min-h-48 min-w-72">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="text-gray-500 pr-2">
                        <YoutubeIcon />
                    </div>
                    {title}
                </div>
                <div className="flex  items-center">
                    <div className="pr-2 text-gray-500">
                        <a href={link} target="_blank">
                            <ShareIcon />
                        </a>
                    </div>
                    <div onClick={() => onDelete(id)} className="text-gray-500 cursor-pointer">
                        <DeleteIcon />
                    </div>
                </div>
            </div>
            <div className="pt-4">
                {type === "youtube" && <iframe className="w-full" src={link?.replace("watch", "embed").replace("?v=", "/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                {type === "twitter" && <blockquote className="twitter-tweet">
                    <XIcon />
                    <a href={link?.replace("x.com", "twitter.com")}></a>
                </blockquote>}
            </div>
        </div>
    </div>
}
