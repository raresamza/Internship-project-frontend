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
import Searchbar from './Searchbar';

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
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  const filteredGrades = uniqueGrades.filter(grade =>
    grade.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-4 p-8 bg-gray-100 min-h-screen">
      <Toaster />
      <header className="bg-gradient-to-r from-emerald-400 to-blue-500 p-6 rounded-lg shadow-lg mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-white">Catalogue</h1>
      </header>
      <div className="space-y-8">
        {filteredGrades.map((grade, index) => (
          <Collapsible key={index}>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="w-full"
            >
              <CollapsibleTrigger className='text-white bg-emerald-500 hover:bg-emerald-600 rounded-t-lg p-4 shadow-md w-full'>
                {grade.courseName}
              </CollapsibleTrigger>
            </motion.div>
            <CollapsibleContent className='mt-4 w-full'>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                exit={{ opacity: 0, y: -50 }}
                className="w-full"
              >
                <Card className="shadow-lg w-full">
                  <CardHeader className='bg-emerald-200 rounded-t-lg px-10 py-4 w-full'>
                    <CardTitle className='text-emerald-900 border-b-2 border-black pb-2 mb-4'>
                      {grade.courseName}
                    </CardTitle>
                    <StudentSelector
                      students={students.filter(student => 
                        student.grades.some(g => g.courseId === grade.courseId)
                      )}
                      handleStudentSelect={handleStudentSelect}
                    />
                  </CardHeader>
                  <CardContent className='bg-emerald-200 px-10 py-4 w-full'>
                    {selectedStudentDetails && (
                      <>
                        <GradesSection
                          selectedStudentDetails={selectedStudentDetails}
                          grade={grade}
                          handleDialogOpen={handleDialogOpen}
                        />
                        <GpaSection
                          selectedStudentDetails={selectedStudentDetails}
                          gpas={selectedStudentDetails.gpAs} // Pass the GPA data directly
                          refreshStudents={refreshStudents}
                          selectedCourseId={grade.courseId} // Pass the selected courseId
                        />
                        <AbsencesSection
                          selectedStudentDetails={selectedStudentDetails}
                          grade={grade}
                          handleDialogOpen={handleDialogOpen}
                          formatDate={formatDate}
                        />
                      </>
                    )}
                  </CardContent>
                  <CardFooter className='bg-emerald-200 px-10 py-4 rounded-b-lg shadow-md w-full'>
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
