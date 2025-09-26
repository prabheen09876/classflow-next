
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Bolt, Calendar, CheckCircle, Bell, UserCheck, Users, Fingerprint, GitBranch, Mail, CalendarCheck, Shield, Building, UserCog, User, Menu, X, Instagram, Youtube, Linkedin, Facebook, BotIcon, AlertTriangle, Sparkles } from "lucide-react";
import {PlaceHolderImages} from "@/lib/placeholder-images";
import { Video, Users as UsersIcon, Calendar as CalendarIcon, Bot, GraduationCap } from 'lucide-react';
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedDiv, childVariants } from "@/components/common/animated-div";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/icons";
import { useAuth } from "@/components/auth-provider";
import TextPressure from "@/components/common/text-pressure";
import ClickSpark from "@/components/ui/click-spark";

export default function Home() {
    const { user, role, loading } = useAuth();
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

    const getDashboardUrl = () => {
        if (!role) return '/login';
        switch (role) {
            case 'admin': return '/admin';
            case 'hos': return '/hos';
            case 'teacher': return '/teacher';
            case 'student': return '/student';
            default: return '/dashboard';
        }
    }


  return (
    <ClickSpark sparkColor="hsl(var(--primary))" className="flex flex-col min-h-screen font-body text-black bg-transparent">
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
                {!loading && (
                    <>
                        {user ? (
                             <Link href={getDashboardUrl()} prefetch={false}>
                                <motion.div whileHover={{ scale: 1.05 }}>
                                    <Button className="bg-primary text-primary-foreground rounded-full px-6 py-3 font-semibold transition-all">Go to Dashboard</Button>
                                </motion.div>
                            </Link>
                        ) : (
                             <Link href="/login" prefetch={false}>
                                <motion.div whileHover={{ scale: 1.05 }}>
                                    <Button className="bg-primary text-primary-foreground rounded-full px-6 py-3 font-semibold transition-all">Get Started</Button>
                                </motion.div>
                            </Link>
                        )}
                    </>
                )}
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
        <AnimatedDiv variants="stagger" className="w-full bg-muted rounded-3xl p-8 overflow-hidden relative">
          <div className="relative z-10 text-center mb-12">
            <motion.div 
                variants={childVariants}
                className="h-[150px] md:h-[250px] w-full"
            >
              <TextPressure 
                text="ClassFlow" 
                flex={true} 
                alpha={false} 
                stroke={true}
                width={true} 
                weight={true} 
                italic={true} 
                textColor="hsl(var(--primary))"
                strokeColor="hsl(var(--primary))"
                minFontSize={36}
                scale={true}
              />
            </motion.div>
            <motion.p 
                variants={childVariants}
                className="max-w-2xl mx-auto mt-4 text-muted-foreground text-lg"
            >
              Turn chaotic scheduling puzzles into perfectly optimized timetables, giving you back hours of your week.
            </motion.p>
             <motion.div variants={childVariants} className="flex items-center justify-center gap-4 mt-8">
                {!loading && (
                    <>
                        {user ? (
                        <Link href={getDashboardUrl()} prefetch={false}>
                            <motion.div whileHover={{ scale: 1.1, boxShadow: '0px 4px 20px rgba(255, 77, 166, 0.4)' }}>
                            <Button className="bg-primary text-white rounded-full px-8 py-6 font-semibold">
                                Go to Dashboard
                            </Button>
                            </motion.div>
                        </Link>
                        ) : (
                        <Link href="/signup" prefetch={false}>
                            <motion.div whileHover={{ scale: 1.1, boxShadow: '0px 4px 20px rgba(255, 77, 166, 0.4)' }}>
                            <Button className="bg-primary text-white rounded-full px-8 py-6 font-semibold">
                                Get Started Free
                            </Button>
                            </motion.div>
                        </Link>
                        )}
                    </>
                )}
            </motion.div>
          </div>
          
          <motion.div 
            variants={childVariants}
            className="relative"
          >
              <div className="absolute inset-0 bg-gradient-to-t from-muted via-muted to-transparent z-10"></div>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative">
                  <FeatureCard icon={Sparkles} title="AI Timetabling" description="Generate optimized schedules in minutes." delay={0} />
                  <FeatureCard icon={AlertTriangle} title="Conflict Alerts" description="Instantly detect and resolve clashes." delay={0.2} />
                  <FeatureCard icon={Bolt} title="Dynamic Adjustments" description="Auto-adjust for absences and changes." delay={0.4} />
                  <FeatureCard icon={Bell} title="Real-time Notifications" description="Keep everyone updated, always." delay={0.6} />
              </div>
          </motion.div>
        </AnimatedDiv>

        <section ref={scrollRef} className="h-[300vh] w-full mt-16 relative">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div style={{ x }} className="flex">
                    <div className="w-screen h-screen flex items-center justify-center">
                        <Card className="w-[85%] h-[70vh] bg-background/50 backdrop-blur-lg rounded-3xl flex items-center justify-center p-12">
                           <div className="text-center">
                                <h2 className="text-5xl font-bold tracking-tighter">Seamlessly Integrated with Google</h2>
                                <p className="text-muted-foreground text-xl max-w-3xl mx-auto mt-4">
                                    Leverage the power of Google's ecosystem. Sync timetables with Google Calendar, conduct online classes with Google Meet, and manage coursework with Google Classroom.
                                </p>
                           </div>
                        </Card>
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

        <section id="roles" className="w-full mt-16 py-12">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold tracking-tighter mb-4">Roles &amp; Responsibilities</h2>
                <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                    A clear hierarchy for seamless management. Each role has tailored permissions for smooth operations.
                </p>
            </div>
            <div className="relative w-full max-w-4xl mx-auto">
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2"></div>
                <RoleCard
                    icon={Shield}
                    title="Admin"
                    description="Full control over the platform, managing users and configuring system-wide settings."
                    tasks={["Manage HOS & Depts.", "Configure AI Rules", "Access Global Reports"]}
                    align="left"
                />
                <RoleCard
                    icon={UserCog}
                    title="HOS"
                    description="Manages departmental resources, including faculty, classrooms, and timetables."
                    tasks={["Add & Manage Teachers", "Approve Timetables", "Manage Rooms & Labs"]}
                    align="right"
                />
                <RoleCard
                    icon={Users}
                    title="Teacher"
                    description="Handles day-to-day classroom activities, from attendance to assigning homework."
                    tasks={["Mark Attendance", "Assign Homework", "View Schedule"]}
                    align="left"
                />
                <RoleCard
                    icon={User}
                    title="Student"
                    description="Stays organized with a personalized timetable and receives instant updates."
                    tasks={["View Timetable", "Receive Notifications", "Access Homework"]}
                    align="right"
                />
            </div>
        </section>


      </main>

      <Footer />
    </ClickSpark>
  );
}

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: React.ElementType, title: string, description: string, delay: number }) => (
    <motion.div
        variants={childVariants}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
    >
        <Card className="bg-background/50 backdrop-blur-lg p-4 h-full">
            <CardContent className="p-2 flex flex-col items-center text-center">
                <div className="p-3 bg-primary/10 rounded-lg mb-3">
                    <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{description}</p>
            </CardContent>
        </Card>
    </motion.div>
);


interface RoleCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
    tasks: string[];
    align: 'left' | 'right';
}

function RoleCard({ icon: Icon, title, description, tasks, align }: RoleCardProps) {
    const cardVariants = {
        hidden: { opacity: 0, x: align === 'left' ? -100 : 100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <motion.div
            className={cn("mb-12 flex items-center w-full", align === 'right' ? 'flex-row-reverse' : '')}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            variants={cardVariants}
        >
            <div className={cn("w-1/2", align === 'left' ? 'pr-8' : 'pl-8')}>
                <Card className="text-left p-6 bg-muted shadow-lg">
                    <CardContent className="p-0">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold">{title}</h3>
                        </div>
                        <p className="text-muted-foreground mb-4">{description}</p>
                        <ul className="space-y-2 text-sm">
                            {tasks.map((task, index) => (
                                <li key={index} className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> {task}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/20 border-4 border-white flex-shrink-0 z-10 flex items-center justify-center">
                 <div className="w-4 h-4 rounded-full bg-primary"></div>
            </div>
            <div className="w-1/2"></div>
        </motion.div>
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
              <li><Link href="#" className="hover-text-white">Privacy Policy</Link></li>
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

    

    
