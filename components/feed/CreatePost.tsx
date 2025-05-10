"use client"

import { useState, useRef } from "react"
import { useUser } from "@clerk/nextjs"
import Image from "next/image"
import { toast } from "sonner"
import { createPost } from "@/app/actions/posts"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, Link2, MapPin, Smile, X } from "lucide-react"
import EmojiPicker from "./EmojiPicker"

interface CreatePostDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onPostCreated?: (post: { id: string; content: string; imageUrl?: string; user_id: string }) => void
}

export function CreatePostDialog({
  isOpen,
  onOpenChange,
  onPostCreated,
}: CreatePostDialogProps) {
  const { user } = useUser()
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [showLinkInput, setShowLinkInput] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast("Error", {
        description: "Please enter some content for your post",
      })
      return
    }

    try {
      setIsLoading(true)

      const post = await createPost({
        user_id: user?.id ?? "",
        content,
        imageFile: selectedFile || undefined,
      })

      if (onPostCreated && typeof onPostCreated === "function") {
        onPostCreated(post[0]) // Assuming one row inserted
      }

      toast("Success", {
        description: "Your post has been created",
      })

      // Reset form
      setContent("")
      setSelectedImage(null)
      setSelectedFile(null)
      setLinkUrl("")
      setShowImageUpload(false)
      setShowLinkInput(false)
      onOpenChange(false)
    } catch (error) {
      console.error(error)
      toast("Error", {
        description: "Failed to create post",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddEmoji = (emoji: string) => {
    setContent((prev) => prev + emoji)
  }

  const handleImageUpload = () => {
    setShowImageUpload(!showImageUpload)
    setShowLinkInput(false)
    if (!showImageUpload && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleLinkAdd = () => {
    setShowLinkInput(!showLinkInput)
    setShowImageUpload(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast("Error", {
          description: "Image size should be less than 5MB",
        })
        return
      }

      setSelectedFile(file)

      const reader = new FileReader()
      reader.onload = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] animate-fade-in">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create Post</DialogTitle>
          <DialogDescription>Share your thoughts with your network</DialogDescription>
        </DialogHeader>

        {/* Author Info */}
        <div className="flex items-start space-x-4 pt-4">
          <Avatar>
            <AvatarImage src={user?.imageUrl || ""} />
            <AvatarFallback>
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-medium">
              {user?.firstName} {user?.lastName}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <MapPin className="mr-1 h-3 w-3" />
              <span>Kuala Lumpur, Malaysia</span>
            </div>
          </div>
        </div>

        {/* Text Area */}
        <Textarea
          placeholder="What would you like to share?"
          className="min-h-[150px] transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Image Preview */}
        {selectedImage && (
          <div className="animate-fade-in space-y-2">
            <div className="relative rounded-md overflow-hidden w-full h-40 bg-muted">
              <Image
                src={selectedImage}
                alt="Selected image"
                className="w-full h-full object-cover"
                width={100}
                height={100}
              />
              <button
                onClick={removeImage}
                className="absolute top-2 right-2 bg-black/50 rounded-full p-1 hover:bg-black/70 transition-colors"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />

        {/* Link Input */}
        {showLinkInput && (
          <div className="animate-fade-in">
            <input
              type="text"
              placeholder="Enter link URL"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedImage ? "default" : "outline"}
            size="sm"
            className="h-8 transition-colors"
            onClick={handleImageUpload}
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Add Image
          </Button>
          <Button
            variant={showLinkInput ? "default" : "outline"}
            size="sm"
            className="h-8 transition-colors"
            onClick={handleLinkAdd}
          >
            <Link2 className="mr-2 h-4 w-4" />
            Add Link
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <Smile className="mr-2 h-4 w-4" />
                Add Emoji
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <EmojiPicker onEmojiSelect={handleAddEmoji} />
            </PopoverContent>
          </Popover>
        </div>

        {/* Footer */}
        <DialogFooter className="gap-2 sm:gap-0 mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="transition-colors hover:bg-secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !content.trim()}
            className="transition-all"
          >
            {isLoading ? "Posting..." : "Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
