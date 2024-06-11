import { Loader2 } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '../@/components/ui/card';
import { getSubjectName } from '../utils/utils';

interface Course {
    id: number;
    name: string;
    subject: string;
    teacherId?: string;
    teacherName?: string;
    studentCourses?: StudentCourse[];
}

interface StudentCourse{ 
  studentId:number;
  studentName?:string;
}


interface CourseCardProps {
    course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {

    const navigate = useNavigate();


    const handleCardClick = () => {
        navigate(`/courses/${course.id}`);
    };

    console.log(course.id)

    return (

        <Card className='mb-4 bg-gradient-to-br from-[#00d4ff] to-[#090979] text-white' onClick={handleCardClick} style={{ cursor: 'pointer' }}>
          <CardHeader>
            <h2 className='text-lg font-bold'>{course.name}</h2>
          </CardHeader>
          <CardContent className='font-semibold'>
            <p>Subject: {getSubjectName(course.subject)}</p>
            {course.teacherId ? <p>Teacher ID: {course.teacherId}</p>:<p>Teacher not assigned yet...</p>}
          </CardContent>
        </Card>
      );
    };

export default CourseCard