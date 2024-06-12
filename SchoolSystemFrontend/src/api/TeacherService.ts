import axios from "axios";

const API_URL = "https://localhost:7213/api/Teacher";


export interface Teacher {
  id: number;
  name: string;
  age: number;
  address: string;
  phoneNumber: number;
  subject: number
  taughtCourse: {
    id: number;
    name: string;
    studentCourses: {
      studentId: number;
      courseId: number;
    }[];
  };
}


export interface TeacherCreationDto {
  age: number;
  phoneNumber: number;
  name: string;
  subject: number;
  address: string;
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

export async function getTeacherById(id: number): Promise<Teacher> {
  const response = await axios.get<Teacher>(`${API_URL}/${id}`);
  return response.data;
}
export const assignTeacherToCourse = async (courseId: number, teacherId: number): Promise<void> => {
  const resposne = await axios.put(`${API_URL}/assign`, null, {
    params: {
      courseId,
      teacherId
    }
  });

  return resposne.data;
};

export const createTeacher = async (teacher: Omit<Teacher, 'id' | 'taughtCourse'>): Promise<void> => {
  const response = await axios.post(API_URL, teacher);
  return response.data;
};

export const deleteTeacher = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};