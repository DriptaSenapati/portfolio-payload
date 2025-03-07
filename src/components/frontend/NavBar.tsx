'use client'

import React, { useRef, useState } from 'react'
import ContainerBox from './generics/ContainerBox'
import Link from 'next/link'
import logo from '@/assets/images/logo.png'
import Image from 'next/image'
import Hamburger from './generics/Hamburger'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { NavBarHeight } from '@/lib/constants'

gsap.registerPlugin(useGSAP)

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
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const navBarTween = useRef<gsap.core.Timeline>(null)

  useGSAP(() => {
    const menuHeight = gsap.getProperty('#mobile-menu', 'height')

    if (!navBarTween.current) {
      navBarTween.current = gsap.timeline({ paused: true }).to('#navbar-menu', {
        height: NavBarHeight + Number(menuHeight),
        duration: 0.5,
        ease: 'power2.inOut',
      })
    }

    if (navBarTween.current.reversed() && menuOpen) {
      navBarTween.current.play()
    } else {
      navBarTween.current.reverse()
    }
  }, [menuOpen])

  return (
    <nav
      id="navbar-menu"
      className="fixed top-0 w-full z-[999] border-b-light-black border-b-[3px] overflow-hidden h-[var(--navbar-height)] backdrop-blur-[60px]"
      // style={{
      //   backdropFilter: 'blur(10px)',
      // }}
    >
      <div className="h-[var(--navbar-height)]">
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
            <div className="md:hidden block">
              <Hamburger menuOpenState={menuOpen} setMenuOpenState={setMenuOpen} />
            </div>
          </div>
        </ContainerBox>
      </div>
      <div className="md:hidden block px-10 py-3" id="mobile-menu">
        {navBarLinks.map((link, idx) => (
          <div key={idx} className="py-5">
            <Link href={link.url} className="text-p1 hover:text-white transition-all duration-300">
              {link.name}
            </Link>
          </div>
        ))}
      </div>
    </nav>
  )
}

export default NavBar
