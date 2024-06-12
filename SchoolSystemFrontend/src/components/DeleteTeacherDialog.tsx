import React, { useEffect, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../@/components/ui/dialog';
import { getTeachers, deleteTeacher, Teacher } from '../api/TeacherService';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../@/components/ui/select';
import { toast } from 'sonner';

interface DeleteTeacherDialogProps {
  refreshTeachers: () => void;
}

const DeleteTeacherDialog: React.FC<DeleteTeacherDialogProps> = ({ refreshTeachers }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const fetchedTeachers = await getTeachers();
        setTeachers(fetchedTeachers);
      } catch (error) {
        toast.error('Failed to fetch teachers');
        console.error('Error fetching teachers:', error);
      }
    };

    if (isOpen) {
      fetchTeachers();
    }
  }, [isOpen]);

  const handleDelete = async () => {
    if (selectedTeacherId !== null) {
      try {
        await deleteTeacher(selectedTeacherId);
        toast.success('Teacher deleted successfully');
        setIsOpen(false);
        refreshTeachers(); // Refresh the list of teachers
      } catch (error) {
        toast.error('Failed to delete teacher');
        console.error('Error deleting teacher:', error);
      }
    } else {
      toast.error('Please select a teacher to delete');
    }
  };

  return (
    <>
      <button
        className="bg-red-500 text-white hover:bg-red-600 rounded-xl p-2"
        onClick={() => setIsOpen(true)}
      >
        Delete Teacher
      </button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="hidden" />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Teacher</DialogTitle>
            <DialogDescription>Select a teacher to delete.</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Select onValueChange={(value) => setSelectedTeacherId(Number(value))}>
              <SelectTrigger className="w-full mt-2">
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

export default DeleteTeacherDialog;
