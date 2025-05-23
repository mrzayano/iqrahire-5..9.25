"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MapPin, Pencil, Settings } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@clerk/nextjs";
import { Progress } from "../ui/progress";

interface UserData {
  metadata: {
    title?: string;
    cover_photo_url?: string;
  };
}

const ProfileHeader = ({ userDetails }: { userDetails: UserData }) => {
  const router = useRouter();
  const { user } = useUser();

  const handleEditProfile = () => {
    router.push("/edit-profile");
  };

  const initials = `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`.toUpperCase();
  const metadata = userDetails.metadata;

  return (
    <Card className="mb-8 overflow-hidden rounded-none sm:rounded-xl py-0 ">
      <CardContent className="p-0">
        {/* Cover Image */}
        <div className="relative h-40 sm:h-52 md:h-60 bg-muted overflow-hidden">
          {metadata.cover_photo_url && (
            <Image
              src={metadata.cover_photo_url}
              alt="Cover"
              fill
              className="object-cover"
              priority
            />
          )}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 bg-black/30 text-white hover:bg-black/50"
            onClick={handleEditProfile}
          >
            <Pencil className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Edit Cover</span>
          </Button>
        </div>

        {/* Profile Content */}
        <div className="relative px-6 sm:px-10 pb-6 pt-4">
          {/* Avatar */}
          <div className="absolute -top-12 sm:-top-16 left-6 sm:left-10">
            <Avatar className="size-24 sm:size-32 border-4 border-background shadow-md">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback className="text-2xl font-bold">{initials}</AvatarFallback>
            </Avatar>
          </div>

          {/* Info + Actions */}
          <div className="pt-16 sm:pt-20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-semibold leading-tight truncate">
                {user?.fullName}{" "}
                <span className="text-sm text-gray-500 font-normal align-middle">(He/Him)</span>
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base truncate">
                {metadata?.title || "Add a headline"}
              </p>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="truncate">{String(user?.publicMetadata?.location || "Add location")}</span>
              </div>
            </div>

            <div className="flex gap-2 sm:gap-3 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/settings")}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 max-w-lg">
            <div className="flex items-center justify-between mb-2 pr-2">
              <span className="text-sm font-medium text-muted-foreground">
                Your profile is 64% complete
              </span>
              <span className="text-sm font-bold text-muted-foreground">64%</span>
            </div>
            <Progress value={64} className="h-2 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
