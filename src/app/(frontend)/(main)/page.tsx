import { getGlobals } from '@/actions/globalActions'
import { getJobs } from '@/actions/jobActions'
import { getProjectList } from '@/actions/projectActions'
import { getReviewList } from '@/actions/reviewActions'
import { getSkills } from '@/actions/skillAction'
import About from '@/components/frontend/about/About'
import Experience from '@/components/frontend/experience/Experience'
import Hero from '@/components/frontend/hero/Hero'
import Projects from '@/components/frontend/projects/Projects'
import Reviews from '@/components/frontend/reviews/Reviews'
import Skills from '@/components/frontend/skills/Skills'
import {
  global_fetch_key,
  job_fetch_key,
  project_fetch_key,
  review_fetch_key,
  skill_fetch_key,
} from '@/lib/swrKeys'
// import { job_fetch_key } from '@/lib/swrKeys'
import React from 'react'
import { SWRConfig } from 'swr'

const fetchFallbackData = async () => {
  // job details
  const jobList = await getJobs()
  const reviewList = await getReviewList()
  const projectList = await getProjectList()
  const skillList = await getSkills()
  const appConfig = await getGlobals()

  return {
    fallback: {
      [job_fetch_key]: jobList,
      [review_fetch_key]: reviewList,
      [project_fetch_key]: projectList,
      [skill_fetch_key]: skillList,
      [global_fetch_key]: appConfig,
    },
  }
}

export const revalidate = 60

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
