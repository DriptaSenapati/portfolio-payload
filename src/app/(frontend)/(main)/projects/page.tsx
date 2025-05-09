import { getProjectList } from '@/actions/projectActions'
import ProjectRoute from '@/components/frontend/projects/ProjectRoute'
import { project_fetch_key } from '@/lib/swrKeys'
import { Metadata } from 'next'
import React from 'react'
import { SWRConfig } from 'swr'

export const metadata: Metadata = {
  title: 'Projects | Dripta Senapati',
}

const getProjectDetails = async () => {
  const projects = await getProjectList()

  return {
    fallback: {
      [project_fetch_key]: projects,
    },
  }
}

const Projects = async () => {
  const { fallback } = await getProjectDetails()
  return (
    <SWRConfig value={{ fallback }}>
      <ProjectRoute />
    </SWRConfig>
  )
}

export default Projects
