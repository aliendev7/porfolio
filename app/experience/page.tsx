import ExperienceTimeline from '../components/ExperienceTimeline'
import { ExperiencePathProps } from '../components/experiencePath'
import { getExperiencesV2 } from '../requests/requests'
import { ExperienceTitle } from '../components/ExperienceTitle'

const Experience = async () => {

    const experiences = await getExperienceData();

    return (
        <div className="flex flex-col">
            <ExperienceTitle />

            <div className="w-full">
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