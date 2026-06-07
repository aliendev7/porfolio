import { ProjectType, SocialLinkType } from "../app/components/types/types";



export async function fetchJSON<T>(url: string): Promise<T> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    // Handle URLs that start with "undefined" (env var missing) or "/" (relative)
    const fullUrl = url.startsWith('/') || url.startsWith('undefined')
        ? `${baseUrl}${url.replace(/^undefined/, '')}`
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
