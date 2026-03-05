import React, { useState, useEffect } from "react";
import {
  Battery,
  Clock,
  Heart,
  Zap,
  RefreshCw,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
const BatteryManagement = () => {
  const [batteries, setBatteries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    fetchBatteryData();
    const interval = setInterval(fetchBatteryData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchBatteryData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://1e2zoxsxah.execute-api.eu-west-3.amazonaws.com/buttery",
      );

      if (!response.ok) throw new Error("Failed to fetch battery data");

      const data = await response.json();
      setBatteries(Array.isArray(data) ? data : []);
      setLastUpdate(new Date());
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Battery fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && batteries.length === 0) {
    return (
      <DashboardLayout>
        {" "}
        <div className="min-h-screen bg-background p-6">
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-card rounded-xl p-10 border border-border shadow-card">
            <div className="w-12 h-12 border-4 border-border border-t-primary rounded-full animate-spin mb-5"></div>
            <p className="text-muted-foreground">Loading batteries...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error && batteries.length === 0) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-background p-6">
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-card rounded-xl p-10 border border-border shadow-card">
            <AlertCircle className="w-16 h-16 text-destructive mb-5" />
            <p className="text-destructive mb-5">{error}</p>
            <button
              onClick={fetchBatteryData}
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

  const fullyCharged = batteries.filter(
    (b) => b.IsFullCharge === "yes" || b[" IsFullCharge"] === "yes",
  ).length;
  const needsCharge = batteries.filter(
    (b) =>
      (b.AverageCharge || b[" AverageCharge"] || b["ِِAverageCharge"]) < 30,
  ).length;

  return (
    <DashboardLayout>
      {" "}
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
          {/* Header */}
          <div className="gradient-hero p-6 rounded-xl shadow-glow">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <Battery className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-primary-foreground">
                    Battery Management
                  </h1>
                  <p className="text-sm text-primary-foreground/90 mt-1">
                    {batteries.length} Batteries • Updated{" "}
                    {lastUpdate.toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {fullyCharged > 0 && (
                  <div className="px-4 py-2 bg-white/20 text-primary-foreground rounded-full text-sm font-medium flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    {fullyCharged} Full
                  </div>
                )}
                {needsCharge > 0 && (
                  <div className="px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {needsCharge} Low
                  </div>
                )}
                <button
                  onClick={fetchBatteryData}
                  className="p-2.5 bg-white/20 rounded-xl text-primary-foreground hover:bg-white/30 transition-smooth"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Battery Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {batteries.map((battery, index) => {
              const deviceId = battery.DeviceID;
              const isFullCharge =
                battery.IsFullCharge === "yes" ||
                battery[" IsFullCharge"] === "yes";
              const averageCharge =
                battery.AverageCharge ||
                battery[" AverageCharge"] ||
                battery["ِِAverageCharge"] ||
                0;
              const timeRemaining = battery.TimeRemaining || 0;
              const batteryHealth = battery.BatteryHealth || 0;
              const needsAttention = averageCharge < 30 || batteryHealth < 60;

              return (
                <div
                  key={deviceId || index}
                  className={`gradient-card rounded-xl p-6 border-2 shadow-card hover-scale hover-glow ${
                    needsAttention ? "border-accent" : "border-border"
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isFullCharge ? "bg-secondary" : "bg-muted"
                        }`}
                      >
                        <Battery
                          className={`w-6 h-6 ${isFullCharge ? "text-primary" : "text-primary/70"}`}
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-card-foreground">
                          Battery {deviceId}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          ID: {deviceId}
                        </span>
                      </div>
                    </div>
                    {isFullCharge && (
                      <div className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-xs font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Full
                      </div>
                    )}
                    {needsAttention && !isFullCharge && (
                      <div className="px-3 py-1.5 bg-accent/10 text-accent-foreground rounded-full text-xs font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Check
                      </div>
                    )}
                  </div>

                  {/* Charge Level */}
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground">
                        Charge Level
                      </span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="text-4xl font-bold text-foreground">
                        {averageCharge}%
                      </div>
                      <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            averageCharge >= 80
                              ? "bg-primary"
                              : averageCharge >= 50
                                ? "bg-primary/70"
                                : averageCharge >= 30
                                  ? "bg-accent"
                                  : "bg-destructive"
                          }`}
                          style={{ width: `${averageCharge}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {/* Time Remaining */}
                    <div className="p-4 bg-muted rounded-xl border border-border flex items-center gap-3">
                      <div className="w-10 h-10 bg-card rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          {timeRemaining}h
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Time Left
                        </div>
                      </div>
                    </div>

                    {/* Battery Health */}
                    <div className="p-4 bg-muted rounded-xl border border-border flex items-center gap-3">
                      <div className="w-10 h-10 bg-card rounded-lg flex items-center justify-center">
                        <Heart
                          className={`w-5 h-5 ${
                            batteryHealth >= 90
                              ? "text-primary"
                              : batteryHealth >= 70
                                ? "text-primary/70"
                                : batteryHealth >= 50
                                  ? "text-accent"
                                  : "text-destructive"
                          }`}
                        />
                      </div>
                      <div>
                        <div
                          className={`text-2xl font-bold ${
                            batteryHealth >= 90
                              ? "text-primary"
                              : batteryHealth >= 70
                                ? "text-primary/70"
                                : batteryHealth >= 50
                                  ? "text-accent"
                                  : "text-destructive"
                          }`}
                        >
                          {batteryHealth}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Health
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="p-3 bg-muted rounded-lg border border-border text-center text-sm font-medium">
                    {isFullCharge && (
                      <span className="text-primary">
                        ✓ Fully Charged & Ready
                      </span>
                    )}
                    {!isFullCharge && averageCharge < 30 && (
                      <span className="text-accent">
                        ⚠ Low Charge - Needs Charging Soon
                      </span>
                    )}
                    {!isFullCharge &&
                      averageCharge >= 30 &&
                      averageCharge < 80 && (
                        <span className="text-primary/70">
                          ○ Charging in Progress
                        </span>
                      )}
                    {!isFullCharge && averageCharge >= 80 && (
                      <span className="text-primary">↑ Almost Full</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {batteries.length === 0 && (
            <div className="flex flex-col items-center justify-center p-16 bg-card rounded-xl border border-border shadow-card">
              <Battery className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No batteries found</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BatteryManagement;
