// // import { ReactNode, useState } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import {
// //   LayoutDashboard,
// //   Activity,
// //   Zap,
// //   Battery,
// //   CloudSun,
// //   Bell,
// //   FileText,
// //   Shield,
// //   Wrench,
// //   Settings,
// //   Info,
// //   Sun,
// //   Moon,
// //   Menu,
// //   X,
// //   User,
// //   LogOut
// // } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import { useTheme } from "next-themes";

// // interface DashboardLayoutProps {
// //   children: ReactNode;
// // }

// // const DashboardLayout = ({ children }: DashboardLayoutProps) => {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const { theme, setTheme } = useTheme();
// //   const [sidebarOpen, setSidebarOpen] = useState(true);

// //   const navItems = [
// //     { icon: <LayoutDashboard className="w-5 h-5" />, label: "Overview", path: "/dashboard" },
// //     { icon: <Activity className="w-5 h-5" />, label: "Real-Time Monitoring", path: "/dashboard/monitoring" },
// //     { icon: <Zap className="w-5 h-5" />, label: "Inverters & Controllers", path: "/dashboard/inverters" },
// //     { icon: <Battery className="w-5 h-5" />, label: "Battery Management", path: "/dashboard/battery" },
// //     { icon: <CloudSun className="w-5 h-5" />, label: "Weather Station", path: "/dashboard/weather" },
// //     { icon: <Bell className="w-5 h-5" />, label: "Alarms & Notifications", path: "/dashboard/alarms" },
// //     { icon: <FileText className="w-5 h-5" />, label: "Reports & Analytics", path: "/dashboard/reports" },
// //     { icon: <Shield className="w-5 h-5" />, label: "Admin Management", path: "/dashboard/admin" },
// //     { icon: <Wrench className="w-5 h-5" />, label: "Maintenance Logs", path: "/dashboard/maintenance" },
// //     { icon: <Settings className="w-5 h-5" />, label: "Settings", path: "/dashboard/settings" },
// //     { icon: <Info className="w-5 h-5" />, label: "About / Help", path: "/dashboard/about" },
// //   ];

// //   const isActive = (path: string) => location.pathname === path;

// //   const handleLogout = () => {
// //     navigate("/login");
// //   };

// //   return (
// //     <div className="min-h-screen flex w-full bg-background">
// //       {/* Sidebar */}
// //       <aside
// //         className={`${
// //           sidebarOpen ? "w-64" : "w-20"
// //         } bg-card border-r border-border transition-all duration-300 flex flex-col fixed h-full z-40`}
// //       >
// //         {/* Logo */}
// //         <div className="h-16 flex items-center justify-between px-4 border-b border-border">
// //           {sidebarOpen ? (
// //             <div className="flex items-center gap-3">
// //               <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center">
// //                 <Sun className="w-6 h-6 text-primary-foreground" />
// //               </div>
// //               <div>
// //                 <h1 className="text-sm font-bold">Solar Monitor</h1>
// //                 <p className="text-xs text-muted-foreground">Dashboard</p>
// //               </div>
// //             </div>
// //           ) : (
// //             <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center mx-auto">
// //               <Sun className="w-6 h-6 text-primary-foreground" />
// //             </div>
// //           )}
// //         </div>

// //         {/* Navigation */}
// //         <nav className="flex-1 overflow-y-auto py-4 px-2">
// //           {navItems.map((item) => (
// //             <button
// //               key={item.path}
// //               onClick={() => navigate(item.path)}
// //               className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg mb-1 transition-smooth ${
// //                 isActive(item.path)
// //                   ? "bg-primary text-primary-foreground shadow-glow"
// //                   : "hover:bg-secondary text-foreground"
// //               }`}
// //             >
// //               {item.icon}
// //               {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
// //             </button>
// //           ))}
// //         </nav>

// //         {/* Toggle Button */}
// //         <div className="p-2 border-t border-border">
// //           <Button
// //             variant="ghost"
// //             size="sm"
// //             onClick={() => setSidebarOpen(!sidebarOpen)}
// //             className="w-full justify-center"
// //           >
// //             {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
// //           </Button>
// //         </div>
// //       </aside>

// //       {/* Main Content */}
// //       <div className={`flex-1 flex flex-col ${sidebarOpen ? "ml-64" : "ml-20"} transition-all duration-300`}>
// //         {/* Top Bar */}
// //         <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
// //           <div>
// //             <h2 className="text-xl font-semibold">
// //               {navItems.find(item => isActive(item.path))?.label || "Dashboard"}
// //             </h2>
// //           </div>

// //           <div className="flex items-center gap-4">
// //             <Button
// //               variant="ghost"
// //               size="icon"
// //               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
// //               className="rounded-lg"
// //             >
// //               {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
// //             </Button>

