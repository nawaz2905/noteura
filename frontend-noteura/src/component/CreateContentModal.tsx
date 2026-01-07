import { useRef, useState } from "react";
import { Button } from "./Button";
import { CrossIcon } from "./icons/CrossIcon";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";


enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

export function CreateContentModal({ open, onClose }) {
    const titleref = useRef<HTMLInputElement>(null);
    const linkref = useRef<HTMLInputElement>(null);

    const [type, setType] = useState(ContentType.Youtube)

    async function addContent() {
        const title = titleref.current?.value
        const link = linkref.current?.value
        await axios.post(BACKEND_URL + "/api/v1/content" ,{
            title,
            link,
            type
        },{
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        alert("content saved!")
    }

    return <div>
        {open && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-500/60" onClick={onClose}  >
            <div className="flex flex-col justify-center">
                <span className="bg-white p-4 rounded-xl shadow-xl" onClick={(e) => e.stopPropagation()} >
                    <div className="flex justify-end">
                        <div onClick={onClose} className="hover:cursor-pointer">
                            <CrossIcon />
                        </div>
                    </div>
                    <div>
                        <Input reference={titleref} placeholder={"Title"} />
                        <Input reference={linkref} placeholder={"Link"} />
                    </div>
                    <div className="flex gap-4 p-8">
                        <Button text="youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => {
                            setType(ContentType.Youtube)
                        }} />
                        <Button text="X(twitter)" variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => {
                            setType(ContentType.Twitter)
                        }} />
                    </div>
                    <div className=" flex justify-center" onClick={close} >
                        <Button onClick={addContent} variant="primary" text="Submit"  />
                    </div>
                </span>
            </div>
        </div>}
    </div>
}


