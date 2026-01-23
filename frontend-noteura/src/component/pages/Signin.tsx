import { Input } from "../Input";
import { Button } from "../Button";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { Logo } from "../icons/Logo";

import toast from "react-hot-toast";
import { GoogleLogin } from '@react-oauth/google';

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    async function signin() {
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value
        setLoading(true);
        try {
            const responce = await axios.post(BACKEND_URL + "/api/v1/signin", {
                username,
                password
            })
            const jwt = responce.data.token;
            localStorage.setItem("token", jwt);
            toast.success("Welcome back!");
            navigate("/dashboard")
        } catch (e: any) {
            // Handle error appropriately
            console.error(e);
            toast.error("Error during signin: " + (e.response?.data?.message || e.message));
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-screen flex flex-col justify-center items-center bg-[#fafafa] dark:bg-slate-950 px-6">
            <div className="w-full max-w-sm animate-fade-in">
                {/* Logo and Brand */}
                <div className="flex flex-col items-center mb-4">
                    <div className="text-purple-700 dark:text-purple-500 mb-2">
                        <Logo />
                    </div>
                    <h1 className="text-3xl font-['Germania_One'] text-gray-900 dark:text-white">Noteura</h1>
                </div>

                {/* Signin Card */}
                <div className="bg-white dark:bg-slate-900 shadow-xl shadow-purple-100/50 dark:shadow-none rounded-3xl border border-gray-100 dark:border-slate-800 p-6 md:p-8">
                    <div className="text-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome back</h2>
                        <p className="text-gray-500 dark:text-gray-400">Enter your details to access your second brain</p>
                    </div>

                    <div className="space-y-2">
                        <div className=" flex flex-col items-center">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block ">Email</label>
                            <div className="w-full flex justify-center text-gray-900 dark:text-white">
                                <Input reference={usernameRef} placeholder="Write your email" />
                            </div>
                        </div>
                        <div className="flex flex-col items-center" >
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Password</label>
                            <div className="w-full flex justify-center text-gray-900 dark:text-white">
                                <Input reference={passwordRef} placeholder="••••••••" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-5">
                        <Button onClick={signin} variant="primary" text="Sign In" fullwidth={true} loading={loading} />
                    </div>

                    <div className="my-4 flex items-center">
                        <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Or continue with</span>
                        <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                    </div>

                    <div className="flex justify-center">
                        <GoogleLogin
                            onSuccess={async (credentialResponse) => {
                                console.log(credentialResponse);
                                if (credentialResponse.credential) {
                                    try {
                                        const response = await axios.post(BACKEND_URL + "/api/v1/google-auth", {
                                            credential: credentialResponse.credential,
                                            mode: "signin"
                                        });
                                        if (response.data.token) {
                                            localStorage.setItem("token", response.data.token);
                                            toast.success("Welcome back!");
                                            // Use setTimeout to ensure state updates before navigation
                                            setTimeout(() => {
                                                navigate("/dashboard");
                                            }, 100);
                                        } else {
                                            toast.error("No token received from server");
                                        }
                                    } catch (error: any) {
                                        console.error("Google auth error:", error);
                                        toast.error("Google authentication failed: " + (error.response?.data?.message || error.message));
                                    }
                                }
                            }}
                            onError={() => {
                                console.log('Login Failed');
                                toast.error("Google Login Failed");
                            }}
                        />
                    </div>

                    <div className="mt-5 text-center">
                        <p className="text-gray-600 dark:text-gray-400">
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
