import { useEffect, useState } from 'react';
import { getClassLeaderboard, ClassStudentLeaderboardDto } from '../api/LeaderboardService';
import { Card, CardHeader, CardContent } from '../@/components/ui/card';
import Navbar from './Navbar';

const ClassLeaderboardPage = () => {
  const [entries, setEntries] = useState<ClassStudentLeaderboardDto[]>([]);
  const [expandedClasses, setExpandedClasses] = useState<{ [className: string]: boolean }>({});

  useEffect(() => {
    getClassLeaderboard().then(setEntries).catch(console.error);
  }, []);

  const toggleClass = (className: string) => {
    setExpandedClasses(prev => ({
      ...prev,
      [className]: !prev[className],
    }));
  };

  return (
    <>
    <Navbar/>
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📚🏆 Class Leaderboard</h1>

      {entries.map(classEntry => (
        <Card
          key={classEntry.className}
          className={`mb-6 shadow-md border cursor-pointer transition-transform hover:scale-[1.01]`}
          onClick={() => toggleClass(classEntry.className)}
        >
          <CardHeader className="text-xl font-semibold px-6 py-5">
            {classEntry.className}
          </CardHeader>

          {expandedClasses[classEntry.className] && (
            <CardContent className="px-6 pt-2 pb-4 space-y-3">
              {classEntry.students.map((student, index) => (
                <div
                  key={student.studentId}
                  className="flex justify-between items-center p-4 border rounded-md bg-gray-50"
                >
                  <div>
                    <p className="font-semibold text-lg">{index + 1}. {student.studentName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">🎓 Avg Grade: <strong>{student.averageGrade.toFixed(2)}</strong></p>
                    <p className="text-sm">⭐ Participation: <strong>{student.participationPoints}</strong></p>
                  </div>
                </div>
              ))}

              <p className="text-sm text-muted-foreground mt-2">
                Total Students: {classEntry.students.length}
              </p>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
    </>
  );
};

export default ClassLeaderboardPage;
