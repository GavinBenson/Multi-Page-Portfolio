import Hero from '@/components/Hero'
import About from '@/components/About'
import FeaturedProject from '@/components/FeaturedProject'
import ProjectsGrid from '@/components/ProjectsGrid'
import CodexPreview from '@/components/CodexPreview'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <FeaturedProject />
      <ProjectsGrid />
      <CodexPreview />
      <Contact />
    </main>
  )
}
