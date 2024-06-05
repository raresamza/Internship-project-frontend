import React from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../@/components/ui/select';
import { Student } from '../api/StudentService';

interface StudentSelectorProps {
  students: Student[];
  filteredStudents: Student[];
  handleStudentSelect: (value: string) => void;
}

const StudentSelector: React.FC<StudentSelectorProps> = ({ students, filteredStudents, handleStudentSelect }) => {
  return (
    <Select onValueChange={handleStudentSelect}>
      <SelectTrigger className="w-[180px] bg-emerald-600 text-white">
        <SelectValue placeholder="Select a student" />
      </SelectTrigger>
      <SelectContent>
        {filteredStudents.map(student => (
          <SelectItem key={student.id} value={student.id.toString()}>
            {student.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StudentSelector;
