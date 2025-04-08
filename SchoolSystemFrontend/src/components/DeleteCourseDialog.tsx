import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../@/components/ui/dialog';
import { toast } from 'sonner';
import { deleteCourse } from '../api/CourseService';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../@/components/ui/select';
import { Course } from '../api/CourseService';

interface DeleteCourseDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  courses: Course[];
  refreshCourses: () => void;
}

const DeleteCourseDialog: React.FC<DeleteCourseDialogProps> = ({ isOpen, setIsOpen, courses, refreshCourses }) => {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  const handleDelete = async () => {
    if (selectedCourse !== null) {
      try {
        await deleteCourse(selectedCourse);
        toast.success('Course successfully deleted 🎉', {
            style: {
              backgroundColor: 'green',
              color: 'white',
            },
          });
        refreshCourses();
        setIsOpen(false);
      } catch (error) {
        toast.error('Failed to delete course', {
            style: {
              backgroundColor: 'red',
              color: 'white',
            },
          })
      }
    } else {
      toast.error('Please select a course');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="hidden" />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Course</DialogTitle>
          <DialogDescription>Select a course to delete.</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Select onValueChange={(value:string) => setSelectedCourse(Number(value))}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Select a course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((course) => (
                <SelectItem key={course.id} value={course.id.toString()}>
                  {course.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
            onClick={handleDelete}
          >
            Delete
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

export default DeleteCourseDialog;
