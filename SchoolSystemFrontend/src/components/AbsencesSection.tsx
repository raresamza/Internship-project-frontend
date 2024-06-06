import React from 'react';
import { motion } from 'framer-motion';
import { Grade, Student } from '../api/StudentService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faTrash } from '@fortawesome/free-solid-svg-icons';

interface AbsencesSectionProps {
  selectedStudentDetails: Student;
  grade: Grade;
  handleDialogOpen: (dialogType: string, courseId: number) => void;
  formatDate: (dateString: string) => string;
}

const AbsencesSection: React.FC<AbsencesSectionProps> = ({ selectedStudentDetails, grade, handleDialogOpen, formatDate }) => {
  return (
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
          className="bg-indigo-400 hover:bg-indigo-500 text-white rounded-full p-2"
          style={{ width: '2.5rem', height: '2.5rem' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleDialogOpen('addAbsence', grade.courseId)}
        >
          <FontAwesomeIcon icon={faSquarePlus} />
        </motion.button>
        <motion.button
          className="bg-red-400 hover:bg-red-500 text-white rounded-full p-2"
          style={{ width: '2.5rem', height: '2.5rem' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleDialogOpen('deleteAbsence', grade.courseId)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </motion.button>
      </div>
    </div>
  );
};

export default AbsencesSection;
