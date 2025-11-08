"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import LoginPopup from '../LoginPopop';

const MainHeader = () => {
    const router = useRouter();
    const [startedSelected, setStartedSelected] = useState(false);
    return (
        <div className='w-full h-24  bg-yellow-50 border-b border-neutral-800 '>
            <div className='flex ml-2'>
                <div className='flex ml-25 cursor-pointer'
                    onClick={() => {
                        router.push("/")
                    }}
                >
                    <p className='text-green-600 mt-5  font-semibold text-4xl  '>DevZ</p>
                    <p className='text-black text-4xl mt-5 font-semibold'>Blogs</p>
                </div>

                <div className='flex gap-8 ml-160 mt-9'>
                    <p className='text-neutral-800 text-lg cursor-pointer hover:text-black'>Membership</p>
                    <p className='text-neutral-800 text-lg cursor-pointer hover:text-black'>Write</p>
                    <p className='text-neutral-800 hover:text-black text-lg cursor-pointer'>SignIn</p>
                    <div className='px-4 py-2.5 -mt-2.5 cursor-pointer bg-black rounded-full'
                        onClick={() => {
                            setStartedSelected(!startedSelected)
                        }}
                    >
                        <p>Get Started</p>
                    </div>
                    {
                        startedSelected &&
                        <LoginPopup />
                    }
                </div>
            </div>
        </div>
    )
}

export default MainHeader
