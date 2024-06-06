import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../@/components/ui/card";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../@/components/ui/collapsible";
import { Grade, Student } from '../api/StudentService';
import useGrades from '../hooks/useGrades';
import { Toaster, toast } from 'sonner';
import AbsencesSection from './AbsencesSection';
import AddAbsenceDialog from './AddAbsenceDialog';
import AddGradeDialog from './AddGradeDialog';
import DeleteAbsenceDialog from './DeleteAbsenceDialog';
import DeleteGradeDialog from './DeleteGradeDialog';
import GpaSection from './GpaSection';
import GradesSection from './GradesSection';
import StudentSelector from './StudentSelector';

interface CatalogueProps {
  students: Student[];
  refreshStudents: () => void;
}

const Catalogue: React.FC<CatalogueProps> = ({ students, refreshStudents }) => {
  const grades = useGrades();

  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isAddAbsenceDialogOpen, setIsAddAbsenceDialogOpen] = useState<boolean>(false);
  const [isDeleteAbsenceDialogOpen, setIsDeleteAbsenceDialogOpen] = useState<boolean>(false);
  const [currentCourseId, setCurrentCourseId] = useState<number | null>(null);
  const [newGrade, setNewGrade] = useState<string>('');
  const [selectedGradeToDelete, setSelectedGradeToDelete] = useState<string | null>(null);
  const [newAbsenceDate, setNewAbsenceDate] = useState<string>('');
  const [selectedAbsenceToDelete, setSelectedAbsenceToDelete] = useState<string | null>(null);
  const [closeReason, setCloseReason] = useState<'success' | 'user' | null>(null);


  const uniqueGrades: Grade[] = [];
  grades.forEach((gradeArray) => {
    gradeArray.forEach((grade) => {
      if (!uniqueGrades.find(x => x.courseName === grade.courseName)) {
        uniqueGrades.push(grade);
      }
    });
  });

  const handleStudentSelect = (value: string) => {
    setSelectedStudentId(parseInt(value));
  };

  const handleDialogOpen = (dialogType: string, courseId: number) => {
    setCloseReason(null); // Reset close reason
    setCurrentCourseId(courseId);
    if (dialogType === 'addGrade') {
      setIsAddDialogOpen(true);
    } else if (dialogType === 'deleteGrade') {
      setIsDeleteDialogOpen(true);
    } else if (dialogType === 'addAbsence') {
      setIsAddAbsenceDialogOpen(true);
    } else if (dialogType === 'deleteAbsence') {
      setIsDeleteAbsenceDialogOpen(true);
    }
  };


  const handleDialogClose = () => {
    if (closeReason === 'user') {
      toast('Operation aborted ⚠️', {
        style: {
          backgroundColor: 'red',
          color: 'white',
        },
      });
    }
    setIsAddDialogOpen(false);
    setIsDeleteDialogOpen(false);
    setIsAddAbsenceDialogOpen(false);
    setIsDeleteAbsenceDialogOpen(false);
    setCloseReason(null); // Reset the close reason
  };

  const selectedStudentDetails = selectedStudentId !== null
    ? students.find(student => student.id === selectedStudentId)
    : null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  };

  return (
    <div className="mx-4 p-8">
      <Toaster />
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
                    <StudentSelector
                      students={students}
                      filteredStudents={students.filter(student =>
                        student.grades.some(g => uniqueGrades.some(course => course.courseName === g.courseName))
                      )}
                      handleStudentSelect={handleStudentSelect}
                    />
                  </CardHeader>
                  <CardContent className='bg-emerald-200 px-10 py-4'>
                    {selectedStudentDetails && (
                      <>
                        <GradesSection
                          selectedStudentDetails={selectedStudentDetails}
                          grade={grade}
                          handleDialogOpen={handleDialogOpen}
                        />
                        <GpaSection selectedStudentDetails={selectedStudentDetails} grade={grade} />
                        <AbsencesSection
                          selectedStudentDetails={selectedStudentDetails}
                          grade={grade}
                          handleDialogOpen={handleDialogOpen}
                          formatDate={formatDate}
                        />
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
      <AddGradeDialog
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
        handleDialogClose={handleDialogClose}
        selectedStudentId={selectedStudentId}
        currentCourseId={currentCourseId}
        refreshStudents={refreshStudents}
        newGrade={newGrade}
        setNewGrade={setNewGrade}
        setCloseReason={setCloseReason} // Pass the new prop
      />
      <DeleteGradeDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        handleDialogClose={handleDialogClose}
        selectedStudentId={selectedStudentId}
        currentCourseId={currentCourseId}
        refreshStudents={refreshStudents}
        selectedGradeToDelete={selectedGradeToDelete}
        setSelectedGradeToDelete={setSelectedGradeToDelete}
        selectedStudentDetails={selectedStudentDetails}
        setCloseReason={setCloseReason} // Pass the new prop
      />
      <AddAbsenceDialog
        isOpen={isAddAbsenceDialogOpen}
        setIsOpen={setIsAddAbsenceDialogOpen}
        handleDialogClose={handleDialogClose}
        selectedStudentId={selectedStudentId}
        currentCourseId={currentCourseId}
        refreshStudents={refreshStudents}
        newAbsenceDate={newAbsenceDate}
        setNewAbsenceDate={setNewAbsenceDate}
        setCloseReason={setCloseReason} // Pass the new prop
      />
      <DeleteAbsenceDialog
        isOpen={isDeleteAbsenceDialogOpen}
        setIsOpen={setIsDeleteAbsenceDialogOpen}
        handleDialogClose={handleDialogClose}
        selectedStudentId={selectedStudentId}
        currentCourseId={currentCourseId}
        refreshStudents={refreshStudents}
        selectedAbsenceToDelete={selectedAbsenceToDelete}
        setSelectedAbsenceToDelete={setSelectedAbsenceToDelete}
        selectedStudentDetails={selectedStudentDetails}
        formatDate={formatDate}
        setCloseReason={setCloseReason} // Pass the new prop
      />
    </div>
  );
};

export default Catalogue;
