import React from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../@/components/ui/select';
import { Student } from '../api/StudentService';

interface StudentSelectorProps {
  students: Student[];
  handleStudentSelect: (value: string) => void;
}

const StudentSelector: React.FC<StudentSelectorProps> = ({ students, handleStudentSelect }) => {
  return (
    <Select onValueChange={handleStudentSelect}>
      <SelectTrigger className="w-[180px] bg-emerald-600 text-white rounded-xl">
        <SelectValue placeholder="Select a student" />
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        {students.map((student) => (
          <SelectItem key={student.id} value={student.id.toString()} className="bg-white text-black">
            {student.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StudentSelector;
