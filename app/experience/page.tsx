import ExperienceTimeline from '../components/ExperienceTimeline'
import EducationTimeline from '../components/EducationTimeline'
import { ExperiencePathProps } from '../components/experiencePath'
import { getExperiencesV2, getEducationsV2 } from '../requests/requests'
import { ExperienceTitle } from '../components/ExperienceTitle'
import { SectionHeading } from '../components/SectionHeading'

const Experience = async () => {
    const [experiences, educations] = await Promise.all([
        getExperienceData(),
        getEducationsV2()
    ]);

    return (
        <div className="flex flex-col">
            <ExperienceTitle />

            <div className="w-full">
                {educations && educations.length > 0 && (
                    <div className="mb-16">
                        <SectionHeading
                            title="Educación"
                            subtitle="Formación académica y certificaciones"
                        />
                        <EducationTimeline educations={educations} />
                    </div>
                )}

                <SectionHeading
                    title="Experiencia"
                    subtitle="Trayectoria profesional"
                />
                <ExperienceTimeline experiences={experiences} />
            </div>
        </div>
    )
}

export default Experience

const getExperienceData = async () => {
    const results = await getExperiencesV2();
    const experiences: ExperiencePathProps[] = []
    for (let i of results) {
        const activities: string[] = []
        if (i.inputs?.length > 0) {
            for (let j of i.inputs) {
                activities.push(j.content)
            }
        }
        experiences.push({
            title: i.company || i.name || '',
            position: i.title,
            cover: i.image,
            company: i.company,
            description: i.description,
            location: i.location,
            technologies: i.technologies,
            activities,
            startDate: i.start,
            endDate: i.end
        })
    }

    return experiences;
}