import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import Student from './Student';

const StudentsTab = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [students, setStudents] = useState<Student[]>([]);

  interface Student {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }

  useEffect(() => {
    setTimeout(() => {
      setStudents([
        { id: 1, firstName: 'Rares', lastName: 'Amza', email: 'raresamza@gmail.com' },
        { id: 2, firstName: 'John', lastName: 'Doe', email: 'johndoe@gmail.com' },
        { id: 3, firstName: 'Rares', lastName: 'Amza', email: 'raresamza@gmail.com' }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Navbar />
      <p className='px-20 text-4xl font-bold py-10'>Students:</p>
      <div className='px-20 py-6'>
        <table className='border-separate border-spacing-y-6'>
          {!loading && (
            <tbody>
              {students.map((student, index) => (
                <Student
                  key={student.id}
                  firstName={student.firstName}
                  lastName={student.lastName}
                  email={student.email}
                  index={index} // Pass index to Student
                />
              ))}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
}

export default StudentsTab;
