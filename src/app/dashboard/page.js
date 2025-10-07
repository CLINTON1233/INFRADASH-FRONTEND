"use client";

import { useEffect, useState } from "react";
import LayoutDashboard from "../components/LayoutDashboard";
import { DollarSign, ShoppingBag, Package, Users } from "lucide-react";
import { Eye, Search, Filter, AlertTriangle, Menu, X } from "lucide-react";
import Link from "next/link";
import { Pencil, Check, Server, Wifi, Cpu, Box } from "lucide-react";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedIP, setSelectedIP] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  // Data untuk statistik
  const stats = [
    {
      title: "Total IP Terdaftar",
      value: "1.245",
      change: "+5% hari ini",
      icon: <Cpu className="w-5 h-5 text-blue-600" />,
      bg: "bg-blue-50",
      description: "Jumlah IP yang terdaftar di sistem IPAM",
    },
    {
      title: "WLC Aktif",
      value: "32",
      change: "+1 unit",
      icon: <Wifi className="w-5 h-5 text-orange-500" />,
      bg: "bg-orange-50",
      description: "Jumlah WLC yang online",
    },
    {
      title: "VM Aktif",
      value: "87",
      change: "+3 host",
      icon: <Server className="w-5 h-5 text-green-600" />,
      bg: "bg-green-50",
      description: "Jumlah VM aktif di VMware Hosts",
    },
    {
      title: "Aset Perangkat dilapangan",
      value: "560",
      change: "+12 unit",
      icon: <Box className="w-5 h-5 text-purple-600" />,
      bg: "bg-purple-50",
      description: "Total perangkat yang aktif",
    },
  ];

  // Data untuk chart
  const chartData = [
    { name: "Jan", IP: 400, WLC: 240, VMware: 240 },
    { name: "Feb", IP: 300, WLC: 139, VMware: 221 },
    { name: "Mar", IP: 200, WLC: 980, VMware: 229 },
    { name: "Apr", IP: 278, WLC: 390, VMware: 200 },
    { name: "May", IP: 189, WLC: 480, VMware: 218 },
    { name: "Jun", IP: 239, WLC: 380, VMware: 250 },
    { name: "Jul", IP: 349, WLC: 430, VMware: 210 },
  ];

  // Data untuk WLC Status Chart
  const wlcStatusData = [
    { name: "Online", value: 3, color: "#10B981" },
    { name: "Offline", value: 2, color: "#EF4444" },
    { name: "Standby", value: 1, color: "#6B7280" },
  ];

  // Data untuk VMware Resource Usage
  const vmwareResourceData = [
    { name: "vCenter-01", cpu: 65, ram: 72, storage: 80 },
    { name: "vCenter-02", cpu: 45, ram: 60, storage: 55 },
    { name: "vBackup", cpu: 30, ram: 40, storage: 90 },
  ];

  // Data detail infrastruktur yang lebih lengkap
  const infrastructureData = [
    {
      id: 1,
      category: "IPAM",
      ip: "192.168.1.12",
      hostname: "Server01",
      mac: "00:1A:2B:3C:4D:5E",
      subnet: "192.168.1.0/24",
      status: "Aktif",
      location: "Engineering Building",
      owner: "Operation & End User Service",
      description: "Aktif",
      questionnaire: "Completed",
      lastUpdated: "2024-01-15 14:30",
      assignedUser: "john.doe@company.com",
    },
    {
      id: 2,
      category: "WLC",
      name: "WLC-02",
      status: "Offline",
      location: "Main Office Lantai 1",
      owner: "Facilities",
      description: "Maintenance",
      questionnaire: "Pending",
      clients: 0,
      ssid: "OfficeWiFi",
      bandwidth: "0 Mbps",
      uptime: "0 hours",
    },
    {
      id: 3,
      category: "VMware",
      name: "vCenter-01",
      status: "Aktif",
      location: "Server Room",
      owner: "IT Infrastructure",
      description: "12 VM",
      questionnaire: "Completed",
      cpu: 65,
      ram: 72,
      storage: 80,
      vms: 12,
      vmsRunning: 11,
      vmsStopped: 1,
    },
    {
      id: 4,
      category: "IPAM",
      ip: "10.10.10.3",
      hostname: "Switch-Core-01",
      mac: "00:1B:44:11:3A:2B",
      subnet: "10.10.10.0/24",
      status: "Aktif",
      location: "Data Center",
      owner: "Network Team",
      description: "Core Switch",
      questionnaire: "Completed",
      lastUpdated: "2024-01-15 10:22",
      assignedUser: "network.admin@company.com",
    },
    {
      id: 5,
      category: "WLC",
      name: "WLC-01",
      status: "Online",
      location: "Main Office Lantai 2",
      owner: "IT Infrastructure",
      description: "Operational",
      questionnaire: "Completed",
      clients: 52,
      ssid: "OfficeWiFi,GuestWiFi",
      bandwidth: "120 Mbps",
      uptime: "45 days",
    },
  ];

  // Filter data berdasarkan pencarian dan filter
  const filteredData = infrastructureData.filter((item) => {
    const matchesSearch =
      searchTerm === "" ||
      (item.category === "IPAM" &&
        item.ip?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.category !== "IPAM" &&
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.hostname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" || item.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Komponen Modal untuk Detail IP
// Komponen Modal untuk Detail IP - Versi Bootstrap Style
const IPDetailModal = ({
  ip,
  hostname,
  mac,
  subnet,
  status,
  location,
  owner,
  lastUpdated,
  assignedUser,
  onClose,
}) => (
  <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        {/* Modal Header */}
        <div className="modal-header" style={{padding: '1rem', borderBottom: '1px solid #dee2e6'}}>
          <h5 className="modal-title" style={{margin: 0, fontSize: '1.25rem', fontWeight: '500'}}>
            Modal title
          </h5>
          <button 
            type="button" 
            className="close" 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              fontWeight: '700',
              lineHeight: '1',
              color: '#000',
              opacity: '0.5',
              cursor: 'pointer'
            }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{padding: '1rem'}}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500">
                  IP Address
                </label>
                <p className="text-sm font-semibold text-gray-900">{ip}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500">
                  Status
                </label>
                <p
                  className={`text-sm font-semibold ${
                    status === "Aktif" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {status}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500">
                  Hostname
                </label>
                <p className="text-sm text-gray-900">{hostname}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500">
                  MAC Address
                </label>
                <p className="text-sm text-gray-900 font-mono">{mac}</p>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500">
                Subnet
              </label>
              <p className="text-sm text-gray-900">{subnet}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500">
                  Lokasi
                </label>
                <p className="text-sm text-gray-900">{location}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500">
                  Owner
                </label>
                <p className="text-sm text-gray-900">{owner}</p>
              </div>
            </div>

            {lastUpdated && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500">
                    Last Updated
                  </label>
                  <p className="text-sm text-gray-900">{lastUpdated}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">
                    Assigned User
                  </label>
                  <p className="text-sm text-gray-900 break-all">
                    {assignedUser}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer" style={{padding: '1rem', borderTop: '1px solid #dee2e6'}}>
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={onClose}
            style={{
              padding: '0.375rem 0.75rem',
              fontSize: '0.875rem',
              fontWeight: '400',
              lineHeight: '1.5',
              color: '#fff',
              backgroundColor: '#6c757d',
              border: '1px solid #6c757d',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
          <button 
            type="button" 
            className="btn btn-primary"
            style={{
              padding: '0.375rem 0.75rem',
              fontSize: '0.875rem',
              fontWeight: '400',
              lineHeight: '1.5',
              color: '#fff',
              backgroundColor: '#007bff',
              border: '1px solid #007bff',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
);

  // Mobile Filter Modal
  const MobileFilterModal = ({ onClose, onApply }) => (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black bg-opacity-50 sm:items-center">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Filter</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategori
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-black"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">Semua Kategori</option>
              <option value="IPAM">IPAM</option>
              <option value="WLC">WLC</option>
              <option value="VMware">VMware</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-black"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Offline">Offline</option>
              <option value="Nonaktif">Nonaktif</option>
            </select>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Batal
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Terapkan
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <LayoutDashboard activeMenu={0}>
      <div className="font-[Poppins] space-y-4 sm:space-y-6">
        {/* Mobile Header */}
        <div className="sm:hidden bg-white p-4 rounded-2xl shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-gray-800">
                Infrastructure Dashboard
              </h1>
              <p className="text-gray-600 text-xs">
                Monitoring network infrastructure
              </p>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-lg bg-gray-100"
            >
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Header Dashboard - Desktop */}
        <div className="hidden sm:block">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
            Infrastructure Dashboard
          </h1>
          <p className="text-gray-600 text-sm">
            Monitoring network infrastructure and systems in one place.
          </p>
        </div>

        {/* Statistik & Grafik */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Card Statistik */}
          <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  Today's Infrastructure
                </h2>
                <p className="text-sm text-gray-500 hidden sm:block">
                  Infrastructure Summary
                </p>
              </div>
              <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition">
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

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {stats.map((item, idx) => (
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
                    <p className="text-[12px] text-gray-500 mt-1">
                      {item.change}
                    </p>
                    <p className="text-[12px] text-gray-400 mt-1 hidden sm:block">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card Grafik */}
          <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 border border-gray-100">
            <div className="mb-4">
              <h2 className="text-base font-semibold text-gray-900">
                Infrastructure Trends
              </h2>
              <p className="text-sm text-gray-500">Monthly Statistics</p>
            </div>
            <div className="w-full h-48 sm:h-56">
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(value, name) => {
                      return [`${value} unit`, name];
                    }}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "12px",
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

        {/* Ringkasan Infrastruktur */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-5">
          {/* IPAM Card */}
          <div className="bg-white rounded-2xl shadow-md p-4 border border-gray-100 flex flex-col justify-between hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-800">
                IPAM Activity
              </h3>
              <span className="text-[12px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                Live
              </span>
            </div>
            <div className="space-y-2 text-xs text-black max-h-32 overflow-y-auto">
              <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-semibold text-green-700">192.168.1.12</p>
                  <p className="text-gray-600 truncate">
                    Server01 • 00:1A:2B:3C:4D:5E
                  </p>
                  <p className="text-gray-500">192.168.1.0/24</p>
                </div>
                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-[12px] ml-2">
                  Aktif
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-red-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-semibold text-red-700">172.16.0.8</p>
                  <p className="text-gray-600 truncate">
                    Switch-02 • 00:1B:44:11:3A:2B
                  </p>
                  <p className="text-gray-500">172.16.0.0/24</p>
                </div>
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-[12px] ml-2">
                  Nonaktif
                </span>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-gray-100">
              <a
                href="/ipam"
                className="block w-full text-center text-xs text-blue-600 font-medium hover:text-blue-800 transition"
              >
                View All IP →
              </a>
            </div>
          </div>

          {/* WLC Card */}
          <div className="bg-white rounded-2xl shadow-md p-4 border border-gray-100 flex flex-col justify-between hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-800">
                WLC Controllers
              </h3>
              <span className="text-[12px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                Summary
              </span>
            </div>
            <ul className="text-xs text-black space-y-2 max-h-32 overflow-y-auto">
              {[
                {
                  name: "WLC-01",
                  status: "Online",
                  clients: 52,
                  ssid: "OfficeWiFi",
                  bandwidth: "120 Mbps",
                  uptime: "45 days",
                },
                {
                  name: "WLC-02",
                  status: "Offline",
                  clients: 0,
                  ssid: "OfficeWiFi",
                  bandwidth: "0 Mbps",
                  uptime: "0 hours",
                },
              ].map((wlc, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-start p-2 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-700">
                        {wlc.name}
                      </span>
                      <span
                        className={`font-medium text-xs px-2 py-1 rounded-full ${
                          wlc.status === "Online"
                            ? "bg-green-100 text-green-800"
                            : wlc.status === "Offline"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {wlc.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-[12px] text-gray-600">
                      <div>Clients: {wlc.clients}</div>
                      <div>SSID: {wlc.ssid}</div>
                      <div>Bandwidth: {wlc.bandwidth}</div>
                      <div>Uptime: {wlc.uptime}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-3 pt-2 border-t border-gray-100">
              <a
                href="/wlc"
                className="block w-full text-center text-xs text-blue-600 font-medium hover:text-blue-800 transition"
              >
                View All WLC Controllers →
              </a>
            </div>
          </div>

          {/* VMware Card */}
          <div className="bg-white rounded-2xl shadow-md p-4 border border-gray-100 flex flex-col justify-between hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-800">
                VMware Hosts
              </h3>
              <span className="text-[12px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                Summary
              </span>
            </div>
            <ul className="text-xs text-black space-y-2 max-h-32 overflow-y-auto">
              {[
                {
                  name: "vCenter-01",
                  vms: "12 VM",
                  status: "Aktif",
                  cpu: 65,
                  ram: 72,
                  storage: 80,
                  vmsRunning: 11,
                  vmsStopped: 1,
                },
                {
                  name: "vCenter-02",
                  vms: "8 VM",
                  status: "Aktif",
                  cpu: 45,
                  ram: 60,
                  storage: 55,
                  vmsRunning: 8,
                  vmsStopped: 0,
                },
              ].map((vm, idx) => (
                <li key={idx} className="p-2 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">{vm.name}</span>
                    <span className="font-medium text-green-600">{vm.vms}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[12px]">
                      <span>CPU: {vm.cpu}%</span>
                      <span>RAM: {vm.ram}%</span>
                      <span>Storage: {vm.storage}%</span>
                    </div>
                    <div className="text-[12px] text-gray-600">
                      VM Status: {vm.vmsRunning} running, {vm.vmsStopped}{" "}
                      stopped
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-3 pt-2 border-t border-gray-100">
              <a
                href="/vmware"
                className="block w-full text-center text-xs text-blue-600 font-medium hover:text-blue-800 transition"
              >
                View All VMWARE →
              </a>
            </div>
          </div>
        </div>

        {/* Search dan Filter Bar */}
        <div className="bg-white rounded-2xl shadow-md p-4 border border-gray-100">
          <div className="flex flex-col gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
              <input
                type="text"
                placeholder="Cari berdasarkan IP, hostname, atau lokasi..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter - Desktop */}
            <div className="hidden sm:flex gap-2">
              <select
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-black"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">Semua Kategori</option>
                <option value="IPAM">IPAM</option>
                <option value="WLC">WLC</option>
                <option value="VMware">VMware</option>
              </select>

              <select
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-black"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">Semua Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Offline">Offline</option>
                <option value="Nonaktif">Nonaktif</option>
              </select>
            </div>

            {/* Filter Button - Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="sm:hidden flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white"
            >
              <Filter size={16} />
              Filter Data
            </button>
          </div>
        </div>

        {/* Tabel Detail Infrastruktur */}
        <div className="bg-white rounded-2xl shadow-md p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-900">
              Detail Infrastruktur
            </h2>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="hidden sm:inline">
                Menampilkan {filteredData.length} items
              </span>
              <span className="sm:hidden">{filteredData.length} items</span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-[12px] text-gray-500 uppercase tracking-wider border-b bg-gray-50">
                  <th className="py-2 px-1 font-medium">Kategori</th>
                  <th className="py-2 px-1 font-medium">Detail</th>
                  <th className="py-2 px-1 font-medium">Status</th>
                  <th className="py-2 px-1 font-medium">Lokasi</th>
                  <th className="py-2 px-1 font-medium">Owner</th>
                  <th className="py-2 px-1 font-medium text-right">
                    Keterangan
                  </th>
                  <th className="py-2 px-1 font-medium text-center">
                    Questionnaire
                  </th>
                  <th className="py-2 px-1 font-medium text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b last:border-0 hover:bg-gray-50 transition"
                  >
                    <td className="py-2 px-1 text-gray-800 font-medium">
                      {item.category}
                    </td>

                    <td className="py-2 px-1 font-medium text-gray-900">
                      {item.category === "IPAM" ? (
                        <button
                          onClick={() => setSelectedIP(item)}
                          className="text-left hover:text-blue-600 transition-colors"
                        >
                          <div className="font-mono">{item.ip}</div>
                          <div className="text-gray-500 text-[12px]">
                            Host: {item.hostname}
                          </div>
                          <div className="text-gray-500 text-[12px]">
                            MAC: {item.mac}
                          </div>
                          <div className="text-gray-500 text-[12px]">
                            Subnet: {item.subnet}
                          </div>
                        </button>
                      ) : item.category === "WLC" ? (
                        <div>
                          <div>{item.name}</div>
                          <div className="text-gray-500 text-[12px]">
                            Clients: {item.clients}
                          </div>
                          <div className="text-gray-500 text-[12px]">
                            SSID: {item.ssid}
                          </div>
                          <div className="text-gray-500 text-[12px]">
                            Bandwidth: {item.bandwidth}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div>{item.name}</div>
                          <div className="text-gray-500 text-[12px]">
                            CPU: {item.cpu}% | RAM: {item.ram}%
                          </div>
                          <div className="text-gray-500 text-[12px]">
                            Storage: {item.storage}%
                          </div>
                          <div className="text-gray-500 text-[12px]">
                            VMs: {item.vmsRunning} running, {item.vmsStopped}{" "}
                            stopped
                          </div>
                        </div>
                      )}
                    </td>

                    <td className="py-2 px-1">
                      <span
                        className={`font-semibold text-[12px] px-2 py-1 rounded-full ${
                          item.status === "Aktif" || item.status === "Online"
                            ? "bg-green-100 text-green-800"
                            : item.status === "Offline"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="py-2 px-1 text-gray-700 text-[13px]">
                      {item.location}
                    </td>
                    <td className="py-2 px-1 text-gray-700 text-[13px]">
                      {item.owner}
                    </td>
                    <td className="py-2 px-1 text-right text-gray-600 text-[13px]">
                      {item.description}
                    </td>

                    <td className="py-2 px-1 text-center">
                      <span
                        className={`text-[9px] font-semibold px-2 py-1 rounded-full ${
                          item.questionnaire === "Completed"
                            ? "bg-teal-500 text-white"
                            : "bg-yellow-400 text-black"
                        }`}
                      >
                        {item.questionnaire}
                      </span>
                    </td>

                    <td className="py-2 px-1 text-center">
                      <div className="flex justify-center gap-1">
                        {item.category === "IPAM" ? (
                          <button
                            onClick={() => setSelectedIP(item)}
                            className="p-1 rounded-md bg-gray-500 hover:bg-gray-600 text-white transition"
                          >
                            <Eye size={12} />
                          </button>
                        ) : item.category === "WLC" ? (
                          <>
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
                          </>
                        ) : (
                          <Link href="/vmware-detail">
                            <button className="p-1 rounded-md bg-gray-500 hover:bg-gray-600 text-white transition">
                              <Pencil size={12} />
                            </button>
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts dan Visualisasi Tambahan */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* WLC Status Chart */}
          <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              WLC Status Distribution
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={wlcStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {wlcStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* VMware Resource Usage */}
          <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              VMware Resource Usage
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vmwareResourceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                  <Bar dataKey="cpu" name="CPU Usage" fill="#3B82F6" />
                  <Bar dataKey="ram" name="RAM Usage" fill="#10B981" />
                  <Bar dataKey="storage" name="Storage Usage" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                <div className="font-medium text-gray-900">Tambah IP Baru</div>
                <div className="text-xs text-gray-500">
                  Registrasi IP address baru ke sistem
                </div>
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                <div className="font-medium text-gray-900">Scan Jaringan</div>
                <div className="text-xs text-gray-500">
                  Scan subnet untuk device baru
                </div>
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                <div className="font-medium text-gray-900">Generate Report</div>
                <div className="text-xs text-gray-500">
                  Buat laporan infrastruktur mingguan
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

     {/* Modal untuk Detail IP */}
{selectedIP && (
  <>
    {/* Backdrop */}
    <div 
      className="modal-backdrop fade show"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1040,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        opacity: 0.5
      }}
    ></div>
    
    {/* Modal */}
    <div 
      className="modal fade show" 
      style={{
        display: 'block',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1050,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        outline: 0
      }} 
      tabIndex="-1" 
      role="dialog"
    >
      <div 
        className="modal-dialog" 
        role="document"
        style={{
          maxWidth: '500px',
          margin: '1.75rem auto'
        }}
      >
        <div 
          className="modal-content"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            pointerEvents: 'auto',
            backgroundColor: '#fff',
            backgroundClip: 'padding-box',
            border: '1px solid rgba(0,0,0,.2)',
            borderRadius: '0.3rem',
            outline: 0
          }}
        >
          {/* Modal Header */}
          <div 
            className="modal-header"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              padding: '1rem',
              borderBottom: '1px solid #dee2e6',
              borderTopLeftRadius: 'calc(0.3rem - 1px)',
              borderTopRightRadius: 'calc(0.3rem - 1px)'
            }}
          >
            <h5 
              className="modal-title text-black"
              style={{
                marginBottom: 0,
                lineHeight: '1.5',
                fontSize: '1.25rem',
                fontWeight: '500'
                
              }}
            >
              Detail IP Address
            </h5>
            <button 
              type="button" 
              className="close" 
              onClick={() => setSelectedIP(null)}
              style={{
                padding: 0,
                backgroundColor: 'transparent',
                border: 0,
                fontSize: '1.5rem',
                fontWeight: '700',
                lineHeight: 1,
                color: '#000',
                textShadow: '0 1px 0 #fff',
                opacity: 0.5
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          {/* Modal Body */}
          <div 
            className="modal-body"
            style={{
              position: 'relative',
              flex: '1 1 auto',
              padding: '1rem'
            }}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500">
                    IP Address
                  </label>
                  <p className="text-sm font-semibold text-gray-900">{selectedIP.ip}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">
                    Status
                  </label>
                  <p className={`text-sm font-semibold ${
                    selectedIP.status === "Aktif" ? "text-green-600" : "text-red-500"
                  }`}>
                    {selectedIP.status}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500">
                    Hostname
                  </label>
                  <p className="text-sm text-gray-900">{selectedIP.hostname}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">
                    MAC Address
                  </label>
                  <p className="text-sm text-gray-900 font-mono">{selectedIP.mac}</p>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500">
                  Subnet
                </label>
                <p className="text-sm text-gray-900">{selectedIP.subnet}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500">
                    Lokasi
                  </label>
                  <p className="text-sm text-gray-900">{selectedIP.location}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">
                    Owner
                  </label>
                  <p className="text-sm text-gray-900">{selectedIP.owner}</p>
                </div>
              </div>

              {selectedIP.lastUpdated && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      Last Updated
                    </label>
                    <p className="text-sm text-gray-900">{selectedIP.lastUpdated}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      Assigned User
                    </label>
                    <p className="text-sm text-gray-900 break-all">
                      {selectedIP.assignedUser}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div 
            className="modal-footer"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'flex-end',
              padding: '0.75rem',
              borderTop: '1px solid #dee2e6',
              borderBottomRightRadius: 'calc(0.3rem - 1px)',
              borderBottomLeftRadius: 'calc(0.3rem - 1px)'
            }}
          >
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => setSelectedIP(null)}
              style={{
                color: '#fff',
                backgroundColor: '#6c757d',
                borderColor: '#6c757d',
                padding: '0.375rem 0.75rem',
                fontSize: '0.875rem',
                lineHeight: '1.5',
                borderRadius: '0.2rem',
                border: '1px solid transparent',
                cursor: 'pointer',
                margin: '0.25rem'
              }}
            >
              Close
            </button>
            <button 
              type="button" 
              className="btn btn-primary"
              style={{
                color: '#fff',
                backgroundColor: '#007bff',
                borderColor: '#007bff',
                padding: '0.375rem 0.75rem',
                fontSize: '0.875rem',
                lineHeight: '1.5',
                borderRadius: '0.2rem',
                border: '1px solid transparent',
                cursor: 'pointer',
                margin: '0.25rem'
              }}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
)}

      {/* Mobile Filter Modal */}
      {isMobileMenuOpen && (
        <MobileFilterModal onClose={() => setIsMobileMenuOpen(false)} />
      )}

      <footer className="mt-6 py-4 text-center text-black text-sm space-y-1">
        <p>Infradash Created by @Clinton Alfaro</p>
        <p>seatrium.com</p>
      </footer>
    </LayoutDashboard>
  );
}
