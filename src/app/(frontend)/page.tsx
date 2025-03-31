import About from '@/components/frontend/about/About'
import Hero from '@/components/frontend/hero/Hero'
import Projects from '@/components/frontend/projects/Projects'
import Skills from '@/components/frontend/skills/Skills'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Skills />
      <Projects />
    </div>
  )
}

export default Home
