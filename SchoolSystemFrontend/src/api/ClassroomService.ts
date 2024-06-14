import axios from "axios";
import { StudentCourse } from "./CourseService";
import { Teacher } from "./TeacherService";
import { Student } from "./StudentService";

const API_URL = "https://localhost:7213/api/Classroom";


export interface Classroom {
    studentCourses: ClassroomCourse []
    name:string
    id:number
    students:Student[]
    teachers:TeacherClassroom[]
}


export interface ClassroomCourse {
    courseId:number
    classroomId:number
}

export interface TeacherClassroom{
    teacherId:number
    teacherName:string
    classroomId:number
}
 

export async function getClassrooms(pageNumber: number = 1, pageSize: number = 10): Promise<Classroom[]> {
    const response = await axios.get<{ items: Classroom[] }>(API_URL, {
      params: {
        pageNumber,
        pageSize,
      },
    });
    return response.data.items;
  }


  export async function getClassroomById(id: number): Promise<Classroom> {
    const response = await axios.get<Classroom>(`${API_URL}/${id}`);
    return response.data;
  }

  export const addStudentToClassroom = async (classroomId: number, studentId: number): Promise<void> => {
    try {
      await axios.put(`${API_URL}/add/student`, null, {
        params: {
          studentId,
          classroomId,
        }
      });
    } catch (error) {
      console.error('Error adding student to classroom:', error);
    }
};
export const removeStudentFromClassroom = async (classroomId: number, studentId: number): Promise<void> => {
    try {
      await axios.put(`${API_URL}/remove/student`, null, {
        params: {
          studentId,
          classroomId,
        }
      });
    } catch (error) {
      console.error('Error removing student to classroom:', error);
    }
};


export const addTeacherToClassroom = async ( teacherId: number,classroomId: number): Promise<void> => {
    try {
      await axios.put(`${API_URL}/add/teacher`, null, {
        params: {
          teacherId,
          classroomId,

        }
      });
    } catch (error) {
      console.error('Error adding teacher to classroom:', error);
    }
};
export const removeTeacherFromClassroom = async (teacherId: number,classroomId: number ): Promise<void> => {
    try {
      await axios.put(`${API_URL}/remove/teacher`, null, {
        params: {
            teacherId,
          classroomId,
        }
      });
    } catch (error) {
      console.error('Error removing student to classroom:', error);
    }
};