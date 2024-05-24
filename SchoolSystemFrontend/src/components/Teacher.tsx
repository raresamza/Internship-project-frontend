import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion'

interface TeacherProps {
  firstName: string;
  lastName: string;
  email: string;
  index: number;
}

const Teacher: React.FC<TeacherProps> = ({ firstName, lastName, email, index }) => {
  return (
    <motion.tr
      initial={{ y: -50, opacity: 0 }} // Initial animation state
      animate={{ y: 0, opacity: 1 }} // Animation when trigger appears
      transition={{ delay: index * 0.1 }}
    >
      <td className=''>
        <FontAwesomeIcon className='rounded-full bg-slate-300 p-6 w-10 h-10' icon={faChalkboardUser} />
      </td>
      <td className='w-1/8 px-2 font-semibold text-2xl'>{firstName}</td>
      <td className='w-1/8 pl-2 font-semibold text-2xl'>{lastName}</td>
      <td className='px-1 scale-[3] font-thin'>|</td>
      <td className='w-1/8 pr-2 font-semibold text-2xl'>{email}</td>
    </motion.tr>
  );
}

export default Teacher;