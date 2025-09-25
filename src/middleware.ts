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

  const protectedPaths = ['/admin', '/hos', '/teacher', '/student', '/dashboard'];

  if (!session && protectedPaths.some(p => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

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
    };
    
    const requiredPath = role && rolePaths[role];
    const isAtRequiredPath = requiredPath ? pathname.startsWith(requiredPath) : false;
    const isAtRoot = pathname === '/';

    if (isAtRoot && requiredPath) {
        return NextResponse.redirect(new URL(requiredPath, request.url));
    }

    if (requiredPath && !isAtRequiredPath && protectedPaths.some(p => pathname.startsWith(p))) {
         // If user is logged in and trying to access a protected path that is not for their role, redirect to their dashboard
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
