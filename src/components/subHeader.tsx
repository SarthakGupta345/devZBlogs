"use client"
import { CrossIcon, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'

const SubHeader = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    if (open) {
        return null
    }
    return (
        <div className='w-full h-11 bg-neutral-100  flex px-1 py-1 item-center '>
            <FaStar className='text-yellow-400 mt-2 ml-80' />
            <p className='text-neutral-600 ml-4 mt-1.5'>Get unlimited access to the best of <span className='text-green-500 font-semibold '>DevZ</span> <span className=' font-semibold -ml-2'>Blogs</span> for less than $1/week</p>
            <p
                onClick={() => {
                    router.push("/plan")
                }}
                className=' mt-1.5 text-black text-nowrap whitespace-nowrap  font-semibold cursor-pointer underline ml-4'>Become a Member</p>
            <X className='text-neutral-800 ml-80 mt-1.5 cursor-pointer'
                onClick={() => {
                    setOpen(false)
                }}
            />

        </div>

    )
}

export default SubHeader
