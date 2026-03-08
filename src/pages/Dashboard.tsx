import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Battery,
  Zap,
  Activity,
  Wifi,
  WifiOff,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Clock,
  Wind,
  Droplets,
  ExternalLink,
  TrendingUp,
  Coins,
  Sun,
  Heart,
  Timer,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DashboardLayout from "@/components/DashboardLayout";
/* ═══════════════════════════════════
   CONFIG
═══════════════════════════════════ */
const PRICE_PER_KWH = 2.25;

const STATION = {
  name: "Minya Solar Station",
  location: "Minya, Egypt",
  lat: 28.0871,
  lon: 30.7618,
  capacity: "~50 kWp",
};

const API_SYSTEM =
  "https://5f88kivgsg.execute-api.eu-west-3.amazonaws.com/API-system_summary";
const API_BATTERY =
  "https://1e2zoxsxah.execute-api.eu-west-3.amazonaws.com/buttery";
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${STATION.lat}&lon=${STATION.lon}&appid=bdeb06fa12b44fa44b843321dc99e5b2&units=metric`;
const REFRESH_MS = 30_000;

/* ═══════════════════════════════════
   SYSTEM API EXACT FIELDS
   Total_AC_PanelPower, Total_DC_PanelPower
   Total_AC_PanelVoltage, Total_AC_PanelCurrent
   TotalBatteryCharge, Timestamp, summaryID
═══════════════════════════════════ */

/* ═══════════════════════════════════
   BATTERY API EXACT FIELDS
   DeviceID, AverageCharge (has leading spaces/arabic in some records!)
   BatteryHealth, TimeRemaining, IsFullCharge, timestamp
═══════════════════════════════════ */

/* ── Clean battery field: strip leading spaces & unicode ── */
const cleanBatField = (rec, fieldName) => {
  // battery API has dirty keys like " AverageCharge" and "ِِAverageCharge"
  // so we strip all non-ASCII + spaces from keys before comparing
  const normalize = (s) =>
    s
      .replace(/[^\x00-\x7F]/g, "")
      .trim()
      .toLowerCase();
  const target = normalize(fieldName);
  for (const k of Object.keys(rec)) {
    if (normalize(k) === target) {
      const v = Number(rec[k]);
      return isNaN(v) ? rec[k] : v;
    }
  }
  return null;
};

const batCharge = (rec) => Number(cleanBatField(rec, "AverageCharge")) || 0;
const batHealth = (rec) => Number(cleanBatField(rec, "BatteryHealth")) || 0;
const batTimeLeft = (rec) => Number(cleanBatField(rec, "TimeRemaining")) || 0;
const batIsFull = (rec) => {
  const v = cleanBatField(rec, "IsFullCharge");
  return String(v).trim().toLowerCase() === "yes";
};

/* ═══════════════════════════════════
   SAFE FETCH
═══════════════════════════════════ */
const safeFetch = async (url) => {
  try {
    const r = await fetch(url);
    if (!r.ok) return { ok: false, data: null };
    return { ok: true, data: await r.json() };
  } catch {
    return { ok: false, data: null };
  }
};

const toArray = (d) => {
  if (Array.isArray(d)) return d;
  if (d && typeof d === "object") return [d];
  return [];
};

/* ═══════════════════════════════════
   ENERGY CHART HELPERS
   — build kWh buckets from all System API readings
═══════════════════════════════════ */

// trapezoidal kWh from sorted {wh, ts} points
const calcKWh = (points) => {
  if (points.length < 2) return 0;
  let kwh = 0;
  for (let i = 1; i < points.length; i++) {
    const dtH = (points[i].ts - points[i - 1].ts) / 3_600_000;
    const avgW = (points[i].wh + points[i - 1].wh) / 2;
    kwh += (avgW * dtH) / 1000;
  }
  return kwh;
};

const labelFor = (ts, range) => {
  const d = new Date(ts);
  if (range === "day")
    return d.toLocaleTimeString("en-EG", {
      hour: "2-digit",
      minute: "2-digit",
    });
  if (range === "week")
    return d.toLocaleDateString("en-EG", { weekday: "short", day: "numeric" });
  return d.toLocaleDateString("en-EG", { month: "short", day: "numeric" });
};

const cutoffFor = (range) => {
  const now = Date.now();
  if (range === "day") return now - 86_400_000;
  if (range === "week") return now - 604_800_000;
  return now - 2_592_000_000;
};

// group readings into time-label buckets → avg W → kWh estimate
const buildChartData = (points, range) => {
  const cutoff = cutoffFor(range);
  const filtered = points.filter((p) => p.ts >= cutoff);
  if (!filtered.length) return [];

  const slots = new Map();
  filtered.forEach((p) => {
    const lbl = labelFor(p.ts, range);
    if (!slots.has(lbl)) slots.set(lbl, []);
    slots.get(lbl).push(p);
  });

  const result = [];
  slots.forEach((pts, lbl) => {
    // kWh for this slot = trapezoidal if >1 pt, else estimate 30-min window
    const kWh =
      pts.length > 1
        ? calcKWh(pts)
        : (pts[0].wh / 1000) * (range === "day" ? 0.5 : 1);
    result.push({ label: lbl, kWh: +kWh.toFixed(3) });
  });
  return result;
};

/* ═══════════════════════════════════
   FORMAT
═══════════════════════════════════ */
const f0 = (v) => Math.round(Number(v)).toLocaleString("en-EG");
const f1 = (v) => Number(v).toFixed(1);
const egp = (v) =>
  `EGP ${Number(v).toLocaleString("en-EG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/* ═══════════════════════════════════
   STATUS COLORS
═══════════════════════════════════ */
const SC = {
  ok: "hsl(var(--primary))",
  warn: "hsl(var(--accent))",
  error: "hsl(0 72% 51%)",
  idle: "hsl(var(--muted-foreground))",
};

function StatusDot({ s }) {
  return (
    // <DashboardLayout>
    <span className="relative flex w-2.5 h-2.5 shrink-0">
      {s !== "idle" && (
        <span
          className="absolute inset-0 rounded-full opacity-60 animate-ping"
          style={{ background: SC[s] }}
        />
      )}
      <span
        className="relative w-2.5 h-2.5 rounded-full"
        style={{ background: SC[s] }}
      />
    </span>
    // </DashboardLayout>
  );
}

function ChartTip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const kwh = payload[0].value;
  return (
    <DashboardLayout>
      <div
        className="rounded-xl px-3 py-2.5 text-xs space-y-1"
        style={{
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          boxShadow: "var(--shadow-card)",
        }}
      >
        <p className="text-muted-foreground font-medium">{label}</p>
        <p className="font-bold text-foreground">{f1(kwh)} kWh</p>
        <p style={{ color: "hsl(var(--accent))" }}>
          {egp(kwh * PRICE_PER_KWH)}
        </p>
      </div>
    </DashboardLayout>
  );
}

/* ── Battery health color ── */
const batColor = (pct) =>
  pct >= 70
    ? "hsl(var(--primary))"
    : pct >= 35
      ? "hsl(var(--accent))"
      : "hsl(0 72% 51%)";

/* ═══════════════════════════════════
   MAIN
═══════════════════════════════════ */
export default function Dashboard() {
  const [sysLatest, setSysLatest] = useState(null); // latest system snapshot for KPIs
  const [energyPts, setEnergyPts] = useState([]); // all {wh, ts} from every API poll
  const [batteries, setBatteries] = useState([]); // one record per DeviceID
  const [wx, setWx] = useState(null);
  const [loading, setLoading] = useState(true);
  const [online, setOnline] = useState(null);
  const [lastSync, setLastSync] = useState(null);
  const [range, setRange] = useState("day");
  const initialized = useRef(false);

  /* ── System API ──────────────────── */
  const loadSystem = useCallback(async () => {
    const { ok, data } = await safeFetch(API_SYSTEM);
    if (!ok) {
      setOnline(false);
      return;
    }

    const all = toArray(data); // e.g. [{...}, {...}] — array of ALL readings
    if (!all.length) return;

    // latest record for KPI cards
    const latest = all.reduce((a, b) =>
      new Date(b.Timestamp) > new Date(a.Timestamp) ? b : a,
    );
    setSysLatest(latest);
    setOnline(true);
    setLastSync(new Date());

    // add ALL readings to energy chart (dedup by Timestamp)
    setEnergyPts((prev) => {
      const seen = new Set(prev.map((p) => p.ts));
      const newPts = all
        .map((r) => ({
          wh: Number(r.Total_AC_PanelPower) || 0,
          ts: new Date(r.Timestamp).getTime(),
        }))
        .filter((p) => p.ts && !seen.has(p.ts));

      if (!newPts.length) return prev;
      return [...prev, ...newPts].sort((a, b) => a.ts - b.ts).slice(-5000);
    });
  }, []);

  /* ── Battery API ─────────────────── */
  const loadBattery = useCallback(async () => {
    const { ok, data } = await safeFetch(API_BATTERY);
    if (!ok) return;

    const all = toArray(data);
    // group by DeviceID — keep latest timestamp per device
    const map = new Map();
    all.forEach((r) => {
      const id = String(r.DeviceID ?? "unknown");
      const ts = new Date(String(r.timestamp ?? "").trim()).getTime();
      const ex = map.get(id);
      if (!ex || ts > ex._ts) map.set(id, { ...r, _ts: ts });
    });
    setBatteries([...map.values()]);
  }, []);

  /* ── Weather ─────────────────────── */
  const loadWeather = useCallback(async () => {
    const { ok, data } = await safeFetch(WEATHER_URL);
    if (ok && data) setWx(Array.isArray(data) ? data[0] : data);
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    Promise.all([loadSystem(), loadBattery(), loadWeather()]).finally(() =>
      setLoading(false),
    );
    const t1 = setInterval(loadSystem, REFRESH_MS);
    const t2 = setInterval(loadBattery, REFRESH_MS);
    const t3 = setInterval(loadWeather, 600_000);
    return () => [t1, t2, t3].forEach(clearInterval);
  }, [loadSystem, loadBattery, loadWeather]);

  /* ── Derived from System API ─────── */
  const acPower = sysLatest ? Number(sysLatest.Total_AC_PanelPower) || 0 : null;
  const dcPower = sysLatest ? Number(sysLatest.Total_DC_PanelPower) || 0 : null;
  const acVolt = sysLatest
    ? Number(sysLatest.Total_AC_PanelVoltage) || 0
    : null;
  const sysBat = sysLatest ? Number(sysLatest.TotalBatteryCharge) || 0 : null;

  /* ── Derived from Battery API ────── */
  const avgBatCharge = batteries.length
    ? Math.round(
        batteries.reduce((s, b) => s + batCharge(b), 0) / batteries.length,
      )
    : null;
  const avgBatHealth = batteries.length
    ? Math.round(
        batteries.reduce((s, b) => s + batHealth(b), 0) / batteries.length,
      )
    : null;
  const lowBatCount = batteries.filter((b) => batCharge(b) < 20).length;
  const fullCount = batteries.filter((b) => batIsFull(b)).length;

  /* ── Energy chart ────────────────── */
  const chartData = buildChartData(energyPts, range);
  const rangedPts = energyPts.filter((p) => p.ts >= cutoffFor(range));
  const totalKWh = calcKWh(rangedPts);
  const totalRev = totalKWh * PRICE_PER_KWH;

  /* ── Status ─────────────────────── */
  const sysStatus = !online
    ? "error"
    : lowBatCount > 0
      ? "warn"
      : online
        ? "ok"
        : "idle";

  /* ── Weather ─────────────────────── */
  const wxMain = wx?.main ?? {};
  const wxWnd = wx?.wind ?? {};
  const wxCld = wx?.clouds ?? {};
  const wxArr = wx?.weather ?? [];
  const wxTemp = wxMain.temp != null ? Math.round(Number(wxMain.temp)) : null;
  const wxFeel =
    wxMain.feels_like != null ? Math.round(Number(wxMain.feels_like)) : null;
  const wxHum =
    wxMain.humidity != null ? Math.round(Number(wxMain.humidity)) : null;
  const wxSpeed = wxWnd.speed != null ? Math.round(Number(wxWnd.speed)) : null;
  const wxClouds = wxCld.all != null ? Math.round(Number(wxCld.all)) : null;
  const wxDesc = wxArr[0]?.description ?? "";
  const wxIcon = wxArr[0]?.icon ?? "";

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  });

  /* ═══════════════════════════════════════════ */
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background overflow-x-hidden">
        {/* bg blobs */}
        <div className="fixed inset-0 pointer-events-none -z-0 overflow-hidden">
          <div
            className="absolute -top-56 -left-56 w-[700px] h-[700px] rounded-full blur-3xl opacity-[0.06]"
            style={{ background: "hsl(var(--primary))" }}
          />
          <div
            className="absolute top-1/2 right-[-20%] w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.04]"
            style={{ background: "hsl(var(--accent))" }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-5">
          {/* ══ HERO ══ */}
          <motion.div
            {...fade(0)}
            className="relative rounded-3xl overflow-hidden p-7 sm:p-10"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--primary)/0.12) 0%, hsl(var(--accent)/0.06) 100%)",
              border: "1px solid hsl(var(--primary)/0.2)",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            <div
              className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-[0.07]"
              style={{
                background:
                  "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)",
              }}
            />

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <StatusDot s={loading ? "idle" : sysStatus} />
                  <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: SC[loading ? "idle" : sysStatus] }}
                  >
                    {loading
                      ? "Connecting…"
                      : sysStatus === "ok"
                        ? "All Systems Operational"
                        : sysStatus === "warn"
                          ? "Attention Required"
                          : "Connection Error"}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight leading-none">
                  {STATION.name}
                </h1>

                <a
                  href={`https://maps.google.com/?q=${STATION.lat},${STATION.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group w-fit"
                >
                  <MapPin
                    className="w-4 h-4 shrink-0"
                    style={{ color: "hsl(var(--primary))" }}
                  />
                  {STATION.location}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" />
                </a>

                {lastSync && (
                  <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    Last synced{" "}
                    {lastSync.toLocaleTimeString("en-EG", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </p>
                )}
              </div>

              {/* capacity + battery count */}
              <div className="flex sm:flex-col gap-3 flex-wrap shrink-0">
                <div
                  className="flex flex-col items-center justify-center px-5 py-3 rounded-2xl"
                  style={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                >
                  <span className="text-2xl font-bold text-foreground">
                    {STATION.capacity}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                    Design Capacity
                  </span>
                </div>
                <div
                  className="flex flex-col items-center justify-center px-4 py-2.5 rounded-2xl"
                  style={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                >
                  <span className="text-xl font-bold text-foreground">
                    {loading ? "—" : batteries.length}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Batteries
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ══ KPI CARDS — from System API ══ */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                icon: Zap,
                label: "AC Output",
                value: loading
                  ? null
                  : acPower != null
                    ? `${f0(acPower)} W`
                    : "—",
                sub: acVolt != null ? `${f1(acVolt / 100)} V` : undefined,
                color: "hsl(var(--primary))",
                delay: 0.1,
              },
              {
                icon: Activity,
                label: "DC Input",
                value: loading
                  ? null
                  : dcPower != null
                    ? `${f0(dcPower)} W`
                    : "—",
                sub: undefined,
                color: "hsl(var(--primary-glow))",
                delay: 0.14,
              },
              {
                icon: Battery,
                label: "Avg Battery",
                value: loading
                  ? null
                  : avgBatCharge != null
                    ? `${avgBatCharge}%`
                    : sysBat != null
                      ? `${sysBat}%`
                      : "—",
                sub: batteries.length
                  ? `${batteries.length} units · ${fullCount} full`
                  : undefined,
                color:
                  (avgBatCharge ?? 100) < 30
                    ? "hsl(0 72% 51%)"
                    : "hsl(var(--primary))",
                delay: 0.18,
              },
              {
                icon: Coins,
                label: "Energy Rate",
                value: `${PRICE_PER_KWH} EGP`,
                sub: "per kWh",
                color: "hsl(var(--accent))",
                delay: 0.22,
              },
            ].map(({ icon: Icon, label, value, sub, color, delay }) => (
              <motion.div
                key={label}
                {...fade(delay)}
                className="relative rounded-2xl p-5 overflow-hidden"
                style={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div
                  className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-[0.12]"
                  style={{ background: color }}
                />
                <div
                  className="w-8 h-8 rounded-[10px] flex items-center justify-center mb-3"
                  style={{ background: `${color}18` }}
                >
                  <Icon className="w-4 h-4" style={{ color }} strokeWidth={2} />
                </div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                  {label}
                </p>
                {value == null ? (
                  <div
                    className="animate-pulse h-7 w-24 rounded-lg"
                    style={{ background: "hsl(var(--muted))" }}
                  />
                ) : (
                  <p className="text-2xl font-bold text-foreground">{value}</p>
                )}
                {sub && (
                  <p className="text-[11px] text-muted-foreground mt-1">
                    {sub}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* ══ ENERGY + REVENUE CHART — from System API ══ */}
          <motion.div
            {...fade(0.26)}
            className="rounded-2xl p-5"
            style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-[10px] flex items-center justify-center"
                  style={{ background: "hsl(var(--primary)/0.12)" }}
                >
                  <TrendingUp
                    className="w-4 h-4"
                    style={{ color: "hsl(var(--primary))" }}
                    strokeWidth={2.2}
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground leading-none">
                    Energy Production
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    From{" "}
                    <span className="font-medium">Total_AC_PanelPower</span> ·{" "}
                    {PRICE_PER_KWH} EGP/kWh
                  </p>
                </div>
              </div>

              {/* range tabs */}
              <div
                className="flex items-center gap-0.5 p-1 rounded-xl self-start"
                style={{
                  background: "hsl(var(--muted)/0.6)",
                  border: "1px solid hsl(var(--border))",
                }}
              >
                {["day", "week", "month"].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRange(r)}
                    className="px-3 py-1 rounded-[9px] text-xs font-medium transition-all duration-200"
                    style={
                      range === r
                        ? {
                            background: "hsl(var(--card))",
                            color: "hsl(var(--foreground))",
                            boxShadow: "0 1px 4px hsl(var(--foreground)/0.08)",
                          }
                        : { color: "hsl(var(--muted-foreground))" }
                    }
                  >
                    {r === "day" ? "24h" : r === "week" ? "7d" : "30d"}
                  </button>
                ))}
              </div>
            </div>

            {/* summary */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div
                className="rounded-[14px] px-4 py-3"
                style={{
                  background: "hsl(var(--primary)/0.08)",
                  border: "1px solid hsl(var(--primary)/0.2)",
                }}
              >
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                  Total Energy
                </p>
                <p className="text-xl font-bold text-foreground">
                  {f1(totalKWh)}{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    kWh
                  </span>
                </p>
              </div>
              <div
                className="rounded-[14px] px-4 py-3"
                style={{
                  background: "hsl(var(--accent)/0.08)",
                  border: "1px solid hsl(var(--accent)/0.2)",
                }}
              >
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                  Est. Revenue
                </p>
                <p
                  className="text-xl font-bold"
                  style={{ color: "hsl(var(--accent))" }}
                >
                  {egp(totalRev)}
                </p>
              </div>
            </div>

            {/* chart */}
            <AnimatePresence mode="wait">
              <motion.div
                key={range}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {chartData.length < 2 ? (
                  <div
                    className="flex flex-col items-center justify-center gap-2 py-10 rounded-2xl"
                    style={{
                      background: "hsl(var(--muted)/0.3)",
                      border: "1px dashed hsl(var(--border))",
                    }}
                  >
                    <Activity
                      className="w-6 h-6 text-muted-foreground"
                      strokeWidth={1.5}
                    />
                    <p className="text-sm text-muted-foreground">
                      {energyPts.length < 2
                        ? "Collecting readings — data appears as the API updates"
                        : "Not enough readings in this time range yet"}
                    </p>
                    {energyPts.length > 0 && (
                      <p className="text-xs text-muted-foreground opacity-60">
                        {energyPts.length} reading
                        {energyPts.length > 1 ? "s" : ""} collected so far
                      </p>
                    )}
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart
                      data={chartData}
                      margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="energyGrad"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="hsl(var(--primary))"
                            stopOpacity={0.3}
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
                        dataKey="label"
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
                        unit=" kWh"
                        width={56}
                      />
                      <Tooltip content={<ChartTip />} />
                      <Area
                        type="monotone"
                        dataKey="kWh"
                        stroke="hsl(var(--primary))"
                        fill="url(#energyGrad)"
                        strokeWidth={2.5}
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </motion.div>
            </AnimatePresence>

            <p className="text-[10px] text-muted-foreground mt-3 text-right">
              {energyPts.length} readings · Revenue = kWh × {PRICE_PER_KWH} EGP
            </p>
          </motion.div>

          {/* ══ BATTERIES — from Battery API ══ */}

          {/* ══ STATUS + WEATHER ══ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* System Status */}
            <motion.div
              {...fade(0.34)}
              className="rounded-2xl p-5"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-7 h-7 rounded-[9px] flex items-center justify-center"
                  style={{ background: "hsl(var(--primary)/0.12)" }}
                >
                  <Activity
                    className="w-3.5 h-3.5"
                    style={{ color: "hsl(var(--primary))" }}
                    strokeWidth={2.2}
                  />
                </div>
                <h3 className="text-sm font-bold text-foreground">
                  System Status
                </h3>
              </div>
              <div className="space-y-3">
                {[
                  {
                    Icon: online === true ? Wifi : WifiOff,
                    label: "Connection",
                    value:
                      online === null
                        ? "Checking…"
                        : online
                          ? "Online"
                          : "Offline",
                    st: online === null ? "idle" : online ? "ok" : "error",
                  },
                  {
                    Icon: Zap,
                    label: "AC Output",
                    value: loading
                      ? "—"
                      : acPower != null
                        ? `${f0(acPower)} W`
                        : "—",
                    st: loading
                      ? "idle"
                      : acPower != null && acPower > 0
                        ? "ok"
                        : "warn",
                  },
                  {
                    Icon: Activity,
                    label: "DC Input",
                    value: loading
                      ? "—"
                      : dcPower != null
                        ? `${f0(dcPower)} W`
                        : "—",
                    st: loading
                      ? "idle"
                      : dcPower != null && dcPower > 0
                        ? "ok"
                        : "warn",
                  },
                  {
                    Icon: Battery,
                    label: "Batteries",
                    value: loading
                      ? "—"
                      : batteries.length > 0
                        ? lowBatCount > 0
                          ? `${lowBatCount} unit(s) low`
                          : `${batteries.length} healthy`
                        : "No data",
                    st: loading
                      ? "idle"
                      : lowBatCount > 0
                        ? "warn"
                        : batteries.length > 0
                          ? "ok"
                          : "idle",
                  },
                ].map(({ Icon, label, value, st }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className="w-3.5 h-3.5 text-muted-foreground"
                        strokeWidth={2}
                      />
                      <span className="text-xs text-muted-foreground">
                        {label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-foreground">
                        {value}
                      </span>
                      {st === "ok" && (
                        <CheckCircle2
                          className="w-3.5 h-3.5"
                          style={{ color: SC.ok }}
                        />
                      )}
                      {st === "warn" && (
                        <AlertCircle
                          className="w-3.5 h-3.5"
                          style={{ color: SC.warn }}
                        />
                      )}
                      {st === "error" && (
                        <XCircle
                          className="w-3.5 h-3.5"
                          style={{ color: SC.error }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Weather */}
            <motion.div
              {...fade(0.38)}
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div
                className="absolute -top-8 -right-8 w-36 h-36 rounded-full blur-3xl opacity-[0.08]"
                style={{ background: "hsl(var(--accent))" }}
              />
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-7 h-7 rounded-[9px] flex items-center justify-center"
                  style={{ background: "hsl(var(--accent)/0.12)" }}
                >
                  <Sun
                    className="w-3.5 h-3.5"
                    style={{ color: "hsl(var(--accent))" }}
                    strokeWidth={2.2}
                  />
                </div>
                <h3 className="text-sm font-bold text-foreground">
                  Local Weather
                </h3>
                <span className="text-[10px] text-muted-foreground ml-auto">
                  {STATION.location}
                </span>
              </div>

              {wx == null ? (
                <div className="space-y-2">
                  {[80, 60, 70, 55].map((w, i) => (
                    <div
                      key={i}
                      className="animate-pulse h-4 rounded-lg"
                      style={{
                        width: `${w}%`,
                        background: "hsl(var(--muted))",
                      }}
                    />
                  ))}
                </div>
              ) : (
                <>
                  <div className="flex items-end gap-3 mb-4">
                    <div className="flex items-end gap-1 leading-none">
                      <span className="text-4xl font-bold text-foreground">
                        {wxTemp ?? "—"}
                      </span>
                      <span className="text-lg text-muted-foreground mb-0.5">
                        °C
                      </span>
                    </div>
                    <div className="mb-1">
                      {wxIcon && (
                        <img
                          src={`https://openweathermap.org/img/wn/${wxIcon}@2x.png`}
                          alt={wxDesc}
                          className="w-10 h-10 -mt-2"
                        />
                      )}
                      <p className="text-xs text-muted-foreground capitalize -mt-1">
                        {wxDesc}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      {
                        Icon: Droplets,
                        label: "Feels like",
                        value: wxFeel != null ? `${wxFeel}°C` : "—",
                      },
                      {
                        Icon: Droplets,
                        label: "Humidity",
                        value: wxHum != null ? `${wxHum}%` : "—",
                      },
                      {
                        Icon: Wind,
                        label: "Wind",
                        value: wxSpeed != null ? `${wxSpeed} m/s` : "—",
                      },
                      {
                        Icon: Sun,
                        label: "Cloud cover",
                        value: wxClouds != null ? `${wxClouds}%` : "—",
                      },
                    ].map(({ Icon, label, value }) => (
                      <div
                        key={label}
                        className="flex items-center gap-2 rounded-xl px-2.5 py-2"
                        style={{ background: "hsl(var(--muted)/0.5)" }}
                      >
                        <Icon
                          className="w-3 h-3 text-muted-foreground shrink-0"
                          strokeWidth={2}
                        />
                        <div>
                          <p className="text-[9px] text-muted-foreground leading-none">
                            {label}
                          </p>
                          <p className="text-xs font-semibold text-foreground mt-0.5">
                            {value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </div>

          {/* low battery alert */}
          <AnimatePresence>
            {lowBatCount > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium overflow-hidden"
                style={{
                  background: "hsl(0 72% 51%/0.08)",
                  border: "1px solid hsl(0 72% 51%/0.3)",
                  color: "hsl(0 72% 51%)",
                }}
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {lowBatCount} battery unit{lowBatCount > 1 ? "s" : ""} below 20%
                — attention required
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center text-[11px] text-muted-foreground pb-4">
            Auto-refresh every {REFRESH_MS / 1000}s · Rate: {PRICE_PER_KWH}{" "}
            EGP/kWh
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
