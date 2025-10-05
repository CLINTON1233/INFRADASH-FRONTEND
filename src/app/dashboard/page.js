"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Menu,
  Bell,
  Search,
  Star,
  LayoutDashboard,
  FolderOpen,
  ShoppingCart,
  User,
  FileText,
  Users,
  CreditCard,
  Briefcase,
  BookOpen,
  Share2,
} from "lucide-react";

// Data untuk charts
const lineChartData = [
  { month: "Jan", thisYear: 15000, lastYear: 12000 },
  { month: "Feb", thisYear: 18000, lastYear: 14000 },
  { month: "Mar", thisYear: 22000, lastYear: 18000 },
  { month: "Apr", thisYear: 28000, lastYear: 22000 },
  { month: "May", thisYear: 25000, lastYear: 24000 },
  { month: "Jun", thisYear: 27000, lastYear: 26000 },
  { month: "Jul", thisYear: 29000, lastYear: 27000 },
];

const barChartData = [
  { device: "Linux", value: 20000 },
  { device: "Mac", value: 28000 },
  { device: "iOS", value: 25000 },
  { device: "Windows", value: 32000 },
  { device: "Android", value: 15000 },
  { device: "Other", value: 22000 },
];

const pieChartData = [
  { name: "United States", value: 52.1, color: "#3b82f6" },
  { name: "Canada", value: 22.8, color: "#8b5cf6" },
  { name: "Mexico", value: 13.9, color: "#ec4899" },
  { name: "Other", value: 11.2, color: "#1f2937" },
];

const trafficData = [
  { name: "Google", percentage: 100 },
  { name: "YouTube", percentage: 85 },
  { name: "Instagram", percentage: 70 },
  { name: "Pinterest", percentage: 55 },
  { name: "Facebook", percentage: 45 },
  { name: "Twitter", percentage: 30 },
];

const notifications = [
  { title: "You fixed a bug.", time: "Just now", icon: "🐛" },
  { title: "New user registered.", time: "40 minutes ago", icon: "👤" },
  { title: "You fixed a bug.", time: "Today, 11:59 AM", icon: "🐛" },
  {
    title: "Andi Lane subscribed to you.",
    time: "Today, 11:59 AM",
    icon: "🔔",
  },
];

const activities = [
  { user: "Changed the style.", time: "2 sec ago", avatar: "🎨" },
  { user: "Released a new version.", time: "59 minutes ago", avatar: "🚀" },
  { user: "Submitted a bug.", time: "12 hours ago", avatar: "🐛" },
  { user: "Modified A data in Page X.", time: "Today, 11:59 AM", avatar: "📝" },
  { user: "Deleted a page in Project X.", time: "Feb 2, 2025", avatar: "🗑️" },
];

const contacts = [
  { name: "Natali Craig", avatar: "👩" },
  { name: "Drew Cano", avatar: "👨" },
  { name: "Andi Lane", avatar: "👤" },
  { name: "Koray Okumus", avatar: "👨‍💼" },
  { name: "Kate Morrison", avatar: "👩‍💼" },
  { name: "Melody Macy", avatar: "👩‍🦰" },
];

