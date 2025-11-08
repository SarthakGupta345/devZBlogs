"use client";
import HomeProfile from "@/components/profile/HomeProfile";
import React, { useState } from "react";

const ProfilePage = () => {
    const [selected, setSelected] = useState<"Home" | "About">("Home");

    const tabs: ("Home" | "About")[] = ["Home", "About"];

    return (
        <div className="w-full h-screen bg-white flex">
            {/* Left section */}
            <div className="w-[72%] border-r border-neutral-200 px-20 ml-35 py-10">
                <p className=" mt-10 text-neutral-800 text-4xl font-bold mb-6">Chandan Gupta</p>

                {/* Tabs */}
                <div className="border-b mt-15  border-neutral-200 flex gap-8">
                    {tabs.map((tab) => (
                        <div
                            key={tab}
                            className="cursor-pointer relative pb-2"
                            onClick={() => setSelected(tab)}
                        >
                            <p
                                className={`text-lg ${selected === tab ? "text-neutral-900 font-semibold" : "text-neutral-600"
                                    }`}
                            >
                                {tab}
                            </p>
                            {selected === tab && (
                                <div className="absolute left-0 bottom-0 w-full h-0.5 bg-neutral-800 rounded-full" />
                            )}
                        </div>
                    ))}
                </div>

                {/* Conditional section */}
                <div className="mt-10">
                    {selected === "Home" ? (
                       <HomeProfile/>
                    ) : (
                        <p className="text-neutral-700">About section goes here.</p>
                    )}
                </div>
            </div>

            {/* Right section (you can fill this later) */}
            <div className="flex-1"></div>
        </div>
    );
};

export default ProfilePage;
