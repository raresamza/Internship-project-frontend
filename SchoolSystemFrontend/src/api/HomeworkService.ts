import axios from "axios";

const API_URL="https://localhost:7213/api/Homework"


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

export interface Submission {
  id: number;
  studentId: number;
  studentName: string;
  fileUrl: string;
  grade?: number;
  isCompleted: boolean;
}



export const downloadStudentHomework = async (studentId: number, homeworkId: number) => {
  const response = await axios.get(
    `https://localhost:7213/api/Homework/download-homework`,
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
  const response = await axios.get(`${API_URL}/${homeworkId}`);
  return response.data;
}

export async function gradeStudentHomework(studentId: number, homeworkId: number, grade: number): Promise<void> {
  try {
    await axios.post(`${API_URL}/grade`, null, {
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
export async function sendGradeChart(studentId: number, file: File): Promise<void> {
  const formData = new FormData();
  formData.append("file", file);

  await axios.post(`$https://localhost:7213/api/Student/${studentId}/send-grade-chart`, formData);
}
