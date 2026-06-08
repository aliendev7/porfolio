import { ProjectType, SocialLinkType } from "../app/components/types/types";



export async function fetchJSON<T>(url: string): Promise<T> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const fullUrl = baseUrl && !url.startsWith('http')
        ? `${baseUrl}${url}`
        : url.startsWith('undefined')
            ? url.replace(/^undefined/, '/')
            : url;

    const response = await fetch(fullUrl, {
        method: "GET",
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json();
}
