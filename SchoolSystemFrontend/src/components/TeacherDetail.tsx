import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardFooter } from '../@/components/ui/card';
import { getTeacherById } from '../api/TeacherService';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../@/components/ui/collapsible';
import { Loader2 } from 'lucide-react';
import { getSubjectName } from '../utils/utils';
import AssignTeacherDialog from './AssignTeacherToCourseDialog';

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
  } | null;
}

const TeacherDetail: React.FC = () => {
  const { id } = useParams<Record<string, string>>();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const nav = useNavigate()

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const fetchedTeacher = await getTeacherById(parseInt(id ?? '0', 10));
        console.log(fetchedTeacher);
        setTeacher(fetchedTeacher);
      } catch (error:any) {
        console.error('Error fetching teacher:', error);
      }
    };

    fetchTeacher();
  }, [id]);

  if (!teacher) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] w-full">
        <Loader2 className='animate-spin text-muted-foreground' size={48} />
      </div>
    );
  }

  const handleAssignClick = () => {
    setIsAssignDialogOpen(true);
  };

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
              <p><strong className="text-blue-600">Subject:</strong> {getSubjectName(teacher.subject.toString())}</p>
              {teacher.taughtCourse ? (
                <>
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
                  </div>
                </>
              ) : (
                <p>No course assigned yet</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="bg-gray-100 p-4 flex justify-end">
            <button
              className="bg-green-500 text-white hover:bg-green-600 rounded-xl p-2 ml-auto whitespace-nowrap"
              onClick={handleAssignClick}
            >
              Assign Course
            </button>
          </CardFooter>
        </Card>
      </motion.div>
      <AssignTeacherDialog
        isOpen={isAssignDialogOpen}
        setIsOpen={setIsAssignDialogOpen}
        teacherId={teacher.id}
        teacherSubject={getSubjectName(teacher.subject.toString())}
        refreshTeacher={() => {
          const fetchTeacher = async () => {
            try {
              const fetchedTeacher = await getTeacherById(parseInt(id ?? '0', 10));
              setTeacher(fetchedTeacher);
            } catch (error) {
              console.error('Error fetching teacher:', error);
            }
          };

          fetchTeacher();
        }}
      />
    </div>
  );
};

export default TeacherDetail;
