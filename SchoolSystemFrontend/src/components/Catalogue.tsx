import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../@/components/ui/card";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../@/components/ui/collapsible";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../@/components/ui/select';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../@/components/ui/dialog';
import { Grade, Student, Absence, Gpa } from '../api/StudentService';
import useGrades from '../hooks/useGrades';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { addGrade, GradeParams, removeGrade} from '../api/CourseService';
import { addAbsence, AbsenceParams, removeAbsence } from "../api/StudentService"
import { toast, Toaster } from 'sonner';

interface CatalogueProps {
  students: Student[];
  refreshStudents: () => void;
}

const Catalogue: React.FC<CatalogueProps> = ({ students, refreshStudents }) => {
  const grades = useGrades();

  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [newGrade, setNewGrade] = useState<string>('');
  const [selectedGradeToDelete, setSelectedGradeToDelete] = useState<string | null>(null);
  const [currentCourseId, setCurrentCourseId] = useState<number | null>(null);
  const [isAddAbsenceDialogOpen, setIsAddAbsenceDialogOpen] = useState<boolean>(false);
  const [isDeleteAbsenceDialogOpen, setIsDeleteAbsenceDialogOpen] = useState<boolean>(false);
  const [newAbsenceDate, setNewAbsenceDate] = useState<string>('');
  const [selectedAbsenceToDelete, setSelectedAbsenceToDelete] = useState<string | null>(null);

  let uniqueGrades: Grade[] = [];
  grades.forEach((gradeArray) => {
    gradeArray.forEach((grade) => {
      if (!uniqueGrades.find(x => x.courseName === grade.courseName)) {
        uniqueGrades.push(grade);
      }
    });
  });

  const handleStudentSelect = (value: string) => {
    setSelectedStudent(value);
    setSelectedStudentId(parseInt(value));
  };

  const handleAddDialogOpen = (courseId: number) => {
    setCurrentCourseId(courseId);
    setIsAddDialogOpen(true);
  };

  const handleDeleteDialogOpen = (courseId: number) => {
    setCurrentCourseId(courseId);
    setIsDeleteDialogOpen(true);
  };

  const handleAddAbsenceDialogOpen = (courseId: number) => {
    setCurrentCourseId(courseId);
    setIsAddAbsenceDialogOpen(true);
  };

  const handleDeleteAbsenceDialogOpen = (courseId: number) => {
    setCurrentCourseId(courseId);
    setIsDeleteAbsenceDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsAddDialogOpen(false);
    setIsDeleteDialogOpen(false);
    setIsAddAbsenceDialogOpen(false);
    setIsDeleteAbsenceDialogOpen(false);
  };

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
      console.log('New grade submitted:', newGrade);
      setIsAddDialogOpen(false);
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
      console.log('Grade removed:', selectedGradeToDelete);
      setIsDeleteDialogOpen(false);
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
      console.log('New absence submitted:', newAbsenceDate);
      setIsAddAbsenceDialogOpen(false);
      refreshStudents(); // Refresh the student data after adding the absence
    }
  };

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
      console.log('Absence removed:', selectedAbsenceToDelete);
      setIsDeleteAbsenceDialogOpen(false);
      refreshStudents(); // Refresh the student data after removing the absence
    }
  };

  const filteredStudents = students.filter(student =>
    student.grades.some(grade => uniqueGrades.some(course => course.courseName === grade.courseName))
  );

  const selectedStudentDetails = selectedStudentId !== null
    ? students.find(student => student.id === selectedStudentId)
    : null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  };

  return (
    <div className="mx-4 p-8">
      <Toaster position="top-right" />
      <h1 className="text-4xl font-bold mb-8">Catalogue</h1>
      <div className="space-y-8">
        {uniqueGrades.map((grade, index) => (
          <Collapsible key={index}>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <CollapsibleTrigger className='text-white bg-emerald-500 hover:bg-emerald-600'>
                {grade.courseName}
              </CollapsibleTrigger>
            </motion.div>
            <CollapsibleContent className='mt-4'>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                exit={{ opacity: 0, y: -50 }}
              >
                <Card>
                  <CardHeader className='bg-emerald-200 rounded-t-xl px-10 py-4'>
                    <CardTitle className='text-emerald-900 border-b-2 border-black pb-2 mb-4'>
                      {grade.courseName}
                    </CardTitle>
                    <Select onValueChange={handleStudentSelect}>
                      <SelectTrigger className="w-[180px] bg-emerald-600 text-white">
                        <SelectValue placeholder="Select a student" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredStudents.map(student => (
                          <SelectItem key={student.id} value={student.id.toString()}>
                            {student.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardHeader>
                  <CardContent className='bg-emerald-200 px-10 py-4'>
                    {selectedStudentDetails && (
                      <>
                        <div className='relative border border-black rounded-lg mb-4 p-2 flex items-center justify-between'>
                          <div>
                            <h2 className='text-lg font-semibold text-green-900'>Grades</h2>
                            <ul>
                              {selectedStudentDetails.grades.length > 0 && selectedStudentDetails.grades.some(g => g.gradeValues.length > 0) ? (
                                selectedStudentDetails.grades
                                  .filter(gradeItem => gradeItem.courseName === grade.courseName)
                                  .flatMap(gradeItem => gradeItem.gradeValues)
                                  .map((gradeValue, index) => (
                                    <li className='pl-2 text-gray-700' key={index}>
                                      Grade: {gradeValue}
                                    </li>
                                  ))
                              ) : (
                                <li className='pl-2 text-gray-700'>Not assigned yet</li>
                              )}
                            </ul>
                          </div>
                          <div className="flex space-x-2">
                            <motion.button
                              className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full p-2"
                              style={{ width: '2.5rem', height: '2.5rem' }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleAddDialogOpen(grade.courseId)}
                            >
                              <FontAwesomeIcon icon={faSquarePlus} />
                            </motion.button>
                            <motion.button
                              className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
                              style={{ width: '2.5rem', height: '2.5rem' }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDeleteDialogOpen(grade.courseId)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </motion.button>
                          </div>
                        </div>
                        <div className='relative border border-black rounded-lg mb-4 p-2'>
                          <h2 className='text-lg font-semibold text-green-900'>GPAs</h2>
                          <ul>
                            {selectedStudentDetails.gpAs.length > 0 ? (
                              selectedStudentDetails.gpAs
                                .filter(gpa => gpa.courseName === grade.courseName)
                                .map((gpa, index) => (
                                  <li className='pl-2 text-gray-700' key={index}>
                                    {gpa.gpaValue === 0 ? 'N/A' : gpa.gpaValue}
                                  </li>
                                ))
                            ) : (
                              <li className='pl-2 text-gray-700'>Not assigned yet</li>
                            )}
                          </ul>
                        </div>
                        <div className='relative border border-black rounded-lg mb-4 p-2 flex items-center justify-between'>
                          <div>
                            <h2 className='text-lg font-semibold text-green-900'>Absences</h2>
                            <ul>
                              {selectedStudentDetails.absences.length > 0 ? (
                                selectedStudentDetails.absences
                                  .filter(absence => absence.courseName === grade.courseName)
                                  .map((absence, index) => (
                                    <li className='pl-2 text-gray-700' key={index}>
                                      {formatDate(absence.date)}
                                    </li>
                                  ))
                              ) : (
                                <li className='pl-2 text-gray-700'>Not assigned yet</li>
                              )}
                            </ul>
                          </div>
                          <div className="flex space-x-2">
                            <motion.button
                              className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full p-2"
                              style={{ width: '2.5rem', height: '2.5rem' }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleAddAbsenceDialogOpen(grade.courseId)}
                            >
                              <FontAwesomeIcon icon={faSquarePlus} />
                            </motion.button>
                            <motion.button
                              className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
                              style={{ width: '2.5rem', height: '2.5rem' }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDeleteAbsenceDialogOpen(grade.courseId)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </motion.button>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                  <CardFooter className='bg-emerald-200 px-10 py-4 rounded-b-xl shadow-xl'>
                    <p className='text-gray-700'>Info was last updated on: {new Date().toLocaleDateString("ro-RO")}</p>
                  </CardFooter>
                </Card>
              </motion.div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>

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
                .filter(gradeItem => gradeItem.courseName === uniqueGrades.find(g => g.courseId === currentCourseId)?.courseName)
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
                .filter(absence => absence.courseName === uniqueGrades.find(g => g.courseId === currentCourseId)?.courseName)
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
    </div>
  );
};

export default Catalogue;
