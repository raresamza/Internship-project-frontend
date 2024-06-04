import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../@/components/ui/card";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../@/components/ui/collapsible";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../@/components/ui/select'; // Import Select components
import { Grade, Student } from '../api/StudentService';
import useGrades from '../hooks/useGrades';

interface CatalogueProps {
  students: Student[];
}

const Catalogue: React.FC<CatalogueProps> = ({ students }) => {
  const grades = useGrades();

  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

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
  };

  const filteredStudents = students.filter(student =>
    student.grades.some(grade => uniqueGrades.some(course => course.courseName === grade.courseName))
  );

  const selectedStudentDetails = selectedStudent
    ? students.find(student => student.id === parseInt(selectedStudent))
    : null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  };

  return (
    <div className="mx-4 p-8">
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
                        <div className='border border-black rounded-lg mb-4 p-2'>
                          <h2 className=' text-lg font-semibold text-green-900'>Grades</h2>
                          <ul>
                            {selectedStudentDetails.grades.length > 0 && selectedStudentDetails.grades.some(g => g.gradeValues.length > 0) ? (
                              selectedStudentDetails.grades
                                .filter(grade => grade.courseName === grade.courseName)
                                .flatMap(grade => grade.gradeValues)
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
                        <div className='border border-black rounded-lg mb-4 p-2'>
                          <h2 className=' text-lg font-semibold text-green-900'>GPAs</h2>
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
                        <div className='border border-black rounded-lg mb-4 p-2'>
                          <h2 className=' text-lg font-semibold text-green-900'>Absences</h2>
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
    </div>
  );
};

export default Catalogue;
