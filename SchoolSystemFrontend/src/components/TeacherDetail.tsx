import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '../@/components/ui/card';
import { getTeacherById } from '../api/TeacherService';
import { Collapsible,CollapsibleTrigger,CollapsibleContent } from '../@/components/ui/collapsible';

interface Teacher {
  id: number;
  name: string;
  age: number;
  subject: number;
  address: string;
  phoneNumber: number;
  taughtCourse: {
    id: number;
    name: string;
    studentCourses: {
      studentId: number;
      courseId: number;
    }[];
  };
}




const TeacherDetail: React.FC = () => {
  const { id } = useParams<Record<string, string>>();


  const [teacher, setTeacher] = useState<Teacher | null>(null);


  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const fetchedTeacher = await getTeacherById(parseInt(id ?? '0', 10));
        console.log(fetchedTeacher)
        setTeacher(fetchedTeacher);
      } catch (error) {
        console.error('Error fetching teacher:', error);
      }
    };

    fetchTeacher();
  }, [id]);


  if (!teacher) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Card className="w-96 shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-blue-600 text-white p-4">
            <h2 className="text-2xl font-bold">Teacher Details</h2>
          </CardHeader>
          <CardContent className="bg-white p-6">
            <div className="space-y-4">
              <p><strong className="text-blue-600">Name:</strong> {teacher.name}</p>
              <p><strong className="text-blue-600">Email:</strong> {teacher.phoneNumber}</p>
              <p><strong className="text-blue-600">Address:</strong> {teacher.address}</p>
              <p><strong className="text-blue-600">Phone Number:</strong> {teacher.phoneNumber}</p>
              <p><strong className="text-blue-600">Age:</strong> {teacher.age}</p>
              <p><strong className="text-blue-600">Subject:</strong> {teacher.subject}</p>
              <p><strong className="text-blue-600">Course Name:</strong> {teacher.taughtCourse.name}</p>
              <div>
                {teacher.taughtCourse.studentCourses.length > 0 ? (
                  <Collapsible>
                    <CollapsibleTrigger className='text-blue-600 border border-black rounded-lg p-2 font-bold'>
                      Enrolled students
                    </CollapsibleTrigger>
                    {teacher.taughtCourse.studentCourses.map(course => (
                      <CollapsibleContent key={course.courseId}>{course.courseId}</CollapsibleContent>
                    ))}
                  </Collapsible>
                ) : (
                  <p>No students currently enrolled</p>
                )}

                {/* <strong className="text-blue-600">Course Names:</strong>
                {teacher.taughtCourses.map(course => (
                  <p key={course.id}>{course.name}</p>
                ))} */}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default TeacherDetail;
