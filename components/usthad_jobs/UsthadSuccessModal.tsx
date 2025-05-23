"use client"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, MessageCircle, } from "lucide-react"

interface UsthadSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  jobTitle: string
}

const UsthadSuccessModal = ({ isOpen, onClose, jobTitle }: UsthadSuccessModalProps) => {
  const whatsappCommunityLink = "https://chat.whatsapp.com/example-community-link"

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleJoinWhatsApp = () => {
    window.open(whatsappCommunityLink, "_blank")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-900 pr-8">Application Successful!</DialogTitle>
            
          </div>
        </DialogHeader>

        <div className="text-center space-y-6 py-6">
          <div className="flex justify-center">
            <div className="bg-green-100 rounded-full p-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Application Submitted Successfully!</h3>
            <p className="text-gray-600 leading-relaxed">
              Your application for <span className="font-medium text-gray-900">{jobTitle}</span> has been submitted
              successfully. We will review your application and get back to you soon.
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 p-6 rounded-lg space-y-4">
            <div className="flex items-center justify-center gap-2 text-green-700">
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">Join Our WhatsApp Community</span>
            </div>
            <p className="text-sm text-green-600 leading-relaxed">
              Stay updated with job opportunities and connect with fellow Usthadhs in our community.
            </p>
            <Button onClick={handleJoinWhatsApp} className="w-full h-11 bg-green-600 hover:bg-green-700 text-white">
              <MessageCircle className="h-4 w-4 mr-2" />
              Join WhatsApp Community
            </Button>
          </div>

          <Button variant="outline" onClick={onClose} className="w-full h-11 border-gray-200 hover:bg-gray-50">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UsthadSuccessModal
