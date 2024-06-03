import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CourseCard from './CourseCard';
import Navbar from './Navbar';
import { getCourses } from '../api/CourseService';
import { Course } from '../api/CourseService';
import { Loader2 } from 'lucide-react';

const CourseList: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [pageNumber, setPageNumber] = useState(1); // Track current page number
  const [pageSize] = useState(5); // Page size

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchedCourses = await getCourses(pageNumber, pageSize);
        setCourses(fetchedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [pageNumber]);

  return (
    <>
      <Navbar />
      <div className="p-10 w-full h-full flex flex-col items-center">
        {loading ? (
           <div className="flex items-center justify-center min-h-[calc(100vh-80px)] w-full">
           <Loader2 className='animate-spin text-muted-foreground' size={48} />
         </div>
        ) : (
          courses.map((course, index) => (
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
          ))
        )}
      </div>
    </>
  );
};

export default CourseList;
