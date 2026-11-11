import { useEffect, useState } from 'react';
import { PROJECT_CATEGORIES } from '../content/project-categories';

const categoryColors = {
  Infrastructure: 'text-cyan-300',
  GenAI: 'text-rose-300',
  People: 'text-amber-300',
  Personal: 'text-orange-300',
  Systems: 'text-emerald-300',
};

function renderInlineMarkdown(text) {
  const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const parts = [];
  let cursor = 0;

  for (const match of text.matchAll(linkPattern)) {
    const [markdown, label, href] = match;
    const start = match.index ?? 0;

    if (start > cursor) parts.push(text.slice(cursor, start));

    parts.push(
      <a
        key={`link-${start}`}
        href={href}
        target="_blank"
        rel="noreferrer"
        className="font-medium text-emerald-300 underline decoration-emerald-500/40 underline-offset-4 transition hover:text-emerald-200 hover:decoration-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
      >
        {label}<span aria-hidden="true"> ↗</span>
      </a>,
    );

    cursor = start + markdown.length;
  }

  if (cursor === 0) return text;
  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}

function ProjectBody({ body }) {
  return body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph, index) => (
      <p key={index}>{renderInlineMarkdown(paragraph.replace(/\s*\n\s*/g, ' '))}</p>
    ));
}

function ProjectCard({ project, onOpen, featured = false }) {
  const categoryColor = categoryColors[project.category] || 'text-zinc-400';

  if (featured) {
    return (
      <article className="group relative grid w-full overflow-hidden rounded-[1.75rem] border border-zinc-800 bg-zinc-900/65 text-left transition duration-300 hover:-translate-y-1 hover:border-emerald-800/80 hover:bg-zinc-900 motion-reduce:transition-none lg:grid-cols-[1.2fr_0.8fr]">
        <div className="relative z-10 flex flex-col items-start p-6 sm:p-8 lg:p-10">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-300">Featured project</span>
            <span className="h-px w-8 bg-emerald-300/40" aria-hidden="true" />
            <span className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${categoryColor}`}>{project.category}</span>
          </div>

          <h3 className="mt-5 max-w-xl text-2xl font-semibold tracking-tight text-white transition-colors group-hover:text-emerald-50 sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags?.map((tag) => (
              <span key={tag} className="rounded-full border border-zinc-700/70 bg-zinc-950/40 px-3 py-1 text-[11px] text-zinc-300">
                {tag}
              </span>
            ))}
          </div>

          <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-emerald-300">
            Explore project
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>

        <div className="relative hidden min-h-72 overflow-hidden border-l border-zinc-800/70 bg-[radial-gradient(ellipse_at_55%_45%,rgba(16,185,129,0.12),transparent_65%)] lg:flex lg:items-center lg:justify-center" aria-hidden="true">
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(161,161,170,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(161,161,170,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="relative w-full max-w-xs px-4">
            <div className="ml-auto w-36 rounded-xl border border-emerald-300/30 bg-zinc-950/80 px-4 py-3 shadow-[0_0_40px_rgba(16,185,129,0.08)]">
              <span className="block text-[9px] uppercase tracking-[0.18em] text-zinc-500">Shared platform</span>
              <span className="mt-1 block text-xs font-medium text-emerald-200">Self-service tools</span>
            </div>
            <div className="ml-auto mr-16 h-8 w-px bg-gradient-to-b from-emerald-300/50 to-zinc-700" />
            <div className="flex justify-between gap-5">
              <div className="w-32 rounded-xl border border-zinc-700 bg-zinc-950/90 px-3 py-3">
                <span className="block text-[9px] uppercase tracking-[0.18em] text-zinc-500">Editorial</span>
                <span className="mt-1 block text-xs text-zinc-200">Team workflows</span>
              </div>
              <div className="w-32 rounded-xl border border-zinc-700 bg-zinc-950/90 px-3 py-3">
                <span className="block text-[9px] uppercase tracking-[0.18em] text-zinc-500">Video</span>
                <span className="mt-1 block text-xs text-zinc-200">Team workflows</span>
              </div>
            </div>
            <div className="absolute left-1/2 top-[5.25rem] h-8 w-24 -translate-x-1/2 border-x border-t border-zinc-700" />
            <div className="mt-5 flex justify-center">
              <span className="rounded-full border border-zinc-700/80 bg-zinc-950/80 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-400">Platform as a product</span>
            </div>
          </div>
          <span className="absolute bottom-6 right-8 font-mono text-xs tracking-[0.2em] text-zinc-600">01 / WORK</span>
        </div>
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open project details: ${project.title}`}
          className="absolute inset-0 z-20 cursor-pointer rounded-[1.75rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
        />
      </article>
    );
  }

  return (
    <article className="group relative flex h-full w-full flex-col rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-emerald-800/80 hover:bg-zinc-900/75 motion-reduce:transition-none sm:p-6">
      <div className="flex w-full items-start justify-between gap-4">
        <div>
          <span className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${categoryColor}`}>{project.category}</span>
          <h3 className="mt-2 text-lg font-medium tracking-tight text-zinc-100 transition-colors group-hover:text-white">
            {project.title}
          </h3>
        </div>
        <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-700/80 text-sm text-zinc-500 transition group-hover:border-emerald-300/50 group-hover:text-emerald-300" aria-hidden="true">
          ↗
        </span>
      </div>

      <p className="mt-3 w-full text-sm leading-6 text-zinc-400">
        {project.description}
      </p>

      <div className="mt-auto flex w-full flex-wrap gap-1.5 border-t border-zinc-800/70 pt-4 mt-5">
        {project.tags?.map((tag) => (
          <span key={tag} className="rounded-full bg-zinc-800/70 px-2.5 py-1 text-[10px] text-zinc-300">
            {tag}
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open project details: ${project.title}`}
        className="absolute inset-0 z-10 cursor-pointer rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
      />
    </article>
  );
}

