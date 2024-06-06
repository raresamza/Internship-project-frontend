import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../@/components/ui/card";
import { Grade, Student } from '../api/StudentService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'sonner';
import { updateGpa } from '../api/CatalogueService';

interface GpaSectionProps {
  selectedStudentDetails: Student | null;
  grade: Grade;
  handleDialogOpen: (dialogType: string, courseId: number) => void;
}

const GpaSection: React.FC<GpaSectionProps> = ({
  selectedStudentDetails,
  grade,
  handleDialogOpen,
}) => {
  const handleAddGpa = async () => {
    if (!selectedStudentDetails) return;

    try {
      const newGpa = prompt("Enter the new GPA:");
      if (newGpa !== null) {
        const gpaValue = parseFloat(newGpa);
        if (isNaN(gpaValue) || gpaValue < 0 || gpaValue > 4) {
          toast.error("Invalid GPA value. Please enter a value between 0 and 4.");
          return;
        }
        await updateGpa({ courseId: grade.courseId, studentId: selectedStudentDetails.id});
        toast.success("GPA successfully updated 🎉", {
          style: {
            backgroundColor: 'green',
            color: 'white',
          },
        });
        handleDialogOpen('addGpa', grade.courseId); // Trigger a refresh
      }
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
      await updateGpa({ courseId: grade.courseId, studentId: selectedStudentDetails.id});
      toast.success("GPA reset to 0 🎉", {
        style: {
          backgroundColor: 'green',
          color: 'white',
        },
      });
      handleDialogOpen('resetGpa', grade.courseId); // Trigger a refresh
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
        {selectedStudentDetails && selectedStudentDetails.gpAs && selectedStudentDetails.gpAs.length > 0 ? (
          selectedStudentDetails.gpAs
            .filter(gpa => gpa.courseName === grade.courseName)
            .map((gpa, index) => (
              <li className='p-2 text-gray-700 flex justify-between items-center space-x-2' key={index}>
                <span>GPA: {gpa.gpaValue === 0 ? 'N/A' : gpa.gpaValue}</span>
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
          onClick={() => handleDialogOpen('addGrade', grade.courseId)}
        >
          <FontAwesomeIcon icon={faSquarePlus} />
        </motion.button>
        <motion.button
          className="bg-red-400 hover:bg-red-500 text-white rounded-full p-2"
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

export default GpaSection;
