import axios from "axios";


const API_URL = "https://localhost:7213/api/Course";

export interface Homework {
  id: number;
  title: string;
  description: string;
  deadline: string;
  grade?: number;
};

export interface Course {
  id: number;
  name: string;
  subject: string;
  teacherId?: string;
  teacherName?: string;
  studentCourses?: StudentCourse[];
  homeworks?: Homework[]
}

export interface StudentCourse {
  studentId: number;
  studentName?:string;
  courseId?: string;
}

export interface AssignHomeworkDto {
  courseId: number;
  title: string;
  description: string;
  deadline: string; // ISO format
}

export interface GradeParams {
  grade: number;
  studentId: number;
  courseId: number;
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

export async function getCourseById(id: number): Promise<Course> {
  console.log(id)
  console.log(`${API_URL}/${id}`)
  const response = await axios.get<Course>(`${API_URL}/${id}`);
  console.log(response.data)
  return response.data;
}

export async function addGrade(params: GradeParams): Promise<void> {
  try {
    const response = await axios.post(`${API_URL}/add`, null, {
      params: {
        grade: params.grade,
        studentId: params.studentId,
        courseId: params.courseId,
      },
    });
    console.log('Grade added successfully:', response.data);
  } catch (error) {
    console.error('Error adding grade:', error);
  }
}

export async function removeGrade(params: GradeParams): Promise<void> {
  try {
    const response = await axios.delete(`${API_URL}/remove`, {
      params: {
        grade: params.grade,
        studentId: params.studentId,
        courseId: params.courseId,
      },
    });
    console.log('Grade removed successfully:', response.data);
  } catch (error) {
    console.error('Error removing grade:', error);
  }
}

export async function addCourse(name: string, subject: number): Promise<void> {
  try {
    const response = await axios.post(`${API_URL}`, { name, subject });
    console.log('Course added successfully:', response.data);
  } catch (error) {
    console.error('Error adding course:', error);
    throw error;
  }
}

export const deleteCourse = async (courseId: number): Promise<void> => {
  await axios.delete(`${API_URL}/${courseId}`);
};

export const enrollStudent = async (courseId: number, studentId: number): Promise<void> => {
  await axios.post(`${API_URL}/enroll`, null, {
    params: {
      studentId,
      courseId
    }
  });
};

export const getCoursesBySubject = async (subjectId: number): Promise<Course[]> => {
  const response = await axios.get(`${API_URL}/subject/${subjectId}`);
  return response.data;
};

export async function assignHomework(data: AssignHomeworkDto): Promise<void> {
  await axios.post(`${API_URL}/${data.courseId}/assign-homework`, data);
}