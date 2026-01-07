import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";
import  axios  from "axios";
import { Card } from "../Card";

export function Share(){
    const {ShareId} = useParams();
    const [contents,setContents] = useState([]);
    const [username, setUsername] = useState("");
    const [loading, setLoading]= useState(true);
    const [error, setError] = useState("");

    useEffect(()=>{
        async function fetchSharedContent(){
            setLoading(true);
            setError("");
            try{
                const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${ShareId}`)
                setContents((response as any).data.contents || []);
                setUsername((response as any).data.username || "");
            }catch(err){
                setError("Invalid or expired share link.");
            }
            setLoading(false);
        }
        if(ShareId) fetchSharedContent();
    },[ShareId]);

    if(loading) return <div>Loading shared content....</div>
    if(error) return <div>{error}</div>

    return <div className="p-8" >
        <h2 >{username ? `${username}'s Shared Content`:"Shared Content"}</h2>
        <div className="flex gap-5 flex-wrap" >
            {contents.length === 0 && <div>No content found.</div> }
            {contents.map(({_id,title, type,link}, idx)=>(
                <Card key={_id || idx} id={_id} title={title} type={type} link={link}/>
            ))}

        </div>
    </div>

}