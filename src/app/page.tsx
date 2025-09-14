import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Bolt, Calendar, CheckCircle, Bell } from "lucide-react";
import { Logo } from "@/components/icons";
import {PlaceHolderImages} from "@/lib/placeholder-images";

export default function Home() {
    const heroImage = PlaceHolderImages.find(p => p.id === 'hero-classroom');
    const dashboardPreview = PlaceHolderImages.find(p => p.id === 'dashboard-preview');
    const teacher1 = PlaceHolderImages.find(p => p.id === 'teacher-1');
    const teacher2 = PlaceHolderImages.find(p => p.id === 'teacher-2');
    const student1 = PlaceHolderImages.find(p => p.id === 'student-1');

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
          <Link href="/dashboard" prefetch={false}>
            <Button className="bg-white text-black rounded-full px-6 py-3 font-semibold hover:bg-gray-200 transition-all">Get Started</Button>
          </Link>
        </header>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="w-full bg-[#fdfdfd] rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold tracking-tighter">
                The Future of Smart Class Scheduling
              </h1>
              <p className="max-w-lg text-muted-foreground text-lg">
                Automate, optimize, and simplify class timetables for colleges and institutions with real-time adjustments and AI-powered scheduling.
              </p>
              <div className="flex items-center gap-4">
                <Link href="/dashboard" prefetch={false}>
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
    </div>
  );
}
