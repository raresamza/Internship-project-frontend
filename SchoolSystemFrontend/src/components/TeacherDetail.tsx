import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '../@/components/ui/card';

interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phoneNumber: string;
  age: number;
  subject: string;
  courseName: string;
}

const TeacherDetail: React.FC = () => {
  const { id } = useParams<Record<string, string>>();

  // Simulated data fetching based on teacher ID
  const teacher: Teacher = {
    id: parseInt(id!, 10),
    firstName: 'Rares',
    lastName: 'Amza',
    email: 'raresamza@gmail.com',
    address: '123 Main St',
    phoneNumber: '123-456-7890',
    age: 40,
    subject: 'Math',
    courseName: 'Algebra 101'
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Card className="w-96 shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-blue-600 text-white p-4">
            <h2 className="text-2xl font-bold">Teacher Details</h2>
          </CardHeader>
          <CardContent className="bg-white p-6">
            <div className="space-y-4">
              <p><strong className="text-blue-600">Name:</strong> {teacher.firstName} {teacher.lastName}</p>
              <p><strong className="text-blue-600">Email:</strong> {teacher.email}</p>
              <p><strong className="text-blue-600">Address:</strong> {teacher.address}</p>
              <p><strong className="text-blue-600">Phone Number:</strong> {teacher.phoneNumber}</p>
              <p><strong className="text-blue-600">Age:</strong> {teacher.age}</p>
              <p><strong className="text-blue-600">Subject:</strong> {teacher.subject}</p>
              <p><strong className="text-blue-600">Course Name:</strong> {teacher.courseName}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default TeacherDetail;
