import { navLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <nav className='w-full flex md:w-screen h-16 bg-[#141B29] text-[#A6A6A6] justify-between items-center md:px-[108px]'>
      <Image src="/icons/logo.svg" alt='logo' width={155} height={38}/>
      <div className="flex items-center md:w-[377px] text-sm font-medium gap-5">
      <div className="flex items-center w-full gap-5">
        {
            navLinks.map((item,i:number)=>(
                <Link href={item.href} key={i} className='flex items-center gap-[6px]'>
                    <Image src={item.icon} alt="" height={20} width={20}/>
                    {item.label}
                </Link>
            ))
        }
      </div>
      <div className="flex items-center w-full gap-2">
      <Link href="" className='py-[10px] px-3 bg-[#202634] border border-[#A6A6A6] rounded-lg'>Log In</Link>
      <Link href="" className='py-[10px] px-3 bg-[#8D57FA] border border-[#A6A6A6] rounded-lg text-white'>Sign Up</Link>
      </div>
      </div>
    </nav>
  )
}

export default NavBar
