"use client"
import { sideBarOptions } from '@/helpers/options';
import Link from 'next/link';
import React from 'react'
import { IoIosStats } from 'react-icons/io';
import { IoBookmarksOutline, IoHomeOutline } from 'react-icons/io5';
import { MdOutlineArticle } from 'react-icons/md';

interface props {
    open: boolean;
    setOpen: (open: boolean) => void;
}
const Sidebar = ({ open, setOpen }: props) => {
    return (
        <div className='w-60 border-r border-neutral-300  bg-white  h-full fixed'>
            <div className='mt-10 mb-6 flex-row bg-green-500 border-b border-neutral-600  gap-5'>
                {
                    sideBarOptions.map((option, index) => (
                        <div key={index} className='bg-white flex  py-1 w-full  px-2'>
                            <Link className='flex cursor-pointer py-6 items-center  hover:bg-neutral-200  w-full rounded-md h-10'
                                href={option.href}
                            >
                                <IoHomeOutline className='text-neutral-600 hover:text-neutral-900  size-8 ml-2.5' />
                                <p className='ml-3.5 text-neutral-600 hover:text-neutral-900 text-lg '>{option.name}</p>

                            </Link>
                        </div>
                    ))
                }

            </div>

        </div>
    )
}

export default Sidebar
