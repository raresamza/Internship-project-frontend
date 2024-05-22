import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

interface StudentProps {
    firstName: string;
    lastName: string;
    email: string;
  }
  
  const Student: React.FC<StudentProps> = ({ firstName, lastName, email }) => {
    return (
      <tr>
        <td className=''>
          <FontAwesomeIcon className='rounded-full bg-slate-300 p-6 w-10 h-10' icon={faGraduationCap} />
        </td>
        <td className='w-1/8 px-2 font-semibold text-2xl'>{firstName}</td>
        <td className='w-1/8 pl-2 font-semibold text-2xl'>{lastName}</td>
        <td className='px-1 scale-[3] font-thin'>|</td>
        <td className='w-1/8 pr-2 font-semibold text-2xl'>{email}</td>
      </tr>
    );
  }
  
  export default Student;