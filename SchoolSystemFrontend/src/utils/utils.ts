import { MyJwtPayload } from '../hooks/useAuth';

export const subjectMapping: { [key: string]: string } = {
  "0": 'Mathematics',
  "1": 'History',
  "2": 'Science',
  "3": 'English',
  // Add more subjects as needed
};


export function getSubjectName(subjectId: string): string {
  return subjectMapping[subjectId] || 'Unknown Subject';
};

export function getSubjectId(subjectName: string): string | undefined {
  return Object.keys(subjectMapping).find(key => subjectMapping[key] === subjectName);
}

export const extractRelevantFields = (decodedToken: any): MyJwtPayload => {
  return {
    FirstName: decodedToken.FirstName,
    LastName: decodedToken.LastName,
    role: decodedToken.role,
    email: decodedToken.email,
  };
};