// //             <Button variant="ghost" size="icon" className="rounded-lg relative">
// //               <Bell className="w-5 h-5" />
// //               <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
// //             </Button>

// //             <div className="flex items-center gap-3 pl-3 border-l border-border">
// //               <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
// //                 <User className="w-5 h-5 text-primary" />
// //               </div>
// //               <div className="hidden sm:block">
// //                 <p className="text-sm font-medium">Engineer</p>
// //                 <p className="text-xs text-muted-foreground">Admin</p>
// //               </div>
// //               <Button
// //                 variant="ghost"
// //                 size="icon"
// //                 onClick={handleLogout}
// //                 className="rounded-lg hover:bg-destructive/10 hover:text-destructive"
// //               >
// //                 <LogOut className="w-5 h-5" />
// //               </Button>
// //             </div>
// //           </div>
// //         </header>

// //         {/* Page Content */}
// //         <main className="flex-1 overflow-y-auto p-6">
// //           {children}
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DashboardLayout;
// import { ReactNode, useState } from "react";
// import { useNavigate, useLocation, Navigate } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Activity,
//   Zap,
//   Battery,
//   CloudSun,
//   Bell,
//   FileText,
//   Shield,
//   Wrench,
//   Settings,
//   Info,
//   Sun,
//   Moon,
//   Menu,
//   X,
//   User,
//   LogOut,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useTheme } from "next-themes";
// import { useAuth } from "@/context/AuthContext";

// interface DashboardLayoutProps {
//   children: ReactNode;
// }

