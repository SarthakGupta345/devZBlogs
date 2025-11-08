"use client"
import { Mail, X } from "lucide-react";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import LoginPopup from "./LoginPopop";

const SignupPopup = () => {
    const [open, setOpen] = useState<boolean>(true)
    const [selected, SetSelected] = useState<boolean>(false)
    if (!open) {
        return null
    }

    if (selected) {
        return (
            <LoginPopup />
        )
    }
    return (
        // Background Overlay
        <div className="fixed inset-0 bg-black/40  flex items-center justify-center z-50 ">
            <div className="bg-white w-[700px] h-125 rounded-sm shadow-lg  relative">
                <X className="text-neutral-600 hover:text-black cursor-pointer ml-auto mr-5 mt-3"
                    onClick={() => {
                        setOpen(false)
                    }}
                />

                <div className=" ml-60 mt-7 gap-3">
                    <p className="-ml-1  text-neutral-800 text-3xl font-semibold ">Welcome Back </p>

                </div>

                <div className="mt-10">
                    <div className="w-80 cursor-pointer mx-auto h-12 flex rounded-full border border-neutral-800">
                        <FcGoogle className="mt-1.5 ml-5 size-8" />
                        <p className="text-neutral-800 mt-2.5 text-md ml-7">Signin With google</p>
                    </div>

                    <div className="w-80 cursor-pointer mt-3 mx-auto h-12 flex rounded-full border border-neutral-800">
                        <FaGithub className="mt-1.5 ml-5 size-8 text-black" />
                        <p className="text-neutral-800 mt-2.5 text-md ml-7">Signin With google</p>
                    </div>

                    <div className="w-80 mt-3 cursor-pointer mx-auto h-12 flex rounded-full border border-neutral-800">
                        <Mail className="mt-2 ml-5 size-7 text-neutral-700" />
                        <p className="text-neutral-800 mt-2.5 text-md ml-7">Signin With Email</p>
                    </div>
                </div>


                <div className="flex text-neutral-600 text-md mt-10 ml-55">
                    <p>Not have an account? &nbsp;</p>
                    <p className="underline hover:text-black cursor-pointer"
                        onClick={() => {
                            SetSelected(true);
                        }}
                    >  Create one</p>
                </div>
                <div className="mt-5 ml-54">
                    <p className="text-sm text-neutral-500">Forgot email or trouble signing in? <span className="underline hover:text-black cursor-pointer">Get help</span></p>
                </div>
                <p className="text-xs mt-4 text-neutral-500 ml-45">By clicking "Sign up", you accept <span className="text-green-600">DevZ</span><span className="font-semibold">Blogs</span> <span className="underline">Terms of Service </span> <br />and <span className="underline">Privacy Policy</span>.</p>
            </div>
        </div>
    );
};

export default SignupPopup;
