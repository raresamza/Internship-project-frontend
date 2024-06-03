import axios from "axios";

const API_URL = "https://localhost:7213/api/Teacher";


export interface Teacher {
  id: number;
  name: string;
  age: number;
  address: string;
  phoneNumber: number;
  subject:number
  taughtCourse: {
    id: number;
    name: string;
    studentCourses: {
      studentId: number;
      courseId: number;
    }[];
  };
}

export async function getTeachers(pageNumber: number = 1, pageSize: number = 10): Promise<Teacher[]> {
  const response = await axios.get<{ items: Teacher[] }>(API_URL, {
    params: {
      pageNumber,
      pageSize,
    },
  });
  return response.data.items;
}

export async function getTeacherById(id:number):Promise<Teacher> {
  const response = await axios.get<Teacher>(`${API_URL}/${id}`);
    return response.data;
}