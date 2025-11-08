"use client"
import { useState } from "react";
import LoginPopup from "./LoginPopop";
import { MdOutlineEmail } from "react-icons/md";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/config/axios";
import { CircleAlert } from "lucide-react";
import SignupPopup from "./SignupPopup";

const EmailPopup = () => {

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const [open, setOpen] = useState<boolean>(true)
    const [email, setEmail] = useState<string>("")
    const [selected, SetSelected] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [back, setBack] = useState<boolean>(false)


    const handleSubmit = async () => {
        try {
            setLoading(true)
            if (!email || email.length == 0) {
                setError("Email is required")
                return
            }
            if (!emailRegex.test(email)) {
                setError("Invalid Email")
                return
            }
            const response = await axiosInstance.post("/auth/validate", { email: email })
            if (!response) {
                setError("Internal Server Error")
            }
            if (response.status == 404 || response.status == 500) {
                setError(response.data.message || "Something Went wrong")
            }
            if (response.status == 200) {

            }
            setError("Something i dont know")
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }
    const router = useRouter();
    if (!open) {
        return null
    }
    if (selected) {
        return (
            <LoginPopup />
        )
    }

    if (back) {
        return (
            <SignupPopup />
        )
    }


    return (
        // Background Overlay
        <div className="fixed inset-0 bg-black/40  flex items-center justify-center z-50 ">
            <div className="bg-white w-[700px] h-130 rounded-sm shadow-lg  relative">
                <MdOutlineEmail className="size-12 font-light  text-neutral-800 mt-10 mx-auto" />
                <p className="text-neutral-800 text-3xl font-semibold ml-54 mt-6">Sign up With Email</p>
                <label htmlFor="em">
                    <p className="text-neutral-800 ml-35 mt-10">Your Email</p>
                    <div className="border text-neutral-800 border-neutral-500 h-10 w-110 mt-3 focus:border-neutral-900 ml-34 rounded-md">
                        <input type="text"
                            id="em"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            placeholder="Enter your email Address"
                            className="text-md text-neutral-800 outline-none ml-3 h-full w-105  mt- "
                        />
                    </div>
                </label>
                {
                    error && (
                        <div className="text-red-400 flex mt-2 ml-34">
                            <CircleAlert className="size-4 mt-px" />
                            <p className="text-sm ml-3">{error}</p>
                        </div>
                    )
                }

                <div className="w-42 cursor-pointer mt-10 ml-67 h-10 bg-black rounded-full px-2 py-2"
                    onClick={handleSubmit}

                >
                    <p className="ml-5">{loading ? "Loading..." : "Create Account"}</p>
                </div>
                <p className="text-neutral-700 mt-5 ml-70">Back to <span className="underline text-neutral-800 hover:text-black cursor-pointer"
                    onClick={() => {
                        setBack(true)
                    }}
                >sign up</span> options</p>
                <p className="ml-60 mt-5 text-neutral-600">Already have an account? <span className="underline hover:text-black cursor-pointer"
                    onClick={() => {
                        SetSelected(true)
                    }}
                >Sign in</span></p>
                <p className="text-xs mt-5 text-neutral-500 ml-30">By clicking "Create Account", you accept Medium's Terms of Service and Privacy Policy. <br />
                    This site uses reCaptcha and the Google Privacy Policy and Terms of Service apply.</p>
            </div>

        </div>
    );
};

export default EmailPopup;
