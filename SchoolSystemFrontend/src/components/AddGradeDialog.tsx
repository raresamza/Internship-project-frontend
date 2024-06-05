import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../@/components/ui/dialog';
import { toast } from 'sonner';
import { GradeParams, addGrade } from '../api/CourseService';

interface AddGradeDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDialogClose: () => void;
  selectedStudentId: number | null;
  currentCourseId: number | null;
  refreshStudents: () => void;
  newGrade: string;
  setNewGrade: React.Dispatch<React.SetStateAction<string>>;
}

const AddGradeDialog: React.FC<AddGradeDialogProps> = ({
  isOpen,
  setIsOpen,
  handleDialogClose,
  selectedStudentId,
  currentCourseId,
  refreshStudents,
  newGrade,
  setNewGrade,
}) => {
  const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (parseInt(value, 10) >= 1 && parseInt(value, 10) <= 10)) {
      setNewGrade(value);
    }
  };

  const handleGradeSubmit = async () => {
    if (newGrade && selectedStudentId !== null && currentCourseId !== null) {
      const params: GradeParams = {
        grade: Number(newGrade),
        studentId: selectedStudentId,
        courseId: currentCourseId,
      };
      await addGrade(params);
      toast.success('Grade successfully added 🎉', {
        style: {
          backgroundColor: 'green',
          color: 'white',
        },
      });
      handleDialogClose();
      refreshStudents(); // Refresh the student data after adding the grade
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="hidden" />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Grade</DialogTitle>
          <DialogDescription>
            Please enter the grade for the selected student.
          </DialogDescription>
        </DialogHeader>
        <input
          type="number"
          value={newGrade}
          onChange={handleGradeChange}
          className="border rounded p-2 w-full mt-4"
          placeholder="Enter grade"
          min="1"
          max="10"
          step="1"
        />
        <div className="flex justify-end mt-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
            onClick={handleGradeSubmit}
          >
            Submit
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

export default AddGradeDialog;
