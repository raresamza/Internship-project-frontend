import { useEffect, useState } from "react";
import Catalogue from "./Catalogue";
import Navbar from "./Navbar";
import { getAllStudents, getUsers, Student } from "../api/StudentService";

const CatalogueTab = () => {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [pageNumber, setPageNumber] = useState(1); // Track current page number
  const [pageSize] = useState(5); // Page size

  const fetchStudents = async () => {
    try {
      const fetchedStudents = await getAllStudents();
      setStudents(fetchedStudents);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [pageNumber]);

  return (
    <div>
      <Navbar />
      <Catalogue students={students} refreshStudents={fetchStudents} /> 
    </div>
  );
};

export default CatalogueTab;
