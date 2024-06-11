import { useState, useEffect } from "react";
import { Gpa, Student, getUsers } from "../api/StudentService";

const useGpas = () => {
  const [pageNumber, setPageNumber] = useState(1); // Track current page number
  const [pageSize] = useState(100); // Page size
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const fetchedStudents = await getUsers(pageNumber, pageSize);
        setStudents(fetchedStudents);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchStudents();

  }, [pageNumber]);

  const gpas: Gpa[] = students.flatMap(student => student.gpAs);
  return gpas;
};

export default useGpas;
