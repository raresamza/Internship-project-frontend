import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Teacher from './Teacher';

const TeachersTab = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  interface Teacher {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }

  useEffect(() => {
    setTimeout(() => {
      setTeachers([
        { id: 1, firstName: 'Rares', lastName: 'Amza', email: 'raresamza@gmail.com' },
        { id: 2, firstName: 'John', lastName: 'Doe', email: 'johndoe@gmail.com' },
        { id: 3, firstName: 'Jane', lastName: 'Smith', email: 'janesmith@gmail.com' }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Navbar />
      <p className='px-20 text-4xl font-bold py-10'>Teachers:</p>
      <div className='px-20 py-6'>
        <table className='border-separate border-spacing-y-6'>
          {!loading && (
            <tbody>
              {teachers.map((teacher, index) => (
                <Teacher
                  key={teacher.id}
                  id={teacher.id}
                  firstName={teacher.firstName}
                  lastName={teacher.lastName}
                  email={teacher.email}
                  index={index}
                />
              ))}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
}

export default TeachersTab;
