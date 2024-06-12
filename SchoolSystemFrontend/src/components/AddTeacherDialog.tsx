import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../@/components/ui/dialog';
import { createTeacher } from '../api/TeacherService';
import { toast } from 'sonner';

interface AddTeacherDialogProps {
  refreshTeachers: () => void;
}

const subjects = [
  { id: 0, name: 'Mathematics' },
  { id: 1, name: 'History' },
  { id: 2, name: 'Science' },
  // Add more subjects as needed
];

const AddTeacherDialog: React.FC<AddTeacherDialogProps> = ({ refreshTeachers }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [teacher, setTeacher] = useState({
    name: '',
    age: 0,
    subject: 0,
    address: '',
    phoneNumber: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTeacher({ ...teacher, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const formattedTeacher = {
        ...teacher,
        age: teacher.age ? Number(teacher.age) : 0,
        subject: teacher.subject ? Number(teacher.subject) : 0,
        phoneNumber: teacher.phoneNumber ? Number(teacher.phoneNumber) : 0,
      };

      await createTeacher(formattedTeacher);
      toast.success('Teacher created successfully 🎉', {
        style:{
            color:"white",
            background:"green"
        }
      });
      setIsOpen(false);
      refreshTeachers();
    } catch (error) {
      toast.error('Failed to create teacher', {
        style:{
            color:"white",
            background:"red"
        }
      });
    }
  };


  return (
    <>
      <button
        className="bg-green-500 text-white hover:bg-green-600 rounded-xl p-2"
        onClick={() => setIsOpen(true)}
      >
        Add Teacher
      </button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="hidden" />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Teacher</DialogTitle>
            <DialogDescription>
              Please enter the teacher details.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={teacher.name}
                onChange={handleChange}
                className="border rounded p-2 w-full"
                placeholder="Enter teacher name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                value={teacher.age}
                onChange={handleChange}
                className="border rounded p-2 w-full"
                placeholder="Enter age"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <select
                name="subject"
                value={teacher.subject}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              >
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={teacher.address}
                onChange={handleChange}
                className="border rounded p-2 w-full"
                placeholder="Enter address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="number"
                name="phoneNumber"
                value={teacher.phoneNumber}
                onChange={handleChange}
                className="border rounded p-2 w-full hide-arrows"
                placeholder="Enter phone number"
                style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }} // Hide the arrows
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-xl"
              onClick={handleSubmit}
            >
              Submit
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

export default AddTeacherDialog;
