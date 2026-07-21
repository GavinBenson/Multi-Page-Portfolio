import Image from 'next/image'

interface ProjectCardProps {
  title: string
  description: string
  image: string
  techStack: string[]
  url?: string
}

export default function ProjectCard({
  title,
  description,
  image,
  techStack,
  url,
}: ProjectCardProps) {
  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 group border"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'color-mix(in srgb, var(--text-secondary) 10%, transparent)',
      }}
    >
      <div className="aspect-video overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={600}
          height={340}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3
          className="text-lg font-semibold tracking-tight mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: 'var(--text-secondary)' }}
        >
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-xs font-medium"
              style={{
                backgroundColor: 'var(--bg)',
                color: 'var(--text-secondary)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 rounded-md text-xs font-semibold no-underline transition-all duration-200 hover:-translate-y-0.5"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--bg)',
            }}
          >
            Website
          </a>
        )}
      </div>
    </div>
  )
}
