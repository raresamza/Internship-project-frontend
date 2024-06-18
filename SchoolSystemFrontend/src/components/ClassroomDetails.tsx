import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getClassroomById, Classroom, addTeacherToClassroom, removeTeacherFromClassroom, addStudentToClassroom, removeStudentFromClassroom } from '../api/ClassroomService';
import { getTeacherById, getTeachers, Teacher } from '../api/TeacherService';
import { getAllStudents, Student } from '../api/StudentService';
import { Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../@/components/ui/select';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../@/components/ui/dialog';
import { toast } from 'sonner';
import Navbar from './Navbar';
import useAuth from '../hooks/useAuth';

const ClassroomDetails: React.FC = () => {
  const token=useAuth()
  const role=token?.role

  const { id } = useParams<{ id: string }>();
  const [classroom, setClassroom] = useState<Classroom | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [availableTeachers, setAvailableTeachers] = useState<Teacher[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [selectedTeacherToRemove, setSelectedTeacherToRemove] = useState<Teacher | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [availableStudents, setAvailableStudents] = useState<Student[]>([]);
  const [selectedStudentToAdd, setSelectedStudentToAdd] = useState<Student | null>(null);
  const [selectedStudentToRemove, setSelectedStudentToRemove] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAddTeacherDialogOpen, setIsAddTeacherDialogOpen] = useState(false);
  const [isRemoveTeacherDialogOpen, setIsRemoveTeacherDialogOpen] = useState(false);
  const [isAddStudentDialogOpen, setIsAddStudentDialogOpen] = useState(false);
  const [isRemoveStudentDialogOpen, setIsRemoveStudentDialogOpen] = useState(false);

  const fetchClassroom = async () => {
    try {
      const fetchedClassroom = await getClassroomById(Number(id));
      setClassroom(fetchedClassroom);

      const teacherPromises = fetchedClassroom.teachers.map((teacher) =>
        getTeacherById(teacher.teacherId)
      );
      const fetchedTeachers = await Promise.all(teacherPromises);
      setTeachers(fetchedTeachers);
    } catch (error) {
      console.error('Error fetching classroom details:', error);
    }
  };

  useEffect(() => {
    fetchClassroom().then(() => setLoading(false));
  }, [id]);

  const handleTeacherSelect = (value: string) => {
    const teacher = teachers.find((t) => t.id === Number(value));
    setSelectedTeacher(teacher || null);
  };

  const handleTeacherToRemoveSelect = (value: string) => {
    const teacher = teachers.find((t) => t.id === Number(value));
    setSelectedTeacherToRemove(teacher || null);
  };

  const handleStudentSelect = (value: string) => {
    setSelectedStudent(Number(value));
  };

  const handleOpenAddTeacherDialog = async () => {
    setIsAddTeacherDialogOpen(true);

    const allTeachers = await getTeachers(1, 1000);

    // Fetch subjects of teachers already in the classroom
    const teacherIdsInClassroom = classroom?.teachers.map(teacher => teacher.teacherId) || [];
    const teachersInClassroom = allTeachers.filter(teacher => teacherIdsInClassroom.includes(teacher.id));
    const existingSubjects = teachersInClassroom.map(teacher => teacher.subject);


    // Filter out teachers with subjects that are already represented in the classroom
    const filteredTeachers = allTeachers.filter(teacher => !existingSubjects.includes(teacher.subject));
    setAvailableTeachers(filteredTeachers);
  };

  const handleCloseAddTeacherDialog = () => {
    setIsAddTeacherDialogOpen(false);
    setSelectedTeacher(null);
  };

  const handleAddTeacher = async () => {
    if (selectedTeacher) {
      try {
        await addTeacherToClassroom(selectedTeacher.id, Number(id));
        toast.success("Teacher added successfully 🎉", {
          style: {
            backgroundColor: 'green',
            color: 'white',
          },
        });
        await fetchClassroom();
        setSelectedTeacher(null);
        handleCloseAddTeacherDialog();
      } catch (error) {
        console.error('Error adding teacher to classroom:', error);
        toast.error("Failed to add the teacher", {
          style: {
            backgroundColor: 'red',
            color: 'white',
          },
        });
      }
    }
  };

  const handleOpenRemoveTeacherDialog = () => {
    setIsRemoveTeacherDialogOpen(true);
  };

  const handleCloseRemoveTeacherDialog = () => {
    setIsRemoveTeacherDialogOpen(false);
    setSelectedTeacherToRemove(null);
  };

  const handleRemoveTeacher = async () => {
    if (selectedTeacherToRemove) {
      try {
        await removeTeacherFromClassroom(selectedTeacherToRemove.id, Number(id));
        toast.success("Teacher removed successfully 🎉", {
          style: {
            backgroundColor: 'green',
            color: 'white',
          },
        });
        await fetchClassroom();
        setSelectedTeacherToRemove(null);
        handleCloseRemoveTeacherDialog();
      } catch (error) {
        console.error('Error removing teacher from classroom:', error);
        toast.error("Failed to remove the teacher", {
          style: {
            backgroundColor: 'red',
            color: 'white',
          },
        });
      }
    }
  };

  const handleOpenAddStudentDialog = async () => {
    setIsAddStudentDialogOpen(true);
    const allStudents = await getAllStudents();
    const studentIdsInClassroom = classroom?.students.map(student => student.id) || [];
    const availableStudents = allStudents.filter(student => !studentIdsInClassroom.includes(student.id));
    setAvailableStudents(availableStudents);
  };

  const handleCloseAddStudentDialog = () => {
    setIsAddStudentDialogOpen(false);
    setSelectedStudentToAdd(null);
  };

  const handleAddStudent = async () => {
    if (selectedStudentToAdd) {
      try {
        await addStudentToClassroom(selectedStudentToAdd.id, Number(id));
        toast.success("Student added successfully 🎉", {
          style: {
            backgroundColor: 'green',
            color: 'white',
          },
        });
        await fetchClassroom();
        setSelectedStudentToAdd(null);
        handleCloseAddStudentDialog();
      } catch (error) {
        console.error('Error adding student to classroom:', error);
        toast.error("Failed to add the student", {
          style: {
            backgroundColor: 'red',
            color: 'white',
          },
        });
      }
    }
  };

  const handleOpenRemoveStudentDialog = () => {
    setIsRemoveStudentDialogOpen(true);
  };

  const handleCloseRemoveStudentDialog = () => {
    setIsRemoveStudentDialogOpen(false);
    setSelectedStudentToRemove(null);
  };

  const handleRemoveStudent = async () => {
    if (selectedStudentToRemove) {
      try {
        await removeStudentFromClassroom(selectedStudentToRemove.id, Number(id));
        toast.success("Student removed successfully 🎉", {
          style: {
            backgroundColor: 'green',
            color: 'white',
          },
        });
        await fetchClassroom();
        setSelectedStudentToRemove(null);
        handleCloseRemoveStudentDialog();
      } catch (error) {
        console.error('Error removing student from classroom:', error);
        toast.error("Failed to remove the student", {
          style: {
            backgroundColor: 'red',
            color: 'white',
          },
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-muted-foreground" size={48} />
      </div>
    );
  }

  if (!classroom) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-800">Classroom not found</p>
      </div>
    );
  }

  const selectedStudentDetails = classroom.students.find((student) => student.id === selectedStudent);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-white px-20 py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">{classroom.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gray-100 border border-gray-200 rounded-xl shadow-md overflow-hidden">
            <CardHeader className="bg-blue-600 text-white p-4">
              <CardTitle className="text-xl font-semibold text-center">Teachers</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <Select onValueChange={handleTeacherSelect}>
                <SelectTrigger className="w-full border-black focus:border-none">
                  <SelectValue placeholder="Select a teacher" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id.toString()}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedTeacher && (
                <div className="mt-4">
                  <p className="text-gray-800"><strong>Name:</strong> {selectedTeacher.name}</p>
                  <p className="text-gray-800"><strong>Subject:</strong> {selectedTeacher.subject}</p>
                  <p className="text-gray-800"><strong>Taught Course:</strong> {selectedTeacher.taughtCourse?.name || 'None'}</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {role !== 'Student' && (
                <>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-xl"
                    onClick={handleOpenAddTeacherDialog}
                  >
                    Add Teacher
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl ml-4"
                    onClick={handleOpenRemoveTeacherDialog}
                  >
                    Remove Teacher
                  </button>
                </>
              )}
            </CardFooter>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gray-100 border border-gray-200 rounded-xl shadow-md overflow-hidden">
            <CardHeader className="bg-green-600 text-white p-4">
              <CardTitle className="text-xl font-semibold text-center">Students</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <Select onValueChange={handleStudentSelect}>
                <SelectTrigger className="w-full border border-black focus:border-none">
                  <SelectValue placeholder="Select a student" />
                </SelectTrigger>
                <SelectContent>
                  {classroom.students.map((student) => (
                    <SelectItem key={student.id} value={student.id.toString()}>
                      {student.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedStudentDetails && (
                <div className="mt-4">
                  <p className="text-gray-800"><strong>Name:</strong> {selectedStudentDetails.name}</p>
                  <p className="text-gray-800"><strong>Parent Email:</strong> {selectedStudentDetails.parentEmail}</p>
                  <p className="text-gray-800"><strong>Phone Number:</strong> {selectedStudentDetails.phoneNumber}</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {role !== 'Student' && (
                <>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-xl"
                    onClick={handleOpenAddStudentDialog}
                  >
                    Add Student
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl ml-4"
                    onClick={handleOpenRemoveStudentDialog}
                  >
                    Remove Student
                  </button>
                </>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </div>
      <Dialog open={isAddTeacherDialogOpen} onOpenChange={setIsAddTeacherDialogOpen}>
        <DialogTrigger className="hidden" />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Teacher to Classroom</DialogTitle>
            <DialogDescription>Select a teacher to add to the classroom</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Select onValueChange={(value) => setSelectedTeacher(availableTeachers.find(t => t.id === Number(value)) || null)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a teacher" />
              </SelectTrigger>
              <SelectContent>
                {availableTeachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.id.toString()}>
                    {teacher.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex justify-end mt-4">
              <button
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-xl"
                onClick={handleAddTeacher}
              >
                Add
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-xl ml-2"
                onClick={handleCloseAddTeacherDialog}
              >
                Cancel
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isRemoveTeacherDialogOpen} onOpenChange={setIsRemoveTeacherDialogOpen}>
        <DialogTrigger className="hidden" />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Teacher from Classroom</DialogTitle>
            <DialogDescription>Select a teacher to remove from the classroom</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Select onValueChange={(value) => setSelectedTeacherToRemove(teachers.find(t => t.id === Number(value)) || null)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a teacher" />
              </SelectTrigger>
              <SelectContent>
                {teachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.id.toString()}>
                    {teacher.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl"
                onClick={handleRemoveTeacher}
              >
                Remove
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-xl ml-2"
                onClick={handleCloseRemoveTeacherDialog}
              >
                Cancel
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isAddStudentDialogOpen} onOpenChange={setIsAddStudentDialogOpen}>
        <DialogTrigger className="hidden" />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Student to Classroom</DialogTitle>
            <DialogDescription>Select a student to add to the classroom</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Select onValueChange={(value) => setSelectedStudentToAdd(availableStudents.find(s => s.id === Number(value)) || null)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a student" />
              </SelectTrigger>
              <SelectContent>
                {availableStudents.map((student) => (
                  <SelectItem key={student.id} value={student.id.toString()}>
                    {student.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex justify-end mt-4">
              <button
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-xl"
                onClick={handleAddStudent}
              >
                Add
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-xl ml-2"
                onClick={handleCloseAddStudentDialog}
              >
                Cancel
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isRemoveStudentDialogOpen} onOpenChange={setIsRemoveStudentDialogOpen}>
        <DialogTrigger className="hidden" />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Student from Classroom</DialogTitle>
            <DialogDescription>Select a student to remove from the classroom</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Select onValueChange={(value) => setSelectedStudentToRemove(classroom.students.find(s => s.id === Number(value)) || null)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a student" />
              </SelectTrigger>
              <SelectContent>
                {classroom.students.map((student) => (
                  <SelectItem key={student.id} value={student.id.toString()}>
                    {student.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl"
                onClick={handleRemoveStudent}
              >
                Remove
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-xl ml-2"
                onClick={handleCloseRemoveStudentDialog}
              >
                Cancel
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </>
  );
};

export default ClassroomDetails;
