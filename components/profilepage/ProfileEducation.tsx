import React from 'react'
import { TabsContent } from '../ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Calendar, GraduationCap, MapPin, Pencil, Plus } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { EducationEntry } from '@/types/user.data'

type ProfileEducationProps = {
  education: EducationEntry[];
};

const ProfileEducation: React.FC<ProfileEducationProps> = ({education}) => {
    return (
        <>
            <TabsContent value="education" className="mt-0">
                <Card className="border-0">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-xl">Education</CardTitle>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    // onClick={() => toggleSectionDialog("education", true)}
                                >
                                    <Pencil className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    // onClick={() => handleEditProfile()}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Education
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {education.map((education, index) => (
                            <div key={index} className="border-b last:border-b-0 pb-6 last:pb-0">
                                <div className="flex items-start gap-4">
                                    <div className="size-10 rounded-full bg-muted/70 flex items-center justify-center flex-shrink-0">
                                        <GraduationCap className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h4 className="font-medium truncate">{education.institution}</h4>
                                        <p className="text-muted-foreground truncate">{education.degree}</p>
                                        <div className="text-sm text-muted-foreground flex flex-col sm:flex-row sm:gap-x-4 gap-y-1 mt-1">
                                            <div className="flex items-center truncate max-w-full">
                                                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                                                <span className="truncate">{education.duration}</span>
                                            </div>
                                            <div className="flex items-center truncate max-w-full">
                                                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                                                <span className="truncate">{education.location}</span>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-sm line-clamp-3">{education.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </TabsContent>

            {/* Education Edit Dialog */}
            <Dialog 
            // open={editDialogs.education} onOpenChange={(isOpen) => toggleSectionDialog("education", isOpen)}>
            >
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle>Edit Education</DialogTitle>
                        <DialogDescription>
                            To make detailed changes to your education, you&apos;ll need to use the full editor.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        <p className="text-sm text-muted-foreground">
                            For adding new education entries or making detailed changes to existing ones,
                            please use the full profile editor which provides a more comprehensive interface.
                        </p>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button 
                        // onClick={handleEditProfile}
                        >
                            <Pencil className="h-4 w-4 mr-2" />
                            Go to Full Editor
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ProfileEducation