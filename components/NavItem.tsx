import Link from 'next/link'
import React from 'react'

const NavItem = ({ label, onClick, href, disabled, className, }: { label: string, onClick?: any, href: string, disabled?: boolean, className?: string, }) => {
    return (
        <Link className={`text-slate-400 hover:text-white cursor-pointer transition ${disabled ? 'pointer-events-none' : ''} ${className}`} href={href} onClick={onClick}>
            {label}
        </Link>
    )
}

export default NavItem