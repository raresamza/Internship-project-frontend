import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../@/components/ui/dialog';
import { toast } from 'sonner';
import { addCourse } from '../api/CourseService';
import { subjectMapping, getSubjectId } from '../utils/utils';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../@/components/ui/select';

interface AddCourseDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refreshCourses: () => void;
}

const AddCourseDialog: React.FC<AddCourseDialogProps> = ({ isOpen, setIsOpen, refreshCourses }) => {
  const [courseName, setCourseName] = useState('');
  const [courseSubject, setCourseSubject] = useState('');

  const handleSubmit = async () => {
    console.log('Submit button clicked');
    const subjectId = getSubjectId(courseSubject);
    if (courseName && subjectId) {
      try {
        await addCourse(courseName, parseInt(subjectId));
        toast.success('Course successfully created 🎉', {
          style: {
            backgroundColor: 'green',
            color: 'white',
          },
        });
        refreshCourses();
        setIsOpen(false);
      } catch (error) {
        toast.error('Error when creating course', {
          style: {
            backgroundColor: 'red',
            color: 'white',
          },
        });
      }
    } 
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="hidden" />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Course</DialogTitle>
          <DialogDescription>
            Please enter the course details.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="border rounded p-2 w-full mt-2"
            placeholder="Enter course name"
          />
          <Select onValueChange={(value:string) => setCourseSubject(value)}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(subjectMapping).map((subjectId) => (
                <SelectItem key={subjectId} value={subjectMapping[subjectId]}>
                  {subjectMapping[subjectId]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded ml-2"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCourseDialog;