export default function PortfolioApp({ projects, cvUrl, avatarUrl }) {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', ...PROJECT_CATEGORIES];
  const filtered = filter === 'All'
    ? projects
    : projects.filter((project) => project.category === filter);
  const featuredProject = filter === 'All' ? filtered[0] : null;
  const remainingProjects = featuredProject ? filtered.slice(1) : filtered;

  useEffect(() => {
    if (!selectedProject) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  return (
    <div className="min-h-screen overflow-hidden bg-[#09090b] bg-[radial-gradient(ellipse_at_18%_0%,rgba(16,185,129,0.11),transparent_32rem)] font-sans text-zinc-100 selection:bg-emerald-300 selection:text-zinc-950">
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-16">
        <header className="relative mb-14 border-b border-zinc-800/80 pb-12 sm:mb-16 sm:pb-16">
          <div className="mb-10 flex items-center justify-between">
            <a href="#top" className="font-mono text-sm font-semibold tracking-tight text-zinc-300 transition hover:text-emerald-300" aria-label="Gualtiero Debernardi, home">
              GD<span className="text-emerald-300">.</span>
            </a>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">Portfolio · 2026</span>
          </div>

          <div id="top" className="grid items-center gap-9 md:grid-cols-[1fr_260px] md:gap-12 lg:grid-cols-[1fr_288px] lg:gap-16">
            <div>
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-emerald-300 sm:text-xs">
                Platform engineering <span className="text-zinc-600">/</span> Cloud <span className="text-zinc-600">/</span> AI
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
                Gualtiero<br className="hidden sm:block" /> Debernardi<span className="text-emerald-300">.</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg">
                Platform &amp; Cloud Engineer · Developer Experience · AI Lead
              </p>
              <p className="mt-1 font-mono text-xs tracking-wide text-zinc-500">
                SRE · Security Evangelist · Community Builder
              </p>

              <p className="mt-7 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                I started coding at 14 on an Olivetti M19. Today, I lead platform engineering and AI initiatives at Sky, helping editorial and video teams work through reliable, self-service platforms. My experience spans DevOps, test automation, and AWS and GCP. I build smart systems that remove friction and give people more freedom to do meaningful work.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-2.5">
                <a href="https://github.com/gdeber/" target="_blank" rel="noreferrer" className="rounded-full border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-xs font-medium text-zinc-200 transition hover:border-emerald-700 hover:text-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300">GitHub <span aria-hidden="true">↗</span></a>
                <a href="https://www.linkedin.com/in/gualtiero-debernardi/" target="_blank" rel="noreferrer" className="rounded-full border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-xs font-medium text-zinc-200 transition hover:border-emerald-700 hover:text-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300">LinkedIn <span aria-hidden="true">↗</span></a>
                <a href="mailto:gualtiero.debernardi@gmail.com" className="rounded-full border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-xs font-medium text-zinc-200 transition hover:border-emerald-700 hover:text-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300">Email</a>
                <a href={cvUrl} target="_blank" rel="noreferrer" className="rounded-full bg-emerald-300 px-4 py-2 text-xs font-semibold text-zinc-950 transition hover:bg-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300">Download CV <span aria-hidden="true">↗</span></a>
              </div>

              <div className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-emerald-900/70 bg-emerald-950/30 px-3 py-1.5">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[11px] font-medium text-emerald-200">Available for projects</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[260px] md:mx-0 md:justify-self-end lg:max-w-[288px]">
              <div className="absolute -inset-3 rounded-[2rem] border border-emerald-300/10" aria-hidden="true" />
              <div className="absolute -inset-6 rounded-[2.4rem] border border-zinc-800/40" aria-hidden="true" />
              <img
                src={avatarUrl}
                alt="Portrait of Gualtiero Debernardi"
                width="320"
                height="320"
                fetchPriority="high"
                className="relative aspect-square w-full rounded-[1.6rem] border border-zinc-700/80 object-cover shadow-2xl shadow-black/40"
              />
              <span className="absolute -bottom-5 -left-5 rounded-xl border border-zinc-700/80 bg-zinc-950 px-3 py-2 font-mono text-[10px] tracking-wide text-zinc-300 shadow-xl sm:-left-8">
                Building with people<span className="text-emerald-300">_</span>
              </span>
            </div>
          </div>
        </header>

        <main>
          <section aria-labelledby="work-heading">
            <div className="mb-7 flex flex-col gap-5 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300">Selected work</p>
                <h2 id="work-heading" className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Projects &amp; experience</h2>
                <p className="mt-2 text-sm text-zinc-500">A few ways I help teams build and work better.</p>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600">{filtered.length} projects</span>
            </div>

            <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  aria-pressed={filter === category}
                  className={`rounded-full border px-3.5 py-2 text-xs transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 ${
                    filter === category
                      ? 'border-emerald-300 bg-emerald-300 font-medium text-zinc-950'
                      : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {featuredProject && (
              <div className="mb-4">
                <ProjectCard project={featuredProject} onOpen={() => setSelectedProject(featuredProject)} featured />
              </div>
            )}

            {remainingProjects.length > 0 && (
              <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
                {remainingProjects.map((project) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    onOpen={() => setSelectedProject(project)}
                  />
                ))}
              </div>
            )}
          </section>
        </main>

        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm" onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedProject(null);
          }}>
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-zinc-700/80 bg-[#121215] p-6 shadow-2xl sm:p-8"
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-lg text-zinc-400 transition hover:border-zinc-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
              >
                <span aria-hidden="true">×</span>
              </button>

              <span className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${categoryColors[selectedProject.category] || 'text-zinc-400'}`}>{selectedProject.category}</span>
              <h2 id="project-dialog-title" className="mt-2 pr-12 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{selectedProject.title}</h2>

              <div className="mt-5 space-y-4 border-t border-zinc-800 pt-5 text-sm leading-7 text-zinc-300">
                <ProjectBody body={selectedProject.body || selectedProject.description} />
              </div>

              {selectedProject.website && (
                <a href={selectedProject.website} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-emerald-300 transition hover:text-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300">
                  Visit website <span aria-hidden="true">↗</span>
                </a>
              )}

              {selectedProject.resources?.length > 0 && (
                <section className="mt-6">
                  <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Resources</h3>
                  <ul className="mt-3 flex flex-col gap-2">
                    {selectedProject.resources.map((resource) => (
                      <li key={resource.href}>
                        <a href={resource.href} target="_blank" rel="noreferrer" className="text-sm text-emerald-300 transition hover:text-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300">
                          {resource.title} ↗
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <div className="mt-7 flex flex-wrap gap-2 border-t border-zinc-800 pt-5">
                {selectedProject.tags?.map((tag) => (
                  <span key={tag} className="rounded-full border border-zinc-700/70 bg-zinc-900 px-3 py-1 text-[11px] text-zinc-300">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        <footer className="mt-16 border-t border-zinc-800/80 pt-6 text-center font-mono text-[10px] tracking-wide text-zinc-600 sm:mt-20">
          <p>© 2026 · Built with Astro &amp; Tailwind</p>
        </footer>
      </div>
    </div>
  );
}
