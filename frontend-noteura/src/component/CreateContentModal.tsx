import { useRef, useState } from "react";
import { Button } from "./Button";
import { CrossIcon } from "./icons/CrossIcon";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { PlusIcon } from "./icons/PlusIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { XIcon } from "./icons/XIcon";
import { NotesIcon } from "./icons/NotesIcon";


const ContentType = {
    Youtube: "youtube",
    Twitter: "twitter",
    Notes: "notes"
} as const;

import toast from "react-hot-toast";

export function CreateContentModal({ open, onClose }: { open: boolean, onClose: () => void }) {
    const titleref = useRef<HTMLInputElement>(null);
    const linkref = useRef<HTMLInputElement>(null);
    const textref = useRef<HTMLTextAreaElement>(null);

    const [type, setType] = useState<"youtube" | "twitter" | "notes">(ContentType.Youtube);
    const [loading, setLoading] = useState(false);

    async function addContent() {
        const title = titleref.current?.value;
        const link = linkref.current?.value;
        const text = textref.current?.value;

        if (!title) {
            toast.error("Title is required");
            return;
        }

        setLoading(true);
        try {
            await axios.post(BACKEND_URL + "/api/v1/content", {
                title,
                link: type === ContentType.Notes ? "" : link,
                type,
                text
            }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            toast.success("Content saved!");
            onClose();
            // Clear refs
            if (titleref.current) titleref.current.value = "";
            if (linkref.current) linkref.current.value = "";
            if (textref.current) textref.current.value = "";
        } catch (e: any) {
            console.error("Submission error:", e);
            toast.error(e.response?.data?.message || "Failed to save content");
        } finally {
            setLoading(false);
        }
    }

    return <div>
        {open && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-500/60 transition-opacity" onClick={onClose}  >
            <div className="flex flex-col justify-center w-full max-w-md px-4" onClick={(e) => e.stopPropagation()}>
                <div className="bg-white p-6 rounded-2xl shadow-2xl flex flex-col relative overflow-hidden" >
                    <div className="absolute top-4 right-4">
                        <div onClick={onClose} className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100">
                            <CrossIcon />
                        </div>
                    </div>

                    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Create New Content</h2>

                    <div className="flex flex-col items-center space-y-2 w-full">
                        <div className="w-full flex justify-center">
                            <Input reference={titleref} placeholder={"Title"} />
                        </div>
                        {type !== ContentType.Notes && (
                            <div className="w-full flex justify-center">
                                <Input reference={linkref} placeholder={"Link"} />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 py-6 border-y border-gray-100 my-4">
                        <Button text=" youtube" startIcon={<YoutubeIcon />} variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => {
                            setType(ContentType.Youtube)
                        }} />
                        <Button text=" (twitter)" startIcon={<XIcon />} variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => {
                            setType(ContentType.Twitter)
                        }} />
                        <Button text="Notes" startIcon={<NotesIcon />} variant={type === ContentType.Notes ? "primary" : "secondary"} onClick={() => {
                            setType(ContentType.Notes)
                        }} />
                    </div>

                    {type === ContentType.Notes && (
                        <div className="w-full mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Notes Content</label>
                            <textarea
                                ref={textref}
                                placeholder="Write your thoughts here..."
                                className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all resize-none text-gray-700"
                            ></textarea>
                        </div>
                    )}

                    <div className="flex justify-center pt-2">
                        <Button onClick={addContent} variant="primary" text="Submit" loading={loading} />
                    </div>
                </div>
            </div>
        </div>}
    </div>
}


