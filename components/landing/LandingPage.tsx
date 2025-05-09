"use client"
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Menu, X } from "lucide-react"
import Image from "next/image";

export default function LandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const { isSignedIn } = useUser();


    // Animation variants


    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-sm">
                <div className="container flex h-16 items-center justify-between py-4">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-teal-600">Iqrahire</span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                        <Link href="/#features" className="nav-link">
                            Why Iqrahire
                        </Link>
                        <Link href="/#organizations" className="nav-link">
                            Organizations
                        </Link>
                        <Link href="/#jobs" className="nav-link">
                            Jobs
                        </Link>
                        <Link href="/#learning" className="nav-link">
                            Learning
                        </Link>
                    </nav>

                    {/* Auth Buttons / Profile */}
                    <div className="flex items-center space-x-4">
                        {isSignedIn ? (
                            <Button asChild>
                                <Link href="/feed">Go to Feed</Link>
                            </Button>
                        ) : (
                            <>
                                <SignInButton mode="modal">
                                    <Button variant="outline" className="hidden md:inline-flex">
                                        Sign In
                                    </Button>
                                </SignInButton>
                                <SignUpButton mode="modal">
                                    <Button className="hidden md:inline-flex">Join Now</Button>
                                </SignUpButton>
                                <Button asChild className="md:hidden">
                                    <Link href="/sign-up">Join Now</Link>
                                </Button>
                            </>
                        )}
                        <button
                            className="md:hidden rounded-full size-10 flex items-center justify-center"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle Menu"
                        >
                            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t p-4">
                        <nav className="flex flex-col space-y-4">
                            <Link href="/#features" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                Why Iqrahire
                            </Link>
                            <Link href="/#organizations" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                Organizations
                            </Link>
                            <Link href="/#jobs" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                Jobs
                            </Link>
                            <Link href="/#learning" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                Learning
                            </Link>
                        </nav>
                    </div>
                )}
            </header>

            {/* Hero Section */}
            <section className="py-20 px-6 md:py-32 relative">
                <div className="absolute inset-0 opacity-10 islamic-pattern"></div>
                <div className="container grid gap-8 md:grid-cols-2 items-center relative z-10">
                    <div className="flex flex-col space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold islamic-heading">
                            Professional networking with purpose and values
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Connect, grow, and find opportunities in a network that respects your values and principles.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button asChild size="lg" className="text-base">
                                <Link href="/sign-up">Join the Community</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="text-base">
                                <Link href="/#features">Learn More</Link>
                            </Button>
                        </div>
                        <div className="flex items-center mt-6">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Avatar key={i} className="border-2 border-background size-8">
                                        <AvatarFallback>{i}</AvatarFallback>
                                    </Avatar>
                                ))}
                            </div>
                            <p className="text-sm ml-3 text-muted-foreground">
                                Join <span className="font-bold text-foreground">10,000+</span> professionals
                            </p>
                        </div>
                    </div>

                    <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden islamic-border">
                        <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-darkBlue-500/20"></div>
                        <Image
                            width={100}
                            height={100}
                            src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                            alt="Professionals networking"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Trusted Organizations */}
            <section id="organizations" className="py-16 bg-muted/50">
                <div className="container">
                    <h2 className="text-center text-2xl md:text-3xl font-bold mb-12">Trusted by Leading Organizations</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="flex items-center justify-center h-16">
                                <div className="bg-muted/50 text-primary font-semibold rounded-md px-4 py-2">Company {i + 1}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold islamic-heading mb-6">Why Choose Iqrahire</h2>
                        <p className="text-xl text-muted-foreground">
                            A professional networking platform built around shared values, ethics, and purposeful connections.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Value-Aligned Community",
                                description: "Connect with professionals who share your principles and ethical framework.",
                                icon: "👥",
                            },
                            {
                                title: "Ethical Career Growth",
                                description: "Find opportunities with organizations that respect your values and beliefs.",
                                icon: "🌱",
                            },
                            {
                                title: "Purpose-Driven Networking",
                                description: "Build meaningful professional relationships based on shared purpose and values.",
                                icon: "🤝",
                            },
                            {
                                title: "Continuous Learning",
                                description: "Access resources for personal and professional development aligned with your values.",
                                icon: "📚",
                            },
                            {
                                title: "Global Perspective",
                                description: "Connect with diverse professionals worldwide who share your ethical outlook.",
                                icon: "🌍",
                            },
                            {
                                title: "Inclusive Environment",
                                description: "Experience a platform that celebrates diversity while respecting core values.",
                                icon: "🌈",
                            },
                        ].map((feature, index) => (
                            <Card key={index} className="bg-background card-hover">
                                <CardContent className="p-6">
                                    <div className="mb-4 text-4xl">{feature.icon}</div>
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Global Community */}
            <section className="py-20 bg-linear-to-br from-primary/10 to-darkBlue-500/10">
                <div className="container grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold islamic-heading mb-6">
                            Join a Global Community of Professionals
                        </h2>
                        <p className="text-lg mb-6">
                            Connect with like-minded professionals across the globe who share your values and principles. Build
                            networks that go beyond business to create meaningful impact.
                        </p>
                        <ul className="space-y-4 mb-8">
                            {[
                                "Access to 10,000+ value-aligned professionals",
                                "Connect across 40+ countries worldwide",
                                "Industry-specific networking groups",
                                "Regular virtual and in-person events",
                            ].map((item, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <div className="size-6 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                                        ✓
                                    </div>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <Button asChild size="lg">
                            <Link href="/sign-up">Join the Community</Link>
                        </Button>
                    </div>

                    <div className="relative h-[400px] rounded-lg overflow-hidden islamic-border">
                        <Image
                            width={100}
                            height={100}
                            src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                            alt="Global community"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20">
                <div className="container">
                    <h2 className="text-3xl md:text-4xl font-bold text-center islamic-heading mb-16">What Our Community Says</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                quote:
                                    "Iqrahire has transformed how I approach networking. I've found connections that align perfectly with my values.",
                                author: "Ahmed Khan",
                                role: "Software Engineer",
                            },
                            {
                                quote:
                                    "Finding value-aligned job opportunities has never been easier. I'm grateful to have found an ethical employer through Iqrahire.",
                                author: "Fatima Rahman",
                                role: "Marketing Specialist",
                            },
                            {
                                quote:
                                    "The learning resources on Iqrahire have helped me grow professionally while staying true to my principles.",
                                author: "Yusuf Ali",
                                role: "Product Manager",
                            },
                        ].map((testimonial, index) => (
                            <Card key={index} className="bg-background card-hover">
                                <CardContent className="p-6">
                                    <div className="text-4xl mb-4 text-primary">&quot;</div>
                                    <p className="mb-6 text-muted-foreground italic">{testimonial.quote}</p>
                                    <div className="flex items-center">
                                        <Avatar className="mr-3">
                                            <AvatarFallback>
                                                {testimonial.author
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{testimonial.author}</p>
                                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Job Listings */}
            <section id="jobs" className="py-20 bg-muted/20">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold islamic-heading mb-6">Value-Aligned Job Listings</h2>
                        <p className="text-xl text-muted-foreground">
                            Find career opportunities with organizations that share your values and ethical standards.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {[
                            {
                                title: "Senior Software Engineer",
                                company: "Ethical Tech Solutions",
                                location: "Remote",
                                type: "Full-time",
                            },
                            {
                                title: "Marketing Specialist",
                                company: "Halal Brands Inc.",
                                location: "Dubai, UAE",
                                type: "Full-time",
                            },
                            {
                                title: "Financial Analyst",
                                company: "Islamic Finance Group",
                                location: "London, UK",
                                type: "Full-time",
                            },
                            {
                                title: "UX Designer",
                                company: "CreativeWorks",
                                location: "Toronto, Canada",
                                type: "Contract",
                            },
                            {
                                title: "Data Scientist",
                                company: "AnalyticsPro",
                                location: "Kuala Lumpur, Malaysia",
                                type: "Full-time",
                            },
                            {
                                title: "Product Manager",
                                company: "TechStart",
                                location: "Jakarta, Indonesia",
                                type: "Full-time",
                            },
                        ].map((job, index) => (
                            <Card key={index} className="bg-background card-hover">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-lg font-semibold">{job.title}</h3>
                                        <div className="text-xs bg-accent text-accent-foreground rounded-full px-3 py-1">{job.type}</div>
                                    </div>
                                    <p className="text-muted-foreground mb-3">{job.company}</p>
                                    <p className="text-sm flex items-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="size-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        {job.location}
                                    </p>
                                    <div className="mt-4 pt-4 border-t">
                                        <Button variant="outline" className="w-full">
                                            View Details
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center">
                        <Button asChild>
                            <Link href="/jobs">Browse All Jobs</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Learning Section */}
            <section id="learning" className="py-20">
                <div className="container grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative h-[400px] rounded-lg overflow-hidden islamic-border">
                        <Image
                            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                            width={100}
                            height={100}
                            alt="Learning and development"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold islamic-heading mb-6">Continuous Learning & Development</h2>
                        <p className="text-lg mb-6">
                            Access a wide range of learning resources to help you grow personally and professionally while staying
                            true to your values and principles.
                        </p>
                        <ul className="space-y-4 mb-8">
                            {[
                                "Value-aligned professional courses",
                                "Skill development workshops",
                                "Industry-specific training",
                                "Personal development resources",
                            ].map((item, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <div className="size-6 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                                        ✓
                                    </div>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <Button asChild>
                            <Link href="/learning">Explore Learning Resources</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-linear-to-br from-primary to-darkBlue-500 text-white">
                <div className="container text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Iqrahire?</h2>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10">
                        Connect with professionals, find value-aligned opportunities, and grow your career with purpose.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="bg-white hover:bg-white/90 text-primary border-white"
                        >
                            <Link href="/sign-up">Create Account</Link>
                        </Button>
                        <Button asChild size="lg" variant="ghost" className="text-white hover:bg-white/20">
                            <Link href="/sign-in">Sign In</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-muted py-12">
                <div className="container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                        <div>
                            <h3 className="font-semibold mb-4">Company</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/about" className="text-muted-foreground hover:text-primary">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/careers" className="text-muted-foreground hover:text-primary">
                                        Careers
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/blog" className="text-muted-foreground hover:text-primary">
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/press" className="text-muted-foreground hover:text-primary">
                                        Press
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Solutions</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/networking" className="text-muted-foreground hover:text-primary">
                                        Networking
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/jobs" className="text-muted-foreground hover:text-primary">
                                        Jobs
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/learning" className="text-muted-foreground hover:text-primary">
                                        Learning
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/advertising" className="text-muted-foreground hover:text-primary">
                                        Advertising
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Resources</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/help" className="text-muted-foreground hover:text-primary">
                                        Help Center
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/guidelines" className="text-muted-foreground hover:text-primary">
                                        Guidelines
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/developers" className="text-muted-foreground hover:text-primary">
                                        Developers
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/sitemap" className="text-muted-foreground hover:text-primary">
                                        Sitemap
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Legal</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/terms" className="text-muted-foreground hover:text-primary">
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/cookies" className="text-muted-foreground hover:text-primary">
                                        Cookie Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/accessibility" className="text-muted-foreground hover:text-primary">
                                        Accessibility
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <span className="text-2xl font-bold text-teal-600">Iqrahire</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            &copy; {new Date().getFullYear()} Iqrahire. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
