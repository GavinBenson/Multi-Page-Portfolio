import Hero from '@/components/Hero'
import About from '@/components/About'
import FeaturedProject from '@/components/FeaturedProject'
import ProjectsGrid from '@/components/ProjectsGrid'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <FeaturedProject />
      <ProjectsGrid />
      <Contact />
    </main>
  )
}
