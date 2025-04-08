import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHomeworkWithStudents, gradeStudentHomework } from '../api/HomeworkService';
import GradeHomeworkForm from './GradeHomeworkForm';
import { Card, CardHeader, CardContent } from '../@/components/ui/card';

const HomeworkGradingPage = () => {
  const { homeworkId } = useParams();
  const [homework, setHomework] = useState<any>(null);

  useEffect(() => {
    const fetchHomework = async () => {
      const data = await getHomeworkWithStudents(parseInt(homeworkId!));
      setHomework(data);
    };
    fetchHomework();
  }, [homeworkId]);

  const handleGradeSubmit = async (studentId: number, grade: number) => {
    await gradeStudentHomework(studentId, parseInt(homeworkId!), grade);
    alert(`Graded student ${studentId} with ${grade}`);
  };

  if (!homework) return <div>Loading...</div>;

  return (
    <Card className="w-full max-w-4xl mx-auto mt-8 p-6">
      <CardHeader>
        <h1 className="text-2xl font-bold">Grading for: {homework.title}</h1>
      </CardHeader>
      <CardContent>
        {homework.studentHomeworks.map((sh: any) => (
          <div key={sh.studentId} className="mb-6">
            <p className="font-semibold mb-2">{sh.student.name} (Submitted: {sh.isCompleted ? '✅' : '❌'})</p>
            <GradeHomeworkForm
              studentId={sh.studentId}
              homeworkId={homework.id}
              currentGrade={sh.grade}
              onSubmit={(grade) => handleGradeSubmit(sh.studentId, grade)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default HomeworkGradingPage;
