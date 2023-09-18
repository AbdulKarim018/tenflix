"use client"
import React, { useEffect, useState } from 'react'
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
  const [showBackground, setShowBackground] = useState(false);
  const searchParams = useSearchParams();
  const profile = searchParams.get('profile') ?? 0
  const profileNumber = Number.parseInt(profile || '')
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 66) {
        setShowBackground(true);
      }
      else { setShowBackground(false); }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  return (
    <nav className='z-10 fixed'>
      <div className={`text-white fixed p-2 transition flex w-full ${showBackground ? 'bg-zinc-800/80' : 'bg-transparent'}`}>
        {/* sheet */}
        <Sheet>
          <SheetTrigger aria-label='open mobile menu' className='lg:hidden ml-4 mr-5 '><GiHamburgerMenu /></SheetTrigger>
          <SheetContent side='left' className='w-[17rem] bg-slate-900/20 backdrop:bg-black'>
            <SheetHeader>
              <SheetTitle>Navigation Menu</SheetTitle>
              <SheetDescription>
                <div className="flex flex-col text-lg items-start justify-start mt-[5rem]">
                  <div className="flex m-2 pt-6">
                    <div className="mt-1">
                      <FaHome />
                    </div>
                    <NavItem label='Home' href='/' className='ml-2' />
                  </div>
                  <div className="flex m-2 pt-6">
                    <div className="mt-1"><BiSolidVideos /></div>
                    <NavItem label='New & Popular' href='/new' className='ml-2' />
                  </div>
                  <div className="flex m-2 pt-6">
                    <div className="mt-1"><BiSolidCategoryAlt /></div>
                    <NavItem label='Browse&nbsp;By&nbsp;Categories' href='/categories' className='ml-2' />
                  </div>
                  <div className="flex m-2 pt-6">
                    <div className="mt-1"><BsSearch /></div>
                    <NavItem label='Search' href='/search' className='ml-2' />
                  </div>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <div>
          <Image priority={true} src='/logo2.png' alt='TENFLIX logo' width={130} height={100} />
        </div>
        <div className="flex w-full justify-end">
          <div className="max-lg:hidden flex w-full justify-end">
            <NavItem label='Home' href='/' className='m-2 pt-4' />
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
      </div>
    </nav>
  )
}
