import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

Chart.register(...registerables);

const GradeChart = ({ grades }: { grades: { name: string; grade: number }[] }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: grades.map((g) => g.name),
        datasets: [
          {
            label: 'Student Grades',
            data: grades.map((g) => g.grade),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 10,
          },
        },
      },
    });
  }, [grades]);

  const exportPDF = async () => {
    const canvas = await html2canvas(chartRef.current!.parentElement!);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 180, 120);
    pdf.save('grades-chart.pdf');

    // Optionally send to backend
    const blob = pdf.output('blob');
    const formData = new FormData();
    formData.append('file', blob, 'grades-chart.pdf');

    await fetch('https://localhost:7213/api/Mail/send-grade-chart', {
      method: 'POST',
      body: formData,
    });
  };

  return (
    <div>
      <canvas ref={chartRef} />
      <button onClick={exportPDF} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Export & Email PDF
      </button>
    </div>
  );
};

export default GradeChart;
