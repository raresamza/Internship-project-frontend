import jwt_decode from 'jwt-decode';
import { MyJwtPayload } from '../hooks/useAuth';

export const subjectMapping: { [key: string]: string } = {
  "0": 'Mathematics',
  "1": 'History',
  "2": 'Science',
  // Add more subjects as needed
};


export function getSubjectName(subjectId: string): string {
  return subjectMapping[subjectId] || 'Unknown Subject';
};

export const extractRelevantFields = (decodedToken: any): MyJwtPayload => {
  return {
    FirstName: decodedToken.FirstName,
    LastName: decodedToken.LastName,
    role: decodedToken.role,
    email: decodedToken.email,
  };
};