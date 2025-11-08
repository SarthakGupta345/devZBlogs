"use client"
import { useAuthStore } from '@/store/useAuthStore'
import React from 'react'

const StoriesPage = () => {
    const { user } = useAuthStore()
    return (
        <div className='w-full h-100 ml-60 item-center justify-center bg-white'>
            <p className='text-neutral-800 text-3xl ml-20 mt-10  font-extrabold'>Stories</p>

        </div>
    )
}

export default StoriesPage
