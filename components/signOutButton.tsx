"use client"
import React from 'react'
import { Button } from './ui/button'
import signOutAndClearCookies from '@/lib/utils/signOutAndClearCookies'
import { useSession } from 'next-auth/react'

export function SignOutButton() {
    const { data: session } = useSession()
    return (
        <>
            {session && <Button variant='destructive' onClick={() => {
                signOutAndClearCookies()
            }}>Sign Out</Button>}
        </>
    )
}
