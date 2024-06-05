import axios from 'axios';


const API_URL = "https://localhost:7213/api/Student";

export interface Student {
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

  export interface AbsenceParams {
    date: string,
    studentId: number,
    courseId: number
  }
  
export interface Grade {
    courseId: number;
    courseName: string;
    gradeValues: number[];
  }
  
export  interface Gpa {
    courseId: number;
    courseName: string;
    gpaValue: number;
  }
  
export interface Absence {
    id: number;
    date: string;
    courseName: string;
  }
  
  export async function getUsers(pageNumber: number = 1, pageSize: number = 10): Promise<Student[]> {
    const response = await axios.get<{ items: Student[] }>(API_URL, {
      params: {
        pageNumber,
        pageSize,
      },
    });
    // console.log(response.data.items)
    return response.data.items;
  }

  export async function addAbsence(vals:AbsenceParams) {
    
  }
  export async function removeAbsence(vals:AbsenceParams) {
    
  }