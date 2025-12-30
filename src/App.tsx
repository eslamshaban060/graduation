import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RealTimeMonitoring from "./pages/RealTimeMonitoring";
import InvertersControllers from "./pages/InvertersControllers";
import BatteryManagement from "./pages/BatteryManagement";
import WeatherStation from "./pages/WeatherStation";
import Alarms from "./pages/Alarms";
import Reports from "./pages/Reports";
import AdminManagement from "./pages/AdminManagement";
import MaintenanceLogs from "./pages/MaintenanceLogs";
import Settings from "./pages/Settings";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
const queryClient = new QueryClient();
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};
const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/monitoring"
              element={<RealTimeMonitoring />}
            />
            <Route
              path="/dashboard/inverters"
              element={<InvertersControllers />}
            />
            <Route path="/dashboard/battery" element={<BatteryManagement />} />
            <Route path="/dashboard/weather" element={<WeatherStation />} />
            <Route path="/dashboard/alarms" element={<Alarms />} />
            <Route path="/dashboard/reports" element={<Reports />} />
            <Route path="/dashboard/admin" element={<AdminManagement />} />
            <Route
              path="/dashboard/maintenance"
              element={<MaintenanceLogs />}
            />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/about" element={<About />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
