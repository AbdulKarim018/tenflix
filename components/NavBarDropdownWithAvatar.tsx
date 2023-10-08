"use client"
import { AiOutlineLoading } from "react-icons/ai";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { CreditCard, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import signOutAndClearCookies from "@/lib/utils/signOutAndClearCookies";

export default function NavBarDropdownWithAvatar({ name, email, image }: { image?: string | undefined | null, name: string | undefined | null, email: string | undefined | null; }) {
  const router = useRouter();
  return (

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='cursor-pointer mt-2 border-blue-900 border-4'>
          <AvatarImage src={image ?? '/user-placeholder.png'} />
          <AvatarFallback className='bg-black'>
            <AiOutlineLoading className="animate-spin w-2 h-2 duration-500" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2 lg:mr-8 lg:mt-4">
        <DropdownMenuLabel>
          My Account
          <p>Logged in as: {name ?? 'username'}</p>
          <p>Email: {email ?? 'email'}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {
          router.push('/profiles')
        }}>
          <User className="mr-2 h-4 w-4" />
          <span>Change Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Billing</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {
          signOutAndClearCookies();
        }}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}
