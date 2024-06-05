import React from 'react';
import { motion } from 'framer-motion';
import { Grade, Student } from '../api/StudentService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faTrash } from '@fortawesome/free-solid-svg-icons';

interface GradesSectionProps {
  selectedStudentDetails: Student;
  grade: Grade;
  handleDialogOpen: (dialogType: string, courseId: number) => void;
}

const GradesSection: React.FC<GradesSectionProps> = ({ selectedStudentDetails, grade, handleDialogOpen }) => {
  return (
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
          onClick={() => handleDialogOpen('addGrade', grade.courseId)}
        >
          <FontAwesomeIcon icon={faSquarePlus} />
        </motion.button>
        <motion.button
          className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
          style={{ width: '2.5rem', height: '2.5rem' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleDialogOpen('deleteGrade', grade.courseId)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </motion.button>
      </div>
    </div>
  );
};

export default GradesSection;
