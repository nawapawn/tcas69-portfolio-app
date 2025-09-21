import { School, CheckCircle2, CalendarDays } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] text-center px-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-2xl w-full space-y-8 animate-fade-in-up">
        {/* Title Section */}
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold text-indigo-700 leading-tight">
            Thai University Central Admission System
          </h1>
          <p className="text-xl text-gray-700">
            ระบบการคัดเลือกกลางบุคคลเข้าศึกษาในสถาบันอุดมศึกษา
          </p>
        </div>

        {/* Highlighted Info Card */}
        <div className="bg-indigo-100 p-6 rounded-2xl border-l-4 border-indigo-600 shadow-inner flex items-center space-x-4">
          <CalendarDays className="h-10 w-10 text-indigo-600" />
          <div>
            <p className="text-xl font-bold text-indigo-800">
              เปิดลงทะเบียน TCAS69
            </p>
            <p className="text-2xl font-extrabold text-indigo-900 mt-1">
              วันที่ 28 ต.ค. 2568
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl border border-gray-200 hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-sm">
            <School className="h-12 w-12 text-blue-500 mb-3" />
            <h3 className="text-lg font-bold text-gray-800">
              ค้นหาคณะและมหาวิทยาลัย
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              สำรวจข้อมูลหลักสูตรที่เปิดรับสมัคร
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl border border-gray-200 hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-sm">
            <CheckCircle2 className="h-12 w-12 text-green-500 mb-3" />
            <h3 className="text-lg font-bold text-gray-800">
              ตรวจสอบคุณสมบัติ
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              เช็กเกณฑ์คะแนนและคุณสมบัติก่อนสมัคร
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl border border-gray-200 hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-sm">
            <CalendarDays className="h-12 w-12 text-red-500 mb-3" />
            <h3 className="text-lg font-bold text-gray-800">
              ปฏิทิน TCAS69
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              ไม่พลาดทุกกำหนดการสำคัญ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}