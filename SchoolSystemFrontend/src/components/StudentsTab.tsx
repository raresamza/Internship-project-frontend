import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Student from './Student';
import SearchBar from './Searchbar';
import { Loader2 } from 'lucide-react';
import { getUsersQuery } from '../api/StudentService';
import { motion } from 'framer-motion';
import AddStudentDialog from './AddStudentDialog';
import DeleteStudentDialog from './DeleteStudentDialog';
import useAuth from '../hooks/useAuth';

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
  const token = useAuth();
  const role = token?.role;
  console.log(role)

  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(5);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchStudents = async (page: number, query: string = '') => {
    try {
      setLoading(true);
      const { students: fetchedStudents, totalCount } = await getUsersQuery(page, pageSize, query || '');
      // console.log(totalCount,totalStudents)
      setStudents(fetchedStudents);
      setTotalStudents(totalCount);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };


  const loadInitialStudents = () => {
    fetchStudents(1, '');
  };

  useEffect(() => {
    loadInitialStudents();
  }, []);

  const handleLoadMore = async () => {
    const newPage = pageNumber + 1;
    setPageNumber(newPage);
    await fetchStudents(newPage, searchQuery);
  };

  const handlePreviousPage = async () => {
    if (pageNumber > 1) {
      const newPage = pageNumber - 1;
      setPageNumber(newPage);
      await fetchStudents(newPage, searchQuery);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPageNumber(1);
    fetchStudents(1, query);
  };

  const isLastPage = (pageNumber * pageSize) >= totalStudents;

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-[calc(100vh-80px)] w-full overflow-y-scroll">
  //       <Loader2 className='animate-spin text-muted-foreground' size={48} />
  //     </div>
  //   );
  // }

  return (
    <div className='h-screen flex flex-col'>
      <Navbar />

      <div className='flex-1 overflow-y-scroll no-scrollbar'>
        <p className='px-20 text-4xl font-bold py-10'>Students:</p>
        <div className='px-20'>
        <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
        </div>
        <div className='px-20 py-6'>
          {
            loading ? (
              <div className="flex items-center justify-center min-h-[calc(100vh-80px)] w-full">
                <Loader2 className="animate-spin text-muted-foreground" size={48} />
              </div>
            ) : (
              <table className='border-separate border-spacing-y-6 mt-6'>
                {!loading && (
                  <tbody>
                    {students.map((student, index) => (
                      <Student
                        key={student.id}
                        name={student.name}
                        parentEmail={student.parentEmail}
                        index={index}
                        id={student.id}
                        parentName={student.parentName}
                        age={student.age}
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
            )
          }

          <div className="bottom-4 left-20 p-4">
            {pageNumber > 1 && role==="Admin" && (
              <motion.button
                className='bg-red-500 text-white hover:bg-red-700 rounded-md h-10 px-4 py-2 mr-2'
                onClick={handlePreviousPage}
                initial={{ x: -150, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Previous
              </motion.button>
            )}
            {!isLastPage && role==="Admin" && (
              <motion.button
                className='bg-green-500 text-white hover:bg-green-700 rounded-xl h-10 px-4 py-2'
                onClick={handleLoadMore}
                initial={{ x: -150, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Load More
              </motion.button>
            )}
          </div>
          {role !== 'Student' && role!== 'Parent' && (
            <div className="bottom-4 right-10 p-4 flex space-x-4">
              <AddStudentDialog refreshStudents={loadInitialStudents} />
              <DeleteStudentDialog refreshStudents={loadInitialStudents} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentsTab;