"use client"
import { axiosInstance } from '@/config/axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface UserProps {
    ProfilePic: string
    name: string
    bio: string
    isFollow: boolean
    followers: number
}

interface StoriesProps {
    _id: string
}

const UserPage = () => {
    const params = useParams();
    const id = params.id
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<UserProps | null>(null)
    const [stories, setStories] = useState<StoriesProps[]>([])
    const [error, setError] = useState<string>("")

    const findContent = async () => {


        try {
            setLoading(true)
            const response = await axiosInstance.post(`/userRoutes/user/${id}`)
            if (response.status == 400 || response.status == 500) {
                setError(response.data.message)
                return
            }
            const user: UserProps = response.data.users;
            setUser(user)

            const stories: StoriesProps[] = response.data.stories;
            setStories(stories)

        } catch (error) {
            console.log(error)
            setError("Something went wrong")
        } finally {
            setLoading(false)
        }

    }

    const handleFollow = async () => {
        try {

            const response = await axiosInstance.put(`/userRoutes/follow/${id}`)
            if (response.status == 400 || response.status == 500) {
                setError(response.data.message)
                return
            }


        } catch (error) {

        }
    }

    useEffect(() => {
        findContent()
    }, [id])


    return (
        <div className='bg-white flex w-full h-150'>
            <div className='w-[75%] border-r border-neutral-200'>


            </div>

            <div>
                <div className='rounded-full size-25 ml-9 mt-10 bg-red-500'>

                </div>
                <p className='text-black text-xl mt-4 ml-5 font-semibold'>Chandan Gupta</p>
                <p className='text-sm text-neutral-700 cursor-pointer mt-2 ml-5'>45.5k followers</p>
                <p className=' text-sm w-100 ml-2 mr-4 mt-3 text-neutral-700 '>AI/ML at GOOGLE l | GenAI Expert | Finance and Banking | 3K Medium + 14K YouTube | Machine Learning | Deep Learning | NLP</p>
                <div className='w-30 mt-9 ml-5 cursor-pointer h-10 bg-neutral-900 rounded-full py-2 px-4 item-center justify-center'>
                    <p className='ml-4 font-semibold'>Follow</p>

                </div>
            </div>
        </div>
    )
}

export default UserPage
