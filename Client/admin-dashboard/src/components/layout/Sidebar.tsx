import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";

import { LayoutDashboard, Users, Box, BarChart3 } from "lucide-react";

interface SidebarProps {
  closeSidebar?: () => void;
}

const Sidebar = ({ closeSidebar }: SidebarProps) => {
  const location = useLocation();
  const role = useSelector((state: RootState) => state.auth.user?.role);

  const links = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard, roles: ["ADMIN","manager","user"] },
    { name: "Users", path: "/users", icon: Users, roles: ["ADMIN"] },
    { name: "Products", path: "/products", icon: Box, roles: ["ADMIN","manager"] },
    { name: "Orders", path: "/orders", icon: Box, roles: ["ADMIN","manager"] },
    { name: "Analysis", path: "/analysis", icon: BarChart3, roles: ["ADMIN","manager","user"] }
  ];

  return (
    <div className="h-full w-64 bg-gray-900 text-white flex flex-col">

      <div className="p-4 text-xl font-bold border-b border-gray-700">
        Admin Panel
      </div>

      <nav className="flex flex-col gap-1 p-2">

        {links
          .filter(link => role && link.roles.includes(role))
          .map(link => {
            const Icon = link.icon;

            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeSidebar}
                className={`flex items-center gap-3 p-3 rounded-lg transition
                  ${location.pathname === link.path
                    ? "bg-gray-700"
                    : "hover:bg-gray-800"}
                `}
              >
                <Icon size={18} />
                <span>{link.name}</span>
              </Link>
            );
          })}
      </nav>

    </div>
  );
};

export default Sidebar;
