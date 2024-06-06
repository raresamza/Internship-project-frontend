import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../@/components/ui/dialog';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../@/components/ui/select';
import { toast } from 'sonner';
import { GradeParams, removeGrade } from '../api/CourseService';
import { Student } from '../api/StudentService';

interface DeleteGradeDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDialogClose: () => void;
  selectedStudentId: number | null;
  currentCourseId: number | null;
  refreshStudents: () => void;
  selectedGradeToDelete: string | null;
  setSelectedGradeToDelete: React.Dispatch<React.SetStateAction<string | null>>;
  selectedStudentDetails: Student | null | undefined;
  setCloseReason: React.Dispatch<React.SetStateAction<'success' | 'user' | null>>; // New prop
}

const DeleteGradeDialog: React.FC<DeleteGradeDialogProps> = ({
  isOpen,
  setIsOpen,
  handleDialogClose,
  selectedStudentId,
  currentCourseId,
  refreshStudents,
  selectedGradeToDelete,
  setSelectedGradeToDelete,
  selectedStudentDetails,
  setCloseReason
}) => {
  const handleGradeDelete = async () => {
    if (selectedGradeToDelete && selectedStudentId !== null && currentCourseId !== null) {
      const params: GradeParams = {
        grade: Number(selectedGradeToDelete),
        studentId: selectedStudentId,
        courseId: currentCourseId,
      };
      await removeGrade(params);
      setCloseReason('success');
      toast.success('Grade successfully removed 🎉', {
        style: {
          backgroundColor: 'green',
          color: 'white',
        },
      });
      handleDialogClose();
      refreshStudents(); // Refresh the student data after removing the grade
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="hidden" />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Grade</DialogTitle>
          <DialogDescription>
            Please select the grade you want to delete.
          </DialogDescription>
        </DialogHeader>
        <Select onValueChange={setSelectedGradeToDelete}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a grade" />
          </SelectTrigger>
          <SelectContent>
            {selectedStudentDetails?.grades
              .filter(gradeItem => gradeItem.courseName === selectedStudentDetails?.grades.find(g => g.courseId === currentCourseId)?.courseName)
              .flatMap(gradeItem => gradeItem.gradeValues)
              .map((gradeValue, index) => (
                <SelectItem key={index} value={gradeValue.toString()}>
                  {gradeValue}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <div className="flex justify-end mt-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
            onClick={handleGradeDelete}
          >
            Delete
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded ml-2"
            onClick={handleDialogClose}
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteGradeDialog;
