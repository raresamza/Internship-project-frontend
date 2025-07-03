import axios from "axios";
import api from "../utils/axios";

const BASE_URL = "https://localhost:7213/api/Catalogue"
const API_PREFIX = "/Catalogue"


export interface GpaProps{
    courseId:number
    studentId:number
}

export async function addGpa(values:GpaProps) {
  console.log(values.studentId)
  console.log(values.courseId)
    try {
        const response = await api.put(`${API_PREFIX}/addGpa`, null, {
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
        const response = await api.put(`${API_PREFIX}/undoGpa`, null, {
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