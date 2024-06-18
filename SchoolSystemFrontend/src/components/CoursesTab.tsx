import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CourseCard from './CourseCard';
import Navbar from './Navbar';
import { getCourses } from '../api/CourseService';
import { Course } from '../api/CourseService';
import { Loader2 } from 'lucide-react';
import SearchBar from './Seachbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import AddCourseDialog from './AddCourseDialog';
import DeleteCourseDialog from './DeleteCourseDialog';
import { toast } from 'sonner';
import useAuth from '../hooks/useAuth';

const CourseList: React.FC = () => {

  const token=useAuth()
  const role=token?.role

  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(5);
  const [isAddCourseDialogOpen, setIsAddCourseDialogOpen] = useState(false);
  const [isDeleteCourseDialogOpen, setIsDeleteCourseDialogOpen] = useState(false);
  const [courseAdded, setCourseAdded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchedCourses = await getCourses(pageNumber, pageSize);
        setCourses(fetchedCourses);
        setFilteredCourses(fetchedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [pageNumber, pageSize, courseAdded]);

  const refreshCourses = () => {
    setCourseAdded((prev) => !prev);
  };

  const handleAddCourseClick = () => {
    setIsAddCourseDialogOpen(true);
  };

  const handleDeleteCourseClick = () => {
    setIsDeleteCourseDialogOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = courses.filter(
      (course) =>
        course.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const handleNextPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prevPageNumber) => prevPageNumber - 1);
    }
  };

  return (
    <>
      <Navbar />
      <div className="px-20 py-6 w-full flex flex-col items-center">
        <div className="w-full mb-4">
          <SearchBar onSearch={handleSearch} />
        </div>
        {loading ? (
          <div className="flex items-center justify-center min-h-[calc(100vh-80px)] w-full">
            <Loader2 className="animate-spin text-muted-foreground" size={48} />
          </div>
        ) : (
          <div className="w-full">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ x: -150, opacity: 0, scale: 1 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="w-full mb-4"
              >
                <CourseCard key={course.id} course={course} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <div className="fixed bottom-0 left-0 p-4 flex space-x-4">
        {pageNumber > 1 && (
          <motion.button
            className="bg-gray-300 text-gray-800 hover:bg-gray-400 rounded-md h-10 px-4 py-2"
            onClick={handlePreviousPage}
            initial={{ x: 150, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <FontAwesomeIcon icon={faCaretLeft} />
          </motion.button>
        )}
        {courses.length > 0 && courses.length === pageSize && (
          <motion.button
            className="bg-gray-300 text-gray-800 hover:bg-gray-400 rounded-md h-10 px-4 py-2"
            onClick={handleNextPage}
            initial={{ x: 150, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <FontAwesomeIcon icon={faCaretRight} />
          </motion.button>
        )}
      </div>
      {role !== 'Student' && (
        <div className="fixed bottom-0 right-0 p-4 flex space-x-4">
          <motion.button
            className="bg-green-500 text-white hover:bg-green-600 rounded-md h-10 px-4 py-2"
            onClick={handleAddCourseClick}
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Add Course
          </motion.button>
          <motion.button
            className="bg-red-500 text-white hover:bg-red-600 rounded-md h-10 px-4 py-2"
            onClick={handleDeleteCourseClick}
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Delete Course
          </motion.button>
        </div>
      )}
      <AddCourseDialog
        isOpen={isAddCourseDialogOpen}
        setIsOpen={setIsAddCourseDialogOpen}
        refreshCourses={refreshCourses}
      />
      <DeleteCourseDialog
        isOpen={isDeleteCourseDialogOpen}
        setIsOpen={setIsDeleteCourseDialogOpen}
        courses={courses}
        refreshCourses={refreshCourses}
      />
    </>
  );
};

export default CourseList;
