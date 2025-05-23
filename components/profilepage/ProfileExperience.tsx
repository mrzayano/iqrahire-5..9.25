import React from 'react';
import { TabsContent } from '../ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Briefcase, Calendar, MapPin, Pencil, Plus } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { JobExperience } from '@/types/user.data';

type ProfileExperienceProps = {
  experience: JobExperience[];
};

const ProfileExperience: React.FC<ProfileExperienceProps> = ({ experience }) => {
  return (
    <>
      <TabsContent value="experience" className="mt-0">
        <Card className="border-0">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">Experience</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Experience
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="border-b last:border-b-0 pb-6 last:pb-0">
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-full bg-muted/70 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium truncate">{exp.title}</h4>
                    <p className="text-muted-foreground truncate">{exp.company}</p>
                    <div className="text-sm text-muted-foreground flex flex-col sm:flex-row sm:gap-x-4 gap-y-1 mt-1">
                      <div className="flex items-center truncate max-w-full">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                        <span className="truncate">
                          {exp.duration.present
                            ? `${exp.duration.from} - Present`
                            : `${exp.duration.from} - ${exp.duration.to}`}
                        </span>
                      </div>
                      <div className="flex items-center truncate max-w-full">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{exp.location}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm line-clamp-3">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Experience Edit Dialog */}
      <Dialog>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Edit Experience</DialogTitle>
            <DialogDescription>
              To make detailed changes to your experiences, you&apos;ll need to use the full editor.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              For adding new experiences or making detailed changes to existing ones,
              please use the full profile editor which provides a more comprehensive interface.
            </p>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button>
              <Pencil className="h-4 w-4 mr-2" />
              Go to Full Editor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileExperience;
