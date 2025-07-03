import axios from "axios";
import { StudentCourse } from "./CourseService";
import api from "../utils/axios";

// const API_PREFIX = "https://localhost:7213/api/Teacher";
const API_PREFIX="/Teacher"

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
    studentCourses: StudentCourse[]
    // studentCourses: {
    //   studentId: number;
    //   courseId: number;
    // }[];
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
  const response = await api.get<{ items: Teacher[] }>(API_PREFIX, {
    params: {
      pageNumber,
      pageSize,
    },
  });
  return response.data.items;
}

export async function getTeacherById(id: number): Promise<Teacher> {
  const response = await api.get<Teacher>(`${API_PREFIX}/${id}`);
  return response.data;
}
export const assignTeacherToCourse = async (courseId: number, teacherId: number): Promise<void> => {
  const resposne = await api.put(`${API_PREFIX}/assign`, null, {
    params: {
      courseId,
      teacherId
    }
  });

  return resposne.data;
};

export const createTeacher = async (teacher: Omit<Teacher, 'id' | 'taughtCourse'>): Promise<void> => {
  const response = await api.post(API_PREFIX, teacher);
  return response.data;
};

export const deleteTeacher = async (id: number): Promise<void> => {
  await api.delete(`${API_PREFIX}/${id}`);
};

export async function downloadTeacherSchedule(teacherId: number) {
  const response = await fetch(`https://localhost:7213/api/Teacher/${teacherId}/schedule`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to download schedule');
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'timetable.pdf'; // Or .json if that's the type
  a.click();
  window.URL.revokeObjectURL(url);
}