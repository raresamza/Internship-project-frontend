import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../@/components/ui/dialog';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../@/components/ui/select';
import { toast } from 'sonner';
import { AbsenceParams, removeAbsence } from '../api/StudentService';
import { Student } from '../api/StudentService';

interface DeleteAbsenceDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDialogClose: () => void;
  selectedStudentId: number | null;
  currentCourseId: number | null;
  refreshStudents: () => void;
  selectedAbsenceToDelete: string | null;
  setSelectedAbsenceToDelete: React.Dispatch<React.SetStateAction<string | null>>;
  selectedStudentDetails: Student | null | undefined;
  formatDate: (dateString: string) => string;
}

const DeleteAbsenceDialog: React.FC<DeleteAbsenceDialogProps> = ({
  isOpen,
  setIsOpen,
  handleDialogClose,
  selectedStudentId,
  currentCourseId,
  refreshStudents,
  selectedAbsenceToDelete,
  setSelectedAbsenceToDelete,
  selectedStudentDetails,
  formatDate,
}) => {
  const handleAbsenceDelete = async () => {
    if (selectedAbsenceToDelete && selectedStudentId !== null && currentCourseId !== null) {
      const params: AbsenceParams = {
        date: selectedAbsenceToDelete,
        studentId: selectedStudentId,
        courseId: currentCourseId,
      };
      await removeAbsence(params);
      toast.success('Absence successfully removed 🎉', {
        style: {
          backgroundColor: 'green',
          color: 'white',
        },
      });
      handleDialogClose();
      refreshStudents(); // Refresh the student data after removing the absence
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="hidden" />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Absence</DialogTitle>
          <DialogDescription>
            Please select the absence date you want to delete.
          </DialogDescription>
        </DialogHeader>
        <Select onValueChange={setSelectedAbsenceToDelete}>
          <SelectTrigger className="w-full bg-red-500 text-white">
            <SelectValue placeholder="Select an absence date" />
          </SelectTrigger>
          <SelectContent>
            {selectedStudentDetails?.absences
              .filter(absence => absence.courseName === selectedStudentDetails?.absences.find(a => a.id === currentCourseId)?.courseName)
              .map((absence, index) => (
                <SelectItem key={index} value={absence.date}>
                  {formatDate(absence.date)}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <div className="flex justify-end mt-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
            onClick={handleAbsenceDelete}
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

export default DeleteAbsenceDialog;
