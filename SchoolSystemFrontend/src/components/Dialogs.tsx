import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../@/components/ui/dialog';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../@/components/ui/select';
import { toast } from 'sonner';
import { GradeParams, addGrade, removeGrade } from '../api/CourseService';
import {AbsenceParams, addAbsence, DeleteAbsenceParams, removeAbsence}  from "../api/StudentService"
import { Student } from '../api/StudentService';

interface DialogsProps {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAddAbsenceDialogOpen: boolean;
  setIsAddAbsenceDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteAbsenceDialogOpen: boolean;
  setIsDeleteAbsenceDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDialogClose: () => void;
  selectedStudentId: number | null;
  currentCourseId: number | null;
  refreshStudents: () => void;
  newGrade: string;
  setNewGrade: React.Dispatch<React.SetStateAction<string>>;
  selectedGradeToDelete: string | null;
  setSelectedGradeToDelete: React.Dispatch<React.SetStateAction<string | null>>;
  newAbsenceDate: string;
  setNewAbsenceDate: React.Dispatch<React.SetStateAction<string>>;
  selectedAbsenceToDelete: string | null;
  setSelectedAbsenceToDelete: React.Dispatch<React.SetStateAction<string | null>>;
  selectedStudentDetails: Student | null;
}

const Dialogs: React.FC<DialogsProps> = ({
  isAddDialogOpen,
  setIsAddDialogOpen,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  isAddAbsenceDialogOpen,
  setIsAddAbsenceDialogOpen,
  isDeleteAbsenceDialogOpen,
  setIsDeleteAbsenceDialogOpen,
  handleDialogClose,
  selectedStudentId,
  currentCourseId,
  refreshStudents,
  newGrade,
  setNewGrade,
  selectedGradeToDelete,
  setSelectedGradeToDelete,
  newAbsenceDate,
  setNewAbsenceDate,
  selectedAbsenceToDelete,
  setSelectedAbsenceToDelete,
  selectedStudentDetails,
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

  const handleGradeDelete = async () => {
    if (selectedGradeToDelete && selectedStudentId !== null && currentCourseId !== null) {
      const params: GradeParams = {
        grade: Number(selectedGradeToDelete),
        studentId: selectedStudentId,
        courseId: currentCourseId,
      };
      await removeGrade(params);
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

  const handleAbsenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAbsenceDate(e.target.value);
  };

  const handleAbsenceSubmit = async () => {
    if (newAbsenceDate && selectedStudentId !== null && currentCourseId !== null) {
      const params: AbsenceParams = {
        date: newAbsenceDate,
        studentId: selectedStudentId,
        courseId: currentCourseId,
      };
      await addAbsence(params);
      toast.success('Absence successfully added 🎉', {
        style: {
          backgroundColor: 'green',
          color: 'white',
        },
      });
      handleDialogClose();
      refreshStudents(); // Refresh the student data after adding the absence
    }
  };

  const handleAbsenceDelete = async () => {
    if (selectedAbsenceToDelete && selectedStudentId !== null && currentCourseId !== null) {
      const params: DeleteAbsenceParams = {
        absenceId: Number(selectedAbsenceToDelete), 
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  };

  return (
    <>
      {/* Add Grade Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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

      {/* Delete Grade Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogTrigger className="hidden" />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Grade</DialogTitle>
            <DialogDescription>
              Please select the grade you want to delete.
            </DialogDescription>
          </DialogHeader>
          <Select onValueChange={setSelectedGradeToDelete}>
            <SelectTrigger className="w-full bg-red-500 text-white">
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

      {/* Add Absence Dialog */}
      <Dialog open={isAddAbsenceDialogOpen} onOpenChange={setIsAddAbsenceDialogOpen}>
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

      {/* Delete Absence Dialog */}
      <Dialog open={isDeleteAbsenceDialogOpen} onOpenChange={setIsDeleteAbsenceDialogOpen}>
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
    </>
  );
};

export default Dialogs;
