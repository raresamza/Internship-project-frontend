import React from 'react'
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from '../@/components/ui/card';


interface Course {
    id: number;
    name: string;
    subject: string;
    teacherId: string;
    teacherInfo?: string;
    students?: string[];
}


const CourseDetails = () => {

    const { courseId } = useParams<{ courseId: string }>();

    
  // Fetch detailed course data here using courseId. This is mock data for now.
  const course: Course = {
    id: parseInt(courseId!),
    name: 'Math 101',
    subject: 'Mathematics',
    teacherId: 'T01',
    teacherInfo: 'John Doe, PhD',
    students: ['Student 1', 'Student 2', 'Student 3'],
  };

  return (
    <Card>
      <CardHeader>
        <h1>{course.name}</h1>
      </CardHeader>
      <CardContent>
        <p>Subject: {course.subject}</p>
        <p>Teacher ID: {course.teacherId}</p>
        <p>Teacher Info: {course.teacherInfo}</p>
      </CardContent>
      <CardFooter>
        <h2>Enrolled Students</h2>
        <ul>
          {course.students?.map(student => (
            <li key={student}>{student}</li>
          ))}
        </ul>
      </CardFooter>
    </Card>
  );
};

export default CourseDetails