import axios from 'axios';
import api from '../utils/axios';
const API_URL = 'https://localhost:7213/api/Leaderboard';
const API_PREFIX = '/Leaderboard'
export interface ClassStudentLeaderboardDto {
    className: string;
    students: LeaderboardEntry[];
  }
  
  export interface LeaderboardEntry {
    studentId: number;
    studentName: string;
    averageGrade: number;
    participationPoints: number;
  }

  export async function getClassLeaderboard(): Promise<ClassStudentLeaderboardDto[]> {
    const response = await api.get(`${API_PREFIX}/class`);
    return response.data;
  }