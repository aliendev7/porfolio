import { fetchJSON } from "../../lib/request-util";
import { AboutType, BlogType, EducationType, ExperienceType, HomeDataType, ProjectType, ResourceCategoryType, ResourceType, SkillCategoryType, SocialLinkType } from "../components/types/types";



export const getAboutParagraphsV2 = async (): Promise<AboutType[] | []> => {
    try {
        const data = await fetchJSON<AboutType[]>(`/api/about-me`);
        return data ?? [];
    } catch (error) {
        console.warn('Error fetching about paragraphs, returning empty array:', error);
        return [];
    }
}


export const getHomeDataV2 = async (url?: string): Promise<HomeDataType | null> => {
    try {
        const apiUrl = url || `/api/user-details`;
        const data = await fetchJSON<HomeDataType>(apiUrl);
        return data;
    } catch (error) {
        console.error('Error fetching home data:', error);
        return null;
    }
}


export const getExperiencesV2 = async (): Promise<ExperienceType[] | []> => {
    try {
        const data = await fetchJSON<ExperienceType[]>(`/api/experiences`);
        return data ?? [];
    } catch (error) {
        console.warn('Error fetching experiences, returning empty array:', error);
        return [];
    }
}


export const getBlogsV2 = async (): Promise<BlogType[] | []> => {
    try {
        const data = await fetchJSON<BlogType[]>(`/api/blogs`);
        return data ?? [];
    } catch (error) {
        // Log a warning if fetching blogs fails
        console.warn('Error fetching blogs, returning empty array:', error);
        return [];
    }
}


export const getProjectsV2 = async (): Promise<ProjectType[] | []> => {
    try {
        const data = await fetchJSON<ProjectType[]>(`/api/projects`);
        return data ?? [];
    } catch (error) {
        console.warn('Error fetching projects, returning empty array:', error);
        return [];
    }
}

export const getSocialLinksV2 = async (): Promise<SocialLinkType[] | []> => {
    try {
        const data = await fetchJSON<SocialLinkType[]>(`/api/user-social-links`);
        return data ?? [];
    } catch (error) {
        console.warn('Error fetching social links, returning empty array:', error);
        return [];
    }
}

export const getResourcesV2 = async (categoryId?: string, tags?: string[], type?: string): Promise<ResourceType[] | []> => {
    try {
        const params = new URLSearchParams();
        if (categoryId) params.append('categoryId', categoryId);
        if (tags && tags.length > 0) params.append('tags', tags.join(','));
        if (type) params.append('type', type);

        const queryString = params.toString();
        const url = `/api/resources${queryString ? `?${queryString}` : ''}`;

        const data = await fetchJSON<ResourceType[]>(url);
        return data ?? [];
    } catch (error) {
        console.warn('Error fetching resources, returning empty array:', error);
        return [];
    }
}

export const getResourceCategoriesV2 = async (): Promise<ResourceCategoryType[] | []> => {
    try {
        const data = await fetchJSON<ResourceCategoryType[]>(`/api/resource-categories`);
        return data ?? [];
    } catch (error) {
        console.warn('Error fetching resource categories, returning empty array:', error);
        return [];
    }
}

export const getSkillCategoriesV2 = async (): Promise<SkillCategoryType[] | []> => {
    try {
        const data = await fetchJSON<SkillCategoryType[]>(`/api/skill-categories`);
        return data ?? [];
    } catch (error) {
        console.warn('Error fetching skill categories, returning empty array:', error);
        return [];
    }
}

export const getEducationsV2 = async (): Promise<EducationType[] | []> => {
    try {
        const data = await fetchJSON<EducationType[]>(`/api/educations`);
        return data ?? [];
    } catch (error) {
        console.warn('Error fetching educations, returning empty array:', error);
        return [];
    }
}