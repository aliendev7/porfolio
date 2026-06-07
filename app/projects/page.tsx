import React from 'react'
import ProjectCard from '../components/ProjectCard'
import { getProjectsV2 } from '../requests/requests'
import { ProjectsHeader } from '../components/ProjectsHeader'

const Projects = async () => {

    const projects = await getProjectsV2()

    // Compute dynamic stats
    const totalProjects = projects?.length || 0;
    const allTechs = new Set<string>();
    const allCategories = new Set<string>();
    projects?.forEach(p => {
        (p.technologies || []).forEach(t => allTechs.add(t));
        (p.tools || []).forEach(t => { if (t?.name) allTechs.add(t.name); });
        if (p.category) allCategories.add(p.category);
    });

    const stats = [
        { value: `${totalProjects}`, label: 'Proyectos', color: 'from-brand-green to-emerald-500' },
        { value: `${allTechs.size}+`, label: 'Tecnologías', color: 'from-blue-500 to-cyan-500' },
        { value: `${allCategories.size}`, label: 'Categorías', color: 'from-violet-500 to-purple-500' },
        { value: '4+', label: 'Años Exp', color: 'from-amber-500 to-orange-500' },
    ];

    return (
        <div className="space-y-14 sm:space-y-16">
            {/* Hero */}
            <ProjectsHeader />

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 backdrop-blur-sm p-5 sm:p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-brand-green/10 hover:border-brand-green/30 dark:border-white/10 dark:bg-white/5"
                    >
                        <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} mb-3 shadow-md`}>
                            <span className="text-lg font-bold text-white">{stat.value.charAt(0)}</span>
                        </div>
                        <p className="font-poiret text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                        <p className="mt-1.5 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>

            {/* Projects Grid */}
            <div className="space-y-8">
                <div className="flex items-end justify-between">
                    <div>
                        <div className="mb-3 flex items-center gap-4">
                            <span className="font-mono text-xs font-medium text-brand-medium dark:text-brand-green">02</span>
                            <span className="h-px w-12 bg-brand-green/50" />
                        </div>
                        <h2 className="font-poiret text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                            Todos los Proyectos
                        </h2>
                    </div>
                    <p className="font-mono text-xs text-gray-500 dark:text-gray-400">
                        {totalProjects} projects
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
                    {projects?.map((item, i) => (
                        <ProjectCard key={item.id || i} project={item} index={i} isNew={i === 0} />
                    ))}
                </div>

                {totalProjects === 0 && (
                    <div className="text-center py-16 rounded-2xl border border-dashed border-gray-200 dark:border-white/10">
                        <p className="text-gray-400 dark:text-gray-500">No projects yet. Add them from the admin panel.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Projects
