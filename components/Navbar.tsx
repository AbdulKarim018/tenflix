"use client"
import React, { useContext, useEffect, useState } from 'react'
import NavItem from './NavItem'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
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
import { ProfileContext } from '@/hooks/contexts/ProfileContext'


export default function Navbar() {
  const [showBackground, setShowBackground] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const { profile } = useContext(ProfileContext);
  status === 'authenticated' && profile === undefined && router.push('/profiles')
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
    <nav className='z-30 fixed'>
      <div className={`text-white fixed p-2 transition flex w-full h-16 lg:h-20 lg:px-10 px-3 ${showBackground ? 'bg-zinc-800/80' : 'bg-transparent'}`}>
        {/* sheet */}
        <Sheet>
          <SheetTrigger aria-label='open mobile menu' className='lg:hidden ml-4 mr-5 '><GiHamburgerMenu className="w-5 h-5" /></SheetTrigger>
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
                    <NavItem label='New & Popular' href='/' className='ml-2' disabled />
                  </div>
                  <div className="flex m-2 pt-6">
                    <div className="mt-1"><BiSolidCategoryAlt /></div>
                    <NavItem label='Browse&nbsp;By&nbsp;Categories' href='/' className='ml-2' disabled />
                  </div>
                  <div className="flex m-2 pt-6">
                    <div className="mt-1"><BsSearch /></div>
                    <NavItem label='Search' href='/' className='ml-2' disabled />
                  </div>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <div>
          <Image priority={true} src='/logo2.png' alt='TENFLIX logo' width={100} height={80} />
        </div>
        <div className="flex w-full justify-end">
          <div className="max-lg:hidden flex w-full justify-end">
            <NavItem label='Home' href='/' className='m-2 p-4' />
            <NavItem label='New & Popular' href='/' className='m-2 p-4' disabled />
            <NavItem label='Browse By Categories' href='/' className='m-2 p-4' disabled />
            <NavItem label='Search' href='/' className='m-2 p-4' disabled />
          </div>
          {status === 'loading' && <AiOutlineLoading className="animate-spin w-6 h-6 mt-2 duration-500" />}
          {status === 'unauthenticated' && <Button className='rounded-3xl hover:bg-red-800 bg-red-600 text-black hover:text-white mt-2' size='lg'
            onClick={() => { router.push('/login') }}>
            Sign&nbsp;In <HiArrowRight className="m-2" />
          </Button>}
          {status === 'authenticated' && profile !== undefined && <NavBarDropdownWithAvatar image={session?.user?.Profiles[profile].image} email={session.user.email} name={session.user.Profiles[profile].name} />}
        </div>
      </div>
    </nav>
  )
}




{/* <NavBarDropdownWithAvatar image={session?.user?.Profiles[profile].image} email={session.user.email} name={session.user.Profiles[profile].name} /> */ }