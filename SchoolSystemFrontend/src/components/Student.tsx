import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

interface StudentProps {
  id: number;
  parentEmail: string;
  parentName: string;
  age: number;
  name: string;
  address: string;
  phoneNumber: number;
  grades: Grade[];
  gpAs: Gpa[];
  absences: Absence[];
  index: number
}

interface Grade {
  courseId: number;
  courseName: string;
  gradeValues: number[];
}

interface Gpa {
  courseId: number;
  courseName: string;
  gpaValue: number;
}

interface Absence {
  id: number;
  date: string;
  courseName: string;
}


// console.log(index)
const Student: React.FC<StudentProps> = ({ name, parentEmail, index }) => {
  return (
    <motion.tr
    initial={{ y: -50, opacity: 0 }} // Initial animation state
    animate={{ y: 0, opacity: 1 }} // Animation when trigger appears
    transition={{ delay: index * 0.1 }} // Adjusted delay and duration
    >
      <td className=''>
        <FontAwesomeIcon className='rounded-full bg-slate-300 p-6 w-10 h-10' icon={faGraduationCap} />
      </td>
      <td className='w-1/8 px-2 font-semibold text-2xl'>{name}</td>
      <td className='px-1 scale-[3] font-thin'>|</td>
      <td className='w-1/8 pr-2 font-semibold text-2xl'>{parentEmail}</td>
    </motion.tr>
  );
}

export default Student;
