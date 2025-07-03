import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../@/components/ui/collapsible";
import { predictGrade } from '../api/Predicition';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../@/components/ui/select';

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
const Student: React.FC<StudentProps> = ({
  id,
  name,
  parentEmail,
  grades,
  index,
}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [predictedGrade, setPredictedGrade] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);


  const handlePredict = async () => {
    if (!selectedCourseId) return;
    setLoading(true);
    try {
      const result = await predictGrade(id, selectedCourseId);
      setPredictedGrade(result);
    } catch (err) {
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };


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
      <td className="pl-4">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          {/* Top row: left = trigger, right = collapsible content */}
          <div className="flex justify-between items-center gap-4 w-full">
            {/* Trigger (left) */}
            <CollapsibleTrigger className="text-sm text-blue-600 underline border px-3 py-1 rounded-md hover:bg-gray-100">
              {isOpen ? 'Hide Prediction' : 'Predict Grade'}
            </CollapsibleTrigger>

            {/* Dropdown + Predict Button (right, shown when open) */}
            {isOpen && grades.length > 0 && (
              <div className="flex items-center gap-4">
                <Select onValueChange={(value) => setSelectedCourseId(parseInt(value))}>
                  <SelectTrigger className="w-[200px] rounded-full px-4 py-2 border border-gray-300 shadow-sm">
                    <SelectValue placeholder="Select Course" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl shadow-md">
                    {grades.map((grade) => (
                      <SelectItem key={grade.courseId} value={grade.courseId.toString()}>
                        {grade.courseName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <button
                  onClick={handlePredict}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition"
                  disabled={!selectedCourseId || loading}
                >
                  {loading ? 'Predicting...' : 'Predict'}
                </button>
              </div>
            )}
          </div>

          {/* Prediction result below */}
          <CollapsibleContent className="mt-2">
            {grades.length === 0 ? (
              <p className="text-sm italic mt-1 text-red-500">No courses available</p>
            ) : (
              predictedGrade !== null && (
                <div className="mt-2">
                  <span className="text-green-600 font-semibold text-sm">
                    📈 Predicted Grade: {predictedGrade.toFixed(2)}
                  </span>
                </div>
              )
            )}
          </CollapsibleContent>
        </Collapsible>
      </td>
    </motion.tr>
  );
}

export default Student;
