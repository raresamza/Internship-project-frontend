import axios from "axios"

const BASE_URL = "https://localhost:7213/api/Absence"



export async function createAbsence(date: string, courseId: number): Promise<number> {
    try {
      const response = await axios.post(`${BASE_URL}`, {
        date,
        courseId,
      });
      console.log('Absence created successfully:', response.data);
      return response.data.id; // Assuming the API returns the new absence ID as `id`
    } catch (error) {
      console.error('Error creating absence:', error);
      throw error;
    }
  }
