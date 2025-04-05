import { getJobs } from '@/actions/jobActions'
import About from '@/components/frontend/about/About'
import Experience from '@/components/frontend/experience/Experience'
import Hero from '@/components/frontend/hero/Hero'
import Projects from '@/components/frontend/projects/Projects'
import Reviews from '@/components/frontend/reviews/Reviews'
import Skills from '@/components/frontend/skills/Skills'
import { job_fetch_key } from '@/lib/swrKeys'
// import { job_fetch_key } from '@/lib/swrKeys'
import React from 'react'
import { SWRConfig } from 'swr'

const fetchFallbackData = async () => {
  // job details
  const jobList = await getJobs()

  return {
    fallback: {
      [job_fetch_key]: jobList,
    },
  }
}

const Home = async () => {
  const { fallback } = await fetchFallbackData()
  return (
    <SWRConfig value={{ fallback }}>
      <div>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Reviews />
        <Experience />
      </div>
    </SWRConfig>
  )
}

export default Home
