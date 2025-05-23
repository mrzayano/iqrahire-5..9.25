"use client"

import { Edit, MoreVertical,  Share2, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { TabsContent } from "../ui/tabs"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { AlertDialog } from "@radix-ui/react-alert-dialog"
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog"
import { Post } from "@/types/feed.post"
import React from "react"
import { AvatarImage } from "@radix-ui/react-avatar"

interface ProfilePostProps {
  posts: Post[];
  avatar: string;
}


const ProfilePost:React.FC<ProfilePostProps> = ({posts, avatar}) => {
  // Sample posts data - in a real app, this would come from a database
 

  


console.log(avatar,"avaat");


  return (
    <>
      
        <TabsContent value="posts" className="mt-0">
          <Card className="mb-4 border-0">
            <CardContent className="p-4 sm:p-6">
              <div className="flex gap-3 items-center">
                <Avatar className="size-8 sm:size-10">
                    <AvatarImage src={avatar}/>
                  <AvatarFallback>ZA</AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  className="flex-1 justify-start text-muted-foreground h-10 px-4"
                  // onClick={() => router.push("/create-post")}
                >
                  Share your thoughts...
                </Button>
              </div>
            </CardContent>
          </Card>

          {posts.map((post) => (
            <Card key={post.id} className="mb-4 border-0">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-3">
                  <Avatar className="flex-shrink-0 size-8 sm:size-10">
                    <AvatarImage src={avatar}/>
                    <AvatarFallback>ZA</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <div className="min-w-0">
                        <p className="font-medium truncate">{"Me"}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">
                             {new Date(post.created_at).toLocaleString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                        })}
                            </p>
                      </div>

                      {/* Show dropdown menu with edit/delete options only if user is the creator */}
                      
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">More options</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                            //  onClick={() => handleEditClick(post)}
                             >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit post
                            </DropdownMenuItem>
                            <DropdownMenuItem
                            //   onClick={() => handleDeleteClick(post.id)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete post
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      
                    </div>

                    <div className="mt-3">
                      <p className="text-sm text-muted-foreground line-clamp-3">{post.content}</p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button variant="ghost" size="sm" className="h-8">
                        Like • {post.like_count}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8">
                        Comment • {"12"}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8">
                        <Share2/>
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      

      {/* Edit Post Dialog */}
      <Dialog
    //    open={editDialogOpen} onOpenChange={setEditDialogOpen}
       >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                // value={editTitle}
                // onChange={(e) => setEditTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="content" className="text-sm font-medium">
                Content
              </label>
              <Textarea
                id="content"
                // value={editContent}
                // onChange={(e) => setEditContent(e.target.value)}
                rows={5}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline"
            //  onClick={() => setEditDialogOpen(false)}>
            >
              Cancel
            </Button>
            <Button 
            // onClick={handleSaveEdit}
            >Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog 
    //   open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your post and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
            //   onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default ProfilePost
