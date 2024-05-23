import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons';

interface TeacherProps {
    firstName: string;
    lastName: string;
    email: string;
  }
  
  const Teacher: React.FC<TeacherProps> = ({ firstName, lastName, email }) => {
    return (
      <tr>
        <td className=''>
          <FontAwesomeIcon className='rounded-full bg-slate-300 p-6 w-10 h-10' icon={faChalkboardUser} />
        </td>
        <td className='w-1/8 px-2 font-semibold text-2xl'>{firstName}</td>
        <td className='w-1/8 pl-2 font-semibold text-2xl'>{lastName}</td>
        <td className='px-1 scale-[3] font-thin'>|</td>
        <td className='w-1/8 pr-2 font-semibold text-2xl'>{email}</td>
      </tr>
    );
  }
  
  export default Teacher;