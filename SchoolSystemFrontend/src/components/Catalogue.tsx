import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../@/components/ui/card"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../@/components/ui/collapsible"

interface Course {
  id: number;
  name: string;
  grades: { grade: string; subject: string }[];
  gpas: { semester: string; gpa: string }[];
  absences: { date: string; count: number }[];
}

interface CatalogueProps {
  courses: Course[];
}

const Catalogue: React.FC<CatalogueProps> = ({ courses }) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isVisibile, setIsVisible] = useState<boolean>(true)
  console.log(selectedCourse)

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setIsVisible(!isVisibile);
    console.log(isVisibile)
  };

  

  return (
    <div className=" mx-4 p-8">
      <h1 className="text-4xl font-bold mb-8">Catalogue</h1>

      <div className="space-y-8">
        {courses.map((course, index) => ( // Map over courses with index
          <Collapsible key={course.id}>
            <motion.div
              initial={{ x: -50, opacity: 0 }} // Initial animation state
              animate={{ x: 0, opacity: 1 }} // Animation when trigger appears
              transition={{ delay: index * 0.1 }} // Staggered animation delay
            >
              <CollapsibleTrigger onClick={() => handleCourseSelect(course)} className='text-white bg-emerald-500 hover:bg-emerald-600'>
                {course.name}
              </CollapsibleTrigger>
            </motion.div>
            <CollapsibleContent className='mt-4'>
              <motion.div
                initial={{ opacity: 0, y: 50 }} // Initial animation state
                animate={{ opacity: 1, y: 0 }} // Animation when content appears
                transition={{ delay: 0.2 }} // Animation delay
                exit={{ opacity: 0, y: -50 }}
              >
                <Card>
                  <CardHeader className='bg-emerald-200 rounded-t-xl'>
                    <CardTitle className='text-green-900 border-b-2 border-black pb-2 '>{course.name}</CardTitle>
                  </CardHeader>
                  <CardContent className='pl-10 bg-emerald-200'>
                    <div className='border border-black rounded-lg mb-4 p-2'>
                      <h2 className=' text-lg font-semibold text-green-900'>Grades</h2>
                      <ul>
                        {course.grades.map((grade, index) => (
                          <li className='pl-2 text-gray-700' key={index}>{grade.subject}: {grade.grade}</li>
                        ))}
                      </ul>
                    </div>
                    <div className='border border-black rounded-lg mb-4 p-2'>
                      <h2 className=' text-lg font-semibold text-green-900'>GPAs</h2>
                      <ul>
                        {course.gpas.map((gpa, index) => (
                          <li className='pl-2 text-gray-700' key={index}>{gpa.semester}: {gpa.gpa}</li>
                        ))}
                      </ul>
                    </div>
                    <div className='border border-black rounded-lg mb-4 p-2'>
                      <h2 className=' text-lg font-semibold text-green-900'> Absences</h2>
                      <ul>
                        {course.absences.map((absence, index) => (
                          <li className='pl-2 text-gray-700' key={index}>{absence.date}: {absence.count} absences</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className='bg-emerald-200 rounded-b-xl shadow-xl'>
                    <p className='text-gray-700'>Info was last updated on: {new Date().toLocaleDateString("ro-RO")}</p>
                  </CardFooter>
                </Card>
              </motion.div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

export default Catalogue;
