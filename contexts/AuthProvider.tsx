"use client"
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider refetchInterval={5 * 60}>
            {children}
        </SessionProvider>
    )
}
export default AuthProvider