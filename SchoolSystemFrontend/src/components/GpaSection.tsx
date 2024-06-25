import React from 'react';
import { motion } from 'framer-motion';
import { Gpa, Student } from '../api/StudentService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'sonner';
import { addGpa, undoGpa } from '../api/CatalogueService';
import useAuth from '../hooks/useAuth';

interface GpaSectionProps {
  selectedStudentDetails: Student | null;
  gpas: Gpa[];
  refreshStudents: () => void;
  selectedCourseId: number;  // Add selectedCourseId to props
}

const GpaSection: React.FC<GpaSectionProps> = ({
  selectedStudentDetails,
  gpas,
  refreshStudents,
  selectedCourseId,  // Add selectedCourseId to destructuring
}) => {
  const token = useAuth();
  const role = token?.role;

  const handleAddGpa = async () => {
    if (!selectedStudentDetails) return;

    try {
      await addGpa({ courseId: selectedCourseId, studentId: selectedStudentDetails.id });
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

  const handleResetGpa = async () => {
    if (!selectedStudentDetails) return;

    try {
      await undoGpa({ courseId: selectedCourseId, studentId: selectedStudentDetails.id });
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

  const selectedCourseGpa = gpas.find(gpa => gpa.courseId === selectedCourseId);

  return (
    <div className='relative border border-black rounded-lg mb-4 p-2 flex items-center justify-between'>
      <div>
        <h2 className='text-lg font-semibold text-green-900'>GPAs</h2>
        <ul>
          {selectedCourseGpa ? (
            <li className='pl-2 text-gray-700'>
              GPA: {selectedCourseGpa.gpaValue === 0 ? 'N/A' : selectedCourseGpa.gpaValue}
            </li>
          ) : (
            <li className='pl-2 text-gray-700'>Not assigned yet</li>
          )}
        </ul>
      </div>
      {role !== 'Student' && (
        <div className="flex space-x-2">
          <motion.button
            className="bg-indigo-400 hover:bg-indigo-500 text-white rounded-full p-2"
            style={{ width: '2.5rem', height: '2.5rem' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddGpa}
          >
            <FontAwesomeIcon icon={faSquarePlus} />
          </motion.button>
          <motion.button
            className="bg-red-400 hover:bg-red-500 text-white rounded-full p-2"
            style={{ width: '2.5rem', height: '2.5rem' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleResetGpa}
          >
            <FontAwesomeIcon icon={faTrash} />
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default GpaSection;
