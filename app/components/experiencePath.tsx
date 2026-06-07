"use client"

export interface ExperiencePathProps {
    title: string
    position: string
    cover: string
    company?: string
    description?: string
    location?: string
    technologies?: string[]
    activities: string[]
    startDate: string
    endDate: string
    isLast?: boolean
}

const ExperiencePath = ({ title, position, cover, activities, startDate, endDate, isLast }: ExperiencePathProps) => {
    return (
        <div className="flex gap-4 sm:gap-8 w-full max-w-4xl mx-auto group">
            
            {/* Timeline Column */}
            <div className="flex flex-col items-center min-w-[50px] sm:min-w-[80px]">
                {/* Date Bubble */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-brand-green/10 border-2 border-brand-green p-1 flex items-center justify-center shrink-0 z-10 group-hover:scale-110 transition-transform duration-300 bg-white">
                    <div className="text-[10px] sm:text-xs text-center font-bold text-brand-green leading-tight">
                        <div>{startDate}</div>
                        <div className="w-full h-px bg-brand-green/30 my-0.5"></div>
                        <div>{endDate}</div>
                    </div>
                </div>
                
                {/* Connector Line */}
                {!isLast && (
                    <div className="w-0.5 grow bg-gradient-to-b from-brand-green to-brand-green/20 my-2"></div>
                )}
            </div>

            {/* Content Card */}
            <div className="pb-12 w-full">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-brand-green/10 hover:shadow-md transition-all duration-300 hover:border-brand-green/30 relative">
                    
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 shrink-0 bg-white p-1">
                            <div 
                                className="w-full h-full bg-contain bg-center bg-no-repeat rounded-full"
                                style={{ backgroundImage: `url('${cover}')` }}
                            />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 font-poiret">{title}</h3>
                            <p className="text-brand-green font-medium text-sm uppercase tracking-wide">{position}</p>
                        </div>
                    </div>

                    {/* Activities List */}
                    <ul className="space-y-3">
                        {activities.map((item, i) => (
                            <li key={i} className="text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-green/40 mt-1.5 shrink-0"></span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ExperiencePath