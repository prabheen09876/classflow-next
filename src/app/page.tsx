

"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Bolt, Calendar, CheckCircle, Bell, UserCheck, Users, Fingerprint, GitBranch, Mail, CalendarCheck, Shield, Building, UserCog, User, Menu, X, Instagram, Youtube, Linkedin, Facebook } from "lucide-react";
import {PlaceHolderImages} from "@/lib/placeholder-images";
import { Video, Users as UsersIcon, Calendar as CalendarIcon, Bot, GraduationCap } from 'lucide-react';
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedDiv, childVariants } from "@/components/common/animated-div";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/icons";

export default function Home() {
    const heroImage = PlaceHolderImages.find(p => p.id === 'hero-classroom');
    const dashboardPreview = PlaceHolderImages.find(p => p.id === 'dashboard-preview');
    const teacher1 = PlaceHolderImages.find(p => p.id === 'teacher-1');
    const teacher2 = PlaceHolderImages.find(p => p.id === 'teacher-2');
    const student1 = PlaceHolderImages.find(p => p.id === 'student-1');
    const attendanceFeatureImage = PlaceHolderImages.find(p => p.id === 'attendance-feature');
    const googleCalendarImage = PlaceHolderImages.find(p => p.id === 'google-calendar-integration');
    const googleMeetImage = PlaceHolderImages.find(p => p.id === 'google-meet-integration');
    const googleClassroomImage = PlaceHolderImages.find(p => p.id === 'google-classroom-integration');
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const scrollRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end end"]
    });
    
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    const menuVariants = {
        hidden: {
            y: "-100%",
            transition: {
                type: "tween",
                ease: "easeInOut",
                duration: 0.5
            }
        },
        visible: {
            y: 0,
            transition: {
                type: "tween",
                ease: "easeInOut",
                duration: 0.5
            }
        }
    }


  return (
    <div className="flex flex-col min-h-screen font-body text-black bg-transparent">
      <div className="sticky top-0 z-50">
        <AnimatedDiv variants="fadeInDown">
        <header className="w-full backdrop-blur-lg text-black px-8 py-4 flex items-center justify-between">
          <Link href="#" className="flex items-center justify-center gap-2" prefetch={false}>
            <span className="text-2xl font-bold">ClassFlow</span>
          </Link>
          <nav className="hidden md:flex items-center gap-2 bg-muted/80 rounded-full p-2">
            <motion.div whileHover={{ scale: 1.1 }}>
            <Link href="#" className="text-sm font-medium transition-colors px-4 py-2 rounded-full hover:bg-background" prefetch={false}>
              About
            </Link>
            </motion.div>
            <span className="text-muted-foreground">&bull;</span>
            <motion.div whileHover={{ scale: 1.1 }}>
            <Link href="#features" className="text-sm font-medium transition-colors px-4 py-2 rounded-full hover:bg-background" prefetch={false}>
              Features
            </Link>
            </motion.div>
             <span className="text-muted-foreground">&bull;</span>
             <motion.div whileHover={{ scale: 1.1}}>
             <Link href="#" className="text-sm font-medium transition-colors px-4 py-2 rounded-full hover:bg-background" prefetch={false}>
              Pricing
            </Link>
            </motion.div>
             <span className="text-muted-foreground">&bull;</span>
             <motion.div whileHover={{ scale: 1.1}}>
             <Link href="#" className="text-sm font-medium transition-colors px-4 py-2 rounded-full hover:bg-background" prefetch={false}>
              Contact
            </Link>
            </motion.div>
          </nav>
           <div className="hidden md:flex">
                <Link href="/login" prefetch={false}>
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Button className="bg-primary text-primary-foreground rounded-full px-6 py-3 font-semibold transition-all">Get Started</Button>
                    </motion.div>
                </Link>
           </div>

          <div className="md:hidden">
              <Button onClick={() => setIsMenuOpen(true)} variant="ghost" size="icon">
                  <Menu className="h-6 w-6"/>
              </Button>
          </div>
        </header>
        </AnimatedDiv>
      </div>

       <motion.div 
            initial="hidden"
            animate={isMenuOpen ? "visible" : "hidden"}
            variants={menuVariants}
            className="fixed top-0 left-0 w-full h-screen bg-background z-50 md:hidden"
       >
           <div className="flex flex-col items-center justify-center h-full gap-8">
               <Button onClick={() => setIsMenuOpen(false)} variant="ghost" size="icon" className="absolute top-6 right-6">
                  <X className="h-6 w-6"/>
               </Button>
                <Link href="#" className="text-2xl font-medium" onClick={() => setIsMenuOpen(false)}>About</Link>
                <Link href="#features" className="text-2xl font-medium" onClick={() => setIsMenuOpen(false)}>Features</Link>
                <Link href="#" className="text-2xl font-medium" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
                <Link href="#" className="text-2xl font-medium" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button className="bg-primary text-primary-foreground rounded-full px-8 py-6 font-semibold text-lg">Get Started</Button>
                </Link>
           </div>
       </motion.div>


      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <AnimatedDiv variants="fadeIn" className="w-full bg-muted rounded-2xl p-8">
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
                  <motion.div whileHover={{ scale: 1.1, boxShadow: "0px 4px 20px rgba(255, 77, 166, 0.4)" }}>
                  <Button className="bg-primary text-white rounded-full px-8 py-6 font-semibold">Get Started</Button>
                  </motion.div>
                </Link>
                <Link href="#" prefetch={false}>
                  <motion.div whileHover={{ scale: 1.1 }}>
                  <Button variant="outline" className="text-black border-black rounded-full px-8 py-6 font-medium hover:bg-gray-100 transition-all">Learn More</Button>
                  </motion.div>
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
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }}>
                {heroImage && <Image
                    src={heroImage.imageUrl}
                    width={600}
                    height={400}
                    alt="Dynamic scheduling illustration"
                    className="rounded-2xl shadow-2xl"
                    data-ai-hint={heroImage.imageHint}
                />}
                </motion.div>
            </div>
          </div>
        </AnimatedDiv>

        <AnimatedDiv variants="stagger" id="features" className="w-full mt-8">
        <div className="grid md:grid-cols-2 gap-6">
            <motion.div variants={childVariants}>
                <motion.div whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(0,0,0,0.15)" }} className="h-full">
                <Card className="bg-[#E5D9FF] rounded-2xl p-6 shadow-lg h-full flex flex-col justify-between">
                    <div>
                        <h3 className="text-3xl font-bold">Streamline Timetables, Save Hours</h3>
                        <p className="text-lg mt-2 max-w-md">Create clash-free timetables in minutes with AI-powered optimization. No more manual adjustments or scheduling conflicts.</p>
                    </div>
                    <div className="mt-6 relative">
                        {dashboardPreview && <Image 
                            src={dashboardPreview.imageUrl}
                            width={400}
                            height={250}
                            alt="Dashboard Preview"
                            className="rounded-xl shadow-2xl mx-auto"
                            data-ai-hint={dashboardPreview.imageHint}
                        />}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 justify-center">
                             <Button variant="outline" size="icon" className="rounded-full bg-white/50 backdrop-blur-sm"><ArrowLeft/></Button>
                             <Button variant="outline" size="icon" className="rounded-full bg-white/50 backdrop-blur-sm"><ArrowRight/></Button>
                        </div>
                    </div>
                </Card>
                </motion.div>
            </motion.div>
            <motion.div variants={childVariants}>
                 <motion.div whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(0,0,0,0.15)" }} className="h-full">
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
                </motion.div>
            </motion.div>
          </div>
        </AnimatedDiv>

        <AnimatedDiv variants="fadeIn" id="attendance" className="w-full mt-16">
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
        </AnimatedDiv>

        <section ref={scrollRef} className="h-[300vh] w-full mt-16 relative">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div style={{ x }} className="flex">
                    <div className="w-screen h-screen flex flex-col items-center justify-center gap-8 px-16">
                        <div className="bg-background/50 backdrop-blur-lg p-8 rounded-2xl">
                          <h2 className="text-5xl font-bold tracking-tighter text-center">Seamlessly Integrated with Google</h2>
                          <p className="text-muted-foreground text-xl max-w-3xl mx-auto text-center mt-4">
                              Leverage the power of Google's ecosystem. Sync timetables with Google Calendar, conduct online classes with Google Meet, and manage coursework with Google Classroom.
                          </p>
                        </div>
                    </div>
                    <div className="w-screen h-screen flex items-center justify-center">
                        <Card className="w-[85%] h-[70vh] bg-blue-100 rounded-3xl grid grid-cols-2 items-center p-12 gap-8">
                             <div className="space-y-4">
                                <h3 className="text-5xl font-bold">Google Calendar</h3>
                                <p className="text-lg text-blue-900">Sync timetables, holidays, and events automatically. Never miss a class or deadline.</p>
                            </div>
                            {googleCalendarImage && <Image src={googleCalendarImage.imageUrl} alt="Google Calendar" width={500} height={400} className="rounded-2xl shadow-xl" data-ai-hint={googleCalendarImage.imageHint}/>}
                        </Card>
                    </div>
                     <div className="w-screen h-screen flex items-center justify-center">
                        <Card className="w-[85%] h-[70vh] bg-green-100 rounded-3xl grid grid-cols-2 items-center p-12 gap-8">
                             <div className="space-y-4">
                                <h3 className="text-5xl font-bold">Google Meet</h3>
                                <p className="text-lg text-green-900">Conduct online classes with a single click. Substitutions can be virtual, ensuring no class is missed.</p>
                            </div>
                            {googleMeetImage && <Image src={googleMeetImage.imageUrl} alt="Google Meet" width={500} height={400} className="rounded-2xl shadow-xl" data-ai-hint={googleMeetImage.imageHint} />}
                        </Card>
                    </div>
                     <div className="w-screen h-screen flex items-center justify-center">
                        <Card className="w-[85%] h-[70vh] bg-yellow-100 rounded-3xl grid grid-cols-2 items-center p-12 gap-8">
                             <div className="space-y-4">
                                <h3 className="text-5xl font-bold">Google Classroom</h3>
                                <p className="text-lg text-yellow-900">Assign and track homework, share resources, and manage coursework seamlessly.</p>
                            </div>
                            {googleClassroomImage && <Image src={googleClassroomImage.imageUrl} alt="Google Classroom" width={500} height={400} className="rounded-2xl shadow-xl" data-ai-hint={googleClassroomImage.imageHint} />}
                        </Card>
                    </div>
                </motion.div>
            </div>
        </section>


        <AnimatedDiv variants="stagger" id="roles" className="w-full mt-16 py-12 text-center">
          <h2 className="text-4xl font-bold tracking-tighter mb-4">Roles & Responsibilities</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-12">
            A clear hierarchy designed for seamless management and collaboration across your institution. Each role has tailored permissions to ensure smooth operations.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div variants={childVariants}>
            <motion.div whileHover={{ scale: 1.05, borderColor: '#FF4DA6' }} className="h-full border-2 border-transparent rounded-lg">
            <Card className="text-left p-6 bg-muted h-full">
              <CardContent className="p-0">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Admin</h3>
                </div>
                <p className="text-muted-foreground mb-4">Full control over the entire platform, from managing users to configuring system-wide settings.</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500"/> Manage HOS & Depts.</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500"/> Configure AI Rules</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500"/> Access Global Reports</li>
                </ul>
              </CardContent>
            </Card>
            </motion.div>
            </motion.div>
            <motion.div variants={childVariants}>
            <motion.div whileHover={{ scale: 1.05, borderColor: '#FF4DA6' }} className="h-full border-2 border-transparent rounded-lg">
            <Card className="text-left p-6 bg-muted h-full">
              <CardContent className="p-0">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <UserCog className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">HOS</h3>
                </div>
                <p className="text-muted-foreground mb-4">Manages departmental resources, including faculty, classrooms, and timetables.</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500"/> Add & Manage Teachers</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500"/> Approve Timetables</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500"/> Manage Rooms & Labs</li>
                </ul>
              </CardContent>
            </Card>
            </motion.div>
            </motion.div>
            <motion.div variants={childVariants}>
            <motion.div whileHover={{ scale: 1.05, borderColor: '#FF4DA6' }} className="h-full border-2 border-transparent rounded-lg">
             <Card className="text-left p-6 bg-muted h-full">
              <CardContent className="p-0">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                     <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Teacher</h3>
                </div>
                <p className="text-muted-foreground mb-4">Handles day-to-day classroom activities, from attendance to assigning homework.</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500"/> Mark Attendance</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500"/> Assign Homework</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500"/> View Schedule</li>
                </ul>
              </CardContent>
            </Card>
            </motion.div>
            </motion.div>
            <motion.div variants={childVariants}>
            <motion.div whileHover={{ scale: 1.05, borderColor: '#FF4DA6' }} className="h-full border-2 border-transparent rounded-lg">
             <Card className="text-left p-6 bg-muted h-full">
              <CardContent className="p-0">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Student</h3>
                </div>
                <p className="text-muted-foreground mb-4">Stays organized with a personalized timetable and receives instant updates.</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500"/> View Timetable</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500"/> Receive Notifications</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500"/> Access Homework</li>
                </ul>
              </CardContent>
            </Card>
            </motion.div>
            </motion.div>
          </div>
        </AnimatedDiv>


      </main>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <AnimatedDiv variants="fadeInUp">
      <footer className="w-full bg-[hsl(var(--footer-background))] text-[hsl(var(--footer-foreground))]">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 px-8 py-16">
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-white">
              ClassFlow
            </h3>
            <p className="mt-2 text-sm">The future of smart class scheduling.</p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Product</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white">Features</Link></li>
              <li><Link href="#" className="hover:text-white">Integrations</Link></li>
              <li><Link href="#" className="hover:text-white">Pricing</Link></li>
              <li><Link href="#" className="hover:text-white">Changelog</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Company</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white">About</Link></li>
              <li><Link href="#" className="hover:text-white">Blog</Link></li>
              <li><Link href="#" className="hover:text-white">Careers</Link></li>
              <li><Link href="#" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Follow Us</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white">Twitter</Link></li>
              <li><Link href="#" className="hover:text-white">LinkedIn</Link></li>
              <li><Link href="#" className="hover:text-white">Facebook</Link></li>
              <li><Link href="#" className="hover:text-white">Instagram</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-8 py-8">
          <div className="border-t border-[hsl(var(--footer-foreground)_/_0.2)] pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm">&copy; 2024 ClassFlow, Inc. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-6 md:mt-0">
              <Link href="#" className="hover:text-white"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-white"><Youtube className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-white"><X className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-white"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-white"><Linkedin className="h-5 w-5" /></Link>
            </div>
          </div>
        </div>
        <div className="relative w-full h-48 overflow-hidden">
          <span className="absolute -bottom-1/2 left-0 text-[20rem] font-bold text-white/5 leading-none tracking-tighter">
            ClassFlow
          </span>
        </div>
      </footer>
    </AnimatedDiv>
  );
}

    

    