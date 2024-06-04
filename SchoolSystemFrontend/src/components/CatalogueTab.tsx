import { useEffect, useState } from "react";
import Catalogue from "./Catalogue";
import Navbar from "./Navbar";
import { Course, getCourses } from "../api/CourseService";
import { Student, getUsers } from "../api/StudentService";



const CatalogueTab = () => {


  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [pageNumber, setPageNumber] = useState(1); // Track current page number
  const [pageSize] = useState(5); // Page size

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const fetchedStudents = await getUsers(pageNumber, pageSize);
        // console.log(fetchedStudents)
        // console.log("fetched above")
        setStudents(fetchedStudents);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [pageNumber]);


  return (
    <div>
        <Navbar/>
      <Catalogue students={students} /> {/* Render the Catalogue component with courses data */}
    </div>
  );
};

export default CatalogueTab