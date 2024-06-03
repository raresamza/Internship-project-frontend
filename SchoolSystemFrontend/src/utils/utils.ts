export const subjectMapping: { [key: string]: string } = {
  "0": 'Mathematics',
  "1": 'History',
  "2": 'Science',
  // Add more subjects as needed
};


export function getSubjectName(subjectId: string): string {
  return subjectMapping[subjectId] || 'Unknown Subject';
};