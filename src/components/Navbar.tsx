"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { User, GraduationCap, Home, LogIn, LogOut, Menu, X } from "lucide-react";
import LoginModal from "./LoginModal";
import useStore from "../store/useStore";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useStore((s) => s.user);
  const logout = useStore((s) => s.logout);
  const pathname = usePathname();

  const navLinks = [
    { name: "หน้าแรก", href: "/", icon: <Home className="h-5 w-5" /> },
    { name: "นักเรียน", href: "/student", icon: <User className="h-5 w-5" /> },
    { name: "อาจารย์", href: "/teacher", icon: <GraduationCap className="h-5 w-5" /> },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <span className="text-3xl font-extrabold text-indigo-700 hover:text-indigo-900 transition-colors cursor-pointer">
            TCAS69
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.name} href={link.href}>
                <div
                  className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "text-white bg-indigo-600 shadow-md transform scale-105"
                      : "text-gray-600 hover:text-indigo-600 hover:bg-gray-100"
                  }`}
                >
                  {link.icon}
                  <span className="font-medium">{link.name}</span>
                </div>
              </Link>
            );
          })}
          {user ? (
            <button
              onClick={logout}
              className="flex items-center px-4 py-2 border border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-50 hover:text-red-700 transition"
            >
              <LogOut className="h-5 w-5 mr-2" />
              ออกจากระบบ
            </button>
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              <LogIn className="h-5 w-5 mr-2" />
              เข้าสู่ระบบ
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-8 w-8 text-gray-700" /> : <Menu className="h-8 w-8 text-gray-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-inner pb-4">
          <div className="flex flex-col items-start px-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-left py-3 px-2 flex items-center space-x-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded transition"
              >
                {link.icon}
                <span className="font-medium">{link.name}</span>
              </Link>
            ))}
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left py-3 px-2 flex items-center space-x-2 text-red-500 hover:text-red-700 hover:bg-gray-100 rounded transition mt-2"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">ออกจากระบบ</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setIsMenuOpen(false);
                }}
                className="w-full text-left py-3 px-2 flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 hover:bg-gray-100 rounded transition mt-2"
              >
                <LogIn className="h-5 w-5" />
                <span className="font-medium">เข้าสู่ระบบ</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal open={isModalOpen} setOpen={setIsModalOpen} />
    </nav>
  );
}