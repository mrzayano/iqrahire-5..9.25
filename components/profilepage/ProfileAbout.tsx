import { TabsContent } from '@radix-ui/react-tabs'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Pencil, Save } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Textarea } from '../ui/textarea'

// Define props type for about
type ProfileAboutProps = {
    about: string;
};

const ProfileAbout: React.FC<ProfileAboutProps> = ({ about }) => {
    return (
        <>
            <TabsContent value="about" className="mt-0">
                <Card className="border-0">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-xl">About</CardTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                            // onClick={() => toggleSectionDialog("about", true)}
                            >
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {about?.split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </CardContent>
                </Card>
            </TabsContent>

            <Dialog 
            // open={editDialogs.about} onOpenChange={(isOpen) => toggleSectionDialog("about", isOpen)}
            >
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle>Edit About</DialogTitle>
                        <DialogDescription>
                            Share information about yourself, your experience, and what you&apos;re passionate about.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        <Textarea
                            value={about}
                            // onChange={(e) => setUserData({ ...userData, about: e.target.value })}
                            className="min-h-[200px] resize-none"
                            placeholder="Tell people about yourself, your experience, and what you're passionate about..."
                        />
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button 
                        // onClick={() => saveSection("about", { about: userData?.about })}
                        >
                            <Save className="h-4 w-4 mr-2" />
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ProfileAbout