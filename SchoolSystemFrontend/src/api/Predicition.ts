import axios from "axios";
import api from "../utils/axios";

// const API_URL = "https://localhost:7213/api/GradePrediction";
const API_PREFIX= "/api/GradePrediction";

export async function predictGrade(studentId: number, courseId: number): Promise<number> {
  const res = await api.post("/GradePrediction/predict", {
    studentId,
    courseId,
  });

  return res.data.predictedGrade;
}