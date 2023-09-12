"use client"
import React from 'react'
import { Button } from './ui/button'
import { useSession } from 'next-auth/react'
import signOutAndClearCookies from '@/lib/utils/signOutAndClearCookies';

export default function DeleteUserButton() {

    const { data: session } = useSession();

    const delUserReq = () => {
        fetch('/api/deluser', {
            method: 'POST',
            body: JSON.stringify(session),
        })
    }


    return (
        <>
            {session && (
                <Button variant='secondary' onClick={() => {
                    delUserReq()
                    signOutAndClearCookies()
                }}>
                    Delete User
                </Button>
            )}
        </>
    )
}
