"use client";

import { useEffect } from "react";
import LayoutDashboard from "../components/LayoutDashboard";
import { DollarSign, ShoppingBag, Package, Users } from "lucide-react";
import { Eye } from "lucide-react";
import Link from "next/link";
import { Pencil, Check } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function DashboardPage() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const stats = [
    {
      title: "Total IP Terdaftar",
      value: "1.245",
      change: "+5% hari ini",
      icon: <DollarSign className="w-5 h-5 text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      title: "WLC Aktif",
      value: "32",
      change: "+1 unit",
      icon: <ShoppingBag className="w-5 h-5 text-orange-500" />,
      bg: "bg-orange-50",
    },
    {
      title: "VM Aktif",
      value: "87",
      change: "+3 host",
      icon: <Package className="w-5 h-5 text-green-600" />,
      bg: "bg-green-50",
    },
    {
      title: "Aset Lapangan",
      value: "560",
      change: "+12 unit",
      icon: <Users className="w-5 h-5 text-purple-600" />,
      bg: "bg-purple-50",
    },
  ];

  const chartData = [
    { name: "Jan", IP: 400, WLC: 240, VMware: 240 },
    { name: "Feb", IP: 300, WLC: 139, VMware: 221 },
    { name: "Mar", IP: 200, WLC: 980, VMware: 229 },
    { name: "Apr", IP: 278, WLC: 390, VMware: 200 },
    { name: "May", IP: 189, WLC: 480, VMware: 218 },
    { name: "Jun", IP: 239, WLC: 380, VMware: 250 },
    { name: "Jul", IP: 349, WLC: 430, VMware: 210 },
  ];

  return (
    <LayoutDashboard activeMenu={0}>
      <div className="font-[Poppins] space-y-6">
        {/*  Header Dashboard */}
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
            Infrastructure Dashboard
          </h1>
          <p className="text-gray-600 text-sm">
            Monitoring infrastruktur jaringan dan sistem dalam satu tempat.
          </p>
        </div>
        {/*  Statistik & Grafik */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card Statistik */}
          <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  Today's Infrastructure
                </h2>
                <p className="text-sm text-gray-500">Infrastructure Summary</p>
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Export
              </button>
            </div>

            {/* Grid Statistik */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  title: "Servers Active",
                  value: "128",
                  change: "+4.2% this week",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Network Devices",
                  value: "342",
                  change: "+1.8% this week",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  ),
                },
                {
                  title: "User Sessions",
                  value: "1,203",
                  change: "-0.5% this week",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-yellow-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5V4H2v16h5m10 0v-6h-4v6"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Alerts",
                  value: "15",
                  change: "+2 Critical",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01M5.07 19h13.86a2 2 0 001.74-3l-6.93-12a2 2 0 00-3.48 0l-6.93 12a2 2 0 001.74 3z"
                      />
                    </svg>
                  ),
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-white p-3 flex flex-col items-start justify-between border border-gray-100 shadow-sm hover:shadow-md transition"
                >
                  <div className="p-2 bg-gray-50 rounded-md shadow-sm mb-2">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 leading-tight">
                      {item.value}
                    </h3>
                    <p className="text-xs font-medium text-gray-700 leading-tight">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-1">
                      {item.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/*  Card Grafik */}
          <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
            <div className="mb-4">
              <h2 className="text-base font-semibold text-gray-900">
                Visitor Insights
              </h2>
              <p className="text-sm text-gray-500">Infrastructure Statistics</p>
            </div>
            <div className="w-full h-56">
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "11px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                  <Line
                    type="monotone"
                    dataKey="IP"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="WLC"
                    stroke="#EF4444"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="VMware"
                    stroke="#22C55E"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/*  Ringkasan Infrastruktur (Card Nyata - Diperbanyak) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          {/*  IPAM Card */}
          <div className="bg-white rounded-2xl shadow-md p-4 border border-gray-100 flex flex-col justify-between hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-800">
                IPAM Activity
              </h3>
              <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                Live
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <div>
                <p className="text-gray-600">Masuk</p>
                <p className="font-bold text-green-600">192.168.1.12</p>
                <p className="font-bold text-green-600">10.10.10.3</p>
                <p className="font-bold text-green-600">172.16.1.15</p>
                <p className="font-bold text-green-600">192.168.10.20</p>
                <p className="font-bold text-green-600">10.0.0.25</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">Keluar</p>
                <p className="font-bold text-red-500">172.16.0.8</p>
                <p className="font-bold text-red-500">192.168.2.20</p>
                <p className="font-bold text-red-500">10.10.20.5</p>
                <p className="font-bold text-red-500">192.168.100.50</p>
                <p className="font-bold text-red-500">172.20.10.1</p>
              </div>
            </div>
          </div>

          {/*  WLC Card */}
          <div className="bg-white rounded-2xl shadow-md p-4 border border-gray-100 flex flex-col justify-between hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-800">
                WLC Controllers
              </h3>
              <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                Summary
              </span>
            </div>
            <ul className="text-xs space-y-1 max-h-32 overflow-y-auto">
              <li className="flex justify-between">
                <span className="text-gray-700">WLC-01</span>
                <span className="font-medium text-green-600">Online</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">WLC-02</span>
                <span className="font-medium text-red-500">Offline</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">WLC-Backup</span>
                <span className="font-medium text-gray-500">Standby 💤</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">WLC-03</span>
                <span className="font-medium text-green-600">Online</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">WLC-DR</span>
                <span className="font-medium text-gray-500">Standby 💤</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">WLC-TestLab</span>
                <span className="font-medium text-green-600">Online</span>
              </li>
            </ul>
          </div>

          {/*  VMware Card */}
          <div className="bg-white rounded-2xl shadow-md p-4 border border-gray-100 flex flex-col justify-between hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-800">
                VMware Hosts
              </h3>
              <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                Summary
              </span>
            </div>
            <ul className="text-xs space-y-1 max-h-32 overflow-y-auto">
              <li className="flex justify-between">
                <span className="text-gray-700">vCenter-01</span>
                <span className="font-medium text-green-600">12 VM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">vCenter-02</span>
                <span className="font-medium text-green-600">8 VM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">vBackup</span>
                <span className="font-medium text-gray-500">3 Snapshot</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">vLab-Test</span>
                <span className="font-medium text-green-600">6 VM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">vDR-Site</span>
                <span className="font-medium text-green-600">5 VM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">vLegacy</span>
                <span className="font-medium text-gray-500">2 Snapshot</span>
              </li>
            </ul>
          </div>
        </div>

         <div className="bg-white rounded-2xl shadow-md p-4 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-900">Detail Infrastruktur</h2>
        <button className="p-1.5 rounded-lg hover:bg-gray-100 transition">
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v.01M12 12v.01M12 18v.01" />
          </svg>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="text-[10px] text-gray-500 uppercase tracking-wider border-b bg-gray-50">
              <th className="py-1 font-medium">Kategori</th>
              <th className="py-1 font-medium">Nama / IP</th>
              <th className="py-1 font-medium">Status</th>
              <th className="py-1 font-medium">Lokasi</th>
              <th className="py-1 font-medium">Owner</th>
              <th className="py-1 font-medium text-right">Keterangan</th>
              <th className="py-1 font-medium text-center">Questionnaire</th>
              <th className="py-1 font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* IPAM - Completed */}
            <tr className="border-b last:border-0 hover:bg-gray-50 transition">
              <td className="py-1 text-gray-800 font-medium">IPAM</td>
              <td className="py-1 font-medium text-gray-900">192.168.1.12</td>
              <td className="py-1 text-green-600 font-semibold">Masuk</td>
              <td className="py-1 text-gray-700">Subnet A</td>
              <td className="py-1 text-gray-700">Network Team</td>
              <td className="py-1 text-right text-gray-600">Aktif</td>
              <td className="py-1 text-center">
                <span className="bg-teal-500 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-full">
                  Completed
                </span>
              </td>
              <td className="py-1 text-center flex justify-center gap-1">
                <Link href="/ipam-detail">
                  <button className="p-1 rounded-md bg-gray-500 hover:bg-gray-600 text-white transition">
                    <Pencil size={12} />
                  </button>
                </Link>
              </td>
            </tr>

            {/* WLC - Pending */}
            <tr className="border-b last:border-0 hover:bg-gray-50 transition">
              <td className="py-1 text-gray-800 font-medium">WLC</td>
              <td className="py-1 font-medium text-gray-900">WLC-02</td>
              <td className="py-1 text-red-500 font-semibold">Offline</td>
              <td className="py-1 text-gray-700">Data Center 1</td>
              <td className="py-1 text-gray-700">Wireless Team</td>
              <td className="py-1 text-right text-gray-600">Maintenance</td>
              <td className="py-1 text-center">
                <span className="bg-yellow-400 text-black text-[9px] font-semibold px-1.5 py-0.5 rounded-full">
                  Pending
                </span>
              </td>
              <td className="py-1 text-center flex justify-center gap-1">
                <Link href="/wlc-detail">
                  <button className="p-1 rounded-md bg-gray-500 hover:bg-gray-600 text-white transition">
                    <Pencil size={12} />
                  </button>
                </Link>
                <Link href="/wlc-approve">
                  <button className="p-1 rounded-md bg-yellow-400 hover:bg-yellow-500 text-black transition">
                    <Check size={12} />
                  </button>
                </Link>
              </td>
            </tr>

            {/* VMware - Completed */}
            <tr className="border-b last:border-0 hover:bg-gray-50 transition">
              <td className="py-1 text-gray-800 font-medium">VMware</td>
              <td className="py-1 font-medium text-gray-900">vCenter-01</td>
              <td className="py-1 text-green-600 font-semibold">Aktif</td>
              <td className="py-1 text-gray-700">Server Room</td>
              <td className="py-1 text-gray-700">Infra Team</td>
              <td className="py-1 text-right text-gray-600">12 VM</td>
              <td className="py-1 text-center">
                <span className="bg-teal-500 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-full">
                  Completed
                </span>
              </td>
              <td className="py-1 text-center flex justify-center gap-1">
                <Link href="/vmware-detail">
                  <button className="p-1 rounded-md bg-gray-500 hover:bg-gray-600 text-white transition">
                    <Pencil size={12} />
                  </button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

        {/*  Card Tabel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/*  Check Table Card */}
          <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">
                Check Table
              </h2>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v.01M12 12v.01M12 18v.01"
                  />
                </svg>
              </button>
            </div>

            {/*  Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-xs text-gray-500 uppercase tracking-wider border-b">
                    <th className="pb-2 font-medium">Name</th>
                    <th className="pb-2 font-medium">Progress</th>
                    <th className="pb-2 font-medium text-right">Quantity</th>
                    <th className="pb-2 font-medium text-right">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "IPAM Monitoring",
                      progress: "17.5%",
                      quantity: "2.458",
                      date: "24 Jan 2025",
                    },
                    {
                      name: "WLC Active Units",
                      progress: "10.8%",
                      quantity: "1.485",
                      date: "12 Jun 2025",
                    },
                    {
                      name: "VMware Weekly Update",
                      progress: "21.3%",
                      quantity: "1.024",
                      date: "5 Jul 2025",
                    },
                    {
                      name: "Switch Health Check",
                      progress: "32.1%",
                      quantity: "3.102",
                      date: "9 Sep 2025",
                    },
                    {
                      name: "Firewall Rules Audit",
                      progress: "14.7%",
                      quantity: "987",
                      date: "3 Oct 2025",
                    },
                  ].map((row, idx) => (
                    <tr
                      key={idx}
                      className="border-b last:border-0 hover:bg-gray-50 transition"
                    >
                      <td className="py-2 font-medium text-gray-800 text-[13px]">
                        {row.name}
                      </td>
                      <td className="py-2 text-gray-700 text-[13px]">
                        {row.progress}
                      </td>
                      <td className="py-2 text-right font-medium text-gray-900 text-[13px]">
                        {row.quantity}
                      </td>
                      <td className="py-2 text-right text-gray-600 text-[13px]">
                        {row.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/*  Persentase Infrastruktur Card */}
          <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">
                Infrastruktur — Volume & Service Level
              </h2>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                Minggu Ini
              </span>
            </div>

            {/* Chart */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "IPAM", volume: 1245, service: 98 },
                      { name: "WLC", volume: 32, service: 85 },
                      { name: "VMware", volume: 87, service: 92 },
                    ]}
                    barCategoryGap="20%"
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip
                      formatter={(value, name) =>
                        name === "service" ? `${value}%` : value
                      }
                      contentStyle={{
                        fontSize: "10px",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "10px" }} />
                    <Bar
                      dataKey="volume"
                      name="Volume (unit)"
                      fill="#2563eb"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="service"
                      name="Service Level (%)"
                      fill="#10b981"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Legend bawah */}
            <div className="flex justify-center gap-6 mt-3 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                Volume Total (1.924)
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                Service Rata-rata (87.5%)
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
}
