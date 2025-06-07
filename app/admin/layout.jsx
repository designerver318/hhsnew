"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Menu, X, Trophy, Megaphone, Image, Users,
  ChevronLeft, ChevronRight, LogOut, Home,
  Settings, User, Bell, Search, ChevronDown, ChevronUp
} from "lucide-react";

export default function Dashboard({ children }) {
  const { logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [openDropdowns, setOpenDropdowns] = useState({});

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/api/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) setSidebarOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarItems = [
    {
      name: "Achievers",
      icon: <Trophy size={20} />,
      routes: [
        { name: "Add", path: "/admin/achievers/add" },
        { name: "List", path: "/admin/achievers/list" }
      ]
    },
    {
      name: "Announcements",
      icon: <Megaphone size={20} />,
      routes: [
        { name: "Add", path: "/admin/announcements/add" },
        { name: "List", path: "/admin/announcements/list" }
      ]
    },
    {
      name: "Gallery",
      icon: <Image size={20} />,
      routes: [
        { name: "Add", path: "/admin/gallery/add" },
        { name: "List", path: "/admin/gallery/list" }
      ]
    },
    {
      name: "Our Team",
      icon: <Users size={20} />,
      routes: [
        { name: "Add", path: "/admin/team/add" },
        { name: "List", path: "/admin/team/list" }
      ]
    },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      routes: [
        { name: "General", path: "/admin/settings" }
      ]
    }
  ];

  const toggleDropdown = (name) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  if (typeof window !== "undefined" && !isAuthenticated) return null;

  return (
    <div className="flex max-md:flex-col w-full h-screen bg-gray-50">
      {/* Mobile Navbar */}
      {isMobile && (
        <div className="bg-white shadow-sm z-50 p-4 flex justify-between items-center md:hidden">
          <h1 className="text-xl font-bold text-[#bf213e]">{activeTab}</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-64" : "w-20"} bg-white shadow-lg transition-all duration-300 fixed md:relative h-full z-40 ${isMobile && !sidebarOpen ? "-left-full" : "left-0"}`}>
        <div className="p-4 flex items-center justify-between border-b h-16">
          {sidebarOpen ? (
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <User size={16} className="text-[#bf213e]" />
              </div>
              <h2 className="text-xl font-bold text-[#bf213e]">Admin Panel</h2>
            </div>
          ) : (
            <div className="w-6" />
          )}
          
        </div>

        <nav className="mt-6">
          {sidebarItems.map((item) => (
            <div key={item.name}>
              <button
                onClick={() => toggleDropdown(item.name)}
                className={`flex items-center justify-between w-full p-3 mx-2 rounded-lg text-black hover:bg-gray-100 transition-colors mb-1`}
              >
                <span className="flex items-center space-x-3">
                  <span>{item.icon}</span>
                  {sidebarOpen && <span className="font-medium">{item.name}</span>}
                </span>
                {sidebarOpen && (openDropdowns[item.name] ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
              </button>
              {sidebarOpen && openDropdowns[item.name] && (
                <div className="ml-8">
                  {item.routes.map((route) => (
                    <button
                      key={route.name}
                      onClick={() => {
                        router.push(route.path);
                        setActiveTab(`${item.name} - ${route.name}`);
                      }}
                      className={`block w-full text-left py-1 px-3 text-sm rounded hover:bg-indigo-50 
                        ${pathname === route.path ? "text-[#bf213e] font-medium" : "text-gray-600"}`}
                    >
                      {route.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className={`absolute bottom-0 w-full p-4 border-t ${!sidebarOpen && "px-2.5"}`}>
          <button
            onClick={logout}
            className={`flex items-center w-full p-2 rounded-lg text-red-600 hover:bg-red-50 ${!sidebarOpen && "justify-center"}`}
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex flex-col md:flex-row min-h-screen w-full ${isMobile ? "mt-16" : ""}`}>
  {/* Main Content */}
  <div className="overflow-auto w-full">
    
    {/* Top Bar */}
    <div className="bg-white shadow-sm px-4 py-3 flex justify-between items-center sticky top-0 z-10">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="block md:hidden text-gray-500 hover:text-[#bf213e]"
      >
        {/* Show button only on small screens */}
        {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      <h1 className="text-lg md:text-xl font-bold text-gray-800">
        {activeTab}
      </h1>

      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
          <User size={16} className="text-[#bf213e]" />
        </div>
        {!isMobile && sidebarOpen && (
          <span className="text-sm font-medium text-gray-700 hidden md:inline">Admin</span>
        )}
      </div>
    </div>

    {/* Content Area */}
    <div className="p-4 sm:p-6">{children}</div>
  </div>
</div>

    </div>
  );
}
