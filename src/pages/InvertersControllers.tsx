import DashboardLayout from "@/components/DashboardLayout";

import React, { useState, useEffect } from "react";
import {
  Zap,
  Activity,
  ArrowRightLeft,
  RefreshCw,
  AlertCircle,
  TrendingUp,
  Power,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const InvertersManagement = () => {
  const [inverters, setInverters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    fetchInvertersData();
    const interval = setInterval(fetchInvertersData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchInvertersData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://5qo8xe66p8.execute-api.eu-west-3.amazonaws.com/solar",
      );

      if (!response.ok) throw new Error("Failed to fetch inverters data");

      const data = await response.json();
      setInverters(Array.isArray(data) ? data : []);
      setLastUpdate(new Date());
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Inverters fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateEfficiency = (acPower, dcPower) => {
    if (dcPower === 0) return 0;
    return ((acPower / dcPower) * 100).toFixed(1);
  };

  const getEfficiencyStatus = (efficiency) => {
    if (efficiency >= 95)
      return { label: "Excellent", color: "text-primary", bg: "bg-secondary" };
    if (efficiency >= 90)
      return { label: "Good", color: "text-primary/70", bg: "bg-muted" };
    if (efficiency >= 85)
      return { label: "Fair", color: "text-accent", bg: "bg-accent/10" };
    return { label: "Low", color: "text-destructive", bg: "bg-destructive/10" };
  };

  if (loading && inverters.length === 0) {
    return (
      <DashboardLayout>
        {" "}
        <div className="min-h-screen bg-background p-6">
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-card rounded-xl p-10 border border-border shadow-card">
            <div className="w-12 h-12 border-4 border-border border-t-primary rounded-full animate-spin mb-5"></div>
            <p className="text-muted-foreground">Loading inverters data...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error && inverters.length === 0) {
    return (
      <DashboardLayout>
        {" "}
        <div className="min-h-screen bg-background p-6">
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-card rounded-xl p-10 border border-border shadow-card">
            <AlertCircle className="w-16 h-16 text-destructive mb-5" />
            <p className="text-destructive mb-5">{error}</p>
            <button
              onClick={fetchInvertersData}
              className="px-6 py-3 gradient-hero text-primary-foreground rounded-xl flex items-center gap-2 font-medium hover:opacity-90 transition-smooth"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const totalACPower = inverters.reduce(
    (sum, inv) => sum + (inv.AC_Power || 0),
    0,
  );
  const totalDCPower = inverters.reduce(
    (sum, inv) => sum + (inv.DC_Power || 0),
    0,
  );
  const avgEfficiency =
    totalDCPower > 0 ? ((totalACPower / totalDCPower) * 100).toFixed(1) : 0;

  return (
    <DashboardLayout>
      {" "}
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-[1600px] mx-auto flex flex-col gap-6">
          {/* Header */}
          <div className="gradient-hero p-6 rounded-xl shadow-glow">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <Zap className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-primary-foreground">
                    Inverters Management
                  </h1>
                  <p className="text-sm text-primary-foreground/90 mt-1">
                    {inverters.length} Inverters • Updated{" "}
                    {lastUpdate.toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-white/20 text-primary-foreground rounded-full text-sm font-medium">
                  <span className="font-bold">{avgEfficiency}%</span> Avg
                  Efficiency
                </div>
                <button
                  onClick={fetchInvertersData}
                  className="p-2.5 bg-white/20 rounded-xl text-primary-foreground hover:bg-white/30 transition-smooth"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="gradient-card rounded-xl p-6 border border-border shadow-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Power className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">
                    Total AC Power
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {totalACPower.toLocaleString()} W
                  </p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                Output to Grid
              </div>
            </div>

            <div className="gradient-card rounded-xl p-6 border border-border shadow-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">
                    Total DC Power
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {totalDCPower.toLocaleString()} W
                  </p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                Input from Panels
              </div>
            </div>

            <div className="gradient-card rounded-xl p-6 border border-border shadow-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">
                    System Efficiency
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {avgEfficiency}%
                  </p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                {avgEfficiency >= 95
                  ? "✅ Excellent Performance"
                  : avgEfficiency >= 90
                    ? "👍 Good Performance"
                    : avgEfficiency >= 85
                      ? "⚠️ Needs Monitoring"
                      : "🔴 Needs Attention"}
              </div>
            </div>
          </div>

          {/* Inverters Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {inverters.map((inverter, index) => {
              const efficiency = calculateEfficiency(
                inverter.AC_Power,
                inverter.DC_Power,
              );
              const effStatus = getEfficiencyStatus(efficiency);

              const chartData = [
                {
                  name: "DC Input",
                  value: inverter.DC_Power,
                  fill: "hsl(43, 100%, 50%)",
                },
                {
                  name: "AC Output",
                  value: inverter.AC_Power,
                  fill: "hsl(174, 100%, 27%)",
                },
              ];

              return (
                <div
                  key={inverter.panelID || index}
                  className="gradient-card rounded-xl p-6 border border-border shadow-card hover-scale hover-glow"
                >
                  {/* Inverter Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center">
                        <ArrowRightLeft className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          Inverter {inverter.panelID}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {inverter.Timestamp}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1.5 ${effStatus.bg} ${effStatus.color} rounded-full text-xs font-semibold`}
                    >
                      {efficiency}% {effStatus.label}
                    </div>
                  </div>

                  {/* Power Chart */}
                  <div className="mb-6 bg-muted/30 rounded-xl p-4">
                    <ResponsiveContainer width="100%" height={120}>
                      <BarChart data={chartData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="hsl(174, 20%, 90%)"
                          opacity={0.3}
                        />
                        <XAxis
                          dataKey="name"
                          stroke="hsl(174, 10%, 45%)"
                          fontSize={11}
                        />
                        <YAxis stroke="hsl(174, 10%, 45%)" fontSize={11} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(0, 0%, 100%)",
                            border: "1px solid hsl(174, 20%, 90%)",
                            borderRadius: "8px",
                            fontSize: "12px",
                          }}
                        />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {/* DC Side */}
                    <div className="col-span-3 bg-accent/5 rounded-xl p-4 border border-accent/20">
                      <div className="flex items-center gap-2 mb-3">
                        <Zap className="w-4 h-4 text-accent" />
                        <span className="text-xs font-semibold text-accent-foreground">
                          DC Input
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Voltage
                          </p>
                          <p className="text-lg font-bold text-foreground">
                            {inverter.DC_Voltage}V
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Current
                          </p>
                          <p className="text-lg font-bold text-foreground">
                            {inverter.DC_Current}A
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Power</p>
                          <p className="text-lg font-bold text-accent">
                            {inverter.DC_Power}W
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* AC Side */}
                    <div className="col-span-3 bg-primary/5 rounded-xl p-4 border border-primary/20">
                      <div className="flex items-center gap-2 mb-3">
                        <Activity className="w-4 h-4 text-primary" />
                        <span className="text-xs font-semibold text-foreground">
                          AC Output
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Voltage
                          </p>
                          <p className="text-lg font-bold text-foreground">
                            {inverter.AC_Voltage}V
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Current
                          </p>
                          <p className="text-lg font-bold text-foreground">
                            {inverter.AC_Current}A
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Power</p>
                          <p className="text-lg font-bold text-primary">
                            {inverter.AC_Power}W
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Efficiency Indicator */}
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        Conversion Efficiency
                      </span>
                      <span className={`text-sm font-bold ${effStatus.color}`}>
                        {efficiency}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${efficiency}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {inverters.length === 0 && (
            <div className="flex flex-col items-center justify-center p-16 bg-card rounded-xl border border-border shadow-card">
              <Zap className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No inverters found</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InvertersManagement;
