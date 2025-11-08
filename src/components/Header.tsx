"use client"
import { useAuthStore } from '@/store/useAuthStore';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { IoMdMenu, IoMdNotificationsOutline } from "react-icons/io";
import { IoPersonSharp } from 'react-icons/io5';
import { LuSquarePen } from 'react-icons/lu';
import ProfileSidebar from './profile/profileSidebar';

const Header = () => {
    const [value, setValue] = useState<string>('');
    const router = useRouter();
    const { user, isAuthenticated } = useAuthStore();
    const [open, setOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    return (
        <div className='w-full h-15 bg-white flex border-b border-neutral-300 '>
            <IoMdMenu size={25} className='ml-6  font-light cursor-pointer mt-3 text-neutral-700 hover:text-gray-600' />
            <div className='flex gap-1 ml-5 mt-3 cursor-pointer'
                onClick={() => {
                    router.push("/")
                }}
            >
                <p className='text-green-600 font-semibold text-xl  '>DevZ</p>
                <p className='text-black text-xl font-semibold'>Blogs</p>
            </div>

            <div className='rounded-full w-180 mt-2 ml-23 h-11 flex bg-neutral-100'>
                <SearchIcon className='mt-2.5 ml-4 text-neutral-500 size-6' />
                <input type="text"
                    placeholder='Search'
                    value={value}
                    onChange={(e) => { setValue(e.target.value) }}
                    className='text-black outline-none ml-3 '
                />
            </div>
            <div className='ml-70 flex mt-3  px-1 py-1 gap-1 cursor-pointer hover:text-black  rounded-md item-center  '>
                <LuSquarePen className='size-6  text-neutral-600' />
                <p className='text-neutral-700 text-md ml-1'>Write</p>
            </div>
            <div className='mt-2.5 px-1 py-1 ml-7 '>
                <IoMdNotificationsOutline className='size-7 text-neutral-700 cursor-pointer hover:text-black' />
            </div>

            <div className='mt-2.5 px-1 py-1 ml-7 '>

                {
                    isAuthenticated ? (

                        <div>

                        </div>
                    ) : (
                        <div className='flex   rounded-full bg-neutral-100 focus:border focus:border-neutral-600 px-2 py-2 -mt-1 -ml-2  '
                            onClick={() => {
                                setProfileOpen(true)
                            }}
                        >
                            <IoPersonSharp className='size-6 text-neutral-700 cursor-pointer hover:text-black' />
                        </div>
                    )
                }

            </div>
            {
                true && (
                    <ProfileSidebar />
                )
            }
        </div>
    )
}

export default Header
