import { useState } from 'react';
import { PROJECT_CATEGORIES } from '../content/project-categories';

const categoryColors = {
  Infrastructure: 'text-cyan-300',
  GenAI: 'text-rose-300',
  People: 'text-amber-300',
  Personal: 'text-orange-300',
  Systems: 'text-emerald-300',
};

export default function PortfolioApp({ projects, cvUrl }) {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', ...PROJECT_CATEGORIES];

  const filtered = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_52%)] bg-[#09090b] text-zinc-100 font-mono selection:bg-zinc-800 selection:text-white px-4 py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        
        <header className="mb-12 border-b border-zinc-800/80 pb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">Gualtiero Debernardi</h1>
              <p className="text-sm text-emerald-300 mt-1">Platform &amp; Cloud Engineer · Developer Experience · AI Lead</p>
              <p className="text-xs text-zinc-500 mt-1">SRE · Security Evangelist · Community Builder</p>
              <nav aria-label="Profile links" className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-xs">
                <a href="https://github.com/gdeber/" target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-emerald-300 transition-colors">GitHub ↗</a>
                <a href="https://www.linkedin.com/in/gualtiero-debernardi/" target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-emerald-300 transition-colors">LinkedIn ↗</a>
                <a href="mailto:gualtiero.debernardi@gmail.com" className="text-zinc-300 hover:text-emerald-300 transition-colors">Email</a>
                <a href={cvUrl} target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-emerald-300 transition-colors">CV (PDF) ↗</a>
              </nav>
            </div>
            <div className="flex items-center gap-2 sm:mt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs text-zinc-400">Available for projects</span>
            </div>
          </div>
          <p className="max-w-2xl text-sm text-zinc-300 leading-relaxed mt-6">
            I started coding at 14 on an Olivetti M19. Today, I lead platform engineering and AI initiatives at Sky, helping editorial and video teams work through reliable, self-service platforms. My experience spans DevOps, test automation, and AWS and GCP. I build smart systems that remove friction and give people more freedom to do meaningful work.
          </p>
        </header>

        {/* Pulsanti Filtri Categorie */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 text-xs rounded-md transition-all duration-200 border ${
                filter === cat 
                  ? 'bg-emerald-300 text-zinc-950 border-emerald-300 font-medium' 
                  : 'bg-zinc-900/50 text-zinc-400 border-zinc-800/80 hover:border-emerald-800 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Griglia Progetti */}
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((project, idx) => (
            <article 
              key={idx}
              onClick={() => setSelectedProject(project)}
              className="group p-5 rounded-xl border border-zinc-800/60 bg-zinc-900/30 hover:bg-zinc-900/80 hover:border-emerald-800/80 cursor-pointer transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-[2px] h-full bg-transparent group-hover:bg-emerald-400 transition-colors"></div>
              
              <div className="flex items-start justify-between">
                <div>
                  <span className={`text-[11px] font-semibold uppercase tracking-widest ${categoryColors[project.category] || 'text-zinc-400'}`}>{project.category}</span>
                  <h2 className="text-base font-medium text-zinc-200 group-hover:text-white mt-1 transition-colors">
                    {project.title}
                  </h2>
                </div>
                <span className="text-xs text-zinc-600 group-hover:text-zinc-400 transition-colors">↗</span>
              </div>

              <p className="text-sm text-zinc-400 mt-2.5 leading-relaxed line-clamp-2">
                {project.description}
              </p>

              {/* Tag nella card */}
              <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-zinc-800/40">
                {project.tags && project.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[10px] bg-zinc-800/50 text-zinc-300 px-2 py-0.5 rounded border border-zinc-700/30">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Modale Dettaglio con Corpo Markdown e Tag */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-[#121215] border border-zinc-800 p-6 md:p-8 rounded-2xl max-w-lg w-full relative shadow-2xl max-h-[85vh] overflow-y-auto">
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 p-1.5 rounded-lg border border-zinc-800 text-xs transition-colors"
              >
                [ESC]
              </button>
              
              <span className={`text-[11px] font-semibold uppercase tracking-widest ${categoryColors[selectedProject.category] || 'text-zinc-400'}`}>{selectedProject.category}</span>
              <h3 className="text-xl font-bold text-white mt-1">{selectedProject.title}</h3>
              
              {/* Corpo completo del Markdown */}
              <div className="mt-4 text-sm text-zinc-300 leading-relaxed whitespace-pre-line border-t border-zinc-800 pt-4">
                {selectedProject.body || selectedProject.description}
              </div>

              {selectedProject.website && (
                <a
                  href={selectedProject.website}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-300 hover:text-emerald-200 transition-colors"
                >
                  Visit website <span aria-hidden="true">↗</span>
                </a>
              )}

              {selectedProject.resources?.length > 0 && (
                <section className="mt-5">
                  <h4 className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">Resources</h4>
                  <ul className="mt-2 flex flex-col gap-2">
                    {selectedProject.resources.map((resource) => (
                      <li key={resource.href}>
                        <a
                          href={resource.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-emerald-300 hover:text-emerald-200 transition-colors"
                        >
                          {resource.title} ↗
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Tag nella modale */}
              <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-zinc-800">
                {selectedProject.tags && selectedProject.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[10px] bg-zinc-800/80 text-zinc-300 px-2.5 py-1 rounded border border-zinc-700/50">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 text-xs bg-zinc-100 hover:bg-white text-zinc-950 rounded-lg font-medium transition-colors"
                >
                  Close details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-20 pt-6 border-t border-zinc-800/80 text-center text-xs text-zinc-500">
          <p>© 2026 • Built with Astro & Tailwind</p>
        </footer>

      </div>
    </div>
  );
}