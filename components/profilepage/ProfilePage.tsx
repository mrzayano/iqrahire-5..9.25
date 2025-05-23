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
      {/* Profile Header */}
      {userData ? (
        <ProfileHeader userDetails={userData} />
      ) : (
        <div>Loading...</div>
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
