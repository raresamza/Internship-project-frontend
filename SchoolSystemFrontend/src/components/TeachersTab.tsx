import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Teacher from './Teacher';
import { getTeachers } from '../api/TeacherService';
import { Loader2 } from 'lucide-react';
import AddTeacherDialog from './AddTeacherDialog';
import DeleteTeacherDialog from './DeleteTeacherDialog';
import useAuth from '../hooks/useAuth';

export interface Teacher {
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

const TeachersTab = () => {


  const token = useAuth();
  const role = token?.role;

  const [loading, setLoading] = useState<boolean>(true);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const fetchTeachers = async () => {
    try {
      const fetchedTeachers = await getTeachers();
      setTeachers(fetchedTeachers);
      setLoading(false); // Set loading to false after fetching
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-[calc(100vh-80px)] w-full">
  //       <Loader2 className='animate-spin text-muted-foreground' size={48} />
  //     </div>
  //   );
  // }

  return (
    <>
      <Navbar />
      {loading && (
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] w-full">
          <Loader2 className='animate-spin text-muted-foreground' size={48} />
        </div>
      )}
      <p className='px-20 text-4xl font-bold py-10'>Teachers:</p>
      <div className='px-20 py-6'>
        <table className='border-separate border-spacing-y-6'>
          {!loading && (
            <tbody>
              {teachers.map((teacher, index) => (
                <Teacher
                  key={teacher.id}
                  id={teacher.id}
                  name={teacher.name}
                  phoneNumber={teacher.phoneNumber}
                  index={index}
                  age={teacher.age}
                  address={teacher.address}
                  taughtCourse={teacher.taughtCourse}
                  subject={teacher.subject}
                />
              ))}
            </tbody>
          )}
        </table>
        {role !== 'Student' && (
          <div className="fixed bottom-4 right-10 p-4 flex space-x-4">
            <AddTeacherDialog refreshTeachers={fetchTeachers} />
            <DeleteTeacherDialog refreshTeachers={fetchTeachers} />
          </div>
        )}
      </div>
    </>
  );
}

export default TeachersTab;
