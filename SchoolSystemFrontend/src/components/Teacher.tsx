import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

interface TeacherProps {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  index: number;
}

const Teacher: React.FC<TeacherProps> = ({ id, firstName, lastName, email, index }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/teacher/${id}`);
  };

  return (
    <motion.tr
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      className="cursor-pointer"
      onClick={handleClick}
    >
      <td colSpan={4} className="p-0">
        <div className="flex items-center p-4 hover:bg-gray-300 hover:rounded-xl">
          <div className=''>
            <FontAwesomeIcon className='rounded-full bg-slate-300 p-6 w-10 h-10' icon={faChalkboardUser} />
          </div>
          <div className='ml-4 flex-1'>
            <div className='text-2xl font-semibold'>{firstName} {lastName}</div>
          </div>
          <div className='ml-4 pr-2 font-semibold text-2xl whitespace-nowrap'>{email}</div>
        </div>
      </td>
    </motion.tr>
  );
}

export default Teacher;
