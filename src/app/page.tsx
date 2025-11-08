"use client"
import LoginPopop from '@/components/LoginPopop'
import MainHeader from '@/components/main/mainHeader'
import { motion } from 'framer-motion'
const MainPage = () => {
    return (
        <div className='w-full h-180  bg-yellow-50'>
            <MainHeader />

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-8xl text-neutral-700 mt-20 ml-10 font-semibold'>
                Human
                <br />
                Stories & Ideas
            </motion.p>

            <motion.p
                className="text-3xl mt-10 ml-10 font-semibold bg-linear-to-r from-neutral-500 to-red-400 bg-clip-text  text-neutral-700"
                initial={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                animate={{ opacity: 1, y: 0 }}>
                “Welcome to the place where half-baked thoughts”
                <br />
                find their way to becoming extraordinary stories.
            </motion.p>

        </div>
    )
}

export default MainPage
