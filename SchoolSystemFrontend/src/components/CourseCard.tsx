import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '../@/components/ui/card';

interface Course {
    id: number;
    name: string;
    subject: string;
    teacherId: string;
    teacherInfo?: string;
    students?: string[];
}

interface CourseCardProps {
    course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {


    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/course/${course.id}`);
    };

    return (
        <Card onClick={handleCardClick} style={{ cursor: 'pointer' }}>
          <CardHeader>
            <h2>{course.name}</h2>
          </CardHeader>
          <CardContent>
            <p>Subject: {course.subject}</p>
            <p>Teacher ID: {course.teacherId}</p>
          </CardContent>
        </Card>
      );
    };

export default CourseCard