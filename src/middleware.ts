import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of allowed origins for development
const ALLOWED_DEV_ORIGINS = [
    'http://192.168.1.32:9002',
    'http://192.168.1.32',
    'https://192.168.1.32:9002',
    'https://192.168.1.32',
    'http://zync.thesudoer.in',
    'https://zync.thesudoer.in',
];

export function middleware(request: NextRequest) {
    const origin = request.headers.get('origin');
    const response = NextResponse.next();

    // Only apply CORS in development mode
    if (process.env.NODE_ENV === 'development') {
        // Check if the origin is in the allowed list
        if (origin && ALLOWED_DEV_ORIGINS.includes(origin)) {
            response.headers.set('Access-Control-Allow-Origin', origin);
            response.headers.set('Access-Control-Allow-Credentials', 'true');
            response.headers.set(
                'Access-Control-Allow-Methods',
                'GET, POST, PUT, DELETE, OPTIONS'
            );
            response.headers.set(
                'Access-Control-Allow-Headers',
                'Content-Type, Authorization'
            );
        }
    }

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
        return new NextResponse(null, {
            status: 200,
            headers: response.headers,
        });
    }

    return response;
}

// Configure which routes this middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
