"use client"
import { axiosInstance } from '@/config/axios'
import { Bookmark, Clapperboard, Ellipsis, Home, MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'


interface HomeProps {
    id: string
    isSaved: boolean
    tittle: string
    subtitle: string
    photo: string
    isLike: boolean
    createdAt: Date
    comments: number
}

const HomeProfile = (id: string) => {
    const [PageLoading, setPageLoading] = useState(false)
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [save, setSave] = useState<boolean>()
    const [details, SetDetails] = useState<HomeProps | null>(null)

    const handleSave = async () => {
        try {
            setLoading(true)
            const isAlreadySaved = details?.isSaved ? true : false
            const response = await axiosInstance.put(`/user/post/saved/${id}`);
            if (!response) {
                setError("Internal Server Error")
            }
            if (response.status == 404 || response.status == 500) {
                setError(response.data.message || "Something Went wrong")
            }

            if (response.status == 200) {
                setSave(!isAlreadySaved);
            }
        } catch (error) {
            setError("Something went wrong")
        } finally {
            setLoading(false)
        }

    }
    const fetchResult = async () => {
        try {

            const response = await axiosInstance.get(`/post/Brief/${id}`);
            if (!response) {
                setError("Internal Server Error")
            }

            if (response.status == 404 || response.status == 500) {
                setError(response.data.message || "Something Went wrong")
            }
            SetDetails(response.data)

        } catch (error: any) {
            console.log(error);
            setError("Something went wrong")
            return;
        } finally {
            setPageLoading(false)
        }

    }

    useEffect(() => {
        fetchResult();
    }, [id])

    if (PageLoading) {
        return (
            <div>
                Loading
            </div>
        )
    }
    return (
        <div className='w-full flex  '>
            <div className='border-b border-neutral-200 pb-9 pt-3 px-2 w-full flex cursor-pointer '
                onClick={() => {
                    router.push(`/profile/${details?.id}`)
                }}
            >
                <div className='mr-2'>
                    <p className='text-neutral-800 text-2xl font-bold  '>Communication is my compass finding true north When converstion got hard </p>
                    <p className='text-neutral-600 mt-5 text-md '> Atleast at deep of pacific ocean i wanna br yours i wanna be yours Atleast at deap of pacific ocean i wanna br yours i wanna be yours </p>
                    <div className='flex mt-8 gap-10 '>
                        <p className='text-sm text-neutral-500 whitespace-nowrap text-tight'>9h ago</p>
                        <div className='flex gap-9'>
                            <div className='flex'>
                                <ThumbsUp className='text-neutral-500 whitespace-nowrap text-tight size-4' />
                                <p className='text-neutral-500 ml-1 text-sm '>20</p>
                            </div>

                            <div className='flex'>
                                <ThumbsDown className='text-neutral-500 whitespace-nowrap text-tight size-4' />
                                <p className='text-neutral-500 ml-1 -mt-0.5 text-sm '>50</p>
                            </div>

                            <div className='flex'>
                                <MessageCircle className='text-neutral-500 whitespace-nowrap text-tight size-4' />
                                <p className='text-neutral-500 ml-1 -mt-0.5 text-sm '>70</p>
                            </div>
                        </div>

                        <div className='flex ml-50 gap-12'>
                            <Bookmark className='text-neutral-500 whitespace-nowrap text-tight size-5' />
                            <Ellipsis className='text-neutral-500 whitespace-nowrap text-tight size-5 hover:text-neutral-800' />

                        </div>
                    </div>
                </div>
                <div className='bg-red-500 w-80 h-35 rounded-md ml-4 mr-2'>

                </div>
            </div>

        </div>
    )
}

export default HomeProfile
