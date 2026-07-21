import Hero from '@/components/Hero'
import About from '@/components/About'
import FeaturedProject from '@/components/FeaturedProject'
import ProjectsGrid from '@/components/ProjectsGrid'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <FeaturedProject />
      <ProjectsGrid />
    </main>
  )
}
