// StudentsTab.tsx
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Student from './Student';
import SearchBar from './Seachbar';
import { getUsers } from '../api/StudentService';


interface Student {
  id: number;
  parentEmail: string;
  parentName: string;
  age: number;
  name: string;
  address: string;
  phoneNumber: number;
  grades: Grade[];
  gpAs: Gpa[];
  absences: Absence[];
}

interface Grade {
  courseId: number;
  courseName: string;
  gradeValues: number[];
}

interface Gpa {
  courseId: number;
  courseName: string;
  gpaValue: number;
}

interface Absence {
  id: number;
  date: string;
  courseName: string;
}

const StudentsTab: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     const fetchedStudents = [
  //       { id: 1, firstName: 'Rares', lastName: 'Amza', email: 'raresamza@gmail.com' },
  //       { id: 2, firstName: 'John', lastName: 'Doe', email: 'johndoe@gmail.com' },
  //       { id: 3, firstName: 'Rares', lastName: 'Amza', email: 'raresamza@gmail.com' }
  //     ];
  //     setStudents(fetchedStudents);
  //     setFilteredStudents(fetchedStudents);
  //     setLoading(false);
  //   }, 1000);
  // }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const fetchedStudents = await getUsers();
        setStudents(fetchedStudents);
        setFilteredStudents(fetchedStudents);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleSearch = (query: string) => {
    const filtered = students.filter(student => {
      const fullName = `${student.name.toLowerCase()}`;
      return fullName.includes(query.toLowerCase());
    });
    setFilteredStudents(filtered);
  };

  return (
    <>
      <Navbar />
      <p className='px-20 text-4xl font-bold py-10'>Students:</p>
      <div className='px-20 py-6'>
        <SearchBar onSearch={handleSearch} />
        <table className='border-separate border-spacing-y-6 mt-6'>
          {!loading && (
            <tbody>
              {filteredStudents.map((student, index) => (
                <Student
                  key={student.id}
                  name={student.name}
                  parentEmail={student.parentEmail}
                  index={index} // Pass index to Student
                  id={student.id}
                  parentName={student.parentName} 
                  age={0} address={student.address} 
                  phoneNumber={student.phoneNumber} 
                  grades={student.grades} 
                  gpAs={student.gpAs} 
                  absences={student.absences} 
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
