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
  Server,
  Cpu,
  MemoryStick,
  HardDrive,
  PlayCircle,
  StopCircle,
  AlertCircle,
  Users,
  Activity,
  BarChart3,
  User,
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

export default function VMwarePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedHost, setSelectedHost] = useState(null);
  const [selectedVM, setSelectedVM] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const itemsPerPage = 8;

  // Check mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Data VMware Hosts
  const vmwareData = [
    {
      id: 1,
      name: "vCenter-01",
      ip: "192.168.1.20",
      status: "online",
      location: "Server Room ",
      owner: "IT Infrastructure",
      description: "Primary vCenter Server",
      cluster: "Production-Cluster",
      cpu: {
        usage: 65,
        cores: 32,
        speed: "2.6GHz",
      },
      memory: {
        usage: 72,
        total: 256,
        used: 184,
      },
      storage: {
        usage: 80,
        total: 4000,
        used: 3200,
      },
      vms: {
        total: 12,
        running: 11,
        stopped: 1,
        error: 0,
      },
      lastSeen: "2024-01-15 14:30",
      version: "7.0.3",
      alerts: 2,
      virtualMachines: [
        {
          id: 1,
          name: "WEB-SRV-01",
          status: "running",
          cpu: 15,
          memory: 8,
          storage: 100,
        },
        {
          id: 2,
          name: "DB-SRV-01",
          status: "running",
          cpu: 45,
          memory: 32,
          storage: 500,
        },
        {
          id: 3,
          name: "APP-SRV-01",
          status: "running",
          cpu: 25,
          memory: 16,
          storage: 200,
        },
        {
          id: 4,
          name: "FILE-SRV-01",
          status: "running",
          cpu: 10,
          memory: 8,
          storage: 1000,
        },
        {
          id: 5,
          name: "BACKUP-SRV-01",
          status: "stopped",
          cpu: 0,
          memory: 0,
          storage: 200,
        },
        {
          id: 6,
          name: "TEST-SRV-01",
          status: "running",
          cpu: 8,
          memory: 4,
          storage: 50,
        },
      ],
    },
    {
      id: 2,
      name: "vCenter-02",
      ip: "192.168.1.21",
      status: "online",
      location: "Server Room ",
      owner: "Engineering Team",
      description: "Engineering vCenter",
      cluster: "Engineering-Cluster",
      cpu: {
        usage: 45,
        cores: 24,
        speed: "2.4GHz",
      },
      memory: {
        usage: 60,
        total: 128,
        used: 77,
      },
      storage: {
        usage: 55,
        total: 2000,
        used: 1100,
      },
      vms: {
        total: 8,
        running: 8,
        stopped: 0,
        error: 0,
      },
      lastSeen: "2024-01-15 13:20",
      version: "7.0.3",
      alerts: 0,
      virtualMachines: [
        {
          id: 1,
          name: "DEV-SRV-01",
          status: "running",
          cpu: 20,
          memory: 8,
          storage: 100,
        },
        {
          id: 2,
          name: "DEV-SRV-02",
          status: "running",
          cpu: 15,
          memory: 4,
          storage: 50,
        },
        {
          id: 3,
          name: "TEST-SRV-02",
          status: "running",
          cpu: 10,
          memory: 4,
          storage: 50,
        },
      ],
    },
    {
      id: 3,
      name: "vCenter-Backup",
      ip: "192.168.1.22",
      status: "maintenance",
      location: "Site Office 2",
      owner: "IT Infrastructure",
      description: "Backup and DR vCenter",
      cluster: "DR-Cluster",
      cpu: {
        usage: 30,
        cores: 16,
        speed: "2.2GHz",
      },
      memory: {
        usage: 40,
        total: 64,
        used: 26,
      },
      storage: {
        usage: 90,
        total: 1000,
        used: 900,
      },
      vms: {
        total: 3,
        running: 0,
        stopped: 3,
        error: 0,
      },
      lastSeen: "2024-01-15 10:00",
      version: "7.0.2",
      alerts: 1,
      virtualMachines: [
        {
          id: 1,
          name: "DR-WEB-01",
          status: "stopped",
          cpu: 0,
          memory: 0,
          storage: 100,
        },
        {
          id: 2,
          name: "DR-DB-01",
          status: "stopped",
          cpu: 0,
          memory: 0,
          storage: 200,
        },
        {
          id: 3,
          name: "DR-APP-01",
          status: "stopped",
          cpu: 0,
          memory: 0,
          storage: 150,
        },
      ],
    },
    {
      id: 4,
      name: "vCenter-TestLab",
      ip: "192.168.1.23",
      status: "online",
      location: "Wrokshop 1",
      owner: "QA Team",
      description: "Testing and Development",
      cluster: "Test-Cluster",
      cpu: {
        usage: 52,
        cores: 16,
        speed: "2.4GHz",
      },
      memory: {
        usage: 68,
        total: 96,
        used: 65,
      },
      storage: {
        usage: 45,
        total: 1500,
        used: 675,
      },
      vms: {
        total: 6,
        running: 5,
        stopped: 1,
        error: 0,
      },
      lastSeen: "2024-01-15 11:30",
      version: "7.0.3",
      alerts: 3,
      virtualMachines: [
        {
          id: 1,
          name: "QA-TEST-01",
          status: "running",
          cpu: 12,
          memory: 4,
          storage: 50,
        },
        {
          id: 2,
          name: "QA-TEST-02",
          status: "running",
          cpu: 18,
          memory: 8,
          storage: 80,
        },
        {
          id: 3,
          name: "PERF-TEST-01",
          status: "running",
          cpu: 22,
          memory: 16,
          storage: 100,
        },
      ],
    },
    {
      id: 5,
      name: "vCenter-Legacy",
      ip: "192.168.1.24",
      status: "offline",
      location: "Server Room ",
      owner: "IT Infrastructure",
      description: "Legacy Systems",
      cluster: "Legacy-Cluster",
      cpu: {
        usage: 0,
        cores: 8,
        speed: "2.0GHz",
      },
      memory: {
        usage: 0,
        total: 32,
        used: 0,
      },
      storage: {
        usage: 0,
        total: 500,
        used: 0,
      },
      vms: {
        total: 2,
        running: 0,
        stopped: 2,
        error: 0,
      },
      lastSeen: "2024-01-14 18:45",
      version: "6.7",
      alerts: 5,
      virtualMachines: [
        {
          id: 1,
          name: "LEGACY-APP-01",
          status: "stopped",
          cpu: 0,
          memory: 0,
          storage: 50,
        },
        {
          id: 2,
          name: "LEGACY-DB-01",
          status: "stopped",
          cpu: 0,
          memory: 0,
          storage: 80,
        },
      ],
    },
  ];

  // Data untuk charts
  const resourceUsageData = [
    { name: "vCenter-01", cpu: 65, memory: 72, storage: 80 },
    { name: "vCenter-02", cpu: 45, memory: 60, storage: 55 },
    { name: "vCenter-Backup", cpu: 30, memory: 40, storage: 90 },
    { name: "vCenter-TestLab", cpu: 52, memory: 68, storage: 45 },
  ];

  const vmStatusData = [
    { name: "Running", value: 24, color: "#10B981" },
    { name: "Stopped", value: 7, color: "#6B7280" },
    { name: "Error", value: 0, color: "#EF4444" },
  ];

  const clusterUsageData = [
    { name: "Production", cpu: 65, memory: 72, storage: 80 },
    { name: "Engineering", cpu: 45, memory: 60, storage: 55 },
    { name: "DR", cpu: 30, memory: 40, storage: 90 },
    { name: "Test", cpu: 52, memory: 68, storage: 45 },
  ];

  // Filter data
  const filteredData = vmwareData.filter((item) => {
    const matchesSearch =
      searchTerm === "" ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assignedUser.toLowerCase().includes(searchTerm.toLowerCase());

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
    total: vmwareData.length,
    online: vmwareData.filter((item) => item.status === "online").length,
    offline: vmwareData.filter((item) => item.status === "offline").length,
    maintenance: vmwareData.filter((item) => item.status === "maintenance")
      .length,
    totalVMs: vmwareData.reduce((sum, item) => sum + item.vms.total, 0),
    runningVMs: vmwareData.reduce((sum, item) => sum + item.vms.running, 0),
    totalCPU: vmwareData.reduce((sum, item) => sum + item.cpu.cores, 0),
    totalMemory: vmwareData.reduce((sum, item) => sum + item.memory.total, 0),
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
      maintenance: {
        color: "bg-yellow-100 text-yellow-800",
        icon: <AlertTriangle className="w-3 h-3" />,
        text: "Maintenance",
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

  // Mobile Card View
  const MobileHostCard = ({ item }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div
              className={`w-3 h-3 rounded-full ${
                item.status === "online"
                  ? "bg-green-500"
                  : item.status === "offline"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              }`}
            />
            <h3 className={`font-semibold text-gray-900 ${poppins.className}`}>
              {item.name}
            </h3>
          </div>
          <p className={`text-sm text-gray-600 ${poppins.className}`}>
            {item.ip} • {item.cluster}
          </p>
        </div>
        <StatusBadge status={item.status} />
      </div>

      {/* User Information */}
      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
        {item.assignedUser
          ? item.assignedUser.split("@")[0].charAt(0).toUpperCase()
          : item.owner
          ? item.owner.charAt(0).toUpperCase()
          : "-"}
      </div>
      <div className="flex flex-col">
        <span
          className={`text-sm font-medium text-gray-900 ${poppins.className}`}
        >
          {item.assignedUser
            ? item.assignedUser.split("@")[0]
            : item.owner
            ? item.owner
            : "-"}
        </span>
        <span
          className={`text-xs text-gray-500 truncate max-w-[120px] ${poppins.className}`}
        >
          {item.assignedUser ? item.assignedUser : ""}
        </span>
      </div>

      {/* Resource Usage */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Cpu className="w-3 h-3 text-blue-500" />
            <span className={`text-xs font-semibold ${poppins.className}`}>
              {item.cpu.usage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-blue-600 h-1.5 rounded-full"
              style={{ width: `${item.cpu.usage}%` }}
            />
          </div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <MemoryStick className="w-3 h-3 text-purple-500" />
            <span className={`text-xs font-semibold ${poppins.className}`}>
              {item.memory.usage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-purple-600 h-1.5 rounded-full"
              style={{ width: `${item.memory.usage}%` }}
            />
          </div>
        </div>
      </div>

      {/* VMs Info */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-green-500" />
          <span className={`text-sm ${poppins.className}`}>
            {item.vms.running}/{item.vms.total} VMs
          </span>
        </div>
        <span className={`text-xs text-gray-500 ${poppins.className}`}>
          {item.location}
        </span>
      </div>

      {/* Actions */}
      <div className="flex justify-between pt-3 border-t border-gray-200">
        <button
          onClick={() => setSelectedHost(item)}
          className="flex items-center gap-1 text-blue-600 text-sm font-medium"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <Eye className="w-4 h-4" />
          Details
        </button>
        <div className="flex gap-2">
          <button 
            className="p-1 text-gray-400 hover:text-green-600"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Edit className="w-4 h-4" />
          </button>
          <button 
            className="p-1 text-gray-400 hover:text-red-600"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  // Modal Detail VMware Host - Bootstrap Style
  const VMwareDetailModal = ({ hostData, onClose }) => (
    <>
      {/* Modal Backdrop */}
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
        aria-labelledby="vmwareModalLabel"
        aria-hidden="true"
      >
        <div 
          className="modal-dialog modal-lg" 
          role="document"
          style={{
            maxWidth: '800px',
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
                id="vmwareModalLabel"
                style={{
                  marginBottom: 0,
                  lineHeight: '1.5',
                  fontSize: '1.25rem',
                  fontWeight: '500'
                }}
              >
                VMware Host Details
              </h5>
              <button 
                type="button" 
                className="close" 
                onClick={onClose}
                aria-label="Close"
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
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      Host Name
                    </label>
                    <p className="text-sm font-semibold text-gray-900">
                      {hostData.name}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      IP Address
                    </label>
                    <p className="text-sm font-mono text-gray-900">
                      {hostData.ip}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      Cluster
                    </label>
                    <p className="text-sm text-gray-900">
                      {hostData.cluster}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      Status
                    </label>
                    <div className="mt-1">
                      <StatusBadge status={hostData.status} />
                    </div>
                  </div>
                </div>

                {/* Location & Ownership */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      Location
                    </label>
                    <p className="text-sm text-gray-900">
                      {hostData.location}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      Owner
                    </label>
                    <p className="text-sm text-gray-900">
                      {hostData.owner}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-medium text-gray-500">
                      Description
                    </label>
                    <p className="text-sm text-gray-900">
                      {hostData.description}
                    </p>
                  </div>
                </div>

                {/* Resource Usage */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      CPU Usage
                    </label>
                    <p className="text-lg font-bold text-blue-600">
                      {hostData.cpu.usage}%
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${hostData.cpu.usage}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {hostData.cpu.cores} cores @ {hostData.cpu.speed}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      Memory Usage
                    </label>
                    <p className="text-lg font-bold text-purple-600">
                      {hostData.memory.usage}%
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full transition-all"
                          style={{ width: `${hostData.memory.usage}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {hostData.memory.used}GB / {hostData.memory.total}GB
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      Storage Usage
                    </label>
                    <p className="text-lg font-bold text-green-600">
                      {hostData.storage.usage}%
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all"
                          style={{ width: `${hostData.storage.usage}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {hostData.storage.used}GB / {hostData.storage.total}GB
                    </p>
                  </div>
                </div>

                {/* Virtual Machines */}
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-2 block text-black">
                    Virtual Machines
                  </label>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {hostData.vms.total}
                        </p>
                        <p className="text-xs text-gray-500">Total VMs</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">
                          {hostData.vms.running}
                        </p>
                        <p className="text-xs text-gray-500">Running</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-600">
                          {hostData.vms.stopped}
                        </p>
                        <p className="text-xs text-gray-500">Stopped</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-red-600">
                          {hostData.vms.error}
                        </p>
                        <p className="text-xs text-gray-500">Error</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* System Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      vCenter Version
                    </label>
                    <p className="text-sm text-gray-900">
                      {hostData.version}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      Last Seen
                    </label>
                    <p className="text-sm text-gray-900">
                      {hostData.lastSeen}
                    </p>
                  </div>
                </div>

                {/* VM List */}
                {hostData.virtualMachines && hostData.virtualMachines.length > 0 && (
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-2 block">
                      Virtual Machine Details
                    </label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {hostData.virtualMachines.map((vm) => (
                        <div key={vm.id} className="flex justify-between items-center p-2 bg-white border border-gray-200 rounded">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              vm.status === 'running' ? 'bg-green-500' : 'bg-gray-400'
                            }`} />
                            <span className="text-sm font-medium text-black">{vm.name}</span>
                          </div>
                          <div className="flex gap-4 text-xs  text-black">
                            <span>CPU: {vm.cpu}%</span>
                            <span>RAM: {vm.memory}GB</span>
                            <span>Storage: {vm.storage}GB</span>
                          </div>
                        </div>
                      ))}
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
                onClick={onClose}
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
  );

  return (
    <LayoutDashboard activeMenu={3}>
      <div className={`${poppins.className} space-y-6`}>
        {selectedHost && (
          <VMwareDetailModal hostData={selectedHost} onClose={() => setSelectedHost(null)} />
        )}
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
              VMware Virtualization
            </h1>
            <p className="text-gray-600 text-sm">
              Monitor and manage VMware hosts and virtual machines
            </p>
          </div>
          <div className="flex gap-3 mt-4 lg:mt-0">
            <button
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition ${poppins.className}`}
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition ${poppins.className}`}
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Host</span>
            </button>
          </div>
        </div>
        {/* Statistik */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Total Hosts",
              value: stats.total,
              color: "bg-blue-50 text-blue-600 border-blue-200",
              icon: <Server className="w-5 h-5" />,
              description: "VMware Hosts",
              bgColor: "bg-blue-500",
              percentage: "100%",
              trend: `${stats.online} online`,
              trendColor: "text-green-600",
              additionalInfo: `${stats.offline} offline, ${stats.maintenance} maintenance`,
              progress: Math.round((stats.online / stats.total) * 100),
            },
            {
              label: "Total VMs",
              value: stats.totalVMs,
              color: "bg-purple-50 text-purple-600 border-purple-200",
              icon: <Activity className="w-5 h-5" />,
              description: "Virtual Machines",
              bgColor: "bg-purple-500",
              percentage: `${Math.round(
                (stats.runningVMs / stats.totalVMs) * 100
              )}% running`,
              trend: `${stats.runningVMs} active`,
              trendColor: "text-green-600",
              additionalInfo: `${stats.totalVMs - stats.runningVMs} stopped`,
              progress: Math.round((stats.runningVMs / stats.totalVMs) * 100),
            },
            {
              label: "CPU Cores",
              value: stats.totalCPU,
              color: "bg-orange-50 text-orange-600 border-orange-200",
              icon: <Cpu className="w-5 h-5" />,
              description: "Total CPU Cores",
              bgColor: "bg-orange-500",
              percentage: "Available",
              trend: "High performance",
              trendColor: "text-orange-600",
              additionalInfo: "Distributed across hosts",
              progress: 65,
            },
            {
              label: "Total Memory",
              value: `${stats.totalMemory} GB`,
              color: "bg-green-50 text-green-600 border-green-200",
              icon: <MemoryStick className="w-5 h-5" />,
              description: "System Memory",
              bgColor: "bg-green-500",
              percentage: "Allocated",
              trend: "Adequate capacity",
              trendColor: "text-green-600",
              additionalInfo: "For virtualization",
              progress: 70,
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden"
            >
              {/* Background Gradient Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p
                      className={`text-3xl font-bold text-gray-900 mb-2 ${poppins.className}`}
                    >
                      {stat.value}
                    </p>
                    <div className="flex items-center gap-2 mb-1">
                      <p
                        className={`text-sm font-semibold text-gray-700 ${poppins.className}`}
                      >
                        {stat.label}
                      </p>
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded-full ${
                          stat.trendColor
                        } bg-opacity-10 ${stat.trendColor.replace(
                          "text",
                          "bg"
                        )}`}
                      >
                        {stat.percentage}
                      </span>
                    </div>
                    <p
                      className={`text-xs text-gray-500 mb-3 ${poppins.className}`}
                    >
                      {stat.description}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-xl ${stat.color} border group-hover:scale-110 transition-transform duration-300`}
                  >
                    {stat.icon}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-gray-600">Utilization</span>
                    <span className="font-semibold text-gray-900">
                      {stat.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ease-out ${stat.bgColor}`}
                      style={{ width: `${stat.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-medium ${stat.trendColor} ${poppins.className}`}
                    >
                      {stat.trend}
                    </span>
                    <div className="flex items-center gap-1">
                      <div
                        className={`w-2 h-2 rounded-full ${stat.bgColor}`}
                      ></div>
                      <span className="text-xs text-gray-500">Live</span>
                    </div>
                  </div>

                  <div
                    className={`text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-lg border ${poppins.className}`}
                  >
                    {stat.additionalInfo}
                  </div>
                </div>

                {/* Quick Action Button */}
                {/* <button className="w-full mt-3 py-2 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors group-hover:border-blue-300 group-hover:text-blue-600 flex items-center justify-center gap-1">
                  <span>View Details</span>
                  <svg
                    className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg> */}
                {/* </button> */}
              </div>

              {/* Corner Accent */}
              <div
                className={`absolute top-0 right-0 w-12 h-12 ${stat.bgColor} opacity-5 rounded-bl-2xl`}
              ></div>
            </div>
          ))}
        </div>

        {/* Charts Section - Hide on mobile, show on desktop */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Resource Usage */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3
              className={`text-lg font-semibold text-gray-900 mb-4 ${poppins.className}`}
            >
              Resource Usage
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resourceUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="cpu" name="CPU %" fill="#3B82F6" />
                  <Bar dataKey="memory" name="Memory %" fill="#8B5CF6" />
                  <Bar dataKey="storage" name="Storage %" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* VM Status Distribution */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3
              className={`text-lg font-semibold text-gray-900 mb-4 ${poppins.className}`}
            >
              VM Status
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vmStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {vmStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Cluster Usage */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3
              className={`text-lg font-semibold text-gray-900 mb-4 ${poppins.className}`}
            >
              Cluster Usage
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={clusterUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="cpu" name="CPU %" fill="#3B82F6" />
                  <Bar dataKey="memory" name="Memory %" fill="#8B5CF6" />
                  <Bar dataKey="storage" name="Storage %" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Search dan Filter - Mobile Optimized */}
        <div className="bg-white rounded-2xl shadow-md p-4 lg:p-6 border border-gray-100 text-black">
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-black" />
              <input
                type="text"
                placeholder="Cari host, IP, user..."
                className={`w-full pl-10 pr-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${poppins.className}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters - Stack on mobile */}
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-3 text-black">
              <select
                className={`px-3 py-2 lg:px-4 lg:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${poppins.className}`}
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="all">Semua Lokasi</option>
                <option value="Server Room A">Server Room A</option>
                <option value="Server Room B">Server Room B</option>
                <option value="DR Site">DR Site</option>
                <option value="Testing Lab">Testing Lab</option>
              </select>

              <select
                className={`px-3 py-2 lg:px-4 lg:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${poppins.className}`}
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">Semua Status</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="maintenance">Maintenance</option>
              </select>

              <button
                className={`px-3 py-2 lg:px-4 lg:py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2 text-sm ${poppins.className}`}
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden lg:inline">Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabel untuk Desktop / Cards untuk Mobile */}
        {!isMobile ? (
          /* Desktop Table View */
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-4 lg:px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3
                    className={`text-lg font-semibold text-gray-900 ${poppins.className}`}
                  >
                    VMware Hosts
                  </h3>
                  <p
                    className={`text-sm text-gray-600 mt-1 ${poppins.className}`}
                  >
                    Real-time monitoring of virtualization infrastructure
                  </p>
                </div>
                <span
                  className={`text-sm text-gray-500 bg-white px-3 py-1 rounded-full border ${poppins.className}`}
                >
                  {filteredData.length} dari {vmwareData.length} Hosts
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 text-black">
                    <th
                      className={`px-4 lg:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${poppins.className}`}
                    >
                      Host
                    </th>
                    <th
                      className={`px-4 lg:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${poppins.className}`}
                    >
                      User
                    </th>
                    <th
                      className={`px-4 lg:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${poppins.className}`}
                    >
                      Status
                    </th>
                    <th
                      className={`px-4 lg:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${poppins.className}`}
                    >
                      VMs
                    </th>
                    <th
                      className={`px-4 lg:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${poppins.className}`}
                    >
                      CPU
                    </th>
                    <th
                      className={`px-4 lg:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${poppins.className}`}
                    >
                      Memory
                    </th>
                    <th
                      className={`px-4 lg:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${poppins.className}`}
                    >
                      Location
                    </th>
                    <th
                      className={`px-4 lg:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${poppins.className}`}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-black ">
                  {currentData.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-blue-50/30 transition-all duration-200 group"
                    >
                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <button
                              onClick={() => setSelectedHost(item)}
                              className={`text-sm font-semibold text-gray-900 hover:text-blue-700 transition-colors text-left group-hover:underline ${poppins.className}`}
                            >
                              {item.name}
                            </button>
                            <div
                              className={`flex items-center gap-2 text-xs text-gray-500 ${poppins.className}`}
                            >
                              <span className="font-mono">{item.ip}</span>
                              <span>•</span>
                              <span>{item.cluster}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Kolom User Baru */}
                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                            {item.assignedUser
                              ? item.assignedUser
                                  .split("@")[0]
                                  .charAt(0)
                                  .toUpperCase()
                              : item.owner
                              ? item.owner.charAt(0).toUpperCase()
                              : "-"}
                          </div>
                          <div className="flex flex-col">
                            <span
                              className={`text-sm font-medium text-gray-900 ${poppins.className}`}
                            >
                              {item.assignedUser
                                ? item.assignedUser
                                    .split("@")[0]
                                    .charAt(0)
                                    .toUpperCase()
                                : item.owner
                                ? item.owner.charAt(0).toUpperCase()
                                : "-"}
                            </span>
                            <span
                              className={`text-xs text-gray-500 truncate max-w-[120px] ${poppins.className}`}
                            >
                              {item.assignedUser ? item.assignedUser : ""}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 lg:px-6 py-4">
                        <StatusBadge status={item.status} />
                      </td>

                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-green-500" />
                          <span
                            className={`text-sm font-semibold text-gray-900 ${poppins.className}`}
                          >
                            {item.vms.running}/{item.vms.total}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-semibold ${poppins.className}`}
                          >
                            {item.cpu.usage}%
                          </span>
                        </div>
                      </td>

                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-semibold ${poppins.className}`}
                          >
                            {item.memory.usage}%
                          </span>
                        </div>
                      </td>

                      <td className="px-4 lg:px-6 py-4">
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

                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setSelectedHost(item)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                            title="View Details"
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                            title="Edit Host"
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                            title="Delete Host"
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer'
                            }}
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
              <div className="px-4 lg:px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
                  <p className={`text-sm text-gray-700 ${poppins.className}`}>
                    Menampilkan{" "}
                    <span className="font-semibold">
                      {(currentPage - 1) * itemsPerPage + 1}-
                      {Math.min(
                        currentPage * itemsPerPage,
                        filteredData.length
                      )}
                    </span>{" "}
                    dari{" "}
                    <span className="font-semibold">{filteredData.length}</span>{" "}
                    Hosts
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className={`px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${poppins.className}`}
                    >
                      ← Prev
                    </button>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className={`px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${poppins.className}`}
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Mobile Card View */
          <div className="space-y-3">
            {currentData.map((item) => (
              <MobileHostCard key={item.id} item={item} />
            ))}

            {/* Mobile Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 ${poppins.className}`}
                >
                  Previous
                </button>
                <span className={`text-sm text-gray-600 ${poppins.className}`}>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 ${poppins.className}`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <footer
        className={`mt-7 py-4 text-center text-black text-sm space-y-1 ${poppins.className}`}
      >
        <p>Infradash Created by @Clinton Alfaro</p>
        <p>seatrium.com</p>
      </footer>
    </LayoutDashboard>
  );
}
