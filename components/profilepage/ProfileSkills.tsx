import React from 'react'
import { TabsContent } from '../ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Pencil, Plus, Save } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { ProfileTagInput } from './ProfileTagInput';


interface Skills {
  technical: string[];
  soft: string[];
}

interface ProfileSkillsProps {
  skills: Skills;
  languages: string[];
}
const ProfileSkills: React.FC<ProfileSkillsProps> = ({skills, languages}) => {
  return (
    <>
     <TabsContent value="skills" className="mt-0">
            <Card className="border-0">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Skills</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                    //   onClick={() => toggleSectionDialog("skills", true)}
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                    //   onClick={() => handleEditProfile()}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Skill
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h4 className="font-medium mb-4">Technical Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {(skills?.technical ?? []).map((skill, index) => (
                      <Badge key={index} variant="default" className="py-1.5 bg-secondary-foreground text-black">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Soft Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {(skills?.soft ?? []).map((skill, index) => (
                      <Badge key={index} variant="outline" className="py-1.5">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {(languages ?? []).map((language, index) => (
                      <Badge key={index} variant="secondary" className="py-1.5 bg-secondary-foreground text-black">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Edit Dialog */}
          <Dialog
        //  open={editDialogs.skills} onOpenChange={(isOpen) => toggleSectionDialog("skills", isOpen)}>
        >
            <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Skills</DialogTitle>
                <DialogDescription>
                  Update your skills and languages.
                </DialogDescription>
              </DialogHeader>

              <div className="py-4 space-y-6">
                <div className="space-y-2">
                  <Label>Technical Skills</Label>
                  <ProfileTagInput
                    value={skills?.technical || []}
                    onChange={(newValue) => {
                      if (skills) {
                        // Handle the change logic here
                        console.log("Updated technical skills:", newValue);
                      }
                    }}
                    // onChange={(newValue) => {
                    //   if (skills) {
                    //     setUserData({
                    //       ...userData,
                    //       skills: {
                    //         ...userData.skills,
                    //         technical: newValue
                    //       }
                    //     });
                    //   }
                    // }}
                    placeholder="Add a technical skill"
                    maxHeight="max-h-48"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Soft Skills</Label>
                  <ProfileTagInput
                    value={skills?.soft || []}
                   onChange={(newValue) => {
                      if (skills) {
                        // Handle the change logic here
                        console.log("Updated technical skills:", newValue);
                      }
                    }}
                    placeholder="Add a soft skill"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Languages</Label>
                  <ProfileTagInput
                    value={languages || []}
                     onChange={(newValue) => {
                      if (skills) {
                        // Handle the change logic here
                        console.log("Updated technical skills:", newValue);
                      }
                    }}
                    placeholder="Add languages (e.g., English (Native))"
                  />
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button 
                // onClick={() => saveSection("skills", {
                //   skills: userData?.skills,
                //   languages: userData?.languages
                // })}>
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

export default ProfileSkills