// Sidebar Component
// Sidebar Component
const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const [activeMenu, setActiveMenu] = useState("overview");
  const [expandedMenu, setExpandedMenu] = useState("user-profile");

  const menuItems = [
    { id: "favorites", label: "Favorites", items: [] },
    { id: "recently", label: "Recently", items: [] },
    {
      id: "dashboards",
      label: "Dashboards",
      items: [
        {
          id: "overview",
          label: "Overview",
          icon: LayoutDashboard,
          active: true,
        },
        { id: "ecommerce", label: "eCommerce", icon: ShoppingCart },
        { id: "projects", label: "Projects", icon: FolderOpen },
      ],
    },
    {
      id: "pages",
      label: "Pages",
      items: [
        {
          id: "user-profile",
          label: "User Profile",
          icon: User,
          subitems: [
            "Overview",
            "Projects",
            "Campaigns",
            "Documents",
            "Followers",
          ],
        },
        { id: "account", label: "Account", icon: CreditCard },
        { id: "corporate", label: "Corporate", icon: Briefcase },
        { id: "blog", label: "Blog", icon: BookOpen },
        { id: "social", label: "Social", icon: Share2 },
      ],
    },
  ];

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-60 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-full overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center gap-2.5 px-5 py-6">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              B
            </div>
            <span className="font-semibold text-[15px] text-gray-900">
              ByeWind
            </span>
          </div>

          {/* Menu Items */}
          <div className="px-3 py-2">
            {menuItems.map((section) => (
              <div key={section.id} className="mb-5">
                {section.label && (
                  <div className="px-2.5 mb-1.5 text-[11px] font-medium text-gray-400 tracking-wide">
                    {section.label}
                  </div>
                )}
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isExpanded = expandedMenu === item.id;
                    return (
                      <div key={item.id}>
                        <button
                          onClick={() => {
                            setActiveMenu(item.id);
                            if (item.subitems) {
                              setExpandedMenu(isExpanded ? null : item.id);
                            }
                          }}
                          className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13px] transition-all ${
                            item.active || activeMenu === item.id
                              ? "bg-gray-900 text-white font-medium"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          {Icon && (
                            <Icon
                              className="w-[18px] h-[18px]"
                              strokeWidth={1.8}
                            />
                          )}
                          <span className="flex-1 text-left">{item.label}</span>
                        </button>
                        {item.subitems && isExpanded && (
                          <div className="ml-7 mt-0.5 space-y-0.5">
                            {item.subitems.map((subitem, idx) => (
                              <button
                                key={idx}
                                className="w-full text-left px-2.5 py-1.5 text-[13px] text-gray-500 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
                              >
                                {subitem}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Logo */}
          <div className="absolute bottom-6 left-0 right-0 px-5">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                S
              </div>
              <span className="font-medium">SnowUI</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <button className="p-1.5 hover:bg-gray-100 rounded">
                    <div className="w-4 h-4 border-2 border-gray-400" />
                  </button>
                  <button className="p-1.5 hover:bg-gray-100 rounded">
                    <Star className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Dashboards</span>
                  <span className="text-gray-400">/</span>
                  <span className="text-sm font-medium text-gray-900">
                    Default
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        <div className="p-6 max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Overview</h1>
            <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-3 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Views</div>
                  <div className="flex items-end justify-between">
                    <div className="text-3xl font-semibold text-gray-900">
                      7,265
                    </div>
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span>+10.1%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Visits</div>
                  <div className="flex items-end justify-between">
                    <div className="text-3xl font-semibold text-gray-900">
                      3,671
                    </div>
                    <div className="flex items-center gap-1 text-sm text-red-600">
                      <TrendingDown className="w-4 h-4" />
                      <span>-0.03%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">New Users</div>
                  <div className="flex items-end justify-between">
                    <div className="text-3xl font-semibold text-gray-900">
                      156
                    </div>
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span>+15.03%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Active Users</div>
                  <div className="flex items-end justify-between">
                    <div className="text-3xl font-semibold text-gray-900">
                      2,318
                    </div>
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span>+6.08%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-6">
                    <button className="text-sm font-medium text-gray-900 border-b-2 border-gray-900 pb-1">
                      Total Users
                    </button>
                    <button className="text-sm text-gray-500 hover:text-gray-900 pb-1">
                      Total Projects
                    </button>
                    <button className="text-sm text-gray-500 hover:text-gray-900 pb-1">
                      Operating Status
                    </button>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-900 rounded-full" />
                      <span className="text-sm text-gray-600">This year</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-300 rounded-full" />
                      <span className="text-sm text-gray-600">Last year</span>
                    </div>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={lineChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="month"
                      stroke="#9ca3af"
                      style={{ fontSize: "12px" }}
                    />
                    <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="lastYear"
                      stroke="#d1d5db"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="thisYear"
                      stroke="#1f2937"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Traffic by Device
                  </h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={barChartData}>
                      <XAxis
                        dataKey="device"
                        stroke="#9ca3af"
                        style={{ fontSize: "12px" }}
                      />
                      <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
                      <Tooltip />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {barChartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              [
                                "#93c5fd",
                                "#6ee7b7",
                                "#1f2937",
                                "#93c5fd",
                                "#a78bfa",
                                "#86efac",
                              ][index]
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Traffic by Location
                  </h3>
                  <div className="flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={280}>
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 space-y-2">
                    {pieChartData.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-gray-700">{item.name}</span>
                        </div>
                        <span className="font-medium text-gray-900">
                          {item.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Traffic by Website
                </h3>
                <div className="space-y-4">
                  {trafficData.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <span className="text-sm text-gray-700 w-24">
                        {item.name}
                      </span>
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-gray-800 h-2 rounded-full transition-all"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <h3 className="text-base font-semibold text-gray-900 mb-4">
                  Notifications
                </h3>
                <div className="space-y-3">
                  {notifications.map((notif, idx) => (
                    <div
                      key={idx}
                      className="flex gap-3 pb-3 border-b border-gray-100 last:border-0"
                    >
                      <div className="text-xl">{notif.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-900">
                          {notif.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {notif.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <h3 className="text-base font-semibold text-gray-900 mb-4">
                  Activities
                </h3>
                <div className="space-y-3">
                  {activities.map((activity, idx) => (
                    <div
                      key={idx}
                      className="flex gap-3 pb-3 border-b border-gray-100 last:border-0"
                    >
                      <div className="text-xl">{activity.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-900">
                          {activity.user}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <h3 className="text-base font-semibold text-gray-900 mb-4">
                  Contacts
                </h3>
                <div className="space-y-3">
                  {contacts.map((contact, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-sm">
                        {contact.avatar}
                      </div>
                      <span className="text-sm text-gray-900">
                        {contact.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
