"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useStore, { Portfolio } from "../../store/useStore";
import { useState } from "react";
import {
  User,
  MapPin,
  Phone,
  BookOpen,
  GraduationCap,
  Sparkles,
  ClipboardList,
  Upload,
  CircleCheck,
} from "lucide-react";

// Schema Validation
const schema = z.object({
  firstName: z.string().min(1, "กรุณากรอกชื่อ"),
  lastName: z.string().min(1, "กรุณากรอกนามสกุล"),
  address: z.string().min(1, "กรุณากรอกที่อยู่"),
  phone: z.string().min(9, "กรุณากรอกเบอร์มือถือให้ครบ"),
  school: z.string().min(1, "กรุณากรอกโรงเรียน"),
  gpa: z.number().min(0, "GPA ต้องมากกว่า 0").max(4, "GPA ต้องไม่เกิน 4"),
  skills: z.string(), // Change to non-optional
  reason: z.string(), // Change to non-optional
  major: z.string().min(1, "กรุณากรอกสาขาที่เลือก"),
  university: z.string().min(1, "กรุณากรอกมหาวิทยาลัย"),
});

type FormData = z.infer<typeof schema>;

export default function StudentPage() {
  const addPortfolio = useStore((s) => s.addPortfolio);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showToast, setShowToast] = useState(false); // New state for toast

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    const portfolio: Portfolio = {
      id: Date.now().toString(),
      ...data,
      photos: previewImages,
    };
    addPortfolio(portfolio);
    
    setShowToast(true); // Show the toast notification
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Hide the toast after 3 seconds

    reset();
    setPreviewImages([]);
  };

  const handleFileChange = (files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreviewImages(urls);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-indigo-800 mb-2">
            TCAS Portfolio
          </h2>
          <p className="text-gray-500">
            กรอกข้อมูลเพื่อสร้างแฟ้มสะสมผลงานของคุณ
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Section 1: ข้อมูลส่วนตัว */}
          <div className="bg-indigo-50 p-6 rounded-xl shadow-inner">
            <h3 className="text-2xl font-semibold text-indigo-800 flex items-center mb-4">
              <User className="h-6 w-6 mr-2 text-indigo-600" /> ข้อมูลส่วนตัว
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-gray-700 font-medium mb-1">ชื่อ</label>
                <input
                  {...register("firstName")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                )}
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-medium mb-1">นามสกุล</label>
                <input
                  {...register("lastName")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                )}
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-medium mb-1">ที่อยู่</label>
                <input
                  {...register("address")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                )}
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-medium mb-1">เบอร์โทรศัพท์</label>
                <input
                  {...register("phone")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-medium mb-1">โรงเรียน</label>
                <input
                  {...register("school")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                />
                {errors.school && (
                  <p className="text-red-500 text-sm mt-1">{errors.school.message}</p>
                )}
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-medium mb-1">GPA</label>
                <input
                  type="number"
                  step="0.01"
                  {...register("gpa", { valueAsNumber: true })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                />
                {errors.gpa && (
                  <p className="text-red-500 text-sm mt-1">{errors.gpa.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: ความสามารถและเหตุผล */}
          <div className="bg-indigo-50 p-6 rounded-xl shadow-inner">
            <h3 className="text-2xl font-semibold text-indigo-800 flex items-center mb-4">
              <Sparkles className="h-6 w-6 mr-2 text-indigo-600" />
              ความสามารถและเหตุผล
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="relative">
                <label className="block text-gray-700 font-medium mb-1">ความสามารถพิเศษ</label>
                <input
                  {...register("skills")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                />
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-medium mb-1">เหตุผลในการสมัคร</label>
                <textarea
                  {...register("reason")}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-gray-700 font-medium mb-1">สาขาที่เลือก</label>
                  <input
                    {...register("major")}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                  />
                  {errors.major && (
                    <p className="text-red-500 text-sm mt-1">{errors.major.message}</p>
                  )}
                </div>
                <div className="relative">
                  <label className="block text-gray-700 font-medium mb-1">มหาวิทยาลัย</label>
                  <input
                    {...register("university")}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                  />
                  {errors.university && (
                    <p className="text-red-500 text-sm mt-1">{errors.university.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Upload รูป */}
          <div className="bg-indigo-50 p-6 rounded-xl shadow-inner">
            <h3 className="text-2xl font-semibold text-indigo-800 flex items-center mb-4">
              <Upload className="h-6 w-6 mr-2 text-indigo-600" /> อัปโหลดรูปภาพ / ผลงาน
            </h3>
            <div
              className={`p-6 border-2 border-dashed rounded-xl transition-colors ${
                isDragging ? "border-indigo-500 bg-indigo-100" : "border-gray-300 bg-white"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center cursor-pointer text-gray-500 hover:text-indigo-600 transition-colors"
              >
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={(e) => handleFileChange(e.target.files)}
                  className="hidden"
                />
                <svg
                  className="w-12 h-12 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a6 6 0 011 12V16m-7-4l-3 3m0 0l3 3m-3-3h8"
                  ></path>
                </svg>
                <span className="text-lg font-medium">
                  ลากและวางรูปภาพที่นี่ หรือ <span className="text-indigo-600 font-semibold">เลือกจากคอมพิวเตอร์</span>
                </span>
                <span className="text-sm mt-1">
                  รองรับไฟล์ .jpg, .png, .gif และ .pdf
                </span>
              </label>
              {previewImages.length > 0 && (
                <div className="flex gap-4 mt-6 flex-wrap justify-center">
                  {previewImages.map((url) => (
                    <img
                      key={url}
                      src={url}
                      className="w-24 h-24 object-cover border-2 border-indigo-300 rounded-lg shadow-md transition-transform transform hover:scale-105"
                      alt="Portfolio preview"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-4 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 flex items-center justify-center text-lg"
          >
            <CircleCheck className="h-6 w-6 mr-2" />
            บันทึก Portfolio
          </button>
        </form>
      </div>
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 ease-out animate-toast-in">
          <div className="bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg flex items-center space-x-3">
            <CircleCheck className="h-6 w-6" />
            <span className="font-medium">บันทึกข้อมูล Portfolio เรียบร้อย!</span>
          </div>
        </div>
      )}
    </div>
  );
}