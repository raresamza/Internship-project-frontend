import React from 'react';
import { Grade, Student } from '../api/StudentService';

interface GpaSectionProps {
  selectedStudentDetails: Student;
  grade: Grade;
}

const GpaSection: React.FC<GpaSectionProps> = ({ selectedStudentDetails, grade }) => {
  return (
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
  );
};

export default GpaSection;
