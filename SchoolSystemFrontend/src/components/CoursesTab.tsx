import React from 'react';
import { motion } from 'framer-motion';
import CourseCard from './CourseCard';
import Navbar from './Navbar';

interface Course {
  id: number;
  name: string;
  subject: string;
  teacherId: string;
  teacherInfo?: string;
  students?: string[];
}

const courses: Course[] = [
  { id: 1, name: 'Math 101', subject: 'Mathematics', teacherId: 'T01' },
  { id: 2, name: 'History 201', subject: 'History', teacherId: 'T02' },
  // Add more courses as needed
];

const CourseList: React.FC = () => (
  <>
  <Navbar/>
  <div className="p-10 w-full h-full flex flex-col items-center">
    {courses.map((course, index) => (
      <motion.div
        key={course.id}
        initial={{ x: -150, opacity: 0, scale: 1 }} // Initial animation state
        animate={{ x: 0, opacity: 1, scale: 1 }} // Animation when trigger appears
        transition={{ delay: index * 0.2 }} // Adjusted delay and duration
        whileHover={{ scale: 1.05 }} // Scale up on hover
        style={{ cursor: 'pointer', width: '85%', marginBottom: '20px' }} // Set width to 100%
      >
        <CourseCard key={course.id} course={course} />
      </motion.div>
    ))}
  </div>
  </>
);

export default CourseList;
