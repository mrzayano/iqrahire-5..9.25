import { Post } from "./feed.post";


export interface JobExperience {
    title: string;
    company: string;
    duration: {
        from?: string;
        to?: string;
        present?: boolean;
    };
    location: string;
    description: string;
}

export interface EducationEntry {
    institution: string;
    degree: string;
    duration: string;
    location: string;
    description: string;
}

export interface User {
    email: string;
    fullName: string;
    avatar: string;
    metadata: {
        about?: string;
        email?: string;
        title?: string;
        fullname?: string;
        lastname?: string;
        location?: string;
        firstname?: string;
        pronounce?: string[];
        services?: string[];
        languages?: string[];
        connections?: number;
        cover_photo_url?: string;
        onboardingComplete?: boolean;
        skills: {
            technical: string[];
            soft: string[];
        };
        basicInfo?: {
            dob?: string;
            gender?: string;
        };
        professional?: {
            role?: string;
            industry?: string;
        };
        experience: JobExperience;
        education: EducationEntry;
    };
    posts: Post[];
}
