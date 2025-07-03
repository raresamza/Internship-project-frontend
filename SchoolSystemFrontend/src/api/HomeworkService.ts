import axios from "axios";
import api from "../utils/axios";

const API_URL="https://localhost:7213/api/Homework"
const API_PREFIX = "/Homework"

export interface GradeSubmission {
  id: number;
  studentName: string;
  grade?: number | null;
}
export interface HomeworkDto {
  id: number;
  title: string;
  description: string;
  deadline: string;
  studentHomeworks: {
    studentId: number;
    grade?: number;
    fileUrl?: string;
    student: {
      name: string;
    };
  }[];
}

export interface UploadHomeworkParams {
  studentId: number;
  homeworkId: number;
  file: File;
}


export interface Submission {
  id: number;
  studentId: number;
  studentName: string;
  fileUrl: string;
  grade?: number;
  isCompleted: boolean;
}



export const downloadStudentHomework = async (studentId: number, homeworkId: number) => {
  const response = await api.get(
    `/Homework/download-homework`,
    {
      params: { studentId, homeworkId },
      responseType: "blob", // 👈 ensures file is treated as binary
    }
  );


  

  // Create a download link
  const blob = new Blob([response.data], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `homework_${studentId}_${homeworkId}.pdf`; // filename
  document.body.appendChild(link);
  link.click();

  // Clean up
  link.remove();
  window.URL.revokeObjectURL(url);
};



export async function getHomeworkWithStudents(homeworkId: number) {
  const response = await api.get(`${API_PREFIX}/${homeworkId}`);
  return response.data;
}

export async function gradeStudentHomework(studentId: number, homeworkId: number, grade: number): Promise<void> {
  try {
    await api.post(`${API_URL}/grade`, null, {
      params: {
        studentId,
        homeworkId,
        grade,
      },
    });
    console.log('✅ Homework graded successfully.');
  } catch (error) {
    console.error('❌ Error grading homework:', error);
    throw error;
  }
}


// In HomeworkService.ts or a dedicated MailService.ts
export async function sendGradeChart(studentId: number, file: File) {
  const formData = new FormData();
  formData.append('file', file); // must match [FromForm(Name = "file")]

  await api.post(`https://localhost:7213/api/Student/${studentId}/send-grade-chart`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export const uploadHomeworkFile = async ({
  studentId,
  homeworkId,
  file
}: UploadHomeworkParams): Promise<void> => {
  const formData = new FormData();
  formData.append('file', file);

  await api.post(
    `https://localhost:7213/api/Homework/${studentId}/submit-homework/${homeworkId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  console.log("uploaded successfully!")
};