import { AiOutlineLoading } from "react-icons/ai";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { CreditCard, LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";

import React from 'react'
import { useRouter } from "next/navigation";

export default function NavBarDropdownWithAvatar({ name, email, image }: { image?: string | undefined | null, name: string | undefined | null, email: string | undefined | null; }) {
  const router = useRouter();
  return (

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='cursor-pointer mt-2 border-blue-900 border-4'>
          <AvatarImage src={image ?? '/user-placeholder.png'} />
          <AvatarFallback className='bg-black'>
            <div className="animate-spin">
              <AiOutlineLoading />
            </div>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-4">
        <DropdownMenuLabel>
          My Account
          <p>Logged in as: {name ?? 'username'}</p>
          <p>Email: {email ?? 'email'}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={(params) => {
          router.push('/profiles')
        }}>
          <User className="mr-2 h-4 w-4" />
          <span>Choose Another Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Billing</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {
          signOut();
        }}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}
