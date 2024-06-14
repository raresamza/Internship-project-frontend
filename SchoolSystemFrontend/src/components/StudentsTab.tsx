import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Student from './Student';
import SearchBar from './Seachbar';
import { Loader2 } from 'lucide-react';
import { getUsers } from '../api/StudentService';
import { motion } from 'framer-motion';
import AddStudentDialog from './AddStudentDialog';
import DeleteStudentDialog from './DeleteStudentDialog';

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
  const [pageNumber, setPageNumber] = useState(1); // Track current page number
  const [pageSize] = useState(5); // Page size

  const fetchStudents = async () => {
    try {
      const fetchedStudents = await getUsers(pageNumber, pageSize);
      setStudents(fetchedStudents); // Replace existing data with new data
      setFilteredStudents(fetchedStudents); // Update filtered data as well
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [pageNumber]); // Fetch data whenever page number changes

  const handleLoadMore = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1); // Increment page number to fetch next page
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(prevPageNumber => prevPageNumber - 1); // Decrement page number to go back
    }
  };

  const handleSearch = (query: string) => {
    const filtered = students.filter(student => {
      const fullName = `${student.name.toLowerCase()}`;
      return fullName.includes(query.toLowerCase());
    });
    setFilteredStudents(filtered);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] w-full">
        <Loader2 className='animate-spin text-muted-foreground' size={48} />
      </div>
    );
  }

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
                  age={0}
                  address={student.address}
                  phoneNumber={student.phoneNumber}
                  grades={student.grades}
                  gpAs={student.gpAs}
                  absences={student.absences}
                />                                                                                                                                     
              ))}
            </tbody>
          )}
        </table>
        <div className="fixed bottom-4 left-20 p-4">
          {pageNumber > 1 && (
            <motion.button
              className='bg-red-500 text-white hover:bg-red-700 rounded-md h-10 px-4 py-2 mr-2'
              onClick={handlePreviousPage}
              initial={{ x: -150, opacity: 0 }} // Initial animation state
              animate={{ x: 0, opacity: 1 }} // Animation when trigger appears
              transition={{ delay: 0.3 }}
            >
              Previous
            </motion.button>
          )}
          {students.length > 0 && students.length % pageSize === 0 && (
            <motion.button
              className='bg-green-500 text-white hover:bg-green-700 rounded-xl h-10 px-4 py-2'
              onClick={handleLoadMore}
              initial={{ x: -150, opacity: 0 }} // Initial animation state
              animate={{ x: 0, opacity: 1 }} // Animation when trigger appears
              transition={{ delay: 0.3 }}
            >
              Load More
            </motion.button>
          )}
        </div>
        <div className="fixed bottom-4 right-10 p-4 flex space-x-4">
          <AddStudentDialog refreshStudents={fetchStudents} />
          <DeleteStudentDialog refreshStudents={fetchStudents} />
        </div>
      </div>
    </>
  );
};

export default StudentsTab;
