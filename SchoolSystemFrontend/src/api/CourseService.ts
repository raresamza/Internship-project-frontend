import axios from "axios";


const API_URL = "https://localhost:7213/api/Course";

export interface Course {
    id: number;
    name: string;
    subject: string;
    teacherId?: string;
    teacherName?: string;
    studentCourses?: StudentCourse[];
}

interface StudentCourse{ 
  studentId:number;
  studentName?:string;
}

export async function getCourses(pageNumber: number = 1, pageSize: number = 10): Promise<Course[]> {
    const response = await axios.get<{ items: Course[] }>(API_URL, {
      params: {
        pageNumber,
        pageSize,
      },
    });
    return response.data.items;
  }

  export async function getCourseById(id:number):Promise<Course> {
    console.log(id)
    console.log(`${API_URL}/${id}`)
    const response = await axios.get<Course>(`${API_URL}/${id}`);
      return response.data;
  }