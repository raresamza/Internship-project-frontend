// components/UploadHomeworkDialog.tsx
import { Dialog,DialogContent,DialogHeader,DialogTitle } from '../@/components/ui/dialog';
import { Button } from '../@/components/ui/button';
import { Input } from '../@/components/ui/input';
import { useState } from 'react';
import { uploadHomeworkFile } from '../api/StudentService';
import { toast } from "sonner";


interface Props {
  isOpen: boolean;
  onClose: () => void;
  homeworkId: number;
  studentId: number | null;
  onUploaded?: () => void;
}





const UploadHomeworkDialog = ({ isOpen, onClose, homeworkId, studentId, onUploaded }: Props) => {

  
  const [file, setFile] = useState<File | null>(null);



  console.log("🧪 Upload props:", { homeworkId, studentId, file });


  const handleUpload = async () => {
    if (!file || studentId === null) return;

    try {
      await uploadHomeworkFile({ studentId, homeworkId, file });

      toast.success("Homework uploaded successfully ✅");
      onUploaded?.();
      onClose();
    } catch (error) {
      toast.error("Upload failed ❌");
      console.error('Upload failed:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Homework</DialogTitle>
        </DialogHeader>
        <Input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        <Button className="mt-4 w-full" onClick={handleUpload}>Submit</Button>
      </DialogContent>
    </Dialog>
  );
};

export default UploadHomeworkDialog;
