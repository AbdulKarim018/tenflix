import Link from 'next/link'
import React from 'react'

type NavItemProps = {
    label: string,
    onClick?: any,
    href: string,
    disabled?: boolean,
    className?: string,
}

const NavItem = ({ label, onClick, href, disabled, className }: NavItemProps) => {
    return (
        <Link className={`text-slate-400 hover:text-white cursor-pointer transition ${disabled ? 'pointer-events-none text-slate-600' : ''} ${className}`} href={href} onClick={onClick}>
            {label}
        </Link>
    )
}

export default NavItem