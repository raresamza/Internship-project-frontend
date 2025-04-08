import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../@/components/ui/dialog';
import { toast } from 'sonner';
// import { AbsenceParams, addAbsence, createAbsence } from '../api/CourseService';
import { AbsenceParams, addAbsence } from '../api/StudentService';
import { createAbsence } from '../api/Absence';


interface AddAbsenceDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDialogClose: () => void;
  selectedStudentId: number | null;
  currentCourseId: number | null;
  refreshStudents: () => void;
  newAbsenceDate: string;
  setNewAbsenceDate: React.Dispatch<React.SetStateAction<string>>;
  setCloseReason: React.Dispatch<React.SetStateAction<'success' | 'user' | null>>; // New prop
}

const AddAbsenceDialog: React.FC<AddAbsenceDialogProps> = ({
  isOpen,
  setIsOpen,
  handleDialogClose,
  selectedStudentId,
  currentCourseId,
  refreshStudents,
  newAbsenceDate,
  setNewAbsenceDate,
  setCloseReason
}) => {
  const handleAbsenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAbsenceDate(e.target.value);
  };

  const handleAbsenceSubmit = async () => {
    if (newAbsenceDate && selectedStudentId !== null && currentCourseId !== null) {
      try {
        const absenceId = await createAbsence(newAbsenceDate, currentCourseId);
        const params: AbsenceParams = {
          date: newAbsenceDate,
          studentId: selectedStudentId,
          courseId:currentCourseId,
          absenceId, // Use the correct absenceId
        };
        await addAbsence(params);
        setCloseReason("success")
        toast.success('Absence successfully created and added 🎉', {
          style: {
            backgroundColor: 'green',
            color: 'white',
          },
        });
        handleDialogClose();
        refreshStudents(); // Refresh the student data after creating and adding the absence
      } catch (error) {
        handleAxiosError(error, 'Failed to create and add absence');
      }
    }
  };

  // Type guard to check if error is an AxiosError
  function isAxiosError(error: unknown): error is import('axios').AxiosError {
    return (error as import('axios').AxiosError).isAxiosError !== undefined;
  }

  // Error handling function
  function handleAxiosError(error: unknown, defaultMessage: string) {
    if (isAxiosError(error)) {
      toast.error(`${defaultMessage}: ${error.message}`, {
        style: {
          backgroundColor: 'red',
          color: 'white',
        },
      });
    } else {
      toast.error(defaultMessage, {
        style: {
          backgroundColor: 'red',
          color: 'white',
        },
      });
    }
    console.error(defaultMessage, error);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="hidden" />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Absence</DialogTitle>
          <DialogDescription>
            Please enter the absence date for the selected student.
          </DialogDescription>
        </DialogHeader>
        <input
          type="date"
          value={newAbsenceDate}
          onChange={handleAbsenceChange}
          className="border rounded p-2 w-full mt-4"
          placeholder="Enter absence date"
        />
        <div className="flex justify-end mt-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
            onClick={handleAbsenceSubmit}
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

export default AddAbsenceDialog;
