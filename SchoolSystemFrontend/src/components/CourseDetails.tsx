import React from 'react'
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from '../@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../@/components/ui/select';
import { AnimatePresence, motion } from 'framer-motion';


interface Course {
  id: number;
  name: string;
  subject: string;
  teacherId: string;
  teacherInfo?: string;
  students?: string[];
}


const CourseDetails = () => {

  const { courseId } = useParams<{ courseId: string }>();



  // Fetch detailed course data here using courseId. This is mock data for now.
  const course: Course = {
    id: parseInt(courseId!),
    name: 'Math 101',
    subject: 'Mathematics',
    teacherId: 'T01',
    teacherInfo: 'John Doe, PhD',
    students: ['Student 1', 'Student 2', 'Student 3'],
  };

  return (
      <motion.div
        className='flex items-center justify-center min-h-screen w-full'
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
              <p className="text-lg font-medium">Subject: <span className="font-normal">{course.subject}</span></p>
            </motion.div>
            <motion.div
              className="mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-lg font-medium">Teacher ID: <span className="font-normal">{course.teacherId}</span></p>
            </motion.div>
            <motion.div
              className="mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-lg font-medium">Teacher Info: <span className="font-normal">{course.teacherInfo}</span></p>
            </motion.div>
          </CardContent>
          <CardFooter className="bg-gray-100 p-6 rounded-b-lg">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <div className="flex items-center space-x-4">
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
                    {course.students?.map((student, index) => (
                      <motion.div
                        key={student}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay:   index * 0.1 }}
                      >
                        <SelectItem
                          value={student}
                          className="p-2 hover:bg-gray-100"
                        >
                          {student}
                        </SelectItem>
                      </motion.div>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    
  );
}
  export default CourseDetails;