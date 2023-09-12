"use client"
import React from 'react'
import NavItem from './NavItem'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import NavBarDropdownWithAvatar from './NavBarDropdownWithAvatar'
import { Button } from './ui/button'
import { HiArrowRight } from 'react-icons/hi'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaHome } from 'react-icons/fa';
import { BiSolidCategoryAlt, BiSolidVideos } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineLoading } from 'react-icons/ai'


export default function Navbar() {
  const searchParams = useSearchParams();
  const profile = searchParams.get('profile')
  const profileNumber = Number.parseInt(profile || '')
  const router = useRouter();
  const { data: session, status } = useSession()
  return (
    <nav className='text-white flex m-2 w-full'>
      {/* sheet */}
      <Sheet>
        <SheetTrigger className='md:hidden mr-5 '><GiHamburgerMenu /></SheetTrigger>
        <SheetContent side='left' className='w-[17rem]'>
          <SheetHeader>
            <SheetTitle>Navigation Menu</SheetTitle>
            <SheetDescription>
              <div className="flex flex-col text-lg items-start justify-start mt-[5rem]">
                <div className="flex m-2 p-4">
                  <div className="mt-1">
                    <FaHome />
                  </div>
                  <NavItem label='Home' href='/' className='ml-2' />
                </div>
                <div className="flex m-2 p-4">
                  <div className="mt-1"><BiSolidVideos /></div>
                  <NavItem label='New & Popular' href='/new' className='ml-2' />
                </div>
                <div className="flex m-2 p-4">
                  <div className="mt-1"><BiSolidCategoryAlt /></div>
                  <NavItem label='Browse&nbsp;By&nbsp;Categories' href='/categories' className='ml-2' />
                </div>
                <div className="flex m-2 p-4">
                  <div className="mt-1"><BsSearch /></div>
                  <NavItem label='Search' href='/search' className='ml-2' />
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <div>
        <Image src='/logo2.png' alt='TENFLIX logo' width={130} height={100} />
      </div>
      <div className="flex w-full justify-end">
        <div className="max-lg:hidden flex w-full justify-end">
          <NavItem label='Home' href='/' className='m-2 p-4' />
          <NavItem label='New & Popular' href='/new' className='m-2 p-4' />
          <NavItem label='Browse By Categories' href='/categories' className='m-2 p-4' />
          <NavItem label='Search' href='/search' className='m-2 p-4' />
        </div>
        {status === 'loading' && <div className='animate-none'><div className="animate-spin"><AiOutlineLoading /></div></div>}
        {status === 'unauthenticated' && <Button className='rounded-3xl hover:bg-red-700 bg-red-600 text-black hover:text-white mt-2' size='lg'
          onClick={() => { router.push('/login') }}>
          Sign&nbsp;In <div className="ml-2"><HiArrowRight /></div>
        </Button>}
        {status === 'authenticated' && <NavBarDropdownWithAvatar image={session?.user?.Profiles[profileNumber || 0].image} email={session.user.email} name={session.user.Profiles[profileNumber || 0].name} />}
      </div>
    </nav>
  )
}
