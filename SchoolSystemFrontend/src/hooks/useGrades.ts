import { jwtDecode } from "jwt-decode";
import { useState, useEffect, SetStateAction } from "react";
import { extractRelevantFields } from "../utils/utils";
import useAuth, { MyJwtPayload } from "./useAuth";
import { Grade, Student, getUsers } from "../api/StudentService";

const useGrades = () => {
    const [pageNumber, setPageNumber] = useState(1); // Track current page number
    const [pageSize] = useState(5); // Page size
    const [loading, setLoading] = useState(true);
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

        fetchStudents()

    }, [pageNumber]);
    let tmp:Grade[][]=[]
    students.map(student => {
        tmp.push(student.grades)
   
    })
    return tmp


};
export default useGrades;