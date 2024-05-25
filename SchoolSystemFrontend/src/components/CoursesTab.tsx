import React from 'react';
import CourseCard from './CourseCard';

interface Course {
    id: number;
    name: string;
    subject: string;
    teacherId: string;
    teacherInfo?: string;
    students?: string[];
}

const courses: Course[] = [
  { id: 1, name: 'Math 101', subject: 'Mathematics', teacherId: 'T01' },
  { id: 2, name: 'History 201', subject: 'History', teacherId: 'T02' },
  // Add more courses as needed
];

const CourseList: React.FC = () => (
  <div className="course-list">
    {courses.map(course => (
      <CourseCard key={course.id} course={course} />
    ))}
  </div>
);

export default CourseList;
