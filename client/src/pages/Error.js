import React from 'react'
import { IoMdSad } from "react-icons/io";

export default function Error() {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <IoMdSad className='text-9xl text-gray-700' />
            <h1 className='text-center text-3xl mt-4'>404 Not Found!</h1>
        </div>
    )
}
