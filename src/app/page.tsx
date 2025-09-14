import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu, AlertTriangle, RefreshCw, Users, BookOpen, School } from "lucide-react";
import { Logo } from "@/components/icons";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/95 backdrop-blur-sm fixed top-0 w-full z-50">
        <Link href="#" className="flex items-center justify-center gap-2" prefetch={false}>
          <Logo className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold font-headline">ClassMaster AI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/dashboard" prefetch={false}>
            <Button>Login / Sign Up</Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full pt-24 md:pt-32 lg:pt-40 relative">
           <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,hsl(var(--primary)/0.1),transparent)]"></div></div>
          <div className="container px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16 items-center">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] font-headline">
                  Intelligent Scheduling, Simplified.
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
                  ClassMaster AI is a dynamic, AI-powered platform that generates clash-free, optimized timetables for your entire institution in real-time.
                </p>
                <div className="space-x-4 mt-6">
                  <Link href="/dashboard" prefetch={false}>
                    <Button size="lg">Get Started</Button>
                  </Link>
                   <Link href="#" prefetch={false}>
                    <Button size="lg" variant="outline">Learn More</Button>
                  </Link>
                </div>
              </div>
               <div className="flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="relative aspect-video rounded-xl border-4 border-primary/20 bg-card/50 p-2 shadow-2xl shadow-primary/20 backdrop-blur-sm">
                    <div className="h-full w-full rounded-lg bg-background p-2">
                       <p className="text-xs text-muted-foreground font-mono">[MON] 09:00 - 10:00 | CS101 | Room 402</p>
                       <div className="mt-2 h-8 w-3/4 rounded-sm bg-primary/20 animate-pulse"></div>
                       <p className="mt-2 text-xs text-muted-foreground font-mono">[MON] 10:00 - 11:00 | MA201 | Room 311</p>
                       <div className="mt-2 h-8 w-1/2 rounded-sm bg-accent/20 animate-pulse delay-100"></div>
                       <p className="mt-2 text-xs text-muted-foreground font-mono">[MON] 11:00 - 12:00 | PHY102 | Lab 3</p>
                       <div className="mt-2 h-8 w-5/6 rounded-sm bg-secondary animate-pulse delay-200"></div>
                    </div>
                     <div className="absolute -bottom-4 -right-4 h-16 w-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg">
                      <Cpu className="h-8 w-8"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Automate and Optimize Your Institution</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI-driven platform offers a suite of powerful features to streamline scheduling, enhance communication, and maximize resource utilization.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <Cpu className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-headline">Smart Timetable Generation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Generates optimized schedules considering faculty availability, room capacity, and student preferences using AI.</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-headline">Real-time Conflict Detection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Instantly detects clashes in schedules and suggests intelligent, viable alternatives to resolve them.</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <RefreshCw className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-headline">Dynamic Adjustments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Automatically adjusts the timetable for unforeseen events like faculty absences or room unavailability.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Trusted by Educational Institutions</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join a growing community of colleges and universities transforming their operations with ClassMaster AI.
              </p>
            </div>
            <div className="mx-auto w-full max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                <Card className="bg-card/60 backdrop-blur-sm border-2">
                    <CardHeader className="items-center">
                        <div className="rounded-full bg-accent/10 p-4 text-accent"><School className="h-8 w-8" /></div>
                        <CardTitle className="text-4xl font-bold">50+</CardTitle>
                        <p className="text-muted-foreground">Departments</p>
                    </CardHeader>
                </Card>
                <Card className="bg-card/60 backdrop-blur-sm border-2">
                    <CardHeader className="items-center">
                        <div className="rounded-full bg-accent/10 p-4 text-accent"><Users className="h-8 w-8" /></div>
                        <CardTitle className="text-4xl font-bold">200+</CardTitle>
                        <p className="text-muted-foreground">Faculty Members</p>
                    </CardHeader>
                </Card>
                <Card className="bg-card/60 backdrop-blur-sm border-2">
                    <CardHeader className="items-center">
                        <div className="rounded-full bg-accent/10 p-4 text-accent"><BookOpen className="h-8 w-8" /></div>
                        <CardTitle className="text-4xl font-bold">5000+</CardTitle>
                        <p className="text-muted-foreground">Students</p>
                    </CardHeader>
                </Card>
            </div>
            <div className="flex justify-center space-x-4 mt-8">
              <Link href="/dashboard" prefetch={false}>
                <Button size="lg">Start Your Free Trial</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 ClassMaster AI. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
