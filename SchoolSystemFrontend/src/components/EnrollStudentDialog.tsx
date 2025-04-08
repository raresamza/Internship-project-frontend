import React, { useEffect, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../@/components/ui/dialog';
import { toast } from 'sonner';
import { Course, enrollStudent } from '../api/CourseService'; // Ensure this is the correct path
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../@/components/ui/select';
import { getAllStudents, Student } from '../api/StudentService'; // Ensure this is the correct path
import axios from 'axios';

interface EnrollStudentDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  courseId: number;
  course: Course;
  refreshCourse: () => void; // Function to refresh the course data
}

const EnrollStudentDialog: React.FC<EnrollStudentDialogProps> = ({ isOpen, setIsOpen, courseId, course, refreshCourse }) => {
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [students, setStudents] = useState<Student[]>([]);

  const fetchStudents = async () => {
    try {
      const allStudents = await getAllStudents();
      // Fetch the selected course to get enrolled students
      const enrolledStudents = course.studentCourses?.map((studentCourse: { studentId: number }) => studentCourse.studentId) || [];

      // Filter out the students already enrolled in the course
      const availableStudents = allStudents.filter(student => !enrolledStudents.includes(student.id));
      setStudents(availableStudents);
    } catch (error) {
      toast.error('Failed to fetch students');
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStudents();
    }
  }, [isOpen, course]);

  const handleEnroll = async () => {
    if (selectedStudent !== null) {
      try {
        await enrollStudent(courseId, selectedStudent);
        toast.success('Student successfully enrolled 🎉', {
          style: {
            backgroundColor: 'green',
            color: 'white',
          },
        });
        setIsOpen(false);
        refreshCourse(); // Refresh the course data to update enrolled students
        fetchStudents(); // Refetch the students that can be enrolled
      } catch (error) {
        toast.error('Error enrolling student', {
          style: {
            backgroundColor: 'red',
            color: 'white',
          },
        }); console.error('Error enrolling student:', error);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="hidden" />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enroll Student</DialogTitle>
          <DialogDescription>Select a student to enroll in this course.</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Select onValueChange={(value:string) => setSelectedStudent(Number(value))}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Select a student" />
            </SelectTrigger>
            <SelectContent>
              {students.map((student) => (
                <SelectItem key={student.id} value={student.id.toString()}>
                  {student.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-xl"
            onClick={handleEnroll}
          >
            Enroll
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

export default EnrollStudentDialog;
