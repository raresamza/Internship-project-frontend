import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Input } from '../@/components/ui/input';
import { Textarea } from '../@/components/ui/textarea';
import { Button } from '../@/components/ui/button';
import { Label } from '@radix-ui/react-select';
import { Card, CardContent, CardFooter, CardHeader } from '../@/components/ui/card';
import { assignHomework } from '../api/CourseService';
import { toast } from 'sonner';

const AssignHomework = () => {
  const { courseId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  // const { toast } = useToast();

  const handleAssign = async () => {
    if (!title || !description || !deadline) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await assignHomework({
        courseId: Number(courseId),
        title,
        description,
        deadline
      });

      toast.success('Homework assigned! 🎉', {
        style: {
          backgroundColor: 'green',
          color: 'white',
        },
      });
      setTitle('');
      setDescription('');
      setDeadline('');
    } catch (error) {
      console.error(error);
      toast.error('Error');
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-10 shadow-md">
      <CardHeader>
        <h2 className="text-2xl font-semibold">Assign Homework</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <Label>Deadline</Label>
          <Input type="datetime-local" value={deadline} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDeadline(e.target.value)} />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAssign}>Assign</Button>
      </CardFooter>
    </Card>
  );
};

export default AssignHomework;
