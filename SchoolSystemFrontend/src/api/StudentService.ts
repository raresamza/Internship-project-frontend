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

  export interface StudentCreationDto {
    parentName: string;
    name: string;
    parentEmail: string;
    phoneNumber: number;
    age: number;
    address: string;
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

  export interface AbsenceParams {
    date: string;
    studentId: number;
    courseId:number
    absenceId?: number; // Corrected to use absenceId instead of courseId
  }
  
  export interface DeleteAbsenceParams {
    studentId:number,
    absenceId:number,
    courseId:number,
  }


  export interface UploadHomeworkParams {
    studentId: number;
    homeworkId: number;
    file: File;
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

  export const getStudentByEmail = async (email: string): Promise<Student> => {
    try {
      const response = await axios.get(`${API_URL}/by-email`, {
        params: { email }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching student by email:', error);
      throw error;
    }
  };

  // Function to add an absence to a student
  export async function addAbsence(params: AbsenceParams): Promise<void> {
    try {
      const response = await axios.post(`${API_URL}/absence`, null, {
        params: {
          studentId: params.studentId,
          absenceId: params.absenceId, // Corrected to use absenceId
        },
      });
      console.log('Absence added successfully:', response.data);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 404) {
        throw new Error('AbsenceNotFound');
      }
      console.error('Error adding absence:', error);
      throw error;
    }
  }
  
  

  
  export async function removeAbsence(params: DeleteAbsenceParams): Promise<void> {
    try {
      const response = await axios.delete(`${API_URL}/removeAbsence`, {
        params: {
          studentId: params.studentId,
          absenceId: params.absenceId,
          courseId: params.courseId,
        },
      });
      console.log('Absence removed successfully:', response.data);
    } catch (error) {
      console.error('Error removing absence:', error);
      throw error;
    }
  }

  function isAxiosError(error: unknown): error is import('axios').AxiosError {
    return (error as import('axios').AxiosError).isAxiosError !== undefined;
  }


  export const getAllStudents = async (): Promise<Student[]> => {
    const response = await axios.get(`${API_URL}/all`); // Adjust the URL if needed
    
    return response.data;
  };

  export const createStudent = async (student: StudentCreationDto): Promise<Student> => {
    const response = await axios.post(`${API_URL}`, student);
    return response.data;
  };

  export const deleteStudent = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  };


  export const getUsersQuery = async (page: number, pageSize: number, query: string = ''): Promise<{ students: Student[], totalCount: number }> => {
    try {
      const response = await axios.get(`${API_URL}/query`, {
        params: { page, pageSize, query: query || '' } // Default to empty string if query is null or undefined
      });
      console.log(response.data)
      const data = response.data;
      const students: Student[] = data.students.items;
      const totalCount: number = data.students.totalCount;
      return { students, totalCount };
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  };
  
  // New function to search students by name
  export const searchStudentsByName = async (name: string): Promise<Student[]> => {
    try {
      const response = await axios.get(`${API_URL}`, {
        params: { query: name }
      });
      return response.data.students;
    } catch (error) {
      console.error('Error fetching students by name:', error);
      throw error;
    }
  };

  export const uploadHomeworkFile = async ({
    studentId,
    homeworkId,
    file
  }: UploadHomeworkParams): Promise<void> => {
    const formData = new FormData();
    formData.append('file', file);
  
    await axios.post(
      `https://localhost:7213/api/Homework/${studentId}/submit-homework/${homeworkId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  };