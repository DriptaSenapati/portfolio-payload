import React from 'react'
import ContainerBox from './generics/ContainerBox'
import Link from 'next/link'
import logo from '@/assets/images/logo.png'
import Image from 'next/image'

const navBarLinks = [
  {
    name: 'Home',
    url: '#',
  },
  {
    name: 'About',
    url: '#about',
  },
  {
    name: 'Experience',
    url: '#experience',
  },
  {
    name: 'Projects',
    url: '#projects',
  },
]

const NavBar = () => {
  return (
    <nav className="navbar">
      <ContainerBox>
        <div className={`flex justify-between items-center h-full px-10`}>
          <div className="flex items-center">
            <Link href="/">
              <Image src={logo.src} alt="Logo" width={40} height={40} />
            </Link>
            <span className="text-p1 text-white">Dripta</span>
          </div>
          <div className="flex items-center justify-between gap-20 max-md:hidden">
            {navBarLinks.map((link, idx) => (
              <span key={idx}>
                <Link
                  href={link.url}
                  className="text-p1 hover:text-white transition-all duration-300"
                >
                  {link.name}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </ContainerBox>
    </nav>
  )
}

export default NavBar
