import React from 'react'
import { BarLoader } from 'react-spinners';

export default function Loading() {
    return (

        <div className="bg-black h-screen w-full grid place-content-center">
            <BarLoader
                color="rgba(255, 0, 0, 1)"
                height={4}
                loading
                speedMultiplier={1}
                width={200}
            />
        </div>

    )
}
