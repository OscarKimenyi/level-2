import * as XLSX from "xlsx";
import jsPDF from "jspdf";

export default function ExportButtons({ students }) {
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(students);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "students.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    students.forEach((s, i) => {
      doc.text(`${s.name} - ${s.regNo} - ${s.course}`, 10, 10 + i * 10);
    });
    doc.save("students.pdf");
  };

  return (
    <>
      <button className="btn btn-success me-2" onClick={exportExcel}>
        Excel
      </button>
      <button className="btn btn-danger" onClick={exportPDF}>
        PDF
      </button>
    </>
  );
}
