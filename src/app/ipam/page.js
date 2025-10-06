"use client";

import { useState, useEffect } from "react";
import LayoutDashboard from "../components/LayoutDashboard";
import { Globe, Wifi, Monitor, Users } from "lucide-react";
import { Poppins } from "next/font/google";
import {
  Search,
  Filter,
  Plus,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Menu,
  X,
} from "lucide-react";

// Inisialisasi font Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function IPAMPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubnet, setSelectedSubnet] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedIP, setSelectedIP] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const itemsPerPage = 10;

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Data contoh untuk IPAM
  const ipamData = [
    {
      id: 1,
      ip: "192.168.1.12",
      hostname: "server-web-01",
      mac: "00:1A:2B:3C:4D:5E",
      subnet: "192.168.1.0/24",
      status: "active",
      deviceType: "Server",
      location: "Engineering Building",
      owner: "Operation & End User Service",
      description: "Web Server Production",
      lastSeen: "2024-01-15 14:30",
      assignedUser: "john.doe@company.com",
      vlan: "VLAN-10",
      dns: "server-web-01.company.local",
    },
    {
      id: 2,
      ip: "192.168.1.15",
      hostname: "printer-floor3",
      mac: "00:1B:44:11:3A:2B",
      subnet: "192.168.1.0/24",
      status: "active",
      deviceType: "Printer",
      location: "Main Office Floor 3",
      owner: "Facilities",
      description: "Color Laser Printer",
      lastSeen: "2024-01-15 10:22",
      assignedUser: "facilities@company.com",
      vlan: "VLAN-10",
      dns: "printer-floor3.company.local",
    },
    {
      id: 3,
      ip: "192.168.1.20",
      hostname: "switch-core-01",
      mac: "00:1C:B3:4D:5E:6F",
      subnet: "192.168.1.0/24",
      status: "active",
      deviceType: "Network Switch",
      location: "Server Room",
      owner: "Network Team",
      description: "Core Switch Main",
      lastSeen: "2024-01-15 08:15",
      assignedUser: "network.admin@company.com",
      vlan: "VLAN-1",
      dns: "switch-core-01.company.local",
    },
    {
      id: 4,
      ip: "192.168.1.25",
      hostname: "",
      mac: "",
      subnet: "192.168.1.0/24",
      status: "available",
      deviceType: "",
      location: "",
      owner: "",
      description: "IP Address Available",
      lastSeen: "",
      assignedUser: "",
      vlan: "VLAN-10",
      dns: "",
    },
    {
      id: 5,
      ip: "192.168.1.30",
      hostname: "ap-office-01",
      mac: "00:1D:7E:8F:9A:1B",
      subnet: "192.168.1.0/24",
      status: "active",
      deviceType: "Access Point",
      location: "Main Office Floor 2",
      owner: "IT Infrastructure",
      description: "WiFi Access Point",
      lastSeen: "2024-01-15 16:45",
      assignedUser: "wifi.admin@company.com",
      vlan: "VLAN-20",
      dns: "ap-office-01.company.local",
    },
    {
      id: 6,
      ip: "192.168.2.10",
      hostname: "camera-security-01",
      mac: "00:1E:9A:2B:3C:4D",
      subnet: "192.168.2.0/24",
      status: "active",
      deviceType: "Security Camera",
      location: "Main Entrance",
      owner: "Security",
      description: "Entrance Security Camera",
      lastSeen: "2024-01-15 12:30",
      assignedUser: "security@company.com",
      vlan: "VLAN-30",
      dns: "camera-entrance.company.local",
    },
    {
      id: 7,
      ip: "192.168.1.35",
      hostname: "",
      mac: "",
      subnet: "192.168.1.0/24",
      status: "reserved",
      deviceType: "",
      location: "",
      owner: "IT Infrastructure",
      description: "Reserved for New Server",
      lastSeen: "",
      assignedUser: "",
      vlan: "VLAN-10",
      dns: "",
    },
    {
      id: 8,
      ip: "192.168.1.40",
      hostname: "server-db-01",
      mac: "00:1F:5B:6C:7D:8E",
      subnet: "192.168.1.0/24",
      status: "conflict",
      deviceType: "Server",
      location: "Data Center",
      owner: "Database Team",
      description: "Database Server - IP CONFLICT",
      lastSeen: "2024-01-15 09:10",
      assignedUser: "db.admin@company.com",
      vlan: "VLAN-10",
      dns: "server-db-01.company.local",
    },
    {
      id: 9,
      ip: "10.10.10.5",
      hostname: "router-main",
      mac: "00:20:8F:9A:1B:2C",
      subnet: "10.10.10.0/24",
      status: "active",
      deviceType: "Router",
      location: "Network Room",
      owner: "Network Team",
      description: "Main Router",
      lastSeen: "2024-01-15 07:00",
      assignedUser: "network.admin@company.com",
      vlan: "VLAN-1",
      dns: "router-main.company.local",
    },
    {
      id: 10,
      ip: "10.10.10.10",
      hostname: "",
      mac: "",
      subnet: "10.10.10.0/24",
      status: "available",
      deviceType: "",
      location: "",
      owner: "",
      description: "IP Address Available",
      lastSeen: "",
      assignedUser: "",
      vlan: "VLAN-1",
      dns: "",
    },
    {
      id: 11,
      ip: "10.10.10.252",
      hostname: "anviz-main",
      mac: "00:20:8F:9A:1B:2C",
      subnet: "10.10.2.0/24",
      status: "available",
      deviceType: "Anviz",
      location: "Site Office 1",
      owner: "IT Infrastructure",
      description: "IP Address Available",
      lastSeen: "2024-01-15 07:09",
      assignedUser: "seatriumbatam.com",
      vlan: "VLAN-1",
      dns: "",
    },
  ];

  // Data subnet
  const subnetData = [
    {
      subnet: "192.168.1.0/24",
      used: 6,
      total: 254,
      usage: "65%",
      description: "Main Office LAN",
    },
    {
      subnet: "192.168.2.0/24",
      used: 1,
      total: 254,
      usage: "15%",
      description: "Security Network",
    },
    {
      subnet: "10.10.10.0/24",
      used: 2,
      total: 254,
      usage: "25%",
      description: "Infrastructure Network",
    },
    {
      subnet: "172.16.1.0/24",
      used: 0,
      total: 254,
      usage: "0%",
      description: "Guest Network",
    },
  ];

  // Filter data
  const filteredData = ipamData.filter((item) => {
    const matchesSearch =
      searchTerm === "" ||
      item.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mac.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSubnet =
      selectedSubnet === "all" || item.subnet === selectedSubnet;
    const matchesStatus =
      selectedStatus === "all" || item.status === selectedStatus;

    return matchesSearch && matchesSubnet && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Statistik
  const stats = {
    total: ipamData.length,
    active: ipamData.filter((item) => item.status === "active").length,
    available: ipamData.filter((item) => item.status === "available").length,
    conflict: ipamData.filter((item) => item.status === "conflict").length,
    reserved: ipamData.filter((item) => item.status === "reserved").length,
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const config = {
      active: {
        color: "bg-green-100 text-green-800",
        icon: <CheckCircle className="w-3 h-3" />,
        text: "Aktif",
      },
      available: {
        color: "bg-blue-100 text-blue-800",
        icon: <CheckCircle className="w-3 h-3" />,
        text: "Tersedia",
      },
      reserved: {
        color: "bg-yellow-100 text-yellow-800",
        icon: <CheckCircle className="w-3 h-3" />,
        text: "Reserved",
      },
      conflict: {
        color: "bg-red-100 text-red-800",
        icon: <AlertTriangle className="w-3 h-3" />,
        text: "Konflik",
      },
    };

    const { color, icon, text } = config[status] || config.active;

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color}`}
      >
        {icon}
        {text}
      </span>
    );
  };

  // Mobile Filter Modal
  const MobileFilterModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-40 md:hidden">
      <div className="bg-white rounded-t-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Filter</h3>
            <button onClick={() => setShowMobileFilters(false)} className="p-2">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subnet
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-black"
              value={selectedSubnet}
              onChange={(e) => setSelectedSubnet(e.target.value)}
            >
              <option value="all">Semua Subnet</option>
              {subnetData.map((subnet, idx) => (
                <option key={idx} value={subnet.subnet}>
                  {subnet.subnet}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-black"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="available">Tersedia</option>
              <option value="reserved">Reserved</option>
              <option value="conflict">Konflik</option>
            </select>
          </div>
          <button
            onClick={() => setShowMobileFilters(false)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium"
          >
            Terapkan Filter
          </button>
        </div>
      </div>
    </div>
  );

  // Mobile IP Card Component
  const MobileIPCard = ({ item }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <button
            onClick={() => setSelectedIP(item)}
            className="font-mono text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition text-left"
          >
            {item.ip}
          </button>
          <p className="text-sm text-gray-600 mt-1">{item.hostname || "-"}</p>
        </div>
        <StatusBadge status={item.status} />
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-gray-500">Subnet:</span>
          <p className="font-medium">{item.subnet}</p>
        </div>
        <div>
          <span className="text-gray-500">Device:</span>
          <p className="font-medium">{item.deviceType || "-"}</p>
        </div>
      </div>

      {item.assignedUser && (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
            {item.assignedUser.split("@")[0].charAt(0).toUpperCase()}
          </div>
          <span className="text-sm text-gray-600 truncate">
            {item.assignedUser}
          </span>
        </div>
      )}

      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
        <span className="text-xs text-gray-500">{item.location || "-"}</span>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedIP(item)}
            className="p-1 text-gray-400 hover:text-blue-600 transition"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-1 text-gray-400 hover:text-green-600 transition">
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  // Modal Detail IP
  const IPDetailModal = ({ ipData, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Detail IP Address
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  IP Address
                </label>
                <p className="text-lg font-mono font-semibold text-gray-900">
                  {ipData.ip}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Hostname
                </label>
                <p className="text-sm text-gray-900">
                  {ipData.hostname || "-"}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  MAC Address
                </label>
                <p className="text-sm font-mono text-gray-900">
                  {ipData.mac || "-"}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Subnet
                </label>
                <p className="text-sm text-gray-900">{ipData.subnet}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  VLAN
                </label>
                <p className="text-sm text-gray-900">{ipData.vlan}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Status
                </label>
                <div className="mt-1">
                  <StatusBadge status={ipData.status} />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Device Type
                </label>
                <p className="text-sm text-gray-900">
                  {ipData.deviceType || "-"}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Lokasi
                </label>
                <p className="text-sm text-gray-900">
                  {ipData.location || "-"}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Owner
                </label>
                <p className="text-sm text-gray-900">{ipData.owner || "-"}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Assigned User
                </label>
                <p className="text-sm text-gray-900">
                  {ipData.assignedUser || "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <label className="text-sm font-medium text-gray-500">
              Description
            </label>
            <p className="text-sm text-gray-900 mt-1">{ipData.description}</p>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-gray-500">
              DNS Record
            </label>
            <p className="text-sm text-gray-900">{ipData.dns || "-"}</p>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-gray-500">
              Last Seen
            </label>
            <p className="text-sm text-gray-900">{ipData.lastSeen || "-"}</p>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              Tutup
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Edit IP
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <LayoutDashboard activeMenu={1}>
      <div className="font-[Poppins] space-y-4">
        {/* Header */}
        <div className="space-y-6 flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
              IP Address Management (IPAM)
            </h1>
            <p className="text-gray-600 text-sm">
              Kelola dan pantau semua alamat IP dalam jaringan Anda
            </p>
          </div>
          <div className="flex gap-3 mt-4 lg:mt-0">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Tambah IP</span>
              <span className="sm:hidden">Tambah</span>
            </button>
          </div>
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Total IP",
              value: stats.total,
              color: "bg-blue-50 text-blue-600 border-blue-200",
              icon: <Globe className="w-5 h-5" />,
              bgColor: "bg-blue-500",
              description: "Total IP terdaftar",
              percentage: "100%",
              trend: "+5% dari bulan lalu",
              trendColor: "text-green-600",
            },
            {
              label: "IP Aktif",
              value: stats.active,
              color: "bg-green-50 text-green-600 border-green-200",
              icon: <CheckCircle className="w-5 h-5" />,
              bgColor: "bg-green-500",
              description: "Device aktif",
              percentage: `${Math.round((stats.active / stats.total) * 100)}%`,
              trend: `${stats.active} device`,
              trendColor: "text-green-600",
            },
            {
              label: "IP Tersedia",
              value: stats.available,
              color: "bg-gray-50 text-gray-600 border-gray-200",
              icon: <CheckCircle className="w-5 h-5" />,
              bgColor: "bg-gray-400",
              description: "IP kosong",
              percentage: `${Math.round(
                (stats.available / stats.total) * 100
              )}%`,
              trend: `${stats.available} slot free`,
              trendColor: "text-blue-600",
            },
            {
              label: "Konflik IP",
              value: stats.conflict,
              color: "bg-red-50 text-red-600 border-red-200",
              icon: <AlertTriangle className="w-5 h-5" />,
              bgColor: "bg-red-500",
              description: "IP bermasalah",
              percentage: `${Math.round(
                (stats.conflict / stats.total) * 100
              )}%`,
              trend: "Perlu tindakan",
              trendColor: "text-red-600",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm font-semibold text-gray-700 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    {stat.description}
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${stat.color} border`}>
                  {stat.icon}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Utilization</span>
                  <span className="font-semibold">{stat.percentage}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${stat.bgColor}`}
                    style={{
                      width: stat.percentage,
                      maxWidth: "100%",
                    }}
                  ></div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium ${stat.trendColor}`}>
                  {stat.trend}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-500">Status:</span>
                  <div className={`w-2 h-2 rounded-full ${stat.bgColor}`}></div>
                </div>
              </div>

              {/* Quick Action Button */}
              {/* <button className="w-full mt-3 py-2 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors">
                Lihat Detail →
              </button> */}
            </div>
          ))}
        </div>

        {/* Subnet Overview */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                Subnet Overview
              </h3>
              <p className="text-xs md:text-sm text-gray-600 mt-1 hidden md:block">
                Monitoring utilization across all network segments
              </p>
            </div>
            <button className="flex items-center gap-2 px-3 py-2 text-xs md:text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition">
              <Plus className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Add Subnet</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
            {subnetData.map((subnet, idx) => {
              const usagePercent = parseInt(subnet.usage);
              const getUsageColor = (percent) => {
                if (percent < 30) return "bg-green-500";
                if (percent < 70) return "bg-yellow-500";
                return "bg-red-500";
              };

              const getStatusColor = (percent) => {
                if (percent < 30)
                  return "text-green-600 bg-green-50 border-green-200";
                if (percent < 70)
                  return "text-yellow-600 bg-yellow-50 border-yellow-200";
                return "text-red-600 bg-red-50 border-red-200";
              };

              const availableIPs = subnet.total - subnet.used;
              const usageColor = getUsageColor(usagePercent);
              const statusColor = getStatusColor(usagePercent);

              return (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-lg md:rounded-xl p-3 md:p-5 border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${usageColor}`}
                        ></div>
                        <p className="font-mono font-bold text-gray-900 text-xs md:text-sm">
                          {subnet.subnet}
                        </p>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {subnet.description}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full border ${statusColor}`}
                    >
                      {subnet.usage}
                    </span>
                  </div>

                  <div className="space-y-2 md:space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-600">Utilization</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">
                          {subnet.used}/{subnet.total}
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2 md:h-3 overflow-hidden">
                      <div
                        className={`h-2 md:h-3 rounded-full ${usageColor} transition-all duration-1000 ease-out`}
                        style={{ width: subnet.usage }}
                      ></div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="text-center p-1 md:p-2 bg-green-50 rounded-lg border border-green-200">
                        <div className="font-bold text-green-700">
                          {availableIPs}
                        </div>
                        <div className="text-green-600">Available</div>
                      </div>
                      <div className="text-center p-1 md:p-2 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="font-bold text-blue-700">
                          {subnet.used}
                        </div>
                        <div className="text-blue-600">Used</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Search dan Filter */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-gray-100">
          <div className="flex flex-col gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
              <input
                type="text"
                placeholder="Cari berdasarkan IP, hostname, MAC address..."
                className="w-full pl-10 pr-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2 md:gap-3">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className="md:hidden flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm text-black"
              >
                <Filter className="w-4 h-4" />
                Filter
              </button>

              {/* Desktop Filters */}
              <div className="hidden md:flex gap-3">
                <select
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-black"
                  value={selectedSubnet}
                  onChange={(e) => setSelectedSubnet(e.target.value)}
                >
                  <option value="all">Semua Subnet</option>
                  {subnetData.map((subnet, idx) => (
                    <option key={idx} value={subnet.subnet}>
                      {subnet.subnet}
                    </option>
                  ))}
                </select>

                <select
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-black"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">Semua Status</option>
                  <option value="active">Aktif</option>
                  <option value="available">Tersedia</option>
                  <option value="reserved">Reserved</option>
                  <option value="conflict">Konflik</option>
                </select>
              </div>

              <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm text-black">
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabel IPAM */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="px-4 md:px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Daftar IP Address
              </h3>
              <span className="text-sm text-gray-500 hidden sm:block">
                Menampilkan {filteredData.length} dari {ipamData.length} IP
              </span>
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden p-4 space-y-3">
            {currentData.map((item) => (
              <MobileIPCard key={item.id} item={item} />
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hostname
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    User / Pengguna
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    MAC Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subnet
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Device Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lokasi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedIP(item)}
                        className="font-mono text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition"
                      >
                        {item.ip}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.hostname || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {item.assignedUser ? (
                          <>
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                              {item.assignedUser
                                .split("@")[0]
                                .charAt(0)
                                .toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-900">
                                {item.assignedUser.split("@")[0]}
                              </span>
                              <span className="text-xs text-gray-500 truncate max-w-[120px]">
                                {item.assignedUser}
                              </span>
                            </div>
                          </>
                        ) : item.owner ? (
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-900">
                              {item.owner}
                            </span>
                            <span className="text-xs text-gray-500">
                              Department
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-400 italic">
                              Unassigned
                            </span>
                            <span className="text-xs text-gray-400">
                              No user assigned
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-gray-600">
                        {item.mac || "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.subnet}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.deviceType || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.location || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedIP(item)}
                          className="p-2 text-gray-400 hover:text-blue-600 transition"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-green-600 transition"
                          title="Edit IP"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-red-600 transition"
                          title="Delete IP"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 md:px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">
                  Menampilkan halaman {currentPage} dari {totalPages}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm text-black border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm text-black border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Detail IP */}
      {selectedIP && (
        <IPDetailModal
          ipData={selectedIP}
          onClose={() => setSelectedIP(null)}
        />
      )}

      {/* Mobile Filter Modal */}
      {showMobileFilters && <MobileFilterModal />}

      <footer className="mt-7 mb-0 py-4 text-center text-black text-sm space-y-1">
        <p>Infradash Created by @Clinton Alfaro</p>
        <p>seatrium.com</p>
      </footer>
    </LayoutDashboard>
  );
}
