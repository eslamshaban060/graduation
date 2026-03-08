import { useState, useEffect, useCallback } from "react";
import {
  Zap,
  Activity,
  Battery,
  Eye,
  TrendingUp,
  RefreshCw,
  Wifi,
  WifiOff,
  Clock,
  AlertTriangle,
  Sun,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DashboardLayout from "@/components/DashboardLayout";

/* ─── CONFIG ─────────────────────────────── */
const API_SYSTEM =
  "https://5f88kivgsg.execute-api.eu-west-3.amazonaws.com/API-system_summary";
const API_SOLAR =
  "https://5qo8xe66p8.execute-api.eu-west-3.amazonaws.com/solar";
const WEATHER_KEY = "bdeb06fa12b44fa44b843321dc99e5b2";
const LAT = 28.0871,
  LON = 30.7618;
const REFRESH_MS = 30_000;
const WEATHER_MS = 600_000;

/* ─── HELPERS ────────────────────────────── */
const fmt = (v, d = 1) => (v == null || isNaN(v) ? "—" : Number(v).toFixed(d));

const fmtTs = (ts) => {
  if (!ts) return null;
  try {
    return new Date(ts).toLocaleTimeString("en-EG", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return null;
  }
};

const safeFetch = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
    return { ok: true, data: await res.json() };
  } catch (e) {
    return { ok: false, error: e.message };
  }
};

const latestOf = (arr) => {
  if (!Array.isArray(arr) || !arr.length) return null;
  return arr.reduce((a, b) =>
    new Date(a.Timestamp) > new Date(b.Timestamp) ? a : b,
  );
};

const calcWeatherScore = (clouds = 0, temp = 25, rain = 0) => {
  const cloudPenalty = clouds * 0.7;
  const heatPenalty = Math.max(0, temp - 25) * 0.5;
  const rainPenalty = rain > 0 ? 15 : 0;
  return Math.max(
    0,
    Math.min(100, 100 - cloudPenalty - heatPenalty - rainPenalty),
  );
};

const scoreInfo = (score) => {
  if (score >= 75) return { label: "Optimal", color: "hsl(var(--primary))" };
  if (score >= 50) return { label: "Good", color: "hsl(var(--primary-glow))" };
  if (score >= 25) return { label: "Reduced", color: "hsl(var(--accent))" };
  return { label: "Critical", color: "hsl(0 72% 51%)" };
};

/* ─── PULSE DOT ──────────────────────────── */
const PulseDot = ({ color = "hsl(var(--primary))" }) => (
  <span className="relative flex w-2 h-2 shrink-0">
    <span
      className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping"
      style={{ background: color }}
    />
    <span
      className="relative inline-flex w-2 h-2 rounded-full"
      style={{ background: color }}
    />
  </span>
);

/* ─── STAT CARD ──────────────────────────── */
const StatCard = ({
  icon: Icon,
  label,
  value,
  unit,
  sub,
  accent = "hsl(var(--primary))",
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="relative rounded-2xl p-4 overflow-hidden"
    style={{
      background: "hsl(var(--card))",
      border: "1px solid hsl(var(--border))",
      boxShadow: "var(--shadow-card)",
    }}
  >
    <div
      className="absolute -top-5 -right-5 w-20 h-20 rounded-full blur-2xl opacity-15 pointer-events-none"
      style={{ background: accent }}
    />
    <div
      className="w-9 h-9 rounded-[10px] flex items-center justify-center mb-3"
      style={{ background: `${accent}22` }}
    >
      <Icon
        className="w-[17px] h-[17px]"
        style={{ color: accent }}
        strokeWidth={2}
      />
    </div>
    <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">
      {label}
    </p>
    <div className="flex items-end gap-1 leading-none">
      <span className="text-[22px] font-bold text-foreground">
        {value ?? "—"}
      </span>
      {unit && (
        <span className="text-[11px] text-muted-foreground mb-0.5">{unit}</span>
      )}
    </div>
    {sub && (
      <p className="text-[10px] text-muted-foreground mt-1.5 flex items-center gap-1">
        <Clock className="w-2.5 h-2.5" />
        {sub}
      </p>
    )}
  </motion.div>
);

/* ─── SKELETON ───────────────────────────── */
const Skel = ({ className }) => (
  <div
    className={`animate-pulse rounded-2xl ${className}`}
    style={{ background: "hsl(var(--muted))" }}
  />
);

/* ─── SECTION HEADER ─────────────────────── */
const SectionHeader = ({
  icon: Icon,
  title,
  sub,
  color = "hsl(var(--primary))",
}) => (
  <div className="flex items-center gap-3 mb-5">
    <div
      className="w-8 h-8 rounded-[10px] flex items-center justify-center"
      style={{ background: `${color}18` }}
    >
      <Icon className="w-4 h-4" style={{ color }} strokeWidth={2.2} />
    </div>
    <div>
      <h2 className="text-sm font-bold text-foreground leading-none">
        {title}
      </h2>
      {sub && <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  </div>
);

/* ─── TOOLTIP ────────────────────────────── */
const ChartTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl px-3 py-2.5 text-xs space-y-1"
      style={{
        background: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <p className="text-muted-foreground font-medium mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: p.color }}
          />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-bold text-foreground">
            {p.value}
            {p.unit ?? ""}
          </span>
        </p>
      ))}
    </div>
  );
};

