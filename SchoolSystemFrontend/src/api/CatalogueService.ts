import axios from "axios";

const BASE_URL = "https://localhost:7213/api/Catalogue"



export interface GpaProps{
    courseId:number
    studentId:number
}

export async function addGpa(values:GpaProps) {
    try {
        const response = await axios.put(`${BASE_URL}/addGpa`, null, {
          params: {
            studentId: values.studentId,
            courseId: values.courseId,
          },
        });
        console.log('GPA added successfully:', response.data);
      } catch (error) {
        console.error('Error adding GPA:', error);
        throw error;
      }
}


export async function undoGpa(values:GpaProps) {
    try {
        const response = await axios.put(`${BASE_URL}/undoGpa`, null, {
          params: {
            studentId: values.studentId,
            courseId: values.courseId,
          },
        });
        console.log('GPA undo success:', response.data);
      } catch (error) {
        console.error('Error adding GPA:', error);
        throw error;
      }
}