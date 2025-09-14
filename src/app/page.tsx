"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Bolt, Calendar, CheckCircle, Bell, UserCheck, Users, Fingerprint, GitBranch } from "lucide-react";
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
          <h2 className="text-4xl font-bold tracking-tighter mb-4">A Clear & Structured Hierarchy</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-12">
            SmartSched is designed with a clear role-based hierarchy to ensure that everyone has the right level of access and control.
          </p>
          <div className="relative flex flex-col items-center">
            {/* HOS Node */}
            <div className="animate-fade-in-down z-10">
              <div className="bg-primary text-primary-foreground rounded-full p-6 shadow-lg flex flex-col items-center w-48 h-48 justify-center">
                <UserCheck className="h-12 w-12 mb-2" />
                <h3 className="text-xl font-bold">HOS</h3>
              </div>
            </div>

            {/* Connecting Lines to Teachers */}
            <div className="absolute top-36 h-20 w-px bg-border animate-draw-line" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute top-56 h-px w-64 bg-border animate-draw-line-h" style={{animationDelay: '1s'}}></div>
            
            {/* Teacher Nodes */}
            <div className="flex justify-center gap-24 mt-20 relative z-10">
              <div className="animate-fade-in-up" style={{animationDelay: '1.5s'}}>
                 <div className="bg-accent text-accent-foreground rounded-xl p-6 shadow-md flex flex-col items-center w-40 h-40 justify-center">
                   <Users className="h-10 w-10 mb-2 text-primary" />
                   <h3 className="text-lg font-semibold">Teachers</h3>
                </div>
              </div>
            </div>
             
             {/* Connecting Lines to Students */}
            <div className="absolute top-[21.5rem] h-20 w-px bg-border animate-draw-line" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-[26.5rem] h-px w-96 bg-border animate-draw-line-h-2" style={{animationDelay: '2.5s'}}></div>
            
            {/* Student Nodes */}
            <div className="flex justify-center gap-32 mt-20 relative z-10">
              <div className="animate-fade-in-up" style={{animationDelay: '3s'}}>
                <div className="bg-muted text-muted-foreground rounded-lg p-4 shadow-sm flex flex-col items-center w-36 h-36 justify-center">
                  <GitBranch className="h-8 w-8 mb-2" />
                  <h3 className="text-md font-semibold">Students</h3>
                </div>
              </div>
            </div>
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
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes draw-line {
            from { height: 0; }
            to { height: 5rem; }
        }
        @keyframes draw-line-h {
            from { width: 0; }
            to { width: 16rem; }
        }
         @keyframes draw-line-h-2 {
            from { width: 0; }
            to { width: 24rem; }
        }
        .animate-fade-in-down { animation: fade-in-down 0.5s ease-out forwards; animation-delay: 0.2s; opacity: 0; }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; opacity: 0; }
        .animate-draw-line { animation: draw-line 0.5s linear forwards; height: 0; }
        .animate-draw-line-h { animation: draw-line-h 0.5s linear forwards; width: 0; }
        .animate-draw-line-h-2 { animation: draw-line-h-2 0.5s linear forwards; width: 0; }
      `}</style>
    </div>
  );
}
