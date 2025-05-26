"use client";
import { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { getCurrentUser } from "@/actions/fetch_user_data";
import { User } from "@/types/user.data";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileSkills from "./ProfileSkills";
import ProfilePost from "./ProfilePost";
import { Skeleton } from "../ui/skeleton";

const ProfilePage = () => {
  const [userData, setUserData] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  // const handleEditProfile = () => {
  //   router.push("/edit-profile");
  // };

  // const toggleSectionDialog = (section: string, isOpen: boolean) => {
  //   setEditDialogs({
  //     ...editDialogs,
  //     [section]: isOpen,
  //   });
  // };

  // const saveSection = (section: string, data: any) => {
  //   setUserData({
  //     ...userData,
  //     ...data,
  //   });
  //   toggleSectionDialog(section, false);
  // };

  const safeExperience = Array.isArray(userData?.metadata?.experience)
    ? userData.metadata.experience
    : [];

  const safeEducation = Array.isArray(userData?.metadata?.education)
    ? userData.metadata.education
    : [];

  return (
    <div className="w-full overflow-x-hidden mx-auto max-w-full p-0 sm:px-6 sm:py-4 md:py-8">
    {userData ? (
  <ProfileHeader userDetails={userData} />
) : (
  <div className="mb-8">
    <div className="relative h-40 sm:h-52 md:h-60 bg-muted overflow-hidden">
      <Skeleton className="w-full h-full absolute top-0 left-0" />
    </div>
    <div className="relative px-6 sm:px-10 pb-6 pt-4">
      <div className="absolute -top-12 sm:-top-16 left-6 sm:left-10">
        <Skeleton className="size-24 sm:size-32 rounded-full border-4 border-background shadow-md" />
      </div>
      <div className="pt-16 sm:pt-20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 sm:h-8 w-3/5" />
          <Skeleton className="h-4 w-2/5" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <div className="flex gap-2 sm:gap-3 flex-wrap">
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </div>
      <div className="mt-6 max-w-lg space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-2 w-full" />
      </div>
    </div>
  </div>
)}


      
      {/* Tabs */}
      <div className="mb-8">
        <Tabs defaultValue="about" className="w-full">
          <div className="mb-6 w-full overflow-x-auto scrollbar-hide -webkit-overflow-scrolling-touch mx-2">
            <TabsList className="inline-flex gap-1 sm:gap-4 px-2 sm:px-4 min-w-[max-content] ">
              {["about", "experience", "education", "skills", "posts"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="relative text-[12px] md:text-sm px-3 py-1.5 rounded-md transition-colors whitespace-nowrap
          hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring
          data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  <span className="absolute left-1/2 -bottom-1 h-0.5 w-1/2 -translate-x-1/2 bg-primary scale-x-0 transition-transform duration-300 data-[state=active]:scale-x-100" />
                </TabsTrigger>
              ))}
            </TabsList>
          </div>




          {/* About Section */}
          <TabsContent value="about">
            <ProfileAbout about={userData?.metadata?.about || ""} />
          </TabsContent>

          {/* Experience Section */}
          <TabsContent value="experience">
            <ProfileExperience experience={safeExperience} />
          </TabsContent>

          {/* Education Section */}
          <TabsContent value="education">
            <ProfileEducation education={safeEducation} />
          </TabsContent>

          {/* Skills Section */}
          <TabsContent value="skills">
            <ProfileSkills
              skills={userData?.metadata?.skills || { technical: [], soft: [] }}
              languages={userData?.metadata?.languages || []}
            />
          </TabsContent>

          {/* Posts Section */}
          <TabsContent value="posts">
            <ProfilePost
              posts={userData?.posts || []}
              avatar={userData?.avatar || ""}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
