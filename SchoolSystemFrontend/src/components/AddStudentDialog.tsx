import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../@/components/ui/dialog';
import { createStudent, Student, StudentCreationDto } from '../api/StudentService';
import { toast } from 'sonner';

interface AddStudentDialogProps {
  refreshStudents: () => void;
}

const AddStudentDialog: React.FC<AddStudentDialogProps> = ({ refreshStudents }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [student, setStudent] = useState<StudentCreationDto>({
    parentName: '',
    name: '',
    parentEmail: '',
    phoneNumber: 0,
    age: 0,
    address: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await createStudent(student);
      toast.success('Student created successfully 🎉');
      setIsOpen(false);
      refreshStudents(); // Refresh the list of students
    } catch (error) {
      toast.error('Failed to create student');
      console.error('Error creating student:', error);
    }
  };

  return (
    <>
      <button
        className="bg-green-500 text-white hover:bg-green-600 rounded-xl p-2"
        onClick={() => setIsOpen(true)}
      >
        Add Student
      </button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="hidden" />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              Please enter the student details.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Parent Name</label>
              <input
                type="text"
                name="parentName"
                value={student.parentName}
                onChange={handleChange}
                className="border rounded p-2 w-full"
                placeholder="Enter parent name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Student Name</label>
              <input
                type="text"
                name="name"
                value={student.name}
                onChange={handleChange}
                className="border rounded p-2 w-full"
                placeholder="Enter student name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Parent Email</label>
              <input
                type="email"
                name="parentEmail"
                value={student.parentEmail}
                onChange={handleChange}
                className="border rounded p-2 w-full"
                placeholder="Enter parent email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="number"
                name="phoneNumber"
                value={student.phoneNumber}
                onChange={handleChange}
                className="border rounded p-2 w-full hide-arrows"
                placeholder="Enter phone number"
                style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                value={student.age}
                onChange={handleChange}
                className="border rounded p-2 w-full"
                placeholder="Enter age"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={student.address}
                onChange={handleChange}
                className="border rounded p-2 w-full"
                placeholder="Enter address"
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

export default AddStudentDialog;
