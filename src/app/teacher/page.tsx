"use client";

import useStore, { Portfolio } from "../../store/useStore";
import { useState, useMemo } from "react";
import {
  User,
  GraduationCap,
  BookOpen,
  MapPin,
  Phone,
  Sparkles,
  ClipboardList,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

type SortKeys = "gpa" | "major" | "firstName";
type SortDirection = "asc" | "desc";

export default function TeacherPage() {
  const portfolios = useStore((s) => s.portfolios);
  const [selected, setSelected] = useState<Portfolio | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [sortConfig, setSortConfig] = useState<{
    key: SortKeys;
    direction: SortDirection;
  }>({
    key: "gpa",
    direction: "desc",
  });

  const sortedPortfolios = useMemo(() => {
    let sortableItems = [...portfolios];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [portfolios, sortConfig]);

  const handleSort = (key: SortKeys) => {
    let direction: SortDirection = "desc";
    if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "asc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: SortKeys) => {
    if (sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === "asc" ? <ChevronUp className="ml-2 w-4 h-4" /> : <ChevronDown className="ml-2 w-4 h-4" />;
  };

  const handleNextPhoto = () => {
    if (selected && selected.photos) {
      setPhotoIndex((prevIndex) =>
        prevIndex === selected.photos.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePrevPhoto = () => {
    if (selected && selected.photos) {
      setPhotoIndex((prevIndex) =>
        prevIndex === 0 ? selected.photos.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold text-indigo-800 mb-6 text-center">
          📊 รายชื่อนักเรียน TCAS Portfolio
        </h2>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-indigo-50">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider cursor-pointer hover:bg-indigo-100 transition-colors"
                    onClick={() => handleSort("firstName")}
                  >
                    <div className="flex items-center">
                      ชื่อ {getSortIcon("firstName")}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider cursor-pointer hover:bg-indigo-100 transition-colors"
                    onClick={() => handleSort("gpa")}
                  >
                    <div className="flex items-center">
                      GPA {getSortIcon("gpa")}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider cursor-pointer hover:bg-indigo-100 transition-colors"
                    onClick={() => handleSort("major")}
                  >
                    <div className="flex items-center">
                      สาขาที่เลือก {getSortIcon("major")}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
                    การดำเนินการ
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedPortfolios.length > 0 ? (
                  sortedPortfolios.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-indigo-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {p.firstName} {p.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            p.gpa >= 3.5
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {p.gpa.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {p.major}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                          onClick={() => {
                            setSelected(p);
                            setPhotoIndex(0);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          ดูรายละเอียด
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-gray-500">
                      ยังไม่มีข้อมูล Portfolio
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for Details */}
        {selected && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex justify-center items-center p-4">
            <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 space-y-6 animate-zoom-in">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                onClick={() => setSelected(null)}
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-4 mb-4">
                <User className="h-10 w-10 text-indigo-600" />
                <div>
                  <h3 className="text-2xl font-bold text-indigo-800">
                    {selected.firstName} {selected.lastName}
                  </h3>
                  <p className="text-gray-500">{selected.school}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-indigo-500" />
                  <strong>ที่อยู่:</strong> {selected.address}
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-indigo-500" />
                  <strong>เบอร์:</strong> {selected.phone}
                </div>
                <div className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-indigo-500" />
                  <strong>สาขา:</strong> {selected.major}
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-indigo-500" />
                  <strong>มหาลัย:</strong> {selected.university}
                </div>
                <div className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-indigo-500" />
                  <strong>ความสามารถพิเศษ:</strong> {selected.skills || "ไม่มี"}
                </div>
                <div className="flex items-center col-span-2">
                  <ClipboardList className="h-5 w-5 mr-2 text-indigo-500" />
                  <strong>เหตุผล:</strong> {selected.reason || "ไม่มี"}
                </div>
              </div>

              {selected.photos?.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold text-indigo-700 mb-2 flex items-center">
                    <Eye className="h-5 w-5 mr-2" /> รูปภาพและผลงาน
                  </h4>
                  <div className="relative overflow-hidden rounded-xl shadow-md">
                    <img
                      src={selected.photos[photoIndex]}
                      alt="Portfolio photo"
                      className="w-full object-cover rounded-xl"
                      style={{ height: "400px" }}
                    />
                    <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 p-2">
                      <button
                        type="button"
                        className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                        onClick={handlePrevPhoto}
                        aria-label="Previous photo"
                      >
                        <ChevronLeft />
                      </button>
                      <button
                        type="button"
                        className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                        onClick={handleNextPhoto}
                        aria-label="Next photo"
                      >
                        <ChevronRight />
                      </button>
                    </div>
                  </div>
                  <div className="text-center text-sm text-gray-500 mt-2">
                    รูปที่ {photoIndex + 1} จาก {selected.photos.length}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}