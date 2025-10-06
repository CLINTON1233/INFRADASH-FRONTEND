"use client";

import { useState, useEffect } from "react";
import LayoutDashboard from "../components/LayoutDashboard";
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
  Wifi,
  Users,
  Signal,
  Calendar,
  Clock,
  MapPin,
  Server,
  Activity,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Poppins } from "next/font/google";

// Inisialisasi font Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function WLCPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedWLC, setSelectedWLC] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Data WLC
  const wlcData = [
    {
      id: 1,
      name: "WLC-01",
      model: "Cisco 5508",
      ip: "192.168.1.10",
      status: "online",
      location: "Main Office Floor 2",
      owner: "IT Infrastructure",
      description: "Primary WLC - Production",
      clients: 156,
      accessPoints: 24,
      ssid: "OfficeWiFi, GuestWiFi, IoT-Network",
      bandwidth: "450 Mbps",
      uptime: "45 days 12:30:15",
      cpu: 45,
      memory: 62,
      lastSeen: "2024-01-15 14:30",
      firmware: "8.10.151.0",
      license: "Essential",
      capacity: 300,
      alerts: 2,
    },
    {
      id: 2,
      name: "WLC-02",
      model: "Cisco 3504",
      ip: "192.168.1.11",
      status: "offline",
      location: "Main Office Floor 1",
      owner: "IT Infrastructure",
      description: "Secondary WLC - Maintenance",
      clients: 0,
      accessPoints: 0,
      ssid: "OfficeWiFi",
      bandwidth: "0 Mbps",
      uptime: "0 days 00:00:00",
      cpu: 0,
      memory: 0,
      lastSeen: "2024-01-14 18:45",
      firmware: "8.10.151.0",
      license: "Essential",
      capacity: 150,
      alerts: 5,
    },
    {
      id: 3,
      name: "WLC-03",
      model: "Cisco 5520",
      ip: "192.168.2.10",
      status: "online",
      location: "Engineering Building",
      owner: "Engineering Team",
      description: "Engineering Department WLC",
      clients: 89,
      accessPoints: 18,
      ssid: "Eng-WiFi, Lab-Network",
      bandwidth: "280 Mbps",
      uptime: "30 days 08:15:22",
      cpu: 38,
      memory: 55,
      lastSeen: "2024-01-15 13:20",
      firmware: "8.10.151.0",
      license: "Advantage",
      capacity: 500,
      alerts: 0,
    },
    {
      id: 4,
      name: "WLC-04",
      model: "Cisco 3504",
      ip: "192.168.3.10",
      status: "online",
      location: "Server Room",
      owner: "Network Team",
      description: "Data Center WLC",
      clients: 42,
      accessPoints: 8,
      ssid: "DC-Staff, DC-Guest",
      bandwidth: "120 Mbps",
      uptime: "60 days 15:40:10",
      cpu: 28,
      memory: 45,
      lastSeen: "2024-01-15 12:15",
      firmware: "8.10.151.0",
      license: "Essential",
      capacity: 150,
      alerts: 1,
    },
    {
      id: 5,
      name: "WLC-05",
      model: "Cisco 5508",
      ip: "192.168.4.10",
      status: "standby",
      location: "DR Site",
      owner: "IT Infrastructure",
      description: "Disaster Recovery WLC",
      clients: 0,
      accessPoints: 12,
      ssid: "DR-WiFi",
      bandwidth: "0 Mbps",
      uptime: "90 days 20:10:05",
      cpu: 15,
      memory: 25,
      lastSeen: "2024-01-15 10:00",
      firmware: "8.10.151.0",
      license: "Essential",
      capacity: 300,
      alerts: 0,
    },
    {
      id: 6,
      name: "WLC-TestLab",
      model: "Cisco 3504",
      ip: "192.168.5.10",
      status: "online",
      location: "Testing Lab",
      owner: "QA Team",
      description: "Testing and Development",
      clients: 23,
      accessPoints: 6,
      ssid: "Test-WiFi, Dev-Network",
      bandwidth: "85 Mbps",
      uptime: "15 days 06:45:33",
      cpu: 52,
      memory: 68,
      lastSeen: "2024-01-15 11:30",
      firmware: "8.10.151.0",
      license: "Essential",
      capacity: 150,
      alerts: 3,
    },
  ];

  // Data untuk charts
  const clientTrendData = [
    { time: "00:00", clients: 45 },
    { time: "04:00", clients: 32 },
    { time: "08:00", clients: 156 },
    { time: "12:00", clients: 210 },
    { time: "16:00", clients: 189 },
    { time: "20:00", clients: 95 },
  ];

  const bandwidthData = [
    { name: "WLC-01", upload: 220, download: 230 },
    { name: "WLC-03", upload: 140, download: 140 },
    { name: "WLC-04", upload: 60, download: 60 },
    { name: "WLC-06", upload: 45, download: 40 },
  ];

  const statusData = [
    { name: "Online", value: 4, color: "#10B981" },
    { name: "Offline", value: 1, color: "#EF4444" },
    { name: "Standby", value: 1, color: "#6B7280" },
  ];

  // Filter data
  const filteredData = wlcData.filter((item) => {
    const matchesSearch =
      searchTerm === "" ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ip.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      selectedLocation === "all" || item.location === selectedLocation;
    const matchesStatus =
      selectedStatus === "all" || item.status === selectedStatus;

    return matchesSearch && matchesLocation && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Statistik
  const stats = {
    total: wlcData.length,
    online: wlcData.filter((item) => item.status === "online").length,
    offline: wlcData.filter((item) => item.status === "offline").length,
    standby: wlcData.filter((item) => item.status === "standby").length,
    totalClients: wlcData.reduce((sum, item) => sum + item.clients, 0),
    totalAPs: wlcData.reduce((sum, item) => sum + item.accessPoints, 0),
    totalBandwidth: wlcData.reduce((sum, item) => {
      const bw = parseInt(item.bandwidth) || 0;
      return sum + bw;
    }, 0),
  };

  // Status Badge Component
  const StatusBadge = ({ status }) => {
    const config = {
      online: {
        color: "bg-green-100 text-green-800",
        icon: <CheckCircle className="w-3 h-3" />,
        text: "Online",
      },
      offline: {
        color: "bg-red-100 text-red-800",
        icon: <XCircle className="w-3 h-3" />,
        text: "Offline",
      },
      standby: {
        color: "bg-yellow-100 text-yellow-800",
        icon: <Clock className="w-3 h-3" />,
        text: "Standby",
      },
    };

    const { color, icon, text } = config[status] || config.online;

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color} ${poppins.className}`}
      >
        {icon}
        {text}
      </span>
    );
  };

  // Modal Detail WLC
  const WLCDetailModal = ({ wlcData, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3
              className={`text-xl text-black font-semibold text-gray-900 ${poppins.className}`}
            >
              WLC Controller Details
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 text-black hover:text-gray-600"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4
                  className={`font-semibold text-gray-900 mb-3 ${poppins.className}`}
                >
                  Basic Information
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm text-black">
                  <div className={poppins.className}>
                    <label className="text-gray-500 text-black">
                      Controller Name
                    </label>
                    <p className="font-semibold">{wlcData.name}</p>
                  </div>
                  <div className={poppins.className}>
                    <label className="text-gray-500 text-black">Model</label>
                    <p className="font-semibold">{wlcData.model}</p>
                  </div>
                  <div className={poppins.className}>
                    <label className="text-gray-500 text-black">
                      IP Address
                    </label>
                    <p className="font-mono">{wlcData.ip}</p>
                  </div>
                  <div className={poppins.className}>
                    <label className="text-gray-500 text-black">Status</label>
                    <StatusBadge status={wlcData.status} />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 text-black">
                <h4
                  className={`font-semibold text-gray-900 mb-3 ${poppins.className}`}
                >
                  Location & Ownership
                </h4>
                <div className="space-y-2 text-sm">
                  <div
                    className={`flex items-center gap-2 ${poppins.className}`}
                  >
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{wlcData.location}</span>
                  </div>
                  <div
                    className={`flex items-center gap-2 ${poppins.className}`}
                  >
                    <Users className="w-4 h-4 text-gray-500" />
                    <span>{wlcData.owner}</span>
                  </div>
                  <div className={poppins.className}>
                    <label className="text-gray-500">Description</label>
                    <p>{wlcData.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 text-black">
                <h4
                  className={`font-semibold text-gray-900 mb-3 ${poppins.className}`}
                >
                  Performance Metrics
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className={poppins.className}>
                    <label className="text-gray-500">Connected Clients</label>
                    <p className="text-2xl font-bold text-blue-600">
                      {wlcData.clients}
                    </p>
                  </div>
                  <div className={poppins.className}>
                    <label className="text-gray-500">Access Points</label>
                    <p className="text-2xl font-bold text-green-600">
                      {wlcData.accessPoints}
                    </p>
                  </div>
                  <div className={poppins.className}>
                    <label className="text-gray-500">CPU Usage</label>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${wlcData.cpu}%` }}
                        ></div>
                      </div>
                      <span className="font-semibold">{wlcData.cpu}%</span>
                    </div>
                  </div>
                  <div className={poppins.className}>
                    <label className="text-gray-500">Memory Usage</label>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full transition-all"
                          style={{ width: `${wlcData.memory}%` }}
                        ></div>
                      </div>
                      <span className="font-semibold">{wlcData.memory}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 text-black">
                <h4
                  className={`font-semibold text-gray-900 mb-3 ${poppins.className}`}
                >
                  Network Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div
                    className={`flex items-center gap-2 ${poppins.className}`}
                  >
                    <Wifi className="w-4 h-4 text-gray-500" />
                    <span>SSID: {wlcData.ssid}</span>
                  </div>
                  <div
                    className={`flex items-center gap-2 ${poppins.className}`}
                  >
                    <Signal className="w-4 h-4 text-gray-500" />
                    <span>Bandwidth: {wlcData.bandwidth}</span>
                  </div>
                  <div
                    className={`flex items-center gap-2 ${poppins.className}`}
                  >
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>Uptime: {wlcData.uptime}</span>
                  </div>
                  <div className={poppins.className}>
                    <label className="text-gray-500">Firmware</label>
                    <p>{wlcData.firmware}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={onClose}
              className={`px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition ${poppins.className}`}
            >
              Tutup
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 ${poppins.className}`}
            >
              <Edit className="w-4 h-4" />
              Edit WLC
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <LayoutDashboard activeMenu={2}>
      <div className={`${poppins.className} space-y-6`}>
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
              Wireless LAN Controller (WLC)
            </h1>
            <p className="text-gray-600 text-sm">
              Monitor and manage all wireless controllers and access points
            </p>
          </div>
          <div className="flex gap-3 mt-4 lg:mt-0">
            <button
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition ${poppins.className}`}
            >
              <Download className="w-4 h-4" />
              Export Report
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition ${poppins.className}`}
            >
              <Plus className="w-4 h-4" />
              Add WLC
            </button>
          </div>
        </div>

        {/* Alert Notification */}
        {/* {wlcData.filter((wlc) => wlc.status === "offline").length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
            <div className="flex-1">
              <p
                className={`text-sm font-medium text-red-800 ${poppins.className}`}
              >
                {wlcData.filter((wlc) => wlc.status === "offline").length} WLC
                Controller Offline
              </p>
              <p className={`text-sm text-red-600 ${poppins.className}`}>
                Immediate attention required for offline controllers
              </p>
            </div>
            <button
              className={`text-red-600 hover:text-red-800 text-sm font-medium ${poppins.className}`}
            >
              View Details
            </button>
          </div>
        )} */}

        {/* Statistik */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Total WLC",
              value: stats.total,
              color: "bg-blue-50 text-blue-600 border-blue-200",
              icon: <Server className="w-5 h-5" />,
              description: "Controllers",
            },
            {
              label: "Online",
              value: stats.online,
              color: "bg-green-50 text-green-600 border-green-200",
              icon: <CheckCircle className="w-5 h-5" />,
              description: "Active controllers",
            },
            {
              label: "Total Clients",
              value: stats.totalClients,
              color: "bg-purple-50 text-purple-600 border-purple-200",
              icon: <Users className="w-5 h-5" />,
              description: "Connected devices",
            },
            {
              label: "Access Points",
              value: stats.totalAPs,
              color: "bg-orange-50 text-orange-600 border-orange-200",
              icon: <Wifi className="w-5 h-5" />,
              description: "Managed APs",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p
                    className={`text-2xl font-bold text-gray-900 mb-1 ${poppins.className}`}
                  >
                    {stat.value}
                  </p>
                  <p
                    className={`text-sm font-semibold text-gray-700 ${poppins.className}`}
                  >
                    {stat.label}
                  </p>
                  <p
                    className={`text-xs text-gray-500 mt-1 ${poppins.className}`}
                  >
                    {stat.description}
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${stat.color} border`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Status Distribution */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3
              className={`text-lg font-semibold text-gray-900 mb-4 ${poppins.className}`}
            >
              Controller Status
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Client Trend */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3
              className={`text-lg font-semibold text-gray-900 mb-4 ${poppins.className}`}
            >
              Client Trend (24h)
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={clientTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="clients"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bandwidth Usage */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3
              className={`text-lg font-semibold text-gray-900 mb-4 ${poppins.className}`}
            >
              Bandwidth Usage
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bandwidthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="upload" name="Upload (Mbps)" fill="#8B5CF6" />
                  <Bar
                    dataKey="download"
                    name="Download (Mbps)"
                    fill="#10B981"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Search dan Filter */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
              <input
                type="text"
                placeholder="Cari berdasarkan nama WLC, IP, atau lokasi..."
                className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${poppins.className}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex gap-3">
              <select
                className={`px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${poppins.className}`}
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="all">Semua Lokasi</option>
                <option value="Main Office Floor 2">Main Office Floor 2</option>
                <option value="Main Office Floor 1">Main Office Floor 1</option>
                <option value="Engineering Building">
                  Engineering Building
                </option>
                <option value="Server Room">Server Room</option>
                <option value="DR Site">DR Site</option>
                <option value="Testing Lab">Testing Lab</option>
              </select>

              <select
                className={`px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${poppins.className}`}
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">Semua Status</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="standby">Standby</option>
              </select>

              <button
                className={`px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2 text-sm ${poppins.className}`}
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Tabel WLC */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <div>
                <h3
                  className={`text-lg font-semibold text-gray-900 ${poppins.className}`}
                >
                  Wireless Controllers
                </h3>
                <p
                  className={`text-sm text-gray-600 mt-1 ${poppins.className}`}
                >
                  Real-time monitoring and management
                </p>
              </div>
              <span
                className={`text-sm text-gray-500 bg-white px-3 py-1 rounded-full border ${poppins.className}`}
              >
                {filteredData.length} dari {wlcData.length} Controllers
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th
                    className={`px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${poppins.className}`}
                  >
                    Controller
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${poppins.className}`}
                  >
                    Status
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${poppins.className}`}
                  >
                    Clients
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${poppins.className}`}
                  >
                    Access Points
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${poppins.className}`}
                  >
                    Bandwidth
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${poppins.className}`}
                  >
                    CPU/Memory
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${poppins.className}`}
                  >
                    Location
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${poppins.className}`}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentData.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-blue-50/30 transition-all duration-200 group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            item.status === "online"
                              ? "bg-green-500"
                              : item.status === "offline"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                          }`}
                        ></div>
                        <div className="flex flex-col">
                          <button
                            onClick={() => setSelectedWLC(item)}
                            className={`text-sm font-semibold text-gray-900 hover:text-blue-700 transition-colors text-left group-hover:underline ${poppins.className}`}
                          >
                            {item.name}
                          </button>
                          <div
                            className={`flex items-center gap-2 text-xs text-gray-500 ${poppins.className}`}
                          >
                            <span className="font-mono">{item.ip}</span>
                            <span>•</span>
                            <span>{item.model}</span>
                          </div>
                          <span
                            className={`text-xs text-gray-400 ${poppins.className}`}
                          >
                            {item.ssid.split(",")[0]}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={item.status} />
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span
                          className={`text-sm font-semibold text-gray-900 ${poppins.className}`}
                        >
                          {item.clients}
                        </span>
                        <span
                          className={`text-xs text-gray-500 ${poppins.className}`}
                        >
                          of {item.capacity}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Wifi className="w-4 h-4 text-gray-400" />
                        <span
                          className={`text-sm font-semibold text-gray-900 ${poppins.className}`}
                        >
                          {item.accessPoints}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span
                          className={`text-sm font-semibold text-gray-900 ${poppins.className}`}
                        >
                          {item.bandwidth}
                        </span>
                        <span
                          className={`text-xs text-gray-500 ${poppins.className}`}
                        >
                          {item.status === "online" ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div
                          className={`flex items-center gap-2 ${poppins.className}`}
                        >
                          <Activity className="w-3 h-3 text-blue-500" />
                          <span className="text-xs text-black">
                            CPU: {item.cpu}%
                          </span>
                        </div>
                        <div
                          className={`flex items-center gap-2 ${poppins.className}`}
                        >
                          <Server className="w-3 h-3 text-purple-500" />
                          <span className="text-xs text-black">
                            RAM: {item.memory}%
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span
                          className={`text-sm text-gray-900 ${poppins.className}`}
                        >
                          {item.location}
                        </span>
                        <span
                          className={`text-xs text-gray-500 ${poppins.className}`}
                        >
                          {item.owner}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setSelectedWLC(item)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                          title="Edit WLC"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                          title="Delete WLC"
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
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <p className={`text-sm text-gray-700 ${poppins.className}`}>
                  Menampilkan{" "}
                  <span className="font-semibold">
                    {(currentPage - 1) * itemsPerPage + 1}-
                    {Math.min(currentPage * itemsPerPage, filteredData.length)}
                  </span>{" "}
                  dari{" "}
                  <span className="font-semibold">{filteredData.length}</span>{" "}
                  Controllers
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${poppins.className}`}
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${poppins.className}`}
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Detail WLC */}
      {selectedWLC && (
        <WLCDetailModal
          wlcData={selectedWLC}
          onClose={() => setSelectedWLC(null)}
        />
      )}

      <footer
        className={`mt-7 py-4 text-center text-black text-sm space-y-1 ${poppins.className}`}
      >
        <p>Infradash Created by @Clinton Alfaro</p>
        <p>seatrium.com</p>
      </footer>
    </LayoutDashboard>
  );
}
