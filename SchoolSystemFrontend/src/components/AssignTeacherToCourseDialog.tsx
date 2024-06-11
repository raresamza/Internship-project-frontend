import React, { useEffect, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../@/components/ui/dialog';
import { toast } from 'sonner';
import { Course, getCoursesBySubject } from '../api/CourseService';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../@/components/ui/select';
import { getSubjectId } from '../utils/utils';
import { assignTeacherToCourse } from '../api/TeacherService';

interface AssignTeacherDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  teacherId: number;
  teacherSubject: string;
  refreshTeacher: () => void; // Function to refresh the teacher data
}

const AssignTeacherDialog: React.FC<AssignTeacherDialogProps> = ({ isOpen, setIsOpen, teacherId, teacherSubject, refreshTeacher }) => {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const subjectId = getSubjectId(teacherSubject);
        if (subjectId !== undefined) {
          const allCourses = await getCoursesBySubject(Number(subjectId));
          const availableCourses = allCourses.filter(course => !course.teacherId);
          setCourses(availableCourses);
        } else {
          toast.error('Invalid subject');
        }
      } catch (error) {
        toast.error('Failed to fetch courses');
        console.error('Error fetching courses:', error);
      }
    };

    if (isOpen) {
      fetchCourses();
    }
  }, [isOpen, teacherSubject]);

  const handleAssign = async () => {
    if (selectedCourse !== null) {
      try {
        const resp=await assignTeacherToCourse(selectedCourse, teacherId);
        console.log(resp)
        toast.success('Teacher assigned successfully 🎉',
            {
                style:{
                    background:"green",
                    color:"white"
                }
            }
        );
        setIsOpen(false);
        refreshTeacher(); // Refresh the teacher data to update assigned courses
      } catch (error) {
        toast.error('Failed to assign teacher',
            {
                style: {
                    background:"red",
                    color:"white"
                }
            }
        );
        console.error('Error assigning teacher:', error);
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
          <DialogTitle>Assign Teacher to Course</DialogTitle>
          <DialogDescription>Select a course to assign this teacher.</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Select onValueChange={(value) => setSelectedCourse(Number(value))}>
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
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-xl"
            onClick={handleAssign}
          >
            Assign
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-xl ml-2"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignTeacherDialog;
