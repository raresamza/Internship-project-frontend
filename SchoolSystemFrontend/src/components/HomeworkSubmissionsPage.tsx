import { useEffect, useState } from 'react';
import { Button } from '../@/components/ui/button';
import { useParams } from 'react-router-dom';
import {
	downloadStudentHomework,
	gradeStudentHomework,
	Submission,
} from '../api/HomeworkService';
import GradeHomeworkForm from './GradeHomeworkForm';
import { toast } from 'sonner';
import Navbar from './Navbar';
import useAuth from '../hooks/useAuth';




const HomeworkSubmissionsPage = () => {
	const { homeworkId } = useParams<{ homeworkId: string }>();
	const [submissions, setSubmissions] = useState<Submission[]>([]);
	const token = useAuth();
  	const role = token?.role;


	const fetchSubmissions = async () => {
	if (!homeworkId) return;

	const token = localStorage.getItem('token')?.replace(/"/g, '');

	const res = await fetch(`https://localhost:7213/api/Student/${homeworkId}/submissions`, {
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	});

	if (!res.ok) {
		console.error('Failed to fetch submissions:', res.statusText);
		return;
	}

	const data = await res.json();
	setSubmissions(data);
};

	useEffect(() => {
		fetchSubmissions();
	}, [homeworkId]);

	const handleGradeSubmit = async (studentId: number, grade: number) => {
		if (!homeworkId) return;

		await gradeStudentHomework(studentId, parseInt(homeworkId), grade);
		alert(`Graded student ${studentId} with ${grade}`);
		await fetchSubmissions(); // refresh after grading
	};

	console.log(submissions)

	return (
		<>
		<Navbar/>
		<div className="p-6">
			<h2 className="text-xl font-bold mb-4">Homework Submissions</h2>
			{submissions.length === 0 ? (
				<p>No submissions yet.</p>
			) : (
				<ul className="space-y-3">
					{submissions.map((s) => (
						<li
							key={s.id}
							className="bg-gray-100 p-4 rounded-md flex flex-col md:flex-row md:items-center md:justify-between gap-4"
						>
							{/* Left: Student Info */}
							<div className="flex flex-col">
								<span className="font-semibold">{s.studentName}</span>
								<span className="text-sm text-muted-foreground">
									Grade: {s.grade !== null ? s.grade : "Not graded yet"}
								</span>
							</div>

							{/* Middle: Download Button */}
							{(role === "Admin" || role === "Teacher") && (
							<div className="flex-shrink-0">
								<Button
									onClick={() =>
										downloadStudentHomework(s.studentId, parseInt(homeworkId ?? "0"))
									}
								>
									Download
								</Button>
							</div>
					)}
							{/* Right: Grade Form */}
							{(role === "Admin" || role === "Teacher") && (
							<div className="flex-shrink-0 w-full md:w-auto">
								<GradeHomeworkForm
									studentId={s.studentId}
									homeworkId={parseInt(homeworkId ?? "0")}
									currentGrade={s.grade}
									onSubmit={async (grade) => {
										try {
											await gradeStudentHomework(parseInt(homeworkId!),s.studentId, grade);
											toast.success("Grade added successfully!")
										} catch (error) {
											toast.error("Could not add grade.")
										}
									}}
								/>
							</div>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
		</>
	);
};

export default HomeworkSubmissionsPage;
