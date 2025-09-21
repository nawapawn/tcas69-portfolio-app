import "../styles/globals.css";
import Navbar from "../components/Navbar";
import type { ReactNode } from "react";

export const metadata = {
  title: "TCAS69 Portfolio",
  description: "ระบบการคัดเลือกกลางบุคคลเข้าศึกษาในสถาบันอุดมศึกษา",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="th">
      <body className="bg-gray-50 min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}