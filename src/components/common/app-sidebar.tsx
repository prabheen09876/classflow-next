
"use client";

import Link from 'next/link'
import {
  Home,
  CalendarDays,
  BookUser,
  Users,
  Settings,
  Bot,
  Shield,
  Calendar as CalendarIcon,
  LayoutDashboard
} from 'lucide-react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Logo } from '../icons'
import { useAuth } from '../auth-provider';

export default function AppSidebar() {
  const { user, role } = useAuth();

  const getDashboardUrl = () => {
    if (!user) return "/login";
    switch (role) {
      case 'admin': return '/admin';
      case 'hos': return '/hos';
      case 'teacher': return '/teacher';
      case 'student': return '/student';
      default: return '/login';
    }
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            prefetch={false}
          >
            <Logo className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">ClassFlow</span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                prefetch={false}
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Home</TooltipContent>
          </Tooltip>
          {user && (
             <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={getDashboardUrl()}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
          )}
          { role === 'admin' &&
            <Tooltip>
                <TooltipTrigger asChild>
                <Link
                    href="/admin/users"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    prefetch={false}
                >
                    <Users className="h-5 w-5" />
                    <span className="sr-only">Users</span>
                </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Manage Users</TooltipContent>
            </Tooltip>
          }
          { (role === 'teacher' || role === 'student' || role === 'admin' || role === 'hos') &&
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/calendar"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                prefetch={false}
              >
                <CalendarIcon className="h-5 w-5" />
                <span className="sr-only">Calendar</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Calendar</TooltipContent>
          </Tooltip>
          }
          { role === 'teacher' &&
            <Tooltip>
                <TooltipTrigger asChild>
                <Link
                    href="/teacher/homework"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    prefetch={false}
                >
                    <BookUser className="h-5 w-5" />
                    <span className="sr-only">Assignments</span>
                </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Assignments</TooltipContent>
            </Tooltip>
          }
           { role === 'teacher' &&
            <Tooltip>
                <TooltipTrigger asChild>
                <Link
                    href="/teacher/students"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    prefetch={false}
                >
                    <Users className="h-5 w-5" />
                    <span className="sr-only">Students</span>
                </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Students</TooltipContent>
            </Tooltip>
          }
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                prefetch={false}
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </TooltipProvider>
    </aside>
  )
}
