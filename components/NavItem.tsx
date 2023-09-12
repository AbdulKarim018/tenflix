import Link from 'next/link'
import React from 'react'

const NavItem = ({ label, onClick, href, className }: { label: string, onClick?: any, href: string, className?: string, }) => {
    return (
        <Link className={`text-slate-400 hover:text-white cursor-pointer transition ${className}`} href={href} onClick={onClick}>
            {label}
        </Link>
    )
}

export default NavItem