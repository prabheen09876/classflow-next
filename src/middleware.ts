
import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()
  
  const { pathname } = request.nextUrl

  const publicPaths = ['/login', '/signup', '/'];
  const protectedPaths = ['/admin', '/hos', '/teacher', '/student', '/dashboard'];
  
  const isProtectedRoute = protectedPaths.some(p => pathname.startsWith(p));

  // If user is not logged in and trying to access a protected route, redirect to login
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If user is logged in, handle role-based redirects
  if (session) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    const role = profile?.role;
    
    const rolePaths: { [key: string]: string } = {
        'admin': '/admin',
        'hos': '/hos',
        'teacher': '/teacher',
        'student': '/student',
        // A generic dashboard for any other role
        'user': '/dashboard', 
    };
    
    // Determine the user's correct dashboard path, with a fallback
    const requiredPath = role && rolePaths[role] ? rolePaths[role] : '/dashboard';
    
    // If a logged-in user is on the login or signup page, redirect to their dashboard
    if (pathname === '/login' || pathname === '/signup') {
        return NextResponse.redirect(new URL(requiredPath, request.url));
    }
    
    // If a logged-in user is on the root page, redirect to their dashboard
    if (pathname === '/') {
        return NextResponse.redirect(new URL(requiredPath, request.url));
    }

    // If user is on a protected path that doesn't match their role, redirect them
    const isAtCorrectPath = pathname.startsWith(requiredPath);
    if (isProtectedRoute && !isAtCorrectPath) {
         return NextResponse.redirect(new URL(requiredPath, request.url))
    }
  }

  return response
}

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
}
