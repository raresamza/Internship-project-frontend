// StudentsTab.tsx
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Student from './Student';
import SearchBar from './Seachbar';

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const StudentsTab: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);

  useEffect(() => {
    setTimeout(() => {
      const fetchedStudents = [
        { id: 1, firstName: 'Rares', lastName: 'Amza', email: 'raresamza@gmail.com' },
        { id: 2, firstName: 'John', lastName: 'Doe', email: 'johndoe@gmail.com' },
        { id: 3, firstName: 'Rares', lastName: 'Amza', email: 'raresamza@gmail.com' }
      ];
      setStudents(fetchedStudents);
      setFilteredStudents(fetchedStudents);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (query: string) => {
    const filtered = students.filter(student => {
      const fullName = `${student.firstName.toLowerCase()} ${student.lastName.toLowerCase()}`;
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
