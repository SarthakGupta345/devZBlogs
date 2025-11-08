"use client"
import { Mail, X } from "lucide-react";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import SignupPopup from "./SignupPopup";
import { setServers } from "dns";
import EmailPopup from "./EmailPopup";

const LoginPopup = () => {
    const [open, setOpen] = useState<boolean>(true)
    const [selected, SetSelected] = useState<boolean>(false)
    const [emailSelected, SetEmailSelected] = useState<boolean>(false)
    if (!open) {
        return null
    }

    if (selected) {
        return (
            <SignupPopup />
        )
    }

    if(emailSelected){
        return (
            <EmailPopup />
        )
    }
    return (
        <div
            className={`fixed inset-0 bg-black/40 flex items-center justify-center z-50 transition-all duration-300 ease-in-out ${open ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
        >
            <div
                className={`bg-white w-[700px] h-125 rounded-sm shadow-lg relative transition-all duration-300 ease-in-out transform ${open ? "scale-100 translate-y-0" : "scale-95 -translate-y-4"
                    }`}
            >
                <X className="text-neutral-600 hover:text-black cursor-pointer ml-auto mr-5 mt-3"
                    onClick={() => {
                        setOpen(false)
                    }}
                />

                <div className="flex ml-60 mt-7 gap-3">
                    <p className="text-neutral-800 text-2xl font-semibold ">Join</p>
                    <div className="flex -mt-5">
                        <p className='text-green-600 mt-5  font-semibold text-2xl  '>DevZ</p>
                        <p className='text-black text-2xl mt-5 font-semibold'>Blogs</p>
                    </div>
                </div>

                <div className="mt-10">
                    <div className="w-80 cursor-pointer mx-auto h-12 flex rounded-full border border-neutral-800">
                        <FcGoogle className="mt-1.5 ml-5 size-8" />
                        <p className="text-neutral-800 mt-2.5 text-md ml-7">Signup With google</p>
                    </div>

                    <div className="w-80 cursor-pointer mt-3 mx-auto h-12 flex rounded-full border border-neutral-800">
                        <FaGithub className="mt-1.5 ml-5 size-8 text-black" />
                        <p className="text-neutral-800 mt-2.5 text-md ml-7">Signup With google</p>
                    </div>

                    <div className="w-80 mt-3 cursor-pointer mx-auto h-12 flex rounded-full border border-neutral-800">
                        <Mail className="mt-2 ml-5 size-7 text-neutral-700" />
                        <p className="text-neutral-800 mt-2.5 text-md ml-7"
                        onClick={() => {
                            SetEmailSelected(true)
                        }}
                        >Signup With Email</p>
                    </div>
                </div>

                <div className="flex text-neutral-600 text-sm mt-10 ml-62">
                    <p>Already have an account?</p>
                    <p className="underline hover:text-black cursor-pointer"
                        onClick={() => {
                            SetSelected(true);
                        }}
                    > Sign in</p>
                </div>
                <p className="text-xs mt-8 text-neutral-500 ml-48">By clicking "Sign up", you accept <span className="text-green-600">DevZ</span><span className="font-semibold">Blogs</span> <span className="underline">Terms of Service </span> <br />and <span className="underline">Privacy Policy</span>.</p>
            </div>
        </div>
    );
};

export default LoginPopup;
