import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Zap, Battery, Sun, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      icon: <Zap className="w-6 h-6" />,
      label: "Total Power Generated",
      value: "1,247 kW",
      change: "+12.5%",
      trend: "up"
    },
    {
      icon: <Battery className="w-6 h-6" />,
      label: "Battery Status",
      value: "87%",
      change: "Charging",
      trend: "up"
    },
    {
      icon: <Sun className="w-6 h-6" />,
      label: "Solar Efficiency",
      value: "94.2%",
      change: "+2.1%",
      trend: "up"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: "Daily Output",
      value: "8,943 kWh",
      change: "+8.3%",
      trend: "up"
    }
  ];

  const inverters = [
    { id: 1, name: "Inverter A", status: "online", power: "312 kW", efficiency: "96%" },
    { id: 2, name: "Inverter B", status: "online", power: "298 kW", efficiency: "95%" },
    { id: 3, name: "Inverter C", status: "warning", power: "285 kW", efficiency: "92%" },
    { id: 4, name: "Inverter D", status: "online", power: "352 kW", efficiency: "97%" },
  ];

  const recentAlerts = [
    { type: "warning", message: "Inverter C efficiency below threshold", time: "5 mins ago" },
    { type: "info", message: "Battery reached 80% charge", time: "15 mins ago" },
    { type: "success", message: "System maintenance completed", time: "1 hour ago" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome to Solar Monitor</h1>
          <p className="text-muted-foreground">Real-time overview of your solar power station</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className="p-6 hover-glow transition-smooth border-border gradient-card"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg gradient-hero flex items-center justify-center text-primary-foreground">
                  {stat.icon}
                </div>
                <span className={`text-sm font-medium ${
                  stat.trend === "up" ? "text-primary" : "text-destructive"
                }`}>
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Inverters Status */}
          <Card className="lg:col-span-2 p-6 gradient-card border-border">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Inverters Status
            </h3>
            <div className="space-y-4">
              {inverters.map((inverter) => (
                <div 
                  key={inverter.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-background border border-border hover:border-primary transition-smooth"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${
                      inverter.status === "online" ? "bg-primary animate-pulse-glow" :
                      inverter.status === "warning" ? "bg-accent" : "bg-destructive"
                    }`}></div>
                    <div>
                      <p className="font-medium">{inverter.name}</p>
                      <p className="text-sm text-muted-foreground capitalize">{inverter.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{inverter.power}</p>
                    <p className="text-sm text-muted-foreground">{inverter.efficiency} efficiency</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Alerts */}
          <Card className="p-6 gradient-card border-border">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-accent" />
              Recent Alerts
            </h3>
            <div className="space-y-4">
              {recentAlerts.map((alert, index) => (
                <div 
                  key={index}
                  className="flex gap-3 p-3 rounded-lg bg-background border border-border"
                >
                  {alert.type === "warning" && <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />}
                  {alert.type === "info" && <Battery className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />}
                  {alert.type === "success" && <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-tight">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Weather & Battery Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 gradient-card border-border">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Sun className="w-5 h-5 text-accent" />
              Weather Conditions
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Temperature</p>
                <p className="text-3xl font-bold">28°C</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Irradiance</p>
                <p className="text-3xl font-bold">850 W/m²</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Wind Speed</p>
                <p className="text-3xl font-bold">12 km/h</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Humidity</p>
                <p className="text-3xl font-bold">45%</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 gradient-card border-border">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Battery className="w-5 h-5 text-primary" />
              Battery Bank Status
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Charge Level</span>
                  <span className="text-sm font-semibold">87%</span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full gradient-hero rounded-full" style={{ width: "87%" }}></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Voltage</p>
                  <p className="text-2xl font-bold">48.2 V</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Temperature</p>
                  <p className="text-2xl font-bold">32°C</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
