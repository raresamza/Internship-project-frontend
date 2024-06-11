import React from 'react';
import { motion } from 'framer-motion';
import { Gpa, Student } from '../api/StudentService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'sonner';
import { addGpa, undoGpa } from '../api/CatalogueService';

interface GpaSectionProps {
  selectedStudentDetails: Student | null;
  gpas: Gpa[];
  refreshStudents: () => void;
}

const GpaSection: React.FC<GpaSectionProps> = ({
  selectedStudentDetails,
  gpas,
  refreshStudents,
}) => {
  const handleAddGpa = async (courseId: number) => {
    if (!selectedStudentDetails) return;

    try {
      await addGpa({ courseId, studentId: selectedStudentDetails.id });
      toast.success("GPA successfully updated 🎉", {
        style: {
          backgroundColor: 'green',
          color: 'white',
        },
      });
      refreshStudents(); // Refresh the student data after adding the GPA
    } catch (error) {
      toast.error("Failed to update GPA", {
        style: {
          backgroundColor: 'red',
          color: 'white',
        },
      });
    }
  };

  const handleResetGpa = async (courseId: number) => {
    if (!selectedStudentDetails) return;

    try {
      await undoGpa({ courseId, studentId: selectedStudentDetails.id });
      toast.success("GPA reset to 0 🎉", {
        style: {
          backgroundColor: 'green',
          color: 'white',
        },
      });
      refreshStudents(); // Refresh the student data after resetting the GPA
    } catch (error) {
      toast.error("Failed to reset GPA", {
        style: {
          backgroundColor: 'red',
          color: 'white',
        },
      });
    }
  };

  return (
    <div className='relative border border-black rounded-lg mb-4 p-2 flex items-center justify-between'>
      <div>
        <h2 className='text-lg font-semibold text-green-900'>GPAs</h2>
        <ul>
          {gpas.length > 0 ? (
            gpas.map((gpa, index) => (
              <li className='pl-2 text-gray-700' key={index}>
                GPA: {gpa.gpaValue === 0 ? 'N/A' : gpa.gpaValue}
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
          onClick={() => handleAddGpa(gpas[0]?.courseId)}
        >
          <FontAwesomeIcon icon={faSquarePlus} />
        </motion.button>
        <motion.button
          className="bg-red-400 hover:bg-red-500 text-white rounded-full p-2"
          style={{ width: '2.5rem', height: '2.5rem' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleResetGpa(gpas[0]?.courseId)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </motion.button>
      </div>
    </div>
  );
};

export default GpaSection;
