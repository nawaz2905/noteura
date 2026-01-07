import { useRef } from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";


export function Signup(){
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()

    async function signup(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        await axios.post(BACKEND_URL + "/api/v1/signup", {
            username,
            password
        })
        alert("You have signed up!")
        navigate("/signin")

    }

    return <div className="h-screen  bg-gray-200 flex justify-center items-center">
        <div className="bg-white border rounded-xl min-w-48 p-8 ">
            <Input reference={usernameRef} placeholder="username"/>
            <Input reference={passwordRef} placeholder="password"/>

            <div className="flex justify-center items-center  pt-4">
                <Button onClick={signup} variant="primary" text="Signup" fullwidth={true} loading={false} />  
            </div>
 
        </div>
        
    </div>
}