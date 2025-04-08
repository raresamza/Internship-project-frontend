import React, { useState } from 'react';
import { Input } from '../@/components/ui/input';
import { Button } from '../@/components/ui/button';
import { Label } from '../@/components/ui/label';


interface Props {
  studentId: number;
  homeworkId: number;
  currentGrade?: number;
  onSubmit: (grade: number) => void;
}

const GradeHomeworkForm: React.FC<Props> = ({ studentId, homeworkId, currentGrade, onSubmit }) => {
  const [grade, setGrade] = useState(currentGrade || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(grade);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Label>Grade for Student #{studentId}</Label>
      <Input
        id="grade"
        type="number"
        min={1}
        max={10}
        value={grade}
        onChange={(e) => setGrade(parseFloat(e.target.value))}
        className="w-[100px]"
      />
      <Button type="submit">Submit Grade</Button>
    </form>
  );
};

export default GradeHomeworkForm;
