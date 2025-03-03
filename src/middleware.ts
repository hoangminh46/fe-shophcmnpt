import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of protected routes and authentication routes
const protectedRoutes = ['/profile', '/checkout']
const authRoutes = ['/auth', '/forgotpass']

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value || "";
  const { pathname } = request.nextUrl

  // Helper function handle dynamic route
  const matchPath = (path: string) => {
    if (!path.includes('(.*)')) {
      return pathname.startsWith(path)
    }
    const regexPath = path.replace('(.*)', '.*')
    return new RegExp(`^${regexPath}$`).test(pathname)
  }

  // Redirect to signin if the user is not logged in and tries to access a protected route
  if (!refreshToken && (protectedRoutes.some(route => matchPath(route)) || pathname === '/')) {
    const response = NextResponse.redirect(new URL('/auth', request.url))
    return response
  }

  // Redirect to home if the user is logged in and tries to access an authentication route
  if (refreshToken && authRoutes.some(route => matchPath(route))) {
    const response = NextResponse.redirect(new URL('/', request.url))
    return response
  }

  return NextResponse.next()
}

// Configure the matcher to apply middleware only to the specified routes
export const config = {
  matcher: ['/profile', '/checkout', '/auth', '/forgotpass'],
}
