import * as XLSX from "xlsx";

export default function ExportButtons({ students }) {
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(students);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "students.xlsx");
  };

  return (
    <>
      <button className="btn btn-success me-2" onClick={exportExcel}>
        Excel
      </button>
    </>
  );
}
