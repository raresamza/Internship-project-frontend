import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from '../@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../@/components/ui/select';
import { motion } from 'framer-motion';
import { Course, getCourseById } from '../api/CourseService';
import Navbar from './Navbar';
import { Loader2 } from 'lucide-react';
import { getSubjectName } from '../utils/utils';
import EnrollStudentDialog from './EnrollStudentDialog';

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false);

  const fetchCourseDetails = async () => {
    try {
      if (courseId) {
        const fetchedCourse = await getCourseById(parseInt(courseId));
        setCourse(fetchedCourse);
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  const handleEnrollClick = () => {
    setIsEnrollDialogOpen(true);
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] w-full">
          <Loader2 className='animate-spin text-muted-foreground' size={48} />
        </div>
      ) : course ? (
        <motion.div
          className='flex items-center justify-center min-h-[calc(100vh-80px)] w-full'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <Card className="w-full max-w-5xl mx-auto shadow-lg border border-gray-200 rounded-lg">
            <CardHeader className="bg-blue-500 text-white p-6 rounded-t-lg">
              <motion.h1
                className="text-3xl font-bold"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {course.name}
              </motion.h1>
            </CardHeader>
            <CardContent className="p-6">
              <motion.div
                className="mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-lg font-medium">Subject: <span className="font-normal">{getSubjectName(course.subject)}</span></p>
              </motion.div>
              <motion.div
                className="mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-lg font-medium">Teacher ID: <span className="font-normal">{course.teacherId || "Not assigned yet"}</span></p>
              </motion.div>
              <motion.div
                className="mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-lg font-medium">Teacher Info: <span className="font-normal">{course.teacherName || "Not assigned yet"}</span></p>
              </motion.div>
            </CardContent>
            <CardFooter className="bg-gray-100 p-6 rounded-b-lg flex justify-between items-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex items-center space-x-4 w-full"
              >
                <motion.h2
                  className="text-lg font-medium whitespace-nowrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  Enrolled Students:
                </motion.h2>
                <Select>
                  <SelectTrigger className="w-[325px] bg-white border border-gray-300 p-3 rounded-md shadow-sm">
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                    {course.studentCourses?.map((student, index) => (
                      <motion.div
                        key={student.studentId}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <SelectItem
                          value={student.studentId.toString()}
                          className="p-2 hover:bg-gray-100"
                        >
                          {student.studentName}
                        </SelectItem>
                      </motion.div>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
              <motion.button
                className="bg-green-500 text-white hover:bg-green-600 rounded-xl p-2 ml-auto whitespace-nowrap"
                onClick={handleEnrollClick}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                Enroll Student
              </motion.button>
            </CardFooter>
          </Card>
          <EnrollStudentDialog
            isOpen={isEnrollDialogOpen}
            setIsOpen={setIsEnrollDialogOpen}
            courseId={parseInt(courseId as string)}
            course={course}
            refreshCourse={fetchCourseDetails} // Pass the function to refresh course data
          />
        </motion.div>
      ) : (
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] w-full">
          <p className='text-lg font-medium'>Course not found</p>
        </div>
      )}
    </>
  );
};

export default CourseDetails;
