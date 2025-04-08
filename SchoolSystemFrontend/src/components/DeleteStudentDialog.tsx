import React, { useEffect, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../@/components/ui/dialog';
import { getUsers, deleteStudent, Student, getAllStudents } from '../api/StudentService';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../@/components/ui/select';
import { toast } from 'sonner';

interface DeleteStudentDialogProps {
  refreshStudents: () => void;
}

const DeleteStudentDialog: React.FC<DeleteStudentDialogProps> = ({ refreshStudents }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const fetchedStudents = await getAllStudents();
        setStudents(fetchedStudents);
      } catch (error) {
        toast.error('Failed to fetch students');
        console.error('Error fetching students:', error);
      }
    };

    if (isOpen) {
      fetchStudents();
    }
  }, [isOpen]);

  const handleDelete = async () => {
    if (selectedStudentId !== null) {
      try {
        await deleteStudent(selectedStudentId);
        toast.success('Student deleted successfully');
        setIsOpen(false);
        refreshStudents(); 
      } catch (error) {
        toast.error('Failed to delete student');
        console.error('Error deleting student:', error);
      }
    } else {
      toast.error('Please select a student to delete');
    }
  };

  return (
    <>
      <button
        className="bg-red-500 text-white hover:bg-red-600 rounded-xl p-2"
        onClick={() => setIsOpen(true)}
      >
        Delete Student
      </button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="hidden" />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Student</DialogTitle>
            <DialogDescription>Select a student to delete.</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Select onValueChange={(value:string) => setSelectedStudentId(Number(value))}>
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Select a student" />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id.toString()}>
                    {student.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-xl ml-2"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteStudentDialog;
