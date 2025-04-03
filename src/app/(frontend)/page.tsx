import About from '@/components/frontend/about/About'
import Experience from '@/components/frontend/experience/Experience'
import Hero from '@/components/frontend/hero/Hero'
import Projects from '@/components/frontend/projects/Projects'
import Reviews from '@/components/frontend/reviews/Reviews'
import Skills from '@/components/frontend/skills/Skills'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Reviews />
      <Experience />
    </div>
  )
}

export default Home
