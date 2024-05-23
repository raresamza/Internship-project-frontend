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
    const [isVisibile, setIsVisible] =useState<boolean>(true)
    console.log(selectedCourse)

    const handleCourseSelect = (course: Course) => {
        setSelectedCourse(course);
        setIsVisible(!isVisibile);
        console.log(isVisibile)
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold mb-8">Catalogue</h1>

            <div className="space-y-8">
                {courses.map((course, index) => ( // Map over courses with index
                    <Collapsible key={course.id}>
                         <motion.div
                            initial={{ x: -50, opacity: 0 }} // Initial animation state
                            animate={{ x: 0, opacity: 1 }} // Animation when trigger appears
                            transition={{ delay: index * 0.1 }} // Staggered animation delay
                        >
                            <CollapsibleTrigger onClick={() => handleCourseSelect(course)}>
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
                                    <CardHeader className='bg-gray-200 rounded-t-xl'>
                                        <CardTitle>{course.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent className='pl-10 bg-gray-200'>
                                        <h2 className=' text-lg font-semibold'>Grades</h2>
                                        <ul>
                                            {course.grades.map((grade, index) => (
                                                <li className='pl-2' key={index}>{grade.subject}: {grade.grade}</li>
                                            ))}
                                        </ul>
                                        <h2 className=' text-lg font-semibold'>GPAs</h2>
                                        <ul>
                                            {course.gpas.map((gpa, index) => (
                                                <li className='pl-2' key={index}>{gpa.semester}: {gpa.gpa}</li>
                                            ))}
                                        </ul>
                                        <h2 className=' text-lg font-semibold'> Absences</h2>
                                        <ul>
                                            {course.absences.map((absence, index) => (
                                                <li className='pl-2' key={index}>{absence.date}: {absence.count} absences</li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardFooter className='bg-gray-200 rounded-b-xl'>
                                        <p>Additional content if needed</p>
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
