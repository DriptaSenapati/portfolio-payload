import ProjectRoute from '@/components/frontend/projects/ProjectRoute'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Projects | Dripta Senapati',
}

const Projects = () => {
  return <ProjectRoute />
}

export default Projects