/* ════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════ */
export default function RealtimeMonitoring() {
  const [system, setSystem] = useState(null);
  const [systemErr, setSystemErr] = useState(null);
  const [loadingSys, setLoadingSys] = useState(true);

  // ✅ كل الـ history من الـ API دفعة واحدة
  const [powerHistory, setPowerHistory] = useState([]);
  const [loadingChart, setLoadingChart] = useState(true);

  const [impactData, setImpactData] = useState([]);
  const [lastSync, setLastSync] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [currentWx, setCurrentWx] = useState(null);

  /* ─────────────────────────────────────────
     fetchSystem
     - جيب كل الـ records من الـ API
     - رتّبهم بالـ Timestamp
     - ابني الـ powerHistory من كلهم
     - خزّن آخر record في system (للـ KPI cards)
  ───────────────────────────────────────── */
  const fetchSystem = useCallback(async () => {
    setLoadingSys(true);
    setLoadingChart(true);

    const { ok, data, error } = await safeFetch(API_SYSTEM);

    if (!ok) {
      setSystemErr(error);
      setLoadingSys(false);
      setLoadingChart(false);
      return;
    }

    const arr = (Array.isArray(data) ? data : [data])
      .filter((r) => r?.Timestamp)
      .sort((a, b) => new Date(a.Timestamp) - new Date(b.Timestamp)); // ترتيب تصاعدي

    if (!arr.length) {
      setSystemErr("No data returned");
      setLoadingSys(false);
      setLoadingChart(false);
      return;
    }

    // ✅ آخر record للـ KPI cards
    const snap = arr[arr.length - 1];
    setSystem(snap);
    setSystemErr(null);
    setLastSync(new Date());

    // ✅ كل الـ records للـ chart — آخر 40 نقطة عشان محدش يتزحمش
    const history = arr.slice(-40).map((r) => ({
      time: fmtTs(r.Timestamp) ?? "",
      acPower: r.Total_AC_PanelPower ?? 0,
      dcPower: r.Total_DC_PanelPower ?? 0,
    }));

    setPowerHistory(history);
    setLoadingSys(false);
    setLoadingChart(false);
  }, []);

  /* ─── fetch solar + weather → impact chart ─── */
  const fetchImpact = useCallback(async () => {
    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);

    const [solarRes, wxRes, foreRes] = await Promise.all([
      safeFetch(API_SOLAR),
      safeFetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${WEATHER_KEY}&units=metric`,
      ),
      safeFetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${WEATHER_KEY}&units=metric`,
      ),
    ]);

    const wx = wxRes.ok ? wxRes.data : null;
    setCurrentWx(wx);

    const foreList = foreRes.ok ? (foreRes.data?.list ?? []) : [];

    const nearestFore = (ts) => {
      if (!foreList.length) return null;
      const t = new Date(ts).getTime();
      return foreList.reduce((a, b) =>
        Math.abs(b.dt * 1000 - t) < Math.abs(a.dt * 1000 - t) ? b : a,
      );
    };

    const solarArr =
      solarRes.ok && Array.isArray(solarRes.data)
        ? solarRes.data.filter((r) => new Date(r.Timestamp) >= todayMidnight)
        : [];

    const pastPoints = solarArr.map((r) => {
      const fore = nearestFore(r.Timestamp);
      const clouds = fore?.clouds?.all ?? wx?.clouds?.all ?? 0;
      const temp = fore?.main?.temp ?? wx?.main?.temp ?? 25;
      const rain = fore?.rain?.["3h"] ?? wx?.rain?.["1h"] ?? 0;
      const score = Math.round(calcWeatherScore(clouds, temp, rain));
      return {
        time: fmtTs(r.Timestamp) ?? "",
        solarPower: r.SolarPower ?? 0,
        weatherScore: score,
        clouds,
        temp: Math.round(temp),
      };
    });

    const futurePoints = foreList.slice(0, 5).map((s) => {
      const clouds = s.clouds?.all ?? 0;
      const temp = s.main?.temp ?? 25;
      const rain = s.rain?.["3h"] ?? 0;
      const score = Math.round(calcWeatherScore(clouds, temp, rain));
      return {
        time: fmtTs(new Date(s.dt * 1000).toISOString()) ?? "",
        solarPower: null,
        weatherScore: score,
        clouds,
        temp: Math.round(temp),
        forecast: true,
      };
    });

    setImpactData([...pastPoints, ...futurePoints]);

    if (wx) {
      const newAlerts = [];
      const clouds = wx.clouds?.all ?? 0;
      const rain = wx.rain?.["1h"] ?? 0;
      const wind = wx.wind?.speed ?? 0;
      if (clouds > 70)
        newAlerts.push(`Cloud cover ${clouds}% — solar output reduced`);
      if (rain > 0)
        newAlerts.push(`Rain ${rain} mm/h — panel efficiency impacted`);
      if (wind > 15)
        newAlerts.push(`High wind ${wind} m/s — check panel fixtures`);
      setAlerts(newAlerts);
    }
  }, []);

  useEffect(() => {
    fetchSystem();
    fetchImpact();
    const t1 = setInterval(fetchSystem, REFRESH_MS);
    const t2 = setInterval(fetchImpact, WEATHER_MS);
    return () => {
      clearInterval(t1);
      clearInterval(t2);
    };
  }, [fetchSystem, fetchImpact]);

  const currentScore = currentWx
    ? Math.round(
        calcWeatherScore(
          currentWx.clouds?.all ?? 0,
          currentWx.main?.temp ?? 25,
          currentWx.rain?.["1h"] ?? 0,
        ),
      )
    : null;
  const scoreStyle = currentScore != null ? scoreInfo(currentScore) : null;

  /* ────────────────────────────────────────── */
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        {/* Ambient bg */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.06]"
            style={{ background: "hsl(var(--primary))" }}
          />
          <div
            className="absolute -bottom-32 right-0 w-96 h-96 rounded-full blur-3xl opacity-[0.05]"
            style={{ background: "hsl(var(--accent))" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          {/* ══ PAGE HEADER ══ */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-[10px] gradient-hero flex items-center justify-center shadow-glow">
                  <Activity
                    className="w-4 h-4 text-primary-foreground"
                    strokeWidth={2.5}
                  />
                </div>
                <h1 className="text-xl font-bold text-foreground tracking-tight">
                  Real-Time Monitoring
                </h1>
              </div>
              <p className="text-sm text-muted-foreground">
                Live system overview · Minya Solar Station
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium"
                style={{
                  background: !systemErr
                    ? "hsl(var(--primary) / 0.1)"
                    : "hsl(0 75% 55% / 0.1)",
                  border: `1px solid ${!systemErr ? "hsl(var(--primary) / 0.3)" : "hsl(0 75% 55% / 0.3)"}`,
                  color: !systemErr ? "hsl(var(--primary))" : "hsl(0 70% 45%)",
                }}
              >
                {!systemErr ? (
                  <Wifi className="w-3.5 h-3.5" />
                ) : (
                  <WifiOff className="w-3.5 h-3.5" />
                )}
                {!systemErr ? "Online" : "Error"}
              </div>

              {lastSync && (
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {lastSync.toLocaleTimeString("en-EG", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </span>
              )}

              <motion.button
                whileTap={{ rotate: 180 }}
                transition={{ duration: 0.35 }}
                onClick={() => {
                  fetchSystem();
                  fetchImpact();
                }}
                className="w-8 h-8 rounded-[10px] flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                style={{
                  background: "hsl(var(--muted) / 0.6)",
                  border: "1px solid hsl(var(--border))",
                }}
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </motion.div>

          {/* ══ ALERTS ══ */}
          <AnimatePresence>
            {alerts.map((msg, i) => (
              <motion.div
                key={msg}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium overflow-hidden"
                style={{
                  background: "hsl(var(--accent) / 0.1)",
                  border: "1px solid hsl(var(--accent) / 0.35)",
                  color: "hsl(var(--accent))",
                }}
              >
                <AlertTriangle className="w-4 h-4 shrink-0" />
                {msg}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* ══ SYSTEM KPIs ══ */}
          <div>
            <SectionHeader
              icon={Zap}
              title="System Overview"
              sub="Main_SYSTEM · latest snapshot"
              color="hsl(var(--primary))"
            />
            {loadingSys ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {[...Array(5)].map((_, i) => (
                  <Skel key={i} className="h-28" />
                ))}
              </div>
            ) : systemErr ? (
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
                style={{
                  background: "hsl(0 75% 55% / 0.08)",
                  border: "1px solid hsl(0 75% 55% / 0.25)",
                  color: "hsl(0 70% 45%)",
                }}
              >
                <WifiOff className="w-4 h-4" /> Cannot load system data:{" "}
                {systemErr}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                <StatCard
                  icon={Zap}
                  label="AC Power"
                  value={fmt(system.Total_AC_PanelPower, 0)}
                  unit="W"
                  accent="hsl(var(--primary))"
                  delay={0.05}
                  sub={fmtTs(system.Timestamp)}
                />
                <StatCard
                  icon={Activity}
                  label="DC Power"
                  value={fmt(system.Total_DC_PanelPower, 0)}
                  unit="W"
                  accent="hsl(var(--primary-glow))"
                  delay={0.1}
                  sub={fmtTs(system.Timestamp)}
                />
                <StatCard
                  icon={TrendingUp}
                  label="AC Voltage"
                  value={fmt(system.Total_AC_PanelVoltage, 0)}
                  unit="V"
                  accent="hsl(var(--accent))"
                  delay={0.15}
                />
                <StatCard
                  icon={Eye}
                  label="AC Current"
                  value={fmt(system.Total_AC_PanelCurrent, 0)}
                  unit="A"
                  accent="hsl(var(--accent))"
                  delay={0.2}
                />
                <StatCard
                  icon={Battery}
                  label="Battery"
                  value={fmt(system.TotalBatteryCharge, 0)}
                  unit="%"
                  accent={
                    system.TotalBatteryCharge < 30
                      ? "hsl(0 75% 55%)"
                      : "hsl(var(--primary))"
                  }
                  delay={0.25}
                />
              </div>
            )}
          </div>

          {/* ══ POWER TREND ══ */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl p-5"
            style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              boxShadow: "var(--shadow-card)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
              <div>
                <p className="text-sm font-bold text-foreground">Power Trend</p>
                <p className="text-[11px] text-muted-foreground">
                  AC & DC output —{" "}
                  {loadingChart
                    ? "loading..."
                    : `${powerHistory.length} readings`}
                </p>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: "hsl(var(--primary))" }}
                  />
                  AC (W)
                </span>
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: "hsl(var(--accent))" }}
                  />
                  DC (W)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 mb-4">
              <PulseDot />
              <span className="text-[10px] text-muted-foreground">
                Auto-refresh every {REFRESH_MS / 1000}s
              </span>
            </div>

            {/* Chart or skeleton */}
            {loadingChart ? (
              <Skel className="h-[200px]" />
            ) : powerHistory.length < 2 ? (
              <div
                className="h-[200px] flex items-center justify-center rounded-xl text-sm text-muted-foreground"
                style={{ background: "hsl(var(--muted))" }}
              >
                Not enough data points yet
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart
                  data={powerHistory}
                  margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="acG" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.28}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient id="dcG" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--accent))"
                        stopOpacity={0.28}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--accent))"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="time"
                    tick={{
                      fontSize: 10,
                      fill: "hsl(var(--muted-foreground))",
                    }}
                    tickLine={false}
                    axisLine={false}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    tick={{
                      fontSize: 10,
                      fill: "hsl(var(--muted-foreground))",
                    }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<ChartTip />} />
                  <Area
                    type="monotone"
                    dataKey="acPower"
                    name="AC"
                    stroke="hsl(var(--primary))"
                    fill="url(#acG)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="dcPower"
                    name="DC"
                    stroke="hsl(var(--accent))"
                    fill="url(#dcG)"
                    strokeWidth={2}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </motion.div>

          {/* ══ WEATHER IMPACT ON SOLAR ══ */}
          <div>
            <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-[10px] flex items-center justify-center"
                  style={{ background: "hsl(var(--accent) / 0.15)" }}
                >
                  <Sun
                    className="w-4 h-4"
                    style={{ color: "hsl(var(--accent))" }}
                    strokeWidth={2.2}
                  />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-foreground leading-none">
                    Weather Impact on Solar Output
                  </h2>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Score = how much weather allows panels to produce (0 =
                    blocked · 100 = perfect)
                  </p>
                </div>
              </div>

              {scoreStyle && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
                  style={{
                    background: `${scoreStyle.color}14`,
                    border: `1px solid ${scoreStyle.color}40`,
                  }}
                >
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground leading-none">
                      Now
                    </p>
                    <p
                      className="text-xl font-bold leading-none mt-0.5"
                      style={{ color: scoreStyle.color }}
                    >
                      {currentScore}
                      <span className="text-sm font-medium">/100</span>
                    </p>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div>
                    <p
                      className="text-[11px] font-semibold"
                      style={{ color: scoreStyle.color }}
                    >
                      {scoreStyle.label}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {currentWx?.clouds?.all ?? 0}% clouds ·{" "}
                      {Math.round(currentWx?.main?.temp ?? 0)}°C
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {impactData.length === 0 ? (
              <Skel className="h-64" />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl p-5"
                style={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div className="flex items-center gap-4 text-[11px] text-muted-foreground mb-4 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: "hsl(var(--primary))" }}
                    />
                    Solar Power (W)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="w-8 h-0.5 rounded"
                      style={{
                        background: "hsl(var(--accent))",
                        borderTop: "2px dashed hsl(var(--accent))",
                      }}
                    />
                    Weather Score (0–100)
                  </span>
                  <span
                    className="ml-auto text-[10px] px-2 py-0.5 rounded-lg"
                    style={{ background: "hsl(var(--muted))" }}
                  >
                    Dashed = forecast
                  </span>
                </div>

                <ResponsiveContainer width="100%" height={220}>
                  <ComposedChart
                    data={impactData}
                    margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="spGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity={0.25}
                        />
                        <stop
                          offset="95%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="time"
                      tick={{
                        fontSize: 10,
                        fill: "hsl(var(--muted-foreground))",
                      }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      yAxisId="power"
                      tick={{
                        fontSize: 10,
                        fill: "hsl(var(--muted-foreground))",
                      }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      yAxisId="score"
                      orientation="right"
                      domain={[0, 100]}
                      tick={{
                        fontSize: 10,
                        fill: "hsl(var(--muted-foreground))",
                      }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip content={<ChartTip />} />
                    <Bar
                      yAxisId="power"
                      dataKey="solarPower"
                      name="Solar Power"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.7}
                      radius={[4, 4, 0, 0]}
                    />
                    <Line
                      yAxisId="score"
                      type="monotone"
                      dataKey="weatherScore"
                      name="Weather Score"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: "hsl(var(--accent))", strokeWidth: 0 }}
                      strokeDasharray="6 3"
                      connectNulls
                    />
                  </ComposedChart>
                </ResponsiveContainer>

                <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-x-5 gap-y-1 text-[10px] text-muted-foreground">
                  <span>
                    Formula: Score = 100 − (clouds% × 0.7) − (max(0, temp−25) ×
                    0.5) − (rain ? 15 : 0)
                  </span>
                  <span className="ml-auto">
                    Bars = real measurements · Line = weather score
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          <p className="text-center text-[11px] text-muted-foreground pb-6">
            Auto-refresh every {REFRESH_MS / 1000}s
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
