import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../@/components/ui/dialog";
import { Input } from "../@/components/ui/input";
import { Button } from "../@/components/ui/button";
import { Textarea } from "../@/components/ui/textarea";
import { assignHomework } from "../api/CourseService"; // your API call

interface Props {
  isOpen: boolean;
  onClose: () => void;
  courseId: number;
  refreshCourse: () => void;
}

const AssignHomeworkDialog = ({ isOpen, onClose, courseId, refreshCourse }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async () => {
    if (!title || !description || !deadline) {
      alert("Please fill in all fields");
      return;
    }

    await assignHomework({ courseId, title, description, deadline });
    refreshCourse();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Assign Homework</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          <Button onClick={handleSubmit}>Assign</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignHomeworkDialog;
