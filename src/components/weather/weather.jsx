import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CloudSun,
  Wind,
  Droplets,
  Gauge,
  Sun,
  AlertTriangle,
  ThermometerSun,
  Eye,
  TrendingUp,
  Battery,
  Zap,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const WeatherStation2 = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "bdeb06fa12b44fa44b843321dc99e5b2";
  const MINYA_LAT = 28.0871;
  const MINYA_LON = 30.7618;

  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 600000);
    return () => clearInterval(interval);
  }, []);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);

      const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${MINYA_LAT}&lon=${MINYA_LON}&appid=${API_KEY}&units=metric`
      );

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${MINYA_LAT}&lon=${MINYA_LON}&appid=${API_KEY}&units=metric`
      );

      if (!currentResponse.ok || !forecastResponse.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const currentData = await currentResponse.json();
      const forecastData = await forecastResponse.json();

      setWeather(currentData);
      setForecast(forecastData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getWindDirection = (deg) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return directions[Math.round(deg / 45) % 8];
  };

  const calculateSolarIrradiance = () => {
    if (!weather) return 0;
    const maxIrradiance = 1000;
    const cloudFactor = (100 - weather.clouds.all) / 100;
    const hour = new Date().getHours();
    let sunAngleFactor = 0;
    if (hour >= 6 && hour <= 18) {
      sunAngleFactor = Math.sin(((hour - 6) / 12) * Math.PI);
    }
    return (maxIrradiance * cloudFactor * sunAngleFactor).toFixed(0);
  };

  const getEfficiency = (temp) => {
    if (temp >= 10 && temp <= 25) return 100;
    if (temp > 25) return Math.max(50, 100 - (temp - 25) * 0.5);
    return Math.max(50, 100 - (25 - temp) * 2);
  };

  const getStatusColor = (value, optimal, warning) => {
    if (value >= optimal[0] && value <= optimal[1]) return "#22c55e";
    if (value >= warning[0] && value <= warning[1]) return "#eab308";
    return "#ef4444";
  };

  if (loading && !weather) {
    return (
      <div className="min-h-screen bg-background p-6">
        <Card className="p-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading weather data...</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-6">
        <Card className="p-8">
          <Alert className="border-destructive">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <AlertDescription className="text-destructive">
              Error loading data: {error}
            </AlertDescription>
          </Alert>
        </Card>
      </div>
    );
  }

  const irradiance = calculateSolarIrradiance();
  const efficiency = getEfficiency(weather.main.temp);

  // Data for charts
  const forecastData = forecast
    ? forecast.list.slice(0, 8).map((item) => {
        const date = new Date(item.dt * 1000);
        return {
          time: date.toLocaleTimeString("en-US", { hour: "2-digit" }),
          temp: item.main.temp.toFixed(1),
          humidity: item.main.humidity,
          wind: item.wind.speed.toFixed(1),
          clouds: item.clouds.all,
        };
      })
    : [];

  const performanceData = [
    {
      metric: "Temperature",
      value: Math.min(100, (weather.main.temp / 45) * 100),
      optimal: 60,
    },
    { metric: "Irradiance", value: (irradiance / 1000) * 100, optimal: 80 },
    {
      metric: "Wind",
      value: Math.min(100, (weather.wind.speed / 20) * 100),
      optimal: 30,
    },
    { metric: "Humidity", value: weather.main.humidity, optimal: 50 },
    { metric: "Efficiency", value: efficiency, optimal: 90 },
  ];

  const efficiencyGaugeData = [
    {
      name: "Efficiency",
      value: efficiency,
      fill:
        efficiency > 80 ? "#22c55e" : efficiency > 60 ? "#eab308" : "#ef4444",
    },
    { name: "Loss", value: 100 - efficiency, fill: "#e5e7eb" },
  ];

  const tempColor = getStatusColor(weather.main.temp, [10, 25], [25, 35]);
  const windColor = getStatusColor(weather.wind.speed, [0, 10], [10, 15]);
  const irradianceColor = getStatusColor(irradiance, [800, 1000], [600, 800]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
                <CloudSun className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-green-700">
                  Weather Station - Minya
                </h1>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Live • Updated {new Date().toLocaleTimeString("en-US")}
                </p>
              </div>
            </div>
            <button
              onClick={fetchWeatherData}
              className="px-5 py-2.5 bg-gradient-to-r  from-blue-500 to-primary/80 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium"
            >
              Refresh
            </button>
          </div>
        </Card>

        {/* Critical Alerts */}
        {(weather.main.temp > 35 ||
          weather.wind.speed > 15 ||
          weather.clouds.all > 70) && (
          <Alert className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/50 dark:to-orange-950/50 border-yellow-300 dark:border-yellow-700 shadow-md">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <AlertDescription className="text-yellow-900 dark:text-yellow-100 font-medium">
              {weather.main.temp > 35 &&
                `🌡️ High Temperature Alert: ${weather.main.temp.toFixed(
                  1
                )}°C - Panel efficiency reduced. `}
              {weather.wind.speed > 15 &&
                `💨 Strong Winds: ${weather.wind.speed.toFixed(
                  1
                )} m/s - Monitor equipment. `}
              {weather.clouds.all > 70 &&
                `☁️ Heavy Cloud Cover: ${weather.clouds.all}% - Reduced solar output.`}
            </AlertDescription>
          </Alert>
        )}

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Temperature Card */}
          <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
                  <ThermometerSun
                    className="w-5 h-5"
                    style={{ color: tempColor }}
                  />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  Temperature
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-bold" style={{ color: tempColor }}>
                {weather.main.temp.toFixed(1)}°C
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                Feels like {weather.main.feels_like.toFixed(1)}°C
              </div>
              <div className="pt-3 border-t border-border">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-muted-foreground">
                    Panel Efficiency
                  </span>
                  <span className="font-semibold" style={{ color: tempColor }}>
                    {efficiency.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-500 rounded-full"
                    style={{
                      width: `${efficiency}%`,
                      backgroundColor: tempColor,
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Solar Irradiance Card */}
          <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center">
                  <Sun className="w-5 h-5" style={{ color: irradianceColor }} />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  Solar Irradiance
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div
                className="text-4xl font-bold"
                style={{ color: irradianceColor }}
              >
                {irradiance}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="w-4 h-4" />
                W/m² • {Math.round((irradiance / 1000) * 100)}% of peak
              </div>
              <div className="pt-3 border-t border-border">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-muted-foreground">Cloud Cover</span>
                  <span className="font-semibold">{weather.clouds.all}%</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500 rounded-full"
                    style={{ width: `${weather.clouds.all}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Wind Speed Card */}
          <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                  <Wind className="w-5 h-5" style={{ color: windColor }} />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  Wind Speed
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-bold" style={{ color: windColor }}>
                {weather.wind.speed.toFixed(1)}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                m/s • Direction: {getWindDirection(weather.wind.deg)}
              </div>
              <div className="pt-3 border-t border-border">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-muted-foreground">Equipment Risk</span>
                  <span className="font-semibold" style={{ color: windColor }}>
                    {weather.wind.speed < 10
                      ? "Low"
                      : weather.wind.speed < 15
                      ? "Medium"
                      : "High"}
                  </span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-500 rounded-full"
                    style={{
                      width: `${Math.min(
                        100,
                        (weather.wind.speed / 20) * 100
                      )}%`,
                      backgroundColor: windColor,
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Humidity Card */}
          <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-blue-500" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  Humidity
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-bold text-blue-500">
                {weather.main.humidity}%
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Droplets className="w-4 h-4" />
                Relative humidity
              </div>
              <div className="pt-3 border-t border-border">
                <div className="text-xs text-muted-foreground">
                  {weather.main.humidity > 80
                    ? "⚠️ Clean panels within 48h"
                    : weather.main.humidity > 60
                    ? "📅 Schedule cleaning soon"
                    : "✅ Normal maintenance"}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Temperature Forecast Chart */}
          <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ThermometerSun className="w-5 h-5 text-primary" />
              Temperature Forecast
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  opacity={0.3}
                />
                <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="temp"
                  stroke="#f97316"
                  fill="url(#tempGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Performance Radar Chart */}
          <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Battery className="w-5 h-5 text-primary" />
              System Performance
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={performanceData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis
                  dataKey="metric"
                  stroke="#9ca3af"
                  fontSize={11}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  stroke="#9ca3af"
                  fontSize={10}
                />
                <Radar
                  name="Current"
                  dataKey="value"
                  stroke="#0d9488"
                  fill="#0d9488"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Optimal"
                  dataKey="optimal"
                  stroke="#22c55e"
                  fill="#22c55e"
                  fillOpacity={0.2}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </Card>

          {/* Wind & Humidity Chart */}
          <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Wind className="w-5 h-5 text-primary" />
              Wind & Humidity Trends
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={forecastData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  opacity={0.3}
                />
                <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="wind"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  name="Wind (m/s)"
                />
                <Line
                  type="monotone"
                  dataKey="humidity"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Humidity (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Cloud Cover Chart */}
          <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Sun className="w-5 h-5 text-primary" />
              Cloud Coverage Impact
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={forecastData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  opacity={0.3}
                />
                <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="clouds" name="Cloud Cover (%)">
                  {forecastData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        entry.clouds > 70
                          ? "#ef4444"
                          : entry.clouds > 40
                          ? "#eab308"
                          : "#22c55e"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-gradient-to-br from-card to-card/50 text-center">
            <Gauge className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{weather.main.pressure}</div>
            <div className="text-xs text-muted-foreground">hPa Pressure</div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-card to-card/50 text-center">
            <Eye className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {(weather.visibility / 1000).toFixed(1)}
            </div>
            <div className="text-xs text-muted-foreground">km Visibility</div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-card to-card/50 text-center">
            <CloudSun className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold capitalize">
              {weather.weather[0].main}
            </div>
            <div className="text-xs text-muted-foreground">Condition</div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-card to-card/50 text-center">
            <Battery className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{efficiency.toFixed(0)}%</div>
            <div className="text-xs text-muted-foreground">Efficiency</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WeatherStation2;
