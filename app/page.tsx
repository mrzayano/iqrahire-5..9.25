"use client"

import React from "react"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import {
  Search,
  MapPin,
  ChevronRight,
  ArrowRight,
  Briefcase,
  Clock,
  Home,
  Users,
  TrendingUp,
  Award,
  Zap,
  Menu,
  X,
  Bell,
  Sparkles,
  FileText,
  Video,
  BookOpen,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, useAnimation, useScroll, useTransform } from "framer-motion"
import { toast } from "sonner"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const { isSignedIn } = useUser();
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Parallax effects
  const heroImageY = useTransform(scrollY, [0, 500], [0, 100])
  // const statsOpacity = useTransform(scrollY, [100, 300], [0, 1])
  const statsY = useTransform(scrollY, [300, 600], [50, 0])
  const statsOpacity = useTransform(scrollY, [0, 0], [0, 1])


  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    toast("Subscribed!", {

      description: "You'll receive job alerts based on your preferences.",
    })
  }

  const jobCategories = [
    { id: "all", name: "All Jobs", count: "50K+" },
    { id: "remote", name: "Remote", count: "12K+" },
    { id: "tech", name: "Tech", count: "8K+" },
    { id: "marketing", name: "Marketing", count: "5K+" },
    { id: "design", name: "Design", count: "3K+" },
    { id: "finance", name: "Finance", count: "4K+" },
  ]

  const jobCategoriecards = [
    {
      title: "Jobs for Freshers",
      description: "Perfect for recent graduates",
      badgeText: "Trending",
      badgeColor: "bg-green-500 hover:bg-primary",
      jobsCount: "15K+ Jobs",
      jobsCountColor: "text-primary border-green-200 bg-green-50",
      features: [
        { icon: Briefcase, text: "No experience required" },
        { icon: Award, text: "Training opportunities" },
      ],
      imageSrc: "/images/freshers-jobs.webp",
      imageAlt: "Freshers Jobs",
      gradient: "from-green-100 to-primary/40",
      buttonColor: "border-green-500 text-primary hover:bg-green-50 group-hover:bg-primary group-hover:text-white",
      delay: 0,
    },
    {
      title: "Work from Home Jobs",
      description: "Flexible remote opportunities",
      badgeText: "Popular",
      badgeColor: "bg-blue-500 hover:bg-blue-600",
      jobsCount: "20K+ Jobs",
      jobsCountColor: "text-blue-600 border-blue-200 bg-blue-50",
      features: [
        { icon: Home, text: "100% remote work" },
        { icon: Clock, text: "Flexible hours" },
      ],
      imageSrc: "/images/work-from-home-jobs.webp",
      imageAlt: "Work from Home Jobs",
      gradient: "from-blue-50 to-indigo-50",
      buttonColor: "border-blue-500 text-blue-600 hover:bg-blue-50 group-hover:bg-blue-600 group-hover:text-white",
      delay: 0.1,
    },
    {
      title: "Part Time Jobs",
      description: "Balance work with other priorities",
      badgeText: "Flexible",
      badgeColor: "bg-amber-500 hover:bg-amber-600",
      jobsCount: "12K+ Jobs",
      jobsCountColor: "text-amber-600 border-amber-200 bg-amber-50",
      features: [
        { icon: Clock, text: "20-25 hours per week" },
        { icon: Zap, text: "Quick application process" },
      ],
      imageSrc: "/images/part-time-jobs.webp",
      imageAlt: "Part Time Jobs",
      gradient: "from-amber-50 to-yellow-50",
      buttonColor: "border-amber-500 text-amber-600 hover:bg-amber-50 group-hover:bg-amber-600 group-hover:text-white",
      delay: 0.2,
    },
    {
      title: "Jobs for Women",
      description: "Women-friendly workplaces",
      badgeText: "Empowering",
      badgeColor: "bg-purple-500 hover:bg-purple-600",
      jobsCount: "8K+ Jobs",
      jobsCountColor: "text-purple-600 border-purple-200 bg-purple-50",
      features: [
        { icon: Users, text: "Inclusive environments" },
        { icon: TrendingUp, text: "Growth opportunities" },
      ],
      imageSrc: "/images/women-jobs.webp",
      imageAlt: "Women Jobs",
      gradient: "from-purple-50 to-pink-50",
      buttonColor: "border-purple-500 text-purple-600 hover:bg-purple-50 group-hover:bg-purple-600 group-hover:text-white",
      delay: 0.3,
    },
    {
      title: "Full Time Jobs",
      description: "Long-term career opportunities",
      badgeText: "Stable",
      badgeColor: "bg-cyan-500 hover:bg-cyan-600",
      jobsCount: "25K+ Jobs",
      jobsCountColor: "text-cyan-600 border-cyan-200 bg-cyan-50",
      features: [
        { icon: Briefcase, text: "Permanent positions" },
        { icon: Award, text: "Benefits & perks" },
      ],
      imageSrc: "/images/Full_time_banner.webp",
      imageAlt: "Full Time Jobs",
      gradient: "from-cyan-50 to-sky-50",
      buttonColor: "border-cyan-500 text-cyan-600 hover:bg-cyan-50 group-hover:bg-cyan-600 group-hover:text-white",
      delay: 0.4,
    },
  ];

  const features = [
    {
      title: "Smart Job Matching",
      description: "Our AI-powered algorithm matches your skills and preferences with the perfect job opportunities.",
      icon: Zap,
      iconColor: "text-primary",
      bgColor: "bg-green-100",
    },
    {
      title: "Resume Builder",
      description: "Create professional, ATS-friendly resumes with our intuitive tools and expert templates.",
      icon: FileText,
      iconColor: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Professional Network",
      description: "Connect with professionals in your field to expand your network and discover new opportunities.",
      icon: Users,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Career Courses",
      description: "Enhance your skills with online courses and degree programs from top educational institutions.",
      icon: BookOpen,
      iconColor: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Career Growth",
      description: "Access resources, courses, and mentorship to accelerate your career growth and development.",
      icon: TrendingUp,
      iconColor: "text-cyan-600",
      bgColor: "bg-cyan-100",
    }, {
      title: "Skill Certification",
      description: "Showcase your skills through our assessment tests and earn certifications.",
      icon: Award,
      iconColor: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "One-Click Apply",
      description: "Apply to multiple jobs with just one click using your saved profile and resume.",
      icon: Briefcase,
      iconColor: "text-red-600",
      bgColor: "bg-red-100",
    },

    {
      title: "Interview Practice",
      description: "Practice with realistic interview scenarios and receive feedback to improve your performance.",
      icon: Video,
      iconColor: "text-secondary",
      bgColor: "bg-secondary/10",
    },

    {
      title: "Job Alerts",
      description: "Receive personalized job alerts based on your preferences and never miss an opportunity.",
      icon: Bell,
      iconColor: "text-amber-600",
      bgColor: "bg-amber-100",
    },
  ];


  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }
  const slideIn = {
    hidden: { x: -60, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring" } },
  }

  const controls1 = useAnimation();
  const controls2 = useAnimation();

  useEffect(() => {
    // Trigger initial animation, then loop the float
    controls1.start({
      opacity: 1,
      y: 0,
      transition: { delay: 0.8, duration: 0.5 },
    }).then(() => {
      controls1.start({
        y: [0, -2, 0, 2, 0], // Loop pattern
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeIn",
        },
      });
    });

    controls2.start({
      opacity: 1,
      y: 0,
      transition: { delay: 1, duration: 0.5 },
    }).then(() => {
      controls2.start({
        y: [0, 3, 0, -3, 0],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeIn",
        },
      });
    });
  }, [controls1, controls2]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-white"}`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-primary bg-clip-text ">
                  Iqra<span className="text-secondary">Hire</span>
                </span>
              </Link>

              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Find Jobs
                </Link>
                <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Companies
                </Link>
                <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
                  <span className="flex items-center">
                    Career Guidance <Badge className="ml-1.5 bg-green-100 text-green-800 hover:bg-green-100">New</Badge>
                  </span>
                </Link>
                <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Courses
                </Link>
              </nav>
            </div>

            <div className="hidden md:flex items-center gap-4">
                {isSignedIn ? (
                  <Button
                    className="bg-primary text-white flex-1"
                    onClick={() => router.push('/jobs')}
                  >
                    Go to Jobs
                  </Button>
                ) : (
                <>
                  <Button 
                  onClick={()=> router.push('/sign-in')}
                  variant="outline" className="border-primary text-primary hover:bg-primary/5">
                    Login
                  </Button>
                  <Button 
                   onClick={()=> router.push('/sign-up')}
                  className="bg-primary hover:bg-primary/90 text-white">
                    Register
                  </Button>
                </>
                )}

              
            </div>

            <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t py-4 px-4 shadow-lg">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
                Find Jobs
              </Link>
              <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
                Companies
              </Link>
              <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
                <span className="flex items-center">
                  Career Guidance <Badge className="ml-1.5 bg-green-100 text-primary-800 hover:bg-green-100">New</Badge>
                </span>
              </Link>
              <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
                Courses
              </Link>

              <div className="flex gap-2 pt-2">
                {isSignedIn ? (
                  <Button
                    className="bg-primary text-white flex-1"
                    onClick={() => router.push('/jobs')}
                  >
                    Go to Jobs
                  </Button>
                ) : (
                <>
                  <Button 
                  onClick={()=> router.push('/sign-in')}
                  variant="outline" className="border-primary text-primary hover:bg-primary/5 flex-1">
                    Login
                  </Button>
                  <Button 
                   onClick={()=> router.push('/sign-up')}
                  className="bg-primary text-white flex-1">
                    Register
                  </Button>
                </>
                )}

              </div>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-50 to-blue-50 -z-10"></div>
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 -z-10"></div>

          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.5 }}
                className="max-w-xl"
              >
                <Badge className="mb-4 bg-sky-100 text-primary hover:bg-sky-100 px-3 py-1">
                  INDIA&apos;S #1 JOB PLATFORM
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 ">
                  Your career journey <span className="text-primary">reimagined</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Connect with 10 lakh+ opportunities, build a standout resume, and prepare for interviews with expert
                  guidance. Your complete career platform.
                </p>
                {/* Search Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="bg-white rounded-xl shadow-xl p-4 md:p-6 mb-8 relative overflow-hidden"
                >
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full "></div>
                  <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-secondary/5 rounded-full"></div>

                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        type="text"
                        placeholder="Job title, skills, or company"
                        className="pl-10 border-gray-300 focus:border-primary focus:ring-primary"
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        type="text"
                        placeholder="City, state, or remote"
                        className="pl-10 border-gray-300 focus:border-primary focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="mt-4 relative z-10">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">Find Jobs</Button>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 relative z-10">
                    <span className="text-sm text-gray-500">Popular:</span>
                    <Badge variant="outline" className="text-gray-600 hover:bg-teal-100 hover:border-primary cursor-pointer">
                      Remote
                    </Badge>
                    <Badge variant="outline" className="text-gray-600 hover:bg-teal-100 hover:border-primary cursor-pointer">
                      Part-time
                    </Badge>
                    <Badge variant="outline" className="text-gray-600 hover:bg-teal-100 hover:border-primary cursor-pointer">
                      Tech
                    </Badge>
                    <Badge variant="outline" className="text-gray-600 hover:bg-teal-100 hover:border-primary cursor-pointer">
                      Marketing
                    </Badge>
                  </div>
                </motion.div>

                <div className="space-y-4">
                  <p className="text-sm text-gray-500 font-medium">TRUSTED BY 1000+ COMPANIES</p>
                  <div className="flex flex-wrap items-center gap-6">
                    <Image
                      src="/images/bajaj.webp"
                      alt="Bajaj Allianz"
                      width={120}
                      height={40}
                      className="h-8 w-auto object-contain"
                    />
                    <Image
                      src="/images/ic-paytm.webp"
                      alt="Paytm"
                      width={100}
                      height={40}
                      className="h-8 w-auto object-contain"
                    />
                    <Image
                      src="/images/zomato.webp"
                      alt="Zomato"
                      width={80}
                      height={40}
                      className="h-8 w-auto object-contain"
                    />
                    <Image
                      src="/images/ic-swiggy.webp"
                      alt="Swiggy"
                      width={40}
                      height={40}
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                style={{ y: heroImageY }}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hidden lg:block relative "

              >
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="relative">
                  <Image
                    src="/images/hero-person.webp"
                    alt="Person using IqraHire app"
                    width={500}
                    height={600}
                    className="relative z-10 mx-auto top-10 3xl:top-30"
                  />
                  {/* Floating AI Match */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls1}
                    className="absolute -right-10 top-20 bg-white rounded-xl shadow-lg p-3 z-20"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-medium">AI Match</p>
                        <p className="text-xs text-gray-500">98% compatibility</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls2}
                    className="absolute -left-10 bottom-40 bg-white rounded-xl shadow-lg p-3 z-20"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-secondary-foreground flex items-center justify-center">
                        <Bell className="h-4 w-4 text-secondary/100" />
                      </div>
                      <div>
                        <p className="text-xs font-medium">New Match</p>
                        <p className="text-xs text-gray-500">5 new opportunities</p>
                      </div>
                    </div>
                  </motion.div>

                </div>
              </motion.div>
            </div>
          </div>

          {/* Stats Section */}
          <motion.div style={{ opacity: statsOpacity, y: statsY }} className="container mx-auto px-4 mb-16 z-10">
            <Card className="bg-white rounded-2xl shadow-xl p-6 md:p-8 backdrop-blur-sm 3xl:relative 3xl:bottom-15">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="space-y-2"
                >
                  <p className="text-3xl md:text-4xl font-bold text-primary">5Cr+</p>
                  <p className="text-gray-600">Registered Users</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="space-y-2"
                >
                  <p className="text-3xl md:text-4xl font-bold text-primary">10L+</p>
                  <p className="text-gray-600">Active Job Listings</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-2"
                >
                  <p className="text-3xl md:text-4xl font-bold text-primary">20K+</p>
                  <p className="text-gray-600">Partner Companies</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="space-y-2"
                >
                  <p className="text-3xl md:text-4xl font-bold text-primary">4.5/5</p>
                  <p className="text-gray-600">User Satisfaction</p>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* Candidate Services Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge className="mb-4 bg-accent text-primary hover:bg-accent">CANDIDATE SERVICES</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h2>
              <p className="text-gray-600">
                Comprehensive tools and resources to help you build your career, from resume creation to interview
                preparation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* CV & Resume Building */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden group"
              >
                <div className="h-48 bg-primary/5 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText className="h-20 w-20 text-primary-300" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">CV & Resume Building</h3>
                  <p className="text-gray-600 mb-4">
                    Create professional, ATS-friendly resumes with our intuitive tools and expert templates.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-gray-600">
                      <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                      <span>Professional templates</span>
                    </li>
                    <li className="flex items-center text-gray-600">
                      <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                      <span>AI-powered content suggestions</span>
                    </li>
                    <li className="flex items-center text-gray-600">
                      <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                      <span>ATS optimization</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">Build Your Resume</Button>
                </div>
              </motion.div>

              {/* Sample Interviews */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden group"
              >
                <div className="h-48 bg-secondary/5 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="h-20 w-20 text-secondary-300" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Sample Interviews</h3>
                  <p className="text-gray-600 mb-4">
                    Practice with realistic interview scenarios and receive feedback to improve your performance.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-gray-600">
                      <CheckCircle className="h-4 w-4 mr-2 text-secondary" />
                      <span>Industry-specific questions</span>
                    </li>
                    <li className="flex items-center text-gray-600">
                      <CheckCircle className="h-4 w-4 mr-2 text-secondary" />
                      <span>Mock interview simulations</span>
                    </li>
                    <li className="flex items-center text-gray-600">
                      <CheckCircle className="h-4 w-4 mr-2 text-secondary" />
                      <span>Expert feedback and tips</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-secondary hover:bg-secondary/90 text-white">Practice Interviews</Button>
                </div>
              </motion.div>

              {/* Career Courses */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden group"
              >
                <div className="h-48 bg-primary/5 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="h-20 w-20 text-primary-300" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Career Courses & Degrees</h3>
                  <p className="text-gray-600 mb-4">
                    Enhance your skills with online courses and degree programs from top educational institutions.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-gray-600">
                      <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                      <span>Open school programs</span>
                    </li>
                    <li className="flex items-center text-gray-600">
                      <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                      <span>Industry certifications</span>
                    </li>
                    <li className="flex items-center text-gray-600">
                      <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                      <span>Flexible online learning</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">Explore Courses</Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Job Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge className="mb-4 bg-sky-100 text-primary/60 hover:bg-sky-100">EXPLORE OPPORTUNITIES</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Job Categories</h2>
              <p className="text-gray-600">
                Find the perfect job that matches your skills and career goals from our wide range of categories
              </p>
            </div>

            <div className="mb-8 overflow-x-auto scrollbar-hide">
              <div className="flex space-x-2 min-w-max p-1">
                {jobCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "outline"}
                    className={`rounded-full ${activeCategory === category.id
                      ? "bg-primary hover:bg-primary/60 text-white"
                      : "border-gray-300 text-gray-700 hover:border-primary hover:text-primary"
                      }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name} <span className="ml-1 text-xs opacity-80">({category.count})</span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobCategoriecards.map((category, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ duration: 0.5, delay: category.delay }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow group p-0">
                    <div className={`relative h-48 bg-gradient-to-r ${category.gradient}`}>
                      <Image
                        src={category.imageSrc}
                        alt={category.imageAlt}
                        width={200}
                        height={200}
                        className="absolute right-4 bottom-0 h-44 w-auto object-contain transition-transform group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={category.badgeColor}>{category.badgeText}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{category.title}</h3>
                          <p className="text-gray-600 text-sm">{category.description}</p>
                        </div>
                        <Badge variant="outline" className={category.jobsCountColor}>
                          {category.jobsCount}
                        </Badge>
                      </div>
                      <div className="space-y-2 mb-4">
                        {category.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-600">
                            <feature.icon className="h-4 w-4 mr-2" />
                            <span>{feature.text}</span>
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        className={`w-full ${category.buttonColor} transition-colors`}
                      >
                        Explore Jobs <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* View All */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center justify-center"
              >
                <Card className="overflow-hidden border-dashed border-2 hover:shadow-lg transition-shadow h-full w-full flex items-center justify-center">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      <ChevronRight className="h-6 w-6 text-gray-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">View All Categories</h3>
                    <p className="text-gray-600 text-sm mb-4">Explore all job categories and find your perfect match</p>
                    <Button
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    >
                      View All Categories
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

          </div>
        </section>

        {/* Featured Jobs */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge className="mb-4 bg-sky-100 text-primary hover:bg-sky-100">LATEST OPPORTUNITIES</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Job Openings</h2>
              <p className="text-gray-600">Handpicked opportunities from top companies across various industries</p>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList
                className="
    mb-6 w-full 
    grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 
    gap-2 bg-transparent"
              >
                {jobCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="data-[state=active]:bg-teal-100 border-1 data-[state=active]:text-green-800 data-[state=active]:shadow-none data-[state=active]:border-primary border-gray"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>


              <TabsContent value="all" className="mt-0">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {/* Job Card 1 */}
                  <motion.div variants={slideIn}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start">
                            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mr-4 overflow-hidden">
                              <Image
                                src="/images/ic-paytm.webp"
                                alt="Paytm"
                                width={40}
                                height={40}
                                className="w-10 h-10 object-contain"
                              />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">Senior Software Engineer</h3>
                              <p className="text-gray-600 text-sm">Paytm Services Pvt. Ltd.</p>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">New</Badge>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="outline" className="text-gray-600">
                            Full-time
                          </Badge>
                          <Badge variant="outline" className="text-gray-600">
                            Remote
                          </Badge>
                          <Badge variant="outline" className="text-gray-600">
                            5-8 yrs
                          </Badge>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                            <span>Bangalore, India (Remote)</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                            <span>₹18-25 LPA</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-6">
                          <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                            Apply Now
                          </Button>
                         
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>


                  {/* Job Card 2 */}
                  <motion.div variants={slideIn}>  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start">
                          <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center mr-4 overflow-hidden">
                            <Image
                              src="/images/zomato.webp"
                              alt="Zomato"
                              width={40}
                              height={40}
                              className="w-10 h-10 object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">Product Marketing Manager</h3>
                            <p className="text-gray-600 text-sm">Zomato</p>
                          </div>
                        </div>
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Featured</Badge>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className="text-gray-600">
                          Full-time
                        </Badge>
                        <Badge variant="outline" className="text-gray-600">
                          Hybrid
                        </Badge>
                        <Badge variant="outline" className="text-gray-600">
                          3-5 yrs
                        </Badge>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          <span>Gurgaon, India</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                          <span>₹12-18 LPA</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-6">
                        <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                          Apply Now
                        </Button>
                        
                      </div>
                    </CardContent>
                  </Card>
                  </motion.div>


                  {/* Job Card 3 */}
                  <motion.div variants={slideIn}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start">
                            <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center mr-4 overflow-hidden">
                              <Image
                                src="/images/ic-swiggy.webp"
                                alt="Swiggy"
                                width={40}
                                height={40}
                                className="w-10 h-10 object-contain"
                              />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">Operations Manager</h3>
                              <p className="text-gray-600 text-sm">Swiggy</p>
                            </div>
                          </div>
                          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Urgent</Badge>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="outline" className="text-gray-600">
                            Full-time
                          </Badge>
                          <Badge variant="outline" className="text-gray-600">
                            On-site
                          </Badge>
                          <Badge variant="outline" className="text-gray-600">
                            2-4 yrs
                          </Badge>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                            <span>Mumbai, India</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                            <span>₹8-12 LPA</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-6">
                          <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                            Apply Now
                          </Button>
                          
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>


                  {/* Job Card 4 */}
                  <motion.div variants={slideIn}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start">
                            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mr-4 overflow-hidden">
                              <Image
                                src="/images/bajaj.webp"
                                alt="Bajaj Allianz"
                                width={40}
                                height={40}
                                className="w-10 h-10 object-contain"
                              />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">Financial Advisor</h3>
                              <p className="text-gray-600 text-sm">Bajaj Allianz Life Insurance</p>
                            </div>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Remote</Badge>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="outline" className="text-gray-600">
                            Full-time
                          </Badge>
                          <Badge variant="outline" className="text-gray-600">
                            Remote
                          </Badge>
                          <Badge variant="outline" className="text-gray-600">
                            1-3 yrs
                          </Badge>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                            <span>Pan India (Remote)</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                            <span>₹5-8 LPA + Incentives</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-6">
                          <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                            Apply Now
                          </Button>
                          
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                </motion.div>

                <div className="mt-8 text-center">
                  <Button className=" bg-primary hover:primary/80 text-white">
                    View All Jobs <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="remote" className="mt-0">
                <div className="p-8 text-center">
                  <p className="text-gray-600">Remote jobs content will appear here</p>
                </div>
              </TabsContent>

              <TabsContent value="tech" className="mt-0">
                <div className="p-8 text-center">
                  <p className="text-gray-600">Tech jobs content will appear here</p>
                </div>
              </TabsContent>

              <TabsContent value="marketing" className="mt-0">
                <div className="p-8 text-center">
                  <p className="text-gray-600">Marketing jobs content will appear here</p>
                </div>
              </TabsContent>

              <TabsContent value="finance" className="mt-0">
                <div className="p-8 text-center">
                  <p className="text-gray-600">Finance jobs content will appear here</p>
                </div>
              </TabsContent>

              <TabsContent value="design" className="mt-0">
                <div className="p-8 text-center">
                  <p className="text-gray-600">Design jobs content will appear here</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge className="mb-4 bg-sky-100 text-primary hover:bg-sky-100">WHY CHOOSE IqraHire</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Features That Set Us Apart</h2>
              <p className="text-gray-600">Discover how IqraHire helps you find your dream job faster and easier</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                    <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>





        {/* For Employers */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.5 }}
                className="order-2 lg:order-1"
              >
                <Badge className="mb-4 bg-secondary/10 text-secondary">FOR EMPLOYERS</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Hire the Best Talent</h2>
                <p className="text-gray-600 mb-6">
                  Find qualified candidates quickly and efficiently. Post jobs, screen applicants, and connect with
                  potential hires all in one place.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                      <Users className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Access to 5Cr+ Candidates</h3>
                      <p className="text-gray-600">
                        Reach a diverse pool of qualified candidates across various industries and experience levels.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                      <Zap className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">AI-Powered Matching</h3>
                      <p className="text-gray-600">
                        Our advanced algorithms match your job requirements with the most suitable candidates.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                      <TrendingUp className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Streamlined Hiring</h3>
                      <p className="text-gray-600">
                        Simplify your recruitment process with our intuitive tools and features.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button className="bg-secondary text-white">
                    Post a Job <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="order-1 lg:order-2"
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="bg-secondary p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Employer Dashboard</h3>
                    <p className="text-white/80">Manage your hiring process efficiently</p>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Active Job Postings</h4>
                          <p className="text-sm text-gray-600">5 active jobs</p>
                        </div>
                        <div className="text-2xl font-bold text-secondary">5</div>
                      </div>

                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">New Applications</h4>
                          <p className="text-sm text-gray-600">Last 7 days</p>
                        </div>
                        <div className="text-2xl font-bold text-secondary">32</div>
                      </div>

                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Candidates Shortlisted</h4>
                          <p className="text-sm text-gray-600">Ready for interview</p>
                        </div>
                        <div className="text-2xl font-bold text-secondary">12</div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button className="w-full bg-secondary text-white">
                        View Dashboard
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-sky-100 text-primary hover:bg-sky-100">STAY UPDATED</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Never Miss an Opportunity</h2>
              <p className="text-gray-600 mb-8">
                Subscribe to our newsletter to receive personalized job recommendations and career advice directly in
                your inbox.
              </p>

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 border-gray-300 focus:border-primary focus:ring-primary"
                  required
                />
                <Button
                  type="submit"
                  className="bg-primary text-white"
                >
                  Subscribe
                </Button>
              </form>

              <p className="text-sm text-gray-500 mt-4">
                By subscribing, you agree to our Privacy Policy and consent to receive job-related emails.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-6">
                <span className="text-2xl font-bold text-primary">
                  Iqra<span className="text-secondary">Hire</span>
                </span>
              </Link>
              <p className="text-gray-400 mb-6 max-w-md">
                India&apos;s largest platform for job seekers and employers. Find jobs, build your network, and advance your
                career.
              </p>
              <div className="flex space-x-4">
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Find Jobs</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Jobs by Location
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Jobs by Skill
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Jobs by Title
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Jobs by Salary
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Remote Jobs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">For Employers</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Employer Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Recruitment Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Pricing Plans
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Enterprise Solutions
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Career Advice
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Resume Builder
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Interview Tips
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Salary Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} IqraHire. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
