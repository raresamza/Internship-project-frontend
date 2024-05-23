import Catalogue from "./Catalogue";
import Navbar from "./Navbar";

const coursesData = [
  {
    id: 1,
    name: 'Mathematics',
    grades: [
      { subject: 'Algebra', grade: 'A' },
      { subject: 'Calculus', grade: 'B' },
    ],
    gpas: [
      { semester: 'Fall 2023', gpa: '3.8' },
      { semester: 'Spring 2024', gpa: '3.9' },
    ],
    absences: [
      { date: '2023-09-15', count: 2 },
      { date: '2023-09-20', count: 1 },
    ],
  },
  {
    id: 2,
    name: 'Mathematics',
    grades: [
      { subject: 'Algebra', grade: 'A' },
      { subject: 'Calculus', grade: 'B' },
    ],
    gpas: [
      { semester: 'Fall 2023', gpa: '3.8' },
      { semester: 'Spring 2024', gpa: '3.9' },
    ],
    absences: [
      { date: '2023-09-15', count: 2 },
      { date: '2023-09-20', count: 1 },
    ],
  },
  // Add more courses data as needed
];

const CatalogueTab = () => {
  return (
    <div>
        <Navbar/>
      <Catalogue courses={coursesData} /> {/* Render the Catalogue component with courses data */}
    </div>
  );
};

export default CatalogueTab