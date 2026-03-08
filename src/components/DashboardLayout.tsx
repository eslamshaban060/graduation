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
  ChevronLeft,
  User,
  LogOut,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "../lib/supabase ";
import { useEffect } from "react";
interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const [open, setOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const unreadCount = notifications.length;

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("notifiction")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) {
        setNotifications(
          data.map((n) => ({
            id: n.id,
            title: n.title,
            link: n.link,
            date: n.created_at,
            read: false,
          })),
        );
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const navItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
    {
      icon: Activity,
      label: "Real-Time Monitoring",
      path: "/dashboard/monitoring",
    },
    {
      icon: Zap,
      label: "Inverters & Controllers",
      path: "/dashboard/inverters",
    },
    { icon: Battery, label: "Battery Management", path: "/dashboard/battery" },
    { icon: CloudSun, label: "Weather Station", path: "/dashboard/weather" },
    {
      icon: Bell,
      label: "Alarms & Notifications",
      path: "/dashboard/alarms",
      badge: unreadCount,
    },
    {
      icon: FileText,
      label: "Reports & Analytics",
      path: "/dashboard/reports",
    },
    { icon: Shield, label: "Admin Management", path: "/dashboard/admin" },
    { icon: Wrench, label: "Maintenance Logs", path: "/dashboard/maintenance" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
    { icon: Info, label: "About / Help", path: "/dashboard/about" },
  ];
  const filtered = navItems.filter(
    (item) => !(user?.role === "Engineer" && item.path === "/dashboard/admin"),
  );

  const isActive = (path: string) => location.pathname === path;
  const activeLabel =
    filtered.find((item) => isActive(item.path))?.label ?? "Dashboard";

  return (
    <div className="min-h-screen flex w-full bg-background text-foreground">
      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed top-0 left-0 h-screen z-40 flex flex-col
          bg-card border-r border-border
          transition-all duration-300 ease-in-out
          ${open ? "w-64" : "w-[72px]"}
        `}
      >
        {/* Logo */}
        <div className="h-[70px] flex items-center gap-3 px-4 border-b border-border shrink-0">
          <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center shadow-glow shrink-0">
            <Sun className="w-[18px] h-[18px] text-primary-foreground" />
          </div>

          {open && (
            <>
              <div className="flex flex-col overflow-hidden flex-1 min-w-0">
                <span className="text-sm font-semibold text-foreground truncate leading-tight">
                  Solar Monitor
                </span>
                <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-primary truncate">
                  Dashboard
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0
                           bg-secondary hover:bg-muted transition-smooth
                           text-muted-foreground hover:text-foreground border border-border"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>

        {/* Section label */}
        {open && (
          <p className="px-4 pt-4 pb-1 text-[9px] font-bold tracking-[0.2em] uppercase text-muted-foreground shrink-0 select-none">
            Navigation
          </p>
        )}

        {/* Nav scroll */}
        <nav
          className={`
            flex-1 overflow-y-auto px-2 py-2 space-y-0.5
            ${!open && "pt-4"}
          `}
          style={{ scrollbarWidth: "thin" }}
        >
          {filtered.map(({ icon: Icon, label, path, badge }) => {
            const active = isActive(path);
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                title={!open ? label : undefined}
                className={`
                  w-full flex items-center rounded-xl border transition-smooth
                  relative overflow-hidden group
                  ${open ? "gap-3 px-3 py-2.5" : "gap-0 px-0 py-2.5 justify-center"}
                  ${
                    active
                      ? "bg-primary/10 border-primary/20 text-primary"
                      : "bg-transparent border-transparent text-muted-foreground hover:bg-secondary hover:text-foreground hover:border-border"
                  }
                `}
              >
                {/* Active left indicator */}
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[52%] rounded-r-full gradient-hero shadow-glow" />
                )}

                {/* Icon */}
                <span
                  className={`
                    w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-smooth
                    ${
                      active
                        ? "gradient-hero text-primary-foreground shadow-glow"
                        : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                    }
                  `}
                >
                  <Icon className="w-[15px] h-[15px]" />
                </span>

                {open && (
                  <>
                    <span
                      className={`text-[13px] flex-1 text-left truncate transition-smooth
                        ${active ? "font-semibold text-primary" : "font-medium"}
                      `}
                    >
                      {label}
                    </span>
                    {badge && (
                      <span
                        className="min-w-[18px] h-[18px] px-1.5 rounded-full
                                       bg-destructive text-destructive-foreground
                                       text-[9px] font-bold flex items-center justify-center shrink-0"
                      >
                        {badge}
                      </span>
                    )}
                  </>
                )}

                {/* Badge collapsed */}
                {!open && badge && (
                  <span
                    className="absolute top-1 right-1 w-[15px] h-[15px] rounded-full
                                   bg-destructive text-destructive-foreground
                                   text-[8px] font-bold flex items-center justify-center"
                  >
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User card */}
        <div
          className={`shrink-0 border-t border-border p-3 flex items-center gap-2.5
            ${!open && "flex-col justify-center gap-2"}
          `}
        >
          <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center shrink-0">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>

          {open && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-foreground truncate leading-tight">
                  {user?.role ?? "Admin"}
                </p>
                <p className="text-[10px] text-muted-foreground truncate">
                  {user?.email ?? "user@solar.io"}
                </p>
              </div>
              <button
                onClick={() => navigate("/login")}
                title="Logout"
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                           bg-destructive/10 border border-destructive/20
                           text-destructive/60 hover:bg-destructive/20 hover:text-destructive
                           transition-smooth"
              >
                <LogOut className="w-[14px] h-[14px]" />
              </button>
            </>
          )}

          {!open && (
            <button
              onClick={() => setOpen(true)}
              className="w-8 h-8 rounded-lg flex items-center justify-center
                         bg-secondary hover:bg-muted border border-border
                         text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Menu className="w-4 h-4" />
            </button>
          )}
        </div>
      </aside>

      {/* ── Main ── */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300
          ${open ? "ml-64" : "ml-[72px]"}
        `}
      >
        {/* Topbar */}
        <header
          className="sticky top-0 z-30 h-16 flex items-center justify-between px-6
                           bg-card/80 backdrop-blur-md border-b border-border shrink-0"
        >
          <h2 className="text-lg font-semibold text-foreground">
            {activeLabel}
          </h2>

          <div className="flex items-center gap-2">
            {/* Theme */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 rounded-xl flex items-center justify-center
                         bg-secondary hover:bg-muted border border-border
                         text-muted-foreground hover:text-foreground transition-smooth"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Bell */}
            <a
              href="/dashboard/alarms"
              className="w-9 h-9 rounded-xl flex items-center justify-center relative
                               bg-secondary hover:bg-muted border border-border
                               text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive border-2 border-card" />
            </a>

            <div className="w-px h-7 bg-border mx-1" />

            {/* User pill */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-secondary border border-border">
              <div className="w-7 h-7 rounded-lg gradient-hero flex items-center justify-center shrink-0">
                <User className="w-[13px] h-[13px] text-primary-foreground" />
              </div>
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-[12px] font-semibold text-foreground">
                  {user?.role ?? "Admin"}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {user?.email ?? "user@solar.io"}
                </span>
              </div>
              <button
                onClick={() => navigate("/login")}
                className="w-7 h-7 rounded-lg flex items-center justify-center ml-1
                           bg-destructive/10 border border-destructive/20
                           text-destructive/60 hover:bg-destructive/20 hover:text-destructive
                           transition-smooth"
              >
                <LogOut className="w-[13px] h-[13px]" />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
