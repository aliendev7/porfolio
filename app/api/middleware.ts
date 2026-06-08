import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    if (req.method === 'GET') {
        return NextResponse.next();
    }

    const apiKey = req.headers.get('x-api-key');

    if (apiKey === process.env.ADMIN_API_KEY) {
        return NextResponse.next();
    } else {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
}

export const config = {
    matcher: [
        '/api/resources/:path*',
        '/api/resource-categories/:path*',
        '/api/projects/:path*',
        '/api/experiences/:path*',
        '/api/educations/:path*',
        '/api/skills/:path*',
        '/api/skill-categories/:path*',
        '/api/user-details/:path*',
    ],
};