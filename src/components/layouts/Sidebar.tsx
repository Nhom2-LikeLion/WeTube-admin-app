import { LayoutDashboard, Play, Settings, Users, Video } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
import type { INavItem } from "../../types/navItemTypes";

const navItems: INavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    to: "/",
  },
  {
    id: "manage-videos",
    label: "Manage Video",
    icon: Video,
    to: "/manage-videos",
    // badge: 3,
  },
  {
    id: "manage-channels",
    label: "Manage Channel",
    icon: Settings,
    to: "/manage-channels",
  },
  {
    id: "manage-managers",
    label: "Manage Manager",
    icon: Users,
    to: "/manage-managers",
  },
  // {
  //   id: "view-stats",
  //   label: "View Statistics",
  //   icon: BarChart3,
  //   to: "/view-stats",
  // },
];

const Sidebar: React.FC = () => {
  const renderNavItem = (item: INavItem) => {
    return (
      <div key={item.id} className="mb-1">
        <NavLink
          to={item.to}
          className={({ isActive }) =>
            `flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`
          }
        >
          <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
          <span className="flex-1 text-sm font-medium">{item.label}</span>
          {item.badge && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full mr-2">
              {item.badge}
            </span>
          )}
        </NavLink>
      </div>
    );
  };

  return (
    <div className="w-64 bg-gray-900 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mr-3">
            <Play className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white text-lg font-bold">WeTube</h1>
            <p className="text-gray-400 text-sm">Studio</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {navItems.map((item) => renderNavItem(item))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center text-gray-400 text-sm">
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mr-3">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <p className="text-white font-medium">Creator Studio</p>
            <p className="text-xs">v2.4.1</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
