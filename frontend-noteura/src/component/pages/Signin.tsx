import { Input } from "../Input";
import { Button } from "../Button";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { Logo } from "../icons/Logo";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    async function signin() {
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value
        try {
            const responce = await axios.post(BACKEND_URL + "/api/v1/signin", {
                username,
                password
            })
            const jwt = responce.data.token;
            localStorage.setItem("token", jwt);
            navigate("/dashboard")
        } catch (e) {
            alert("Error signing in. Please check your credentials.")
        }
    }

    return (
        <div className="min-h-screen w-screen flex flex-col justify-center items-center bg-[#fafafa] px-6">
            <div className="w-full max-w-md animate-fade-in">
                {/* Logo and Brand */}
                <div className="flex flex-col items-center mb-8">
                    <div className="text-purple-700 mb-2">
                        <Logo />
                    </div>
                    <h1 className="text-3xl font-['Germania_One'] text-gray-900">Noteura</h1>
                </div>

                {/* Signin Card */}
                <div className="bg-white shadow-xl shadow-purple-100/50 rounded-3xl border border-gray-100 p-8 md:p-10">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h2>
                        <p className="text-gray-500">Enter your details to access your second brain</p>
                    </div>

                    <div className="space-y-4">
                        <div className=" flex flex-col items-center">
                            <label className="text-sm font-medium text-gray-700 ml-2 mb-1 block ">Email</label>
                            <Input  reference={usernameRef} placeholder="Enter your email" />
                        </div>
                        <div  className="flex flex-col items-center" >
                            <label className="text-sm font-medium text-gray-700 ml-2 mb-1 block">Password</label>
                            <Input reference={passwordRef} placeholder="••••••••" />
                        </div>
                    </div>

                    <div className="mt-8">
                        <Button onClick={signin} variant="primary" text="Sign In" fullwidth={true} loading={false} />
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{" "}
                            <button
                                onClick={() => navigate("/signup")}
                                className="text-purple-700 font-semibold hover:text-purple-800 transition-colors cursor-pointer"
                            >
                                Sign Up
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