// const DashboardLayout = ({ children }: DashboardLayoutProps) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { theme, setTheme } = useTheme();
//   const { user } = useAuth();
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const navItems = [
//     {
//       icon: <LayoutDashboard className="w-5 h-5" />,
//       label: "Overview",
//       path: "/dashboard",
//     },
//     {
//       icon: <Activity className="w-5 h-5" />,
//       label: "Real-Time Monitoring",
//       path: "/dashboard/monitoring",
//     },
//     {
//       icon: <Zap className="w-5 h-5" />,
//       label: "Inverters & Controllers",
//       path: "/dashboard/inverters",
//     },
//     {
//       icon: <Battery className="w-5 h-5" />,
//       label: "Battery Management",
//       path: "/dashboard/battery",
//     },
//     {
//       icon: <CloudSun className="w-5 h-5" />,
//       label: "Weather Station",
//       path: "/dashboard/weather",
//     },
//     {
//       icon: <Bell className="w-5 h-5" />,
//       label: "Alarms & Notifications",
//       path: "/dashboard/alarms",
//     },
//     {
//       icon: <FileText className="w-5 h-5" />,
//       label: "Reports & Analytics",
//       path: "/dashboard/reports",
//     },
//     {
//       icon: <Shield className="w-5 h-5" />,
//       label: "Admin Management",
//       path: "/dashboard/admin",
//     },
//     {
//       icon: <Wrench className="w-5 h-5" />,
//       label: "Maintenance Logs",
//       path: "/dashboard/maintenance",
//     },
//     {
//       icon: <Settings className="w-5 h-5" />,
//       label: "Settings",
//       path: "/dashboard/settings",
//     },
//     {
//       icon: <Info className="w-5 h-5" />,
//       label: "About / Help",
//       path: "/dashboard/about",
//     },
//   ];

//   const isActive = (path: string) => location.pathname === path;

//   const handleLogout = () => {
//     navigate("/login");
//   };

//   // ✅ فلترة المنيو حسب الدور (من غير لمس الديزاين)
//   const filteredNavItems = navItems.filter((item) => {
//     if (user?.role === "engineer" && item.path === "/dashboard/admin") {
//       return false;
//     }
//     return true;
//   });

//   return (
//     <div className="min-h-screen flex w-full bg-background">
//       {/* Sidebar */}
//       <aside
//         className={`${
//           sidebarOpen ? "w-64" : "w-20"
//         } bg-card border-r border-border transition-all duration-300 flex flex-col fixed h-full z-40`}
//       >
//         {/* Logo */}
//         <div className="h-16 flex items-center justify-between px-4 border-b border-border">
//           {sidebarOpen ? (
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center">
//                 <Sun className="w-6 h-6 text-primary-foreground" />
//               </div>
//               <div>
//                 <h1 className="text-sm font-bold">Solar Monitor</h1>
//                 <p className="text-xs text-muted-foreground">Dashboard</p>
//               </div>
//             </div>
//           ) : (
//             <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center mx-auto">
//               <Sun className="w-6 h-6 text-primary-foreground" />
//             </div>
//           )}
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 overflow-y-auto py-4 px-2">
//           {filteredNavItems.map((item) => (
//             <button
//               key={item.path}
//               onClick={() => navigate(item.path)}
//               className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg mb-1 transition-smooth ${
//                 isActive(item.path)
//                   ? "bg-primary text-primary-foreground shadow-glow"
//                   : "hover:bg-secondary text-foreground"
//               }`}
//             >
//               {item.icon}
//               {sidebarOpen && (
//                 <span className="text-sm font-medium">{item.label}</span>
//               )}
//             </button>
//           ))}
//         </nav>

//         {/* Toggle Button */}
//         <div className="p-2 border-t border-border">
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="w-full justify-center"
//           >
//             {sidebarOpen ? (
//               <X className="w-5 h-5" />
//             ) : (
//               <Menu className="w-5 h-5" />
//             )}
//           </Button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div
//         className={`flex-1 flex flex-col ${
//           sidebarOpen ? "ml-64" : "ml-20"
//         } transition-all duration-300`}
//       >
//         {/* Top Bar */}
//         <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
//           <div>
//             <h2 className="text-xl font-semibold">
//               {filteredNavItems.find((item) => isActive(item.path))?.label ||
//                 "Dashboard"}
//             </h2>
//           </div>

//           <div className="flex items-center gap-4">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//               className="rounded-lg"
//             >
//               {theme === "dark" ? (
//                 <Sun className="w-5 h-5" />
//               ) : (
//                 <Moon className="w-5 h-5" />
//               )}
//             </Button>

//             <Button variant="ghost" size="icon" className="rounded-lg relative">
//               <Bell className="w-5 h-5" />
//               <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
//             </Button>

//             <div className="flex items-center gap-3 pl-3 border-l border-border">
//               <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
//                 <User className="w-5 h-5 text-primary" />
//               </div>
//               <div className="hidden sm:block">
//                 <p className="text-sm font-medium">{user?.role}</p>
//                 <p className="text-xs text-muted-foreground">{user?.email}</p>
//               </div>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={handleLogout}
//                 className="rounded-lg hover:bg-destructive/10 hover:text-destructive"
//               >
//                 <LogOut className="w-5 h-5" />
//               </Button>
//             </div>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 overflow-y-auto p-6">{children}</main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
import { ReactNode, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Activity,
  Zap,
  Battery,
  CloudSun,
  Bell,
  FileText,
  Shield,
  Wrench,
  Settings,
  Info,
  Sun,
  Moon,
  Menu,
  X,
  User,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/AuthContext";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    {
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Overview",
      path: "/dashboard",
    },
    {
      icon: <Activity className="w-5 h-5" />,
      label: "Real-Time Monitoring",
      path: "/dashboard/monitoring",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      label: "Inverters & Controllers",
      path: "/dashboard/inverters",
    },
    {
      icon: <Battery className="w-5 h-5" />,
      label: "Battery Management",
      path: "/dashboard/battery",
    },
    {
      icon: <CloudSun className="w-5 h-5" />,
      label: "Weather Station",
      path: "/dashboard/weather",
    },
    {
      icon: <Bell className="w-5 h-5" />,
      label: "Alarms & Notifications",
      path: "/dashboard/alarms",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: "Reports & Analytics",
      path: "/dashboard/reports",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      label: "Admin Management",
      path: "/dashboard/admin",
    },
    {
      icon: <Wrench className="w-5 h-5" />,
      label: "Maintenance Logs",
      path: "/dashboard/maintenance",
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: "Settings",
      path: "/dashboard/settings",
    },
    {
      icon: <Info className="w-5 h-5" />,
      label: "About / Help",
      path: "/dashboard/about",
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    navigate("/login");
  };

  // ✅ فلترة المنيو حسب الدور (Admin Management يختفي لو الدور Engineer)
  const filteredNavItems = navItems.filter((item) => {
    if (user?.role === "Engineer" && item.path === "/dashboard/admin") {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-card border-r border-border transition-all duration-300 flex flex-col fixed h-full z-40`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center">
                <Sun className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-sm font-bold">Solar Monitor</h1>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center mx-auto">
              <Sun className="w-6 h-6 text-primary-foreground" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {filteredNavItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg mb-1 transition-smooth ${
                isActive(item.path)
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "hover:bg-secondary text-foreground"
              }`}
            >
              {item.icon}
              {sidebarOpen && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Toggle Button */}
        <div className="p-2 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full justify-center"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col ${
          sidebarOpen ? "ml-64" : "ml-20"
        } transition-all duration-300`}
      >
        {/* Top Bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
          <div>
            <h2 className="text-xl font-semibold">
              {filteredNavItems.find((item) => isActive(item.path))?.label ||
                "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-lg"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            <Button variant="ghost" size="icon" className="rounded-lg relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </Button>

            <div className="flex items-center gap-3 pl-3 border-l border-border">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">{user?.role}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="rounded-lg hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
