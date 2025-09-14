"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Bolt, Calendar, CheckCircle, Bell, UserCheck, Users, Fingerprint, GitBranch, Mail, CalendarCheck } from "lucide-react";
import {PlaceHolderImages} from "@/lib/placeholder-images";

export default function Home() {
    const heroImage = PlaceHolderImages.find(p => p.id === 'hero-classroom');
    const dashboardPreview = PlaceHolderImages.find(p => p.id === 'dashboard-preview');
    const teacher1 = PlaceHolderImages.find(p => p.id === 'teacher-1');
    const teacher2 = PlaceHolderImages.find(p => p.id === 'teacher-2');
    const student1 = PlaceHolderImages.find(p => p.id === 'student-1');
    const attendanceFeatureImage = PlaceHolderImages.find(p => p.id === 'attendance-feature');
    const hierarchyIllustration = PlaceHolderImages.find(p => p.id === 'hierarchy-illustration');


  return (
    <div className="flex flex-col min-h-screen bg-background font-body text-black">
      <div className="p-4">
        <header className="container mx-auto bg-black text-white rounded-2xl p-4 flex items-center justify-between">
          <Link href="#" className="flex items-center justify-center gap-2" prefetch={false}>
            <span className="text-2xl font-bold">SmartSched</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>
              About
            </Link>
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>
              Features
            </Link>
             <Link href="#" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>
              Pricing
            </Link>
             <Link href="#" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>
              Contact
            </Link>
          </nav>
          <Link href="/login" prefetch={false}>
            <Button className="bg-white text-black rounded-full px-6 py-3 font-semibold hover:bg-gray-200 transition-all">Get Started</Button>
          </Link>
        </header>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="w-full bg-muted rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold tracking-tighter">
                The Future of Smart Class Scheduling
              </h1>
              <p className="max-w-lg text-muted-foreground text-lg">
                Automate, optimize, and simplify class timetables for colleges and institutions with real-time adjustments and AI-powered scheduling.
              </p>
              <div className="flex items-center gap-4">
                <Link href="/signup" prefetch={false}>
                  <Button className="bg-primary text-white rounded-full px-8 py-6 font-semibold hover:scale-105 transition-transform">Get Started</Button>
                </Link>
                <Link href="#" prefetch={false}>
                  <Button variant="outline" className="text-black border-black rounded-full px-8 py-6 font-medium hover:bg-gray-100 transition-all">Learn More</Button>
                </Link>
              </div>
              <div className="flex items-center pt-4">
                <div className="flex -space-x-4">
                    {teacher1 && <Image src={teacher1.imageUrl} alt="Teacher profile" width={48} height={48} className="rounded-full border-2 border-white" data-ai-hint={teacher1.imageHint} />}
                    {teacher2 && <Image src={teacher2.imageUrl} alt="Faculty member" width={48} height={48} className="rounded-full border-2 border-white" data-ai-hint={teacher2.imageHint} />}
                    {student1 && <Image src={student1.imageUrl} alt="Student profile" width={48} height={48} className="rounded-full border-2 border-white" data-ai-hint={student1.imageHint} />}
                </div>
                <p className="ml-4 text-sm text-muted-foreground">Join thousands of educators and students.</p>
              </div>
            </div>
            <div className="flex justify-center">
                {heroImage && <Image
                    src={heroImage.imageUrl}
                    width={600}
                    height={400}
                    alt="Dynamic scheduling illustration"
                    className="rounded-2xl shadow-2xl"
                    data-ai-hint={heroImage.imageHint}
                />}
            </div>
          </div>
        </section>

        <section id="features" className="w-full mt-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
                <Card className="bg-[#E5D9FF] rounded-2xl p-6 shadow-lg h-full flex flex-col justify-between">
                    <div>
                        <h3 className="text-3xl font-bold">Streamline Timetables, Save Hours</h3>
                        <p className="text-lg mt-2 max-w-md">Create clash-free timetables in minutes with AI-powered optimization. No more manual adjustments or scheduling conflicts.</p>
                    </div>
                    <div className="mt-6 relative">
                        {dashboardPreview && <Image 
                            src={dashboardPreview.imageUrl}
                            width={800}
                            height={500}
                            alt="Dashboard Preview"
                            className="rounded-xl shadow-2xl"
                            data-ai-hint={dashboardPreview.imageHint}
                        />}
                        <div className="absolute bottom-4 right-4 flex gap-2">
                             <Button variant="outline" size="icon" className="rounded-full bg-white/50 backdrop-blur-sm"><ArrowLeft/></Button>
                             <Button variant="outline" size="icon" className="rounded-full bg-white/50 backdrop-blur-sm"><ArrowRight/></Button>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="md:col-span-1">
                 <Card className="bg-[#FFD1E9] rounded-2xl p-8 shadow-lg h-full">
                    <h3 className="text-3xl font-bold">5k+ Classes Scheduled</h3>
                    <p className="text-lg mt-2 mb-8">Trusted by top institutions to manage thousands of classes, faculty schedules, and extracurricular events seamlessly.</p>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <CheckCircle className="h-6 w-6 text-green-500" />
                            <span className="font-semibold">99.9% Uptime</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Bolt className="h-6 w-6 text-yellow-500" />
                            <span className="font-semibold">Real-Time Adjustments</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Calendar className="h-6 w-6 text-blue-500" />
                            <span className="font-semibold">Conflict-Free Scheduling</span>
                        </div>
                         <div className="flex items-center gap-4">
                            <Bell className="h-6 w-6 text-red-500" />
                            <span className="font-semibold">Instant Notifications</span>
                        </div>
                    </div>
                </Card>
            </div>
          </div>
        </section>

        <section id="attendance" className="w-full mt-16">
          <div className="grid md:grid-cols-2 gap-8 items-center bg-muted p-8 rounded-2xl">
            <div className="flex justify-center">
              {attendanceFeatureImage && <Image
                src={attendanceFeatureImage.imageUrl}
                width={600}
                height={400}
                alt="Attendance tracking illustration"
                className="rounded-2xl shadow-2xl"
                data-ai-hint={attendanceFeatureImage.imageHint}
              />}
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Fingerprint className="h-8 w-8 text-primary" />
                <h2 className="text-4xl font-bold tracking-tighter">Effortless Attendance Tracking</h2>
              </div>
              <p className="text-muted-foreground text-lg">
                Marking attendance has never been easier. Teachers and students can mark their presence with a single click, providing real-time data to administrators and HOS.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Instant Updates for All</h4>
                    <p className="text-muted-foreground">Attendance data is instantly synced, allowing HOS to see who is present and make immediate adjustments if needed.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">AI-Powered Substitutions</h4>
                    <p className="text-muted-foreground">If a teacher is absent, our AI automatically finds an available substitute and reassigns the class, minimizing disruption.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="hierarchy" className="w-full mt-16 py-12 text-center">
          <h2 className="text-4xl font-bold tracking-tighter mb-4">Live Attendance Workflow</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-12">
            Our system provides a real-time, transparent flow of information. See how attendance and leave marking works seamlessly across the hierarchy.
          </p>
          <div className="relative flex justify-center items-center h-[500px] w-full">
            <svg className="w-full h-full" viewBox="0 0 800 500">
              {/* Nodes */}
              <g className="node" id="hos-node" style={{ animation: "fade-in 0.5s 0.2s forwards" }}>
                <rect x="350" y="20" width="100" height="60" rx="10" fill="hsl(var(--primary))" />
                <text x="400" y="50" textAnchor="middle" fill="white" className="font-bold text-sm">HOS</text>
                <UserCheck x="375" y="30" width="50" height="20" className="text-white" />
              </g>
              <g className="node" id="teacher-node" style={{ animation: "fade-in 0.5s 0.5s forwards" }}>
                <rect x="150" y="220" width="100" height="60" rx="10" fill="hsl(var(--accent))" />
                <text x="200" y="250" textAnchor="middle" fill="hsl(var(--accent-foreground))" className="font-bold text-sm">Teacher</text>
                 <Users x="175" y="230" width="50" height="20" className="text-primary" />
              </g>
              <g className="node" id="student-node" style={{ animation: "fade-in 0.5s 0.8s forwards" }}>
                <rect x="550" y="220" width="100" height="60" rx="10" fill="hsl(var(--muted))" />
                <text x="600" y="250" textAnchor="middle" fill="hsl(var(--muted-foreground))" className="font-bold text-sm">Student</text>
                 <GitBranch x="575" y="230" width="50" height="20" />
              </g>

              {/* Paths */}
              <path id="teacher-to-hos" className="path" d="M 200 220 Q 250 120, 375 80" stroke="hsl(var(--border))" strokeWidth="2" fill="none" />
              <path id="student-to-teacher" className="path" d="M 550 240 Q 400 320, 250 260" stroke="hsl(var(--border))" strokeWidth="2" fill="none" />

              {/* Animated Icons */}
              <g id="leave-icon" className="icon-group">
                <Mail className="moving-icon" fill="hsl(var(--primary))" color="white" />
                <text x="0" y="35" className="icon-label" fill="hsl(var(--primary))">Leave Request</text>
              </g>
              <g id="attendance-icon" className="icon-group">
                <CalendarCheck className="moving-icon" fill="hsl(var(--accent-foreground))" color="hsl(var(--accent))" />
                 <text x="0" y="35" className="icon-label" fill="hsl(var(--accent-foreground))">Attendance Marked</text>
              </g>
            </svg>
          </div>
        </section>


      </main>

      <footer className="w-full mt-16 py-6 border-t">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
            <p className="text-sm text-muted-foreground">&copy; 2024 SmartSched. All rights reserved.</p>
            <nav className="flex gap-4 sm:gap-6 mt-4 md:mt-0">
                <Link href="#" className="text-sm hover:underline underline-offset-4" prefetch={false}>
                    Terms of Service
                </Link>
                <Link href="#" className="text-sm hover:underline underline-offset-4" prefetch={false}>
                    Privacy
                </Link>
            </nav>
        </div>
      </footer>
       <style jsx>{`
        .node {
            opacity: 0;
            transform-origin: center;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }

        .path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw-line 2s 1s ease-out forwards;
        }

        @keyframes draw-line {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        .moving-icon {
           width: 24px;
           height: 24px;
        }

        .icon-group {
            opacity: 0;
            transform-origin: center;
        }
        
        #leave-icon {
            offset-path: path('M 200 220 Q 250 120, 375 80');
            animation: move-icon 2.5s 2.5s linear forwards, fade-in-icon 0.5s 2.5s forwards;
        }

        #attendance-icon {
            offset-path: path('M 550 240 Q 400 320, 250 260');
            animation: move-icon 2.5s 3s linear forwards, fade-in-icon 0.5s 3s forwards;
        }

        .icon-label {
            font-size: 10px;
            font-weight: 500;
            text-anchor: middle;
        }

        @keyframes move-icon {
            0% {
                offset-distance: 0%;
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                offset-distance: 100%;
                opacity: 0;
            }
        }
        
        @keyframes fade-in-icon {
            from { opacity: 0; }
            to { opacity: 1; }
        }

      `}</style>
    </div>
  );
}
