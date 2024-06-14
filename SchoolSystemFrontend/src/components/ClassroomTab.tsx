import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../@/components/ui/card';
import { Classroom, getClassrooms } from '../api/ClassroomService';
import { Loader2 } from 'lucide-react';
import Navbar from './Navbar';

const Classrooms: React.FC = () => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const fetchedClassrooms = await getClassrooms();
        setClassrooms(fetchedClassrooms);
      } catch (error) {
        console.error('Error fetching classrooms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClassrooms();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-muted-foreground" size={48} />
      </div>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-white px-20 py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Classrooms</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {classrooms.map((classroom, index) => (
          <motion.div
            key={classroom.id}
            onClick={() => navigate(`/classrooms/${classroom.id}`)}
            whileHover={{
              scale: 1.1,
              rotate: -10,
              transition: { type: 'spring', stiffness: 300, duration: 0.3 },
            }}
            whileTap={{ scale: 0.9, rotate: -10, borderRadius: '100%' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-gray-100 border border-gray-200 rounded-xl shadow-md overflow-hidden cursor-pointer">
              <CardHeader className="bg-blue-600 text-white p-4">
                <CardTitle className="text-xl font-semibold text-center">{classroom.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="mb-2">
                  <p className="text-lg font-medium text-gray-800">Students:</p>
                  {classroom.students.slice(0, 3).map((student, index) => (
                    <p key={index} className="text-gray-600">{student.name}</p>
                  ))}
                  {classroom.students.length > 3 && <p className="text-gray-600">...</p>}
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-800">Teachers:</p>
                  {classroom.teachers.slice(0, 3).map((teacher, index) => (
                    <p key={index} className="text-gray-600">{teacher.teacherName}</p>
                  ))}
                  {classroom.teachers.length > 3 && <p className="text-gray-600">...</p>}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Classrooms;
