// // // import DashboardLayout from "@/components/DashboardLayout";
// // // import { Card } from "@/components/ui/card";
// // // import { Zap, Battery, Sun, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

// // // const Dashboard = () => {
// // //   const stats = [
// // //     {
// // //       icon: <Zap className="w-6 h-6" />,
// // //       label: "Total Power Generated",
// // //       value: "1,247 kW",
// // //       change: "+12.5%",
// // //       trend: "up"
// // //     },
// // //     {
// // //       icon: <Battery className="w-6 h-6" />,
// // //       label: "Battery Status",
// // //       value: "87%",
// // //       change: "Charging",
// // //       trend: "up"
// // //     },
// // //     {
// // //       icon: <Sun className="w-6 h-6" />,
// // //       label: "Solar Efficiency",
// // //       value: "94.2%",
// // //       change: "+2.1%",
// // //       trend: "up"
// // //     },
// // //     {
// // //       icon: <TrendingUp className="w-6 h-6" />,
// // //       label: "Daily Output",
// // //       value: "8,943 kWh",
// // //       change: "+8.3%",
// // //       trend: "up"
// // //     }
// // //   ];

// // //   const inverters = [
// // //     { id: 1, name: "Inverter A", status: "online", power: "312 kW", efficiency: "96%" },
// // //     { id: 2, name: "Inverter B", status: "online", power: "298 kW", efficiency: "95%" },
// // //     { id: 3, name: "Inverter C", status: "warning", power: "285 kW", efficiency: "92%" },
// // //     { id: 4, name: "Inverter D", status: "online", power: "352 kW", efficiency: "97%" },
// // //   ];

// // //   const recentAlerts = [
// // //     { type: "warning", message: "Inverter C efficiency below threshold", time: "5 mins ago" },
// // //     { type: "info", message: "Battery reached 80% charge", time: "15 mins ago" },
// // //     { type: "success", message: "System maintenance completed", time: "1 hour ago" },
// // //   ];

// // //   return (
// // //     <DashboardLayout>
// // //       <div className="space-y-6 animate-fade-in">
// // //         {/* Welcome Section */}
// // //         <div>
// // //           <h1 className="text-3xl font-bold mb-2">Welcome to Solar Monitor</h1>
// // //           <p className="text-muted-foreground">Real-time overview of your solar power station</p>
// // //         </div>

// // //         {/* Stats Grid */}
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // //           {stats.map((stat, index) => (
// // //             <Card
// // //               key={index}
// // //               className="p-6 hover-glow transition-smooth border-border gradient-card"
// // //             >
// // //               <div className="flex items-start justify-between mb-4">
// // //                 <div className="w-12 h-12 rounded-lg gradient-hero flex items-center justify-center text-primary-foreground">
// // //                   {stat.icon}
// // //                 </div>
// // //                 <span className={`text-sm font-medium ${
// // //                   stat.trend === "up" ? "text-primary" : "text-destructive"
// // //                 }`}>
// // //                   {stat.change}
// // //                 </span>
// // //               </div>
// // //               <div>
// // //                 <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
// // //                 <p className="text-2xl font-bold">{stat.value}</p>
// // //               </div>
// // //             </Card>
// // //           ))}
// // //         </div>

// // //         {/* Main Content Grid */}
// // //         <div className="grid lg:grid-cols-3 gap-6">
// // //           {/* Inverters Status */}
// // //           <Card className="lg:col-span-2 p-6 gradient-card border-border">
// // //             <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
// // //               <Zap className="w-5 h-5 text-primary" />
// // //               Inverters Status
// // //             </h3>
// // //             <div className="space-y-4">
// // //               {inverters.map((inverter) => (
// // //                 <div
// // //                   key={inverter.id}
// // //                   className="flex items-center justify-between p-4 rounded-lg bg-background border border-border hover:border-primary transition-smooth"
// // //                 >
// // //                   <div className="flex items-center gap-4">
// // //                     <div className={`w-3 h-3 rounded-full ${
// // //                       inverter.status === "online" ? "bg-primary animate-pulse-glow" :
// // //                       inverter.status === "warning" ? "bg-accent" : "bg-destructive"
// // //                     }`}></div>
// // //                     <div>
// // //                       <p className="font-medium">{inverter.name}</p>
// // //                       <p className="text-sm text-muted-foreground capitalize">{inverter.status}</p>
// // //                     </div>
// // //                   </div>
// // //                   <div className="text-right">
// // //                     <p className="font-semibold">{inverter.power}</p>
// // //                     <p className="text-sm text-muted-foreground">{inverter.efficiency} efficiency</p>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </Card>

// // //           {/* Recent Alerts */}
// // //           <Card className="p-6 gradient-card border-border">
// // //             <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
// // //               <AlertTriangle className="w-5 h-5 text-accent" />
// // //               Recent Alerts
// // //             </h3>
// // //             <div className="space-y-4">
// // //               {recentAlerts.map((alert, index) => (
// // //                 <div
// // //                   key={index}
// // //                   className="flex gap-3 p-3 rounded-lg bg-background border border-border"
// // //                 >
// // //                   {alert.type === "warning" && <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />}
// // //                   {alert.type === "info" && <Battery className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />}
// // //                   {alert.type === "success" && <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />}
// // //                   <div className="flex-1 min-w-0">
// // //                     <p className="text-sm font-medium leading-tight">{alert.message}</p>
// // //                     <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </Card>
// // //         </div>

// // //         {/* Weather & Battery Info */}
// // //         <div className="grid md:grid-cols-2 gap-6">
// // //           <Card className="p-6 gradient-card border-border">
// // //             <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
// // //               <Sun className="w-5 h-5 text-accent" />
// // //               Weather Conditions
// // //             </h3>
// // //             <div className="grid grid-cols-2 gap-6">
// // //               <div>
// // //                 <p className="text-sm text-muted-foreground mb-1">Temperature</p>
// // //                 <p className="text-3xl font-bold">28°C</p>
// // //               </div>
// // //               <div>
// // //                 <p className="text-sm text-muted-foreground mb-1">Irradiance</p>
// // //                 <p className="text-3xl font-bold">850 W/m²</p>
// // //               </div>
// // //               <div>
// // //                 <p className="text-sm text-muted-foreground mb-1">Wind Speed</p>
// // //                 <p className="text-3xl font-bold">12 km/h</p>
// // //               </div>
// // //               <div>
// // //                 <p className="text-sm text-muted-foreground mb-1">Humidity</p>
// // //                 <p className="text-3xl font-bold">45%</p>
// // //               </div>
// // //             </div>
// // //           </Card>

// // //           <Card className="p-6 gradient-card border-border">
// // //             <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
// // //               <Battery className="w-5 h-5 text-primary" />
// // //               Battery Bank Status
// // //             </h3>
// // //             <div className="space-y-4">
// // //               <div>
// // //                 <div className="flex items-center justify-between mb-2">
// // //                   <span className="text-sm text-muted-foreground">Charge Level</span>
// // //                   <span className="text-sm font-semibold">87%</span>
// // //                 </div>
// // //                 <div className="h-3 bg-secondary rounded-full overflow-hidden">
// // //                   <div className="h-full gradient-hero rounded-full" style={{ width: "87%" }}></div>
// // //                 </div>
// // //               </div>
// // //               <div className="grid grid-cols-2 gap-4 pt-2">
// // //                 <div>
// // //                   <p className="text-sm text-muted-foreground mb-1">Voltage</p>
// // //                   <p className="text-2xl font-bold">48.2 V</p>
// // //                 </div>
// // //                 <div>
// // //                   <p className="text-sm text-muted-foreground mb-1">Temperature</p>
// // //                   <p className="text-2xl font-bold">32°C</p>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </Card>
// // //         </div>
// // //       </div>
// // //     </DashboardLayout>
// // //   );
// // // };

// // // export default Dashboard;
// // import { useState, useEffect, useCallback } from "react";
// // import {
// //   Zap,
// //   Battery,
// //   Sun,
// //   Activity,
// //   TrendingUp,
// //   TrendingDown,
// //   RefreshCw,
// //   Clock,
// //   Wifi,
// //   WifiOff,
// //   Thermometer,
// //   BarChart3,
// //   Layers,
// //   CheckCircle2,
// //   AlertCircle,
// //   XCircle,
// // } from "lucide-react";
// // import { motion } from "framer-motion";
// // import {
// //   AreaChart,
// //   Area,
// //   BarChart,
// //   Bar,
// //   RadialBarChart,
// //   RadialBar,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   ResponsiveContainer,
// //   Cell,
// //   PolarAngleAxis,
// // } from "recharts";

// // /* ─── APIs ──────────────────────────────────── */
// // const API_SYSTEM =
// //   "https://5f88kivgsg.execute-api.eu-west-3.amazonaws.com/API-system_summary";
// // const API_SOLAR =
// //   "https://5qo8xe66p8.execute-api.eu-west-3.amazonaws.com/solar";
// // const API_BATTERY =
// //   "https://1e2zoxsxah.execute-api.eu-west-3.amazonaws.com/buttery";
// // const REFRESH_MS = 30_000;

// // /* ─── HELPERS ────────────────────────────────── */
// // const fmt = (v, d = 1) => (v == null || isNaN(v) ? "—" : Number(v).toFixed(d));
// // const fmtTs = (ts) => {
// //   if (!ts) return null;
// //   try {
// //     return new Date(ts).toLocaleTimeString("en-EG", {
// //       hour: "2-digit",
// //       minute: "2-digit",
// //     });
// //   } catch {
// //     return null;
// //   }
// // };
// // const safeFetch = async (url) => {
// //   try {
// //     const r = await fetch(url);
// //     if (!r.ok) return { ok: false, error: `HTTP ${r.status}` };
// //     return { ok: true, data: await r.json() };
// //   } catch (e) {
// //     return { ok: false, error: e.message };
// //   }
// // };
// // const latestOf = (arr) =>
// //   !Array.isArray(arr) || !arr.length
// //     ? null
// //     : arr.reduce((a, b) =>
// //         new Date(a.Timestamp) > new Date(b.Timestamp) ? a : b,
// //       );

// // const newestPerKey = (arr, key) => {
// //   const map = {};
// //   arr.forEach((r) => {
// //     if (!map[r[key]] || new Date(r.Timestamp) > new Date(map[r[key]].Timestamp))
// //       map[r[key]] = r;
// //   });
// //   return Object.values(map);
// // };

// // /* status from value + thresholds */
// // const healthColor = (pct) =>
// //   pct >= 70
// //     ? "hsl(var(--primary))"
// //     : pct >= 35
// //       ? "hsl(var(--accent))"
// //       : "hsl(0 72% 51%)";

// // const healthIcon = (pct) =>
// //   pct >= 70 ? (
// //     <CheckCircle2
// //       className="w-3.5 h-3.5"
// //       style={{ color: "hsl(var(--primary))" }}
// //     />
// //   ) : pct >= 35 ? (
// //     <AlertCircle
// //       className="w-3.5 h-3.5"
// //       style={{ color: "hsl(var(--accent))" }}
// //     />
// //   ) : (
// //     <XCircle className="w-3.5 h-3.5" style={{ color: "hsl(0 72% 51%)" }} />
// //   );

// // /* ─── SHARED UI ─────────────────────────────── */
// // const Skel = ({ className }) => (
// //   <div
// //     className={`animate-pulse rounded-2xl ${className}`}
// //     style={{ background: "hsl(var(--muted))" }}
// //   />
// // );

// // const ChartTip = ({ active, payload, label }) => {
// //   if (!active || !payload?.length) return null;
// //   return (
// //     <div
// //       className="rounded-xl px-3 py-2.5 text-xs space-y-1"
// //       style={{
// //         background: "hsl(var(--card))",
// //         border: "1px solid hsl(var(--border))",
// //         boxShadow: "var(--shadow-card)",
// //       }}
// //     >
// //       <p className="text-muted-foreground font-medium mb-1">{label}</p>
// //       {payload.map((p) => (
// //         <p key={p.name} className="flex items-center gap-2">
// //           <span
// //             className="w-2 h-2 rounded-full shrink-0"
// //             style={{ background: p.color ?? p.fill }}
// //           />
// //           <span className="text-muted-foreground">{p.name}:</span>
// //           <span className="font-bold text-foreground">{p.value}</span>
// //         </p>
// //       ))}
// //     </div>
// //   );
// // };

// // /* ── KPI Card ── */
// // const KpiCard = ({
// //   icon: Icon,
// //   label,
// //   value,
// //   unit,
// //   trend,
// //   accent = "hsl(var(--primary))",
// //   delay = 0,
// //   sub,
// // }) => (
// //   <motion.div
// //     initial={{ opacity: 0, y: 18 }}
// //     animate={{ opacity: 1, y: 0 }}
// //     transition={{ delay, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
// //     className="relative rounded-2xl p-4 overflow-hidden"
// //     style={{
// //       background: "hsl(var(--card))",
// //       border: "1px solid hsl(var(--border))",
// //       boxShadow: "var(--shadow-card)",
// //     }}
// //   >
// //     <div
// //       className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-[0.14] pointer-events-none"
// //       style={{ background: accent }}
// //     />
// //     <div className="flex items-start justify-between mb-3">
// //       <div
// //         className="w-9 h-9 rounded-[11px] flex items-center justify-center"
// //         style={{ background: `${accent}20` }}
// //       >
// //         <Icon
// //           className="w-[17px] h-[17px]"
// //           style={{ color: accent }}
// //           strokeWidth={2}
// //         />
// //       </div>
// //       {trend != null && (
// //         <span
// //           className="flex items-center gap-1 text-[11px] font-medium mt-0.5"
// //           style={{
// //             color: trend >= 0 ? "hsl(var(--primary))" : "hsl(0 72% 51%)",
// //           }}
// //         >
// //           {trend >= 0 ? (
// //             <TrendingUp className="w-3 h-3" />
// //           ) : (
// //             <TrendingDown className="w-3 h-3" />
// //           )}
// //           {Math.abs(trend)}%
// //         </span>
// //       )}
// //     </div>
// //     <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">
// //       {label}
// //     </p>
// //     <div className="flex items-end gap-1 leading-none">
// //       <span className="text-[24px] font-bold text-foreground">
// //         {value ?? "—"}
// //       </span>
// //       {unit && (
// //         <span className="text-[12px] text-muted-foreground mb-0.5">{unit}</span>
// //       )}
// //     </div>
// //     {sub && (
// //       <p className="text-[10px] text-muted-foreground mt-1.5 flex items-center gap-1">
// //         <Clock className="w-2.5 h-2.5" />
// //         {sub}
// //       </p>
// //     )}
// //   </motion.div>
// // );

// // /* ── Section Header ── */
// // const SHead = ({
// //   icon: Icon,
// //   title,
// //   sub,
// //   color = "hsl(var(--primary))",
// //   right,
// // }) => (
// //   <div className="flex items-center justify-between mb-5">
// //     <div className="flex items-center gap-3">
// //       <div
// //         className="w-8 h-8 rounded-[10px] flex items-center justify-center"
// //         style={{ background: `${color}18` }}
// //       >
// //         <Icon className="w-4 h-4" style={{ color }} strokeWidth={2.2} />
// //       </div>
// //       <div>
// //         <h2 className="text-sm font-bold text-foreground leading-none">
// //           {title}
// //         </h2>
// //         {sub && (
// //           <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
// //         )}
// //       </div>
// //     </div>
// //     {right}
// //   </div>
// // );

// // /* ─── RADIAL GAUGE ───────────────────────────── */
// // const Gauge = ({ value, max = 100, label, color, size = 100 }) => {
// //   const pct = Math.min(100, Math.round((value / max) * 100));
// //   const data = [
// //     { value: pct, fill: color },
// //     { value: 100 - pct, fill: "hsl(var(--muted))" },
// //   ];
// //   return (
// //     <div className="flex flex-col items-center gap-1">
// //       <div style={{ width: size, height: size, position: "relative" }}>
// //         <ResponsiveContainer width="100%" height="100%">
// //           <RadialBarChart
// //             innerRadius="70%"
// //             outerRadius="100%"
// //             startAngle={210}
// //             endAngle={-30}
// //             data={data}
// //             barSize={10}
// //           >
// //             <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
// //             <RadialBar dataKey="value" cornerRadius={6} background={false}>
// //               {data.map((_, i) => (
// //                 <Cell key={i} fill={data[i].fill} />
// //               ))}
// //             </RadialBar>
// //           </RadialBarChart>
// //         </ResponsiveContainer>
// //         <div className="absolute inset-0 flex flex-col items-center justify-center">
// //           <span className="text-lg font-bold text-foreground leading-none">
// //             {pct}
// //           </span>
// //           <span className="text-[9px] text-muted-foreground">%</span>
// //         </div>
// //       </div>
// //       <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
// //     </div>
// //   );
// // };

// // /* ════════════════════════════════════════════
// //    MAIN
// // ════════════════════════════════════════════ */
// // export default function SystemOverview() {
// //   const [system, setSystem] = useState(null);
// //   const [prevSystem, setPrevSystem] = useState(null);
// //   const [solar, setSolar] = useState([]);
// //   const [battery, setBattery] = useState([]);
// //   const [powerHist, setPowerHist] = useState([]); // area chart
// //   const [loading, setLoading] = useState(true);
// //   const [lastSync, setLastSync] = useState(null);
// //   const [err, setErr] = useState(null);

// //   const fetchAll = useCallback(async () => {
// //     const [sysRes, solRes, batRes] = await Promise.all([
// //       safeFetch(API_SYSTEM),
// //       safeFetch(API_SOLAR),
// //       safeFetch(API_BATTERY),
// //     ]);

// //     if (sysRes.ok) {
// //       const arr = Array.isArray(sysRes.data) ? sysRes.data : [sysRes.data];
// //       const snap = latestOf(arr);
// //       setPrevSystem((prev) => prev ?? snap);
// //       setSystem((s) => {
// //         setPrevSystem(s);
// //         return snap;
// //       });
// //       setLastSync(new Date());

// //       // power history
// //       if (snap) {
// //         setPowerHist((prev) =>
// //           [
// //             ...prev,
// //             {
// //               time: fmtTs(snap.Timestamp) ?? new Date().toLocaleTimeString(),
// //               ac: snap.Total_AC_PanelPower ?? 0,
// //               dc: snap.Total_DC_PanelPower ?? 0,
// //               battery: snap.TotalBatteryCharge ?? 0,
// //             },
// //           ].slice(-24),
// //         );
// //       }
// //       setErr(null);
// //     } else {
// //       setErr(sysRes.error);
// //     }

// //     if (solRes.ok) {
// //       const arr = Array.isArray(solRes.data) ? solRes.data : [solRes.data];
// //       setSolar(newestPerKey(arr, "solarID"));
// //     }
// //     if (batRes.ok) {
// //       const arr = Array.isArray(batRes.data) ? batRes.data : [batRes.data];
// //       setBattery(newestPerKey(arr, "batteryID"));
// //     }

// //     setLoading(false);
// //   }, []);

// //   useEffect(() => {
// //     fetchAll();
// //     const t = setInterval(fetchAll, REFRESH_MS);
// //     return () => clearInterval(t);
// //   }, [fetchAll]);

// //   /* ── derived totals ── */
// //   const totalSolarPower = solar.reduce((s, p) => s + (p.SolarPower ?? 0), 0);
// //   const totalBatPower = battery.reduce((s, b) => s + (b.BatteryPower ?? 0), 0);
// //   const avgBatCharge = battery.length
// //     ? Math.round(
// //         battery.reduce((s, b) => s + (b.BatteryCharge ?? 0), 0) /
// //           battery.length,
// //       )
// //     : null;
// //   const avgBatTemp = battery.length
// //     ? +(
// //         battery.reduce((s, b) => s + (b.BatteryTemperature ?? 0), 0) /
// //         battery.length
// //       ).toFixed(1)
// //     : null;
// //   const avgSolarTemp = solar.length
// //     ? +(
// //         solar.reduce((s, p) => s + (p.Temperature ?? 0), 0) / solar.length
// //       ).toFixed(1)
// //     : null;
// //   const totalIrradiance = solar.reduce((s, p) => s + (p.Irradiance ?? 0), 0);

// //   /* trend vs previous reading */
// //   const trendAC =
// //     prevSystem && system
// //       ? +(
// //           ((system.Total_AC_PanelPower - prevSystem.Total_AC_PanelPower) /
// //             (prevSystem.Total_AC_PanelPower || 1)) *
// //           100
// //         ).toFixed(1)
// //       : null;
// //   const trendDC =
// //     prevSystem && system
// //       ? +(
// //           ((system.Total_DC_PanelPower - prevSystem.Total_DC_PanelPower) /
// //             (prevSystem.Total_DC_PanelPower || 1)) *
// //           100
// //         ).toFixed(1)
// //       : null;

// //   /* solar comparison chart data */
// //   const solarChartData = solar.map((p) => ({
// //     name: p.solarID,
// //     Power: p.SolarPower ?? 0,
// //     Irr: p.Irradiance ?? 0,
// //     Temp: p.Temperature ?? 0,
// //   }));

// //   /* battery comparison chart data */
// //   const batChartData = battery.map((b) => ({
// //     name: b.batteryID,
// //     Charge: b.BatteryCharge ?? 0,
// //     Power: b.BatteryPower ?? 0,
// //     Temp: b.BatteryTemperature ?? 0,
// //   }));

// //   /* efficiency = AC / (DC + 0.001) × 100 */
// //   const efficiency = system
// //     ? Math.min(
// //         100,
// //         +(
// //           (system.Total_AC_PanelPower / (system.Total_DC_PanelPower || 1)) *
// //           100
// //         ).toFixed(1),
// //       )
// //     : null;

// //   /* ─────────────────────────────────────────── */
// //   return (
// //     <div className="min-h-screen bg-background">
// //       {/* Ambient */}
// //       <div className="fixed inset-0 pointer-events-none overflow-hidden">
// //         <div
// //           className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.06]"
// //           style={{ background: "hsl(var(--primary))" }}
// //         />
// //         <div
// //           className="absolute -bottom-32 right-0 w-80 h-80 rounded-full blur-3xl opacity-[0.05]"
// //           style={{ background: "hsl(var(--accent))" }}
// //         />
// //       </div>

// //       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
// //         {/* ══ PAGE HEADER ══ */}
// //         <motion.div
// //           initial={{ opacity: 0, y: -12 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
// //         >
// //           <div>
// //             <div className="flex items-center gap-2 mb-1">
// //               <div className="w-8 h-8 rounded-[10px] gradient-hero flex items-center justify-center shadow-glow">
// //                 <Layers
// //                   className="w-4 h-4 text-primary-foreground"
// //                   strokeWidth={2.5}
// //                 />
// //               </div>
// //               <h1 className="text-xl font-bold text-foreground tracking-tight">
// //                 System Overview
// //               </h1>
// //             </div>
// //             <p className="text-sm text-muted-foreground">
// //               Total system status · Minya Solar Station
// //             </p>
// //           </div>

// //           <div className="flex items-center gap-3 flex-wrap">
// //             <div
// //               className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium"
// //               style={{
// //                 background: !err
// //                   ? "hsl(var(--primary) / 0.1)"
// //                   : "hsl(0 75% 55% / 0.1)",
// //                 border: `1px solid ${!err ? "hsl(var(--primary) / 0.3)" : "hsl(0 75% 55% / 0.3)"}`,
// //                 color: !err ? "hsl(var(--primary))" : "hsl(0 70% 45%)",
// //               }}
// //             >
// //               {!err ? (
// //                 <Wifi className="w-3.5 h-3.5" />
// //               ) : (
// //                 <WifiOff className="w-3.5 h-3.5" />
// //               )}
// //               {!err ? "All Systems Online" : "Connection Error"}
// //             </div>
// //             {lastSync && (
// //               <span className="text-[11px] text-muted-foreground flex items-center gap-1">
// //                 <Clock className="w-3 h-3" />
// //                 {lastSync.toLocaleTimeString("en-EG", {
// //                   hour: "2-digit",
// //                   minute: "2-digit",
// //                   second: "2-digit",
// //                 })}
// //               </span>
// //             )}
// //             <motion.button
// //               whileTap={{ rotate: 180 }}
// //               transition={{ duration: 0.35 }}
// //               onClick={fetchAll}
// //               className="w-8 h-8 rounded-[10px] flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
// //               style={{
// //                 background: "hsl(var(--muted) / 0.6)",
// //                 border: "1px solid hsl(var(--border))",
// //               }}
// //             >
// //               <RefreshCw className="w-3.5 h-3.5" />
// //             </motion.button>
// //           </div>
// //         </motion.div>

// //         {/* ══ SYSTEM KPIs ══ */}
// //         <div>
// //           <SHead
// //             icon={Zap}
// //             title="System Totals"
// //             sub="Main_SYSTEM · latest reading"
// //             color="hsl(var(--primary))"
// //           />
// //           {loading ? (
// //             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
// //               {[...Array(6)].map((_, i) => (
// //                 <Skel key={i} className="h-28" />
// //               ))}
// //             </div>
// //           ) : (
// //             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
// //               <KpiCard
// //                 icon={Zap}
// //                 label="Total AC Power"
// //                 value={fmt(system?.Total_AC_PanelPower, 0)}
// //                 unit="W"
// //                 accent="hsl(var(--primary))"
// //                 trend={trendAC}
// //                 delay={0.04}
// //                 sub={fmtTs(system?.Timestamp)}
// //               />
// //               <KpiCard
// //                 icon={Activity}
// //                 label="Total DC Power"
// //                 value={fmt(system?.Total_DC_PanelPower, 0)}
// //                 unit="W"
// //                 accent="hsl(var(--primary-glow))"
// //                 trend={trendDC}
// //                 delay={0.08}
// //               />
// //               <KpiCard
// //                 icon={TrendingUp}
// //                 label="AC Voltage"
// //                 value={fmt(system?.Total_AC_PanelVoltage, 0)}
// //                 unit="V"
// //                 accent="hsl(var(--accent))"
// //                 delay={0.12}
// //               />
// //               <KpiCard
// //                 icon={Zap}
// //                 label="AC Current"
// //                 value={fmt(system?.Total_AC_PanelCurrent, 0)}
// //                 unit="A"
// //                 accent="hsl(var(--accent))"
// //                 delay={0.16}
// //               />
// //               <KpiCard
// //                 icon={Battery}
// //                 label="Avg Battery"
// //                 value={avgBatCharge ?? "—"}
// //                 unit="%"
// //                 accent={
// //                   avgBatCharge < 30 ? "hsl(0 72% 51%)" : "hsl(var(--primary))"
// //                 }
// //                 delay={0.2}
// //               />
// //               <KpiCard
// //                 icon={Sun}
// //                 label="Total Solar"
// //                 value={fmt(totalSolarPower, 0)}
// //                 unit="W"
// //                 accent="hsl(var(--accent))"
// //                 delay={0.24}
// //               />
// //             </div>
// //           )}
// //         </div>

// //         {/* ══ GAUGES ROW ══ */}
// //         {!loading && system && (
// //           <motion.div
// //             initial={{ opacity: 0, y: 14 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.28 }}
// //             className="rounded-2xl p-6"
// //             style={{
// //               background: "hsl(var(--card))",
// //               border: "1px solid hsl(var(--border))",
// //               boxShadow: "var(--shadow-card)",
// //             }}
// //           >
// //             <div className="flex items-center gap-3 mb-6">
// //               <div
// //                 className="w-8 h-8 rounded-[10px] flex items-center justify-center"
// //                 style={{ background: "hsl(var(--primary) / 0.12)" }}
// //               >
// //                 <BarChart3 className="w-4 h-4 text-primary" strokeWidth={2} />
// //               </div>
// //               <div>
// //                 <h2 className="text-sm font-bold text-foreground">
// //                   System Health
// //                 </h2>
// //                 <p className="text-[11px] text-muted-foreground">
// //                   Key ratios at a glance
// //                 </p>
// //               </div>
// //             </div>
// //             <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center">
// //               <Gauge
// //                 value={efficiency ?? 0}
// //                 label="AC Efficiency"
// //                 color={healthColor(efficiency ?? 0)}
// //               />
// //               <Gauge
// //                 value={avgBatCharge ?? 0}
// //                 label="Avg Battery"
// //                 color={healthColor(avgBatCharge ?? 0)}
// //               />
// //               <Gauge
// //                 value={
// //                   solar.length
// //                     ? Math.round(
// //                         (totalSolarPower / (solar.length * 2000)) * 100,
// //                       )
// //                     : 0
// //                 }
// //                 label="Solar Utilisation"
// //                 color="hsl(var(--accent))"
// //               />
// //               <Gauge
// //                 value={
// //                   battery.length
// //                     ? Math.round(
// //                         (totalBatPower / (battery.length * 1200)) * 100,
// //                       )
// //                     : 0
// //                 }
// //                 label="Battery Output"
// //                 color="hsl(var(--primary-glow))"
// //               />
// //             </div>

// //             {/* quick stats row */}
// //             <div className="mt-6 pt-5 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-4">
// //               {[
// //                 {
// //                   label: "Panels online",
// //                   value: solar.length,
// //                   unit: "",
// //                   icon: Sun,
// //                 },
// //                 {
// //                   label: "Batteries online",
// //                   value: battery.length,
// //                   unit: "",
// //                   icon: Battery,
// //                 },
// //                 {
// //                   label: "Avg panel temp",
// //                   value: avgSolarTemp ?? "—",
// //                   unit: "°C",
// //                   icon: Thermometer,
// //                 },
// //                 {
// //                   label: "Avg battery temp",
// //                   value: avgBatTemp ?? "—",
// //                   unit: "°C",
// //                   icon: Thermometer,
// //                 },
// //               ].map((s) => (
// //                 <div key={s.label} className="flex items-center gap-3">
// //                   <div
// //                     className="w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0"
// //                     style={{ background: "hsl(var(--muted) / 0.6)" }}
// //                   >
// //                     <s.icon
// //                       className="w-3.5 h-3.5 text-muted-foreground"
// //                       strokeWidth={1.8}
// //                     />
// //                   </div>
// //                   <div>
// //                     <p className="text-[10px] text-muted-foreground">
// //                       {s.label}
// //                     </p>
// //                     <p className="text-sm font-bold text-foreground">
// //                       {s.value}
// //                       {s.unit}
// //                     </p>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </motion.div>
// //         )}

// //         {/* ══ POWER HISTORY CHART ══ */}
// //         {powerHist.length > 1 && (
// //           <motion.div
// //             initial={{ opacity: 0, y: 14 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.32 }}
// //             className="rounded-2xl p-5"
// //             style={{
// //               background: "hsl(var(--card))",
// //               border: "1px solid hsl(var(--border))",
// //               boxShadow: "var(--shadow-card)",
// //             }}
// //           >
// //             <SHead
// //               icon={Activity}
// //               title="Power History"
// //               sub={`Last ${powerHist.length} readings · AC & DC output`}
// //               color="hsl(var(--primary))"
// //               right={
// //                 <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
// //                   <span className="flex items-center gap-1.5">
// //                     <span
// //                       className="w-2 h-2 rounded-full"
// //                       style={{ background: "hsl(var(--primary))" }}
// //                     />
// //                     AC
// //                   </span>
// //                   <span className="flex items-center gap-1.5">
// //                     <span
// //                       className="w-2 h-2 rounded-full"
// //                       style={{ background: "hsl(var(--accent))" }}
// //                     />
// //                     DC
// //                   </span>
// //                 </div>
// //               }
// //             />
// //             <ResponsiveContainer width="100%" height={200}>
// //               <AreaChart
// //                 data={powerHist}
// //                 margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
// //               >
// //                 <defs>
// //                   <linearGradient id="acG" x1="0" y1="0" x2="0" y2="1">
// //                     <stop
// //                       offset="5%"
// //                       stopColor="hsl(var(--primary))"
// //                       stopOpacity={0.28}
// //                     />
// //                     <stop
// //                       offset="95%"
// //                       stopColor="hsl(var(--primary))"
// //                       stopOpacity={0}
// //                     />
// //                   </linearGradient>
// //                   <linearGradient id="dcG" x1="0" y1="0" x2="0" y2="1">
// //                     <stop
// //                       offset="5%"
// //                       stopColor="hsl(var(--accent))"
// //                       stopOpacity={0.28}
// //                     />
// //                     <stop
// //                       offset="95%"
// //                       stopColor="hsl(var(--accent))"
// //                       stopOpacity={0}
// //                     />
// //                   </linearGradient>
// //                 </defs>
// //                 <CartesianGrid
// //                   strokeDasharray="3 3"
// //                   stroke="hsl(var(--border))"
// //                 />
// //                 <XAxis
// //                   dataKey="time"
// //                   tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
// //                   tickLine={false}
// //                   axisLine={false}
// //                 />
// //                 <YAxis
// //                   tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
// //                   tickLine={false}
// //                   axisLine={false}
// //                 />
// //                 <Tooltip content={<ChartTip />} />
// //                 <Area
// //                   type="monotone"
// //                   dataKey="ac"
// //                   name="AC (W)"
// //                   stroke="hsl(var(--primary))"
// //                   fill="url(#acG)"
// //                   strokeWidth={2}
// //                   dot={false}
// //                 />
// //                 <Area
// //                   type="monotone"
// //                   dataKey="dc"
// //                   name="DC (W)"
// //                   stroke="hsl(var(--accent))"
// //                   fill="url(#dcG)"
// //                   strokeWidth={2}
// //                   dot={false}
// //                 />
// //               </AreaChart>
// //             </ResponsiveContainer>
// //           </motion.div>
// //         )}

// //         {/* ══ SOLAR PANELS COMPARISON ══ */}
// //         {solar.length > 0 && (
// //           <motion.div
// //             initial={{ opacity: 0, y: 14 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.36 }}
// //             className="rounded-2xl p-5"
// //             style={{
// //               background: "hsl(var(--card))",
// //               border: "1px solid hsl(var(--border))",
// //               boxShadow: "var(--shadow-card)",
// //             }}
// //           >
// //             <SHead
// //               icon={Sun}
// //               title="Solar Panels Comparison"
// //               sub="Power output per panel"
// //               color="hsl(var(--accent))"
// //             />

// //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //               {/* Bar chart — power */}
// //               <div>
// //                 <p className="text-[11px] text-muted-foreground mb-3">
// //                   Output Power (W) per Panel
// //                 </p>
// //                 <ResponsiveContainer width="100%" height={160}>
// //                   <BarChart
// //                     data={solarChartData}
// //                     margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
// //                   >
// //                     <CartesianGrid
// //                       strokeDasharray="3 3"
// //                       stroke="hsl(var(--border))"
// //                     />
// //                     <XAxis
// //                       dataKey="name"
// //                       tick={{
// //                         fontSize: 10,
// //                         fill: "hsl(var(--muted-foreground))",
// //                       }}
// //                       tickLine={false}
// //                       axisLine={false}
// //                     />
// //                     <YAxis
// //                       tick={{
// //                         fontSize: 10,
// //                         fill: "hsl(var(--muted-foreground))",
// //                       }}
// //                       tickLine={false}
// //                       axisLine={false}
// //                     />
// //                     <Tooltip content={<ChartTip />} />
// //                     <Bar dataKey="Power" name="Power (W)" radius={[6, 6, 0, 0]}>
// //                       {solarChartData.map((_, i) => (
// //                         <Cell
// //                           key={i}
// //                           fill={
// //                             i % 2 === 0
// //                               ? "hsl(var(--accent))"
// //                               : "hsl(var(--primary))"
// //                           }
// //                           fillOpacity={0.85}
// //                         />
// //                       ))}
// //                     </Bar>
// //                   </BarChart>
// //                 </ResponsiveContainer>
// //               </div>

// //               {/* Panel cards */}
// //               <div className="grid grid-cols-1 gap-3">
// //                 {solar.map((p, i) => (
// //                   <div
// //                     key={p.solarID}
// //                     className="flex items-center gap-4 rounded-[14px] px-4 py-3"
// //                     style={{
// //                       background: "hsl(var(--muted) / 0.5)",
// //                       border: "1px solid hsl(var(--border))",
// //                     }}
// //                   >
// //                     <div
// //                       className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0"
// //                       style={{
// //                         background:
// //                           i % 2 === 0
// //                             ? "hsl(var(--accent) / 0.15)"
// //                             : "hsl(var(--primary) / 0.15)",
// //                       }}
// //                     >
// //                       <Sun
// //                         className="w-4 h-4"
// //                         style={{
// //                           color:
// //                             i % 2 === 0
// //                               ? "hsl(var(--accent))"
// //                               : "hsl(var(--primary))",
// //                         }}
// //                         strokeWidth={2}
// //                       />
// //                     </div>
// //                     <div className="flex-1 min-w-0">
// //                       <p className="text-[13px] font-bold text-foreground">
// //                         {p.solarID}
// //                       </p>
// //                       <p className="text-[10px] text-muted-foreground">
// //                         {fmt(p.SolarVoltage)}V · {fmt(p.SolarCurrent)}A ·{" "}
// //                         {fmt(p.Irradiance, 0)} W/m²
// //                       </p>
// //                     </div>
// //                     <div className="text-right shrink-0">
// //                       <p className="text-[15px] font-bold text-foreground">
// //                         {fmt(p.SolarPower, 0)}
// //                         <span className="text-[10px] font-normal text-muted-foreground">
// //                           {" "}
// //                           W
// //                         </span>
// //                       </p>
// //                       <p
// //                         className="text-[10px] flex items-center justify-end gap-1"
// //                         style={{
// //                           color:
// //                             p.Temperature > 50
// //                               ? "hsl(0 72% 51%)"
// //                               : "hsl(var(--muted-foreground))",
// //                         }}
// //                       >
// //                         <Thermometer className="w-3 h-3" />
// //                         {fmt(p.Temperature)}°C
// //                       </p>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </motion.div>
// //         )}

// //         {/* ══ BATTERIES STATUS ══ */}
// //         {battery.length > 0 && (
// //           <motion.div
// //             initial={{ opacity: 0, y: 14 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.4 }}
// //             className="rounded-2xl p-5"
// //             style={{
// //               background: "hsl(var(--card))",
// //               border: "1px solid hsl(var(--border))",
// //               boxShadow: "var(--shadow-card)",
// //             }}
// //           >
// //             <SHead
// //               icon={Battery}
// //               title="Battery Status"
// //               sub="Charge & output per unit"
// //               color="hsl(var(--primary))"
// //             />

// //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //               {/* Bar chart — charge */}
// //               <div>
// //                 <p className="text-[11px] text-muted-foreground mb-3">
// //                   Charge Level (%) per Unit
// //                 </p>
// //                 <ResponsiveContainer width="100%" height={160}>
// //                   <BarChart
// //                     data={batChartData}
// //                     margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
// //                   >
// //                     <CartesianGrid
// //                       strokeDasharray="3 3"
// //                       stroke="hsl(var(--border))"
// //                     />
// //                     <XAxis
// //                       dataKey="name"
// //                       tick={{
// //                         fontSize: 10,
// //                         fill: "hsl(var(--muted-foreground))",
// //                       }}
// //                       tickLine={false}
// //                       axisLine={false}
// //                     />
// //                     <YAxis
// //                       domain={[0, 100]}
// //                       tick={{
// //                         fontSize: 10,
// //                         fill: "hsl(var(--muted-foreground))",
// //                       }}
// //                       tickLine={false}
// //                       axisLine={false}
// //                     />
// //                     <Tooltip content={<ChartTip />} />
// //                     <Bar
// //                       dataKey="Charge"
// //                       name="Charge (%)"
// //                       radius={[6, 6, 0, 0]}
// //                     >
// //                       {batChartData.map((b, i) => (
// //                         <Cell
// //                           key={i}
// //                           fill={healthColor(b.Charge)}
// //                           fillOpacity={0.85}
// //                         />
// //                       ))}
// //                     </Bar>
// //                   </BarChart>
// //                 </ResponsiveContainer>
// //               </div>

// //               {/* Battery cards */}
// //               <div className="grid grid-cols-1 gap-3">
// //                 {battery.map((b) => {
// //                   const color = healthColor(b.BatteryCharge ?? 0);
// //                   return (
// //                     <div
// //                       key={b.batteryID}
// //                       className="rounded-[14px] px-4 py-3"
// //                       style={{
// //                         background: "hsl(var(--muted) / 0.5)",
// //                         border: "1px solid hsl(var(--border))",
// //                       }}
// //                     >
// //                       <div className="flex items-center justify-between mb-2">
// //                         <div className="flex items-center gap-2">
// //                           {healthIcon(b.BatteryCharge ?? 0)}
// //                           <span className="text-[13px] font-bold text-foreground">
// //                             {b.batteryID}
// //                           </span>
// //                         </div>
// //                         <span
// //                           className="text-[13px] font-bold"
// //                           style={{ color }}
// //                         >
// //                           {fmt(b.BatteryCharge, 0)}%
// //                         </span>
// //                       </div>
// //                       {/* charge bar */}
// //                       <div
// //                         className="h-1.5 rounded-full overflow-hidden mb-2"
// //                         style={{ background: "hsl(var(--border))" }}
// //                       >
// //                         <motion.div
// //                           initial={{ width: 0 }}
// //                           animate={{
// //                             width: `${Math.min(b.BatteryCharge ?? 0, 100)}%`,
// //                           }}
// //                           transition={{ duration: 0.9, ease: "easeOut" }}
// //                           className="h-full rounded-full"
// //                           style={{ background: color }}
// //                         />
// //                       </div>
// //                       <div className="flex justify-between text-[10px] text-muted-foreground">
// //                         <span>
// //                           {fmt(b.BatteryVoltage)}V · {fmt(b.BatteryCurrent)}A ·{" "}
// //                           {fmt(b.BatteryPower, 0)} W
// //                         </span>
// //                         <span
// //                           className="flex items-center gap-1"
// //                           style={{
// //                             color:
// //                               (b.BatteryTemperature ?? 0) > 45
// //                                 ? "hsl(0 72% 51%)"
// //                                 : undefined,
// //                           }}
// //                         >
// //                           <Thermometer className="w-3 h-3" />
// //                           {fmt(b.BatteryTemperature)}°C
// //                         </span>
// //                       </div>
// //                     </div>
// //                   );
// //                 })}
// //               </div>
// //             </div>
// //           </motion.div>
// //         )}

// //         {/* skeletons while loading */}
// //         {loading && (
// //           <div className="space-y-4">
// //             <Skel className="h-48" />
// //             <Skel className="h-56" />
// //             <Skel className="h-48" />
// //           </div>
// //         )}

// //         <p className="text-center text-[11px] text-muted-foreground pb-6">
// //           Auto-refresh every {REFRESH_MS / 1000}s
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }
// import { useState, useEffect, useCallback } from "react";
// import {
//   Zap,
//   Battery,
//   Sun,
//   Activity,
//   TrendingUp,
//   TrendingDown,
//   RefreshCw,
//   Clock,
//   Wifi,
//   WifiOff,
//   Thermometer,
//   Layers,
//   CheckCircle2,
//   AlertCircle,
//   XCircle,
//   BarChart3,
//   Droplets,
//   Wind,
//   Cloud,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   AreaChart,
//   Area,
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Cell,
//   RadialBarChart,
//   RadialBar,
//   PolarAngleAxis,
// } from "recharts";

// /* ─── APIs ──────────────────────────────────── */
// const API_SYSTEM =
//   "https://5f88kivgsg.execute-api.eu-west-3.amazonaws.com/API-system_summary";
// const API_SOLAR =
//   "https://5qo8xe66p8.execute-api.eu-west-3.amazonaws.com/solar";
// const API_BATTERY =
//   "https://1e2zoxsxah.execute-api.eu-west-3.amazonaws.com/buttery";
// const WEATHER_KEY = "bdeb06fa12b44fa44b843321dc99e5b2";
// const LAT = 28.0871,
//   LON = 30.7618;
// const REFRESH_MS = 30_000;
// const WEATHER_MS = 600_000;

// /* ─── HELPERS ────────────────────────────────── */
// const fmt = (v, d = 1) => (v == null || isNaN(v) ? "—" : Number(v).toFixed(d));
// const fmtTs = (ts) => {
//   if (!ts) return null;
//   try {
//     return new Date(ts).toLocaleTimeString("en-EG", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   } catch {
//     return null;
//   }
// };

// const safeFetch = async (url) => {
//   try {
//     const r = await fetch(url);
//     if (!r.ok) return { ok: false, error: `HTTP ${r.status}` };
//     return { ok: true, data: await r.json() };
//   } catch (e) {
//     return { ok: false, error: e.message };
//   }
// };

// /* keep latest record per device id */
// const latestPerDevice = (arr, idKey) => {
//   if (!Array.isArray(arr) || !arr.length) return [];
//   const map = {};
//   arr.forEach((r) => {
//     if (
//       !map[r[idKey]] ||
//       new Date(r.Timestamp) > new Date(map[r[idKey]].Timestamp)
//     )
//       map[r[idKey]] = r;
//   });
//   return Object.values(map);
// };

// /* latest single record from any array */
// const latestOf = (arr) =>
//   !Array.isArray(arr) || !arr.length
//     ? null
//     : arr.reduce((a, b) =>
//         new Date(a.Timestamp) > new Date(b.Timestamp) ? a : b,
//       );

// /* health helpers */
// const healthColor = (pct) =>
//   pct >= 70
//     ? "hsl(var(--primary))"
//     : pct >= 35
//       ? "hsl(var(--accent))"
//       : "hsl(0 72% 51%)";

// const HealthIcon = ({ pct }) =>
//   pct >= 70 ? (
//     <CheckCircle2
//       className="w-3.5 h-3.5"
//       style={{ color: "hsl(var(--primary))" }}
//     />
//   ) : pct >= 35 ? (
//     <AlertCircle
//       className="w-3.5 h-3.5"
//       style={{ color: "hsl(var(--accent))" }}
//     />
//   ) : (
//     <XCircle className="w-3.5 h-3.5" style={{ color: "hsl(0 72% 51%)" }} />
//   );

// /* panel accent colors cycling */
// const PANEL_COLORS = [
//   "hsl(var(--primary))",
//   "hsl(var(--accent))",
//   "hsl(var(--primary-glow))",
//   "hsl(174 60% 55%)",
//   "hsl(43 90% 55%)",
//   "hsl(200 80% 55%)",
// ];

// /* ─── SHARED UI ─────────────────────────────── */
// const Skel = ({ className }) => (
//   <div
//     className={`animate-pulse rounded-2xl ${className}`}
//     style={{ background: "hsl(var(--muted))" }}
//   />
// );

// const ChartTip = ({ active, payload, label }) => {
//   if (!active || !payload?.length) return null;
//   return (
//     <div
//       className="rounded-xl px-3 py-2.5 text-xs space-y-1"
//       style={{
//         background: "hsl(var(--card))",
//         border: "1px solid hsl(var(--border))",
//         boxShadow: "var(--shadow-card)",
//       }}
//     >
//       <p className="text-muted-foreground font-medium mb-1">{label}</p>
//       {payload.map((p) => (
//         <p key={p.name} className="flex items-center gap-2">
//           <span
//             className="w-2 h-2 rounded-full shrink-0"
//             style={{ background: p.color ?? p.fill }}
//           />
//           <span className="text-muted-foreground">{p.name}:</span>
//           <span className="font-bold text-foreground">{p.value}</span>
//         </p>
//       ))}
//     </div>
//   );
// };

// /* ── KPI Card ── */
// const KpiCard = ({
//   icon: Icon,
//   label,
//   value,
//   unit,
//   trend,
//   accent = "hsl(var(--primary))",
//   delay = 0,
//   sub,
// }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 18 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ delay, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
//     className="relative rounded-2xl p-4 overflow-hidden"
//     style={{
//       background: "hsl(var(--card))",
//       border: "1px solid hsl(var(--border))",
//       boxShadow: "var(--shadow-card)",
//     }}
//   >
//     <div
//       className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-[0.14] pointer-events-none"
//       style={{ background: accent }}
//     />
//     <div className="flex items-start justify-between mb-3">
//       <div
//         className="w-9 h-9 rounded-[11px] flex items-center justify-center"
//         style={{ background: `${accent}20` }}
//       >
//         <Icon
//           className="w-[17px] h-[17px]"
//           style={{ color: accent }}
//           strokeWidth={2}
//         />
//       </div>
//       {trend != null && (
//         <span
//           className="flex items-center gap-1 text-[11px] font-medium mt-0.5"
//           style={{
//             color: trend >= 0 ? "hsl(var(--primary))" : "hsl(0 72% 51%)",
//           }}
//         >
//           {trend >= 0 ? (
//             <TrendingUp className="w-3 h-3" />
//           ) : (
//             <TrendingDown className="w-3 h-3" />
//           )}
//           {Math.abs(trend)}%
//         </span>
//       )}
//     </div>
//     <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">
//       {label}
//     </p>
//     <div className="flex items-end gap-1 leading-none">
//       <span className="text-[23px] font-bold text-foreground">
//         {value ?? "—"}
//       </span>
//       {unit && (
//         <span className="text-[12px] text-muted-foreground mb-0.5">{unit}</span>
//       )}
//     </div>
//     {sub && (
//       <p className="text-[10px] text-muted-foreground mt-1.5 flex items-center gap-1">
//         <Clock className="w-2.5 h-2.5" />
//         {sub}
//       </p>
//     )}
//   </motion.div>
// );

// /* ── Section Header ── */
// const SHead = ({
//   icon: Icon,
//   title,
//   sub,
//   color = "hsl(var(--primary))",
//   right,
// }) => (
//   <div className="flex items-center justify-between mb-5">
//     <div className="flex items-center gap-3">
//       <div
//         className="w-8 h-8 rounded-[10px] flex items-center justify-center"
//         style={{ background: `${color}18` }}
//       >
//         <Icon className="w-4 h-4" style={{ color }} strokeWidth={2.2} />
//       </div>
//       <div>
//         <h2 className="text-sm font-bold text-foreground leading-none">
//           {title}
//         </h2>
//         {sub && (
//           <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
//         )}
//       </div>
//     </div>
//     {right}
//   </div>
// );

// /* ── Radial Gauge ── */
// const Gauge = ({ value, label, color }) => {
//   const pct = Math.min(100, Math.max(0, Math.round(value)));
//   const data = [{ value: pct }, { value: 100 - pct }];
//   return (
//     <div className="flex flex-col items-center gap-1.5">
//       <div style={{ width: 90, height: 90, position: "relative" }}>
//         <ResponsiveContainer width="100%" height="100%">
//           <RadialBarChart
//             innerRadius="70%"
//             outerRadius="100%"
//             startAngle={210}
//             endAngle={-30}
//             data={data}
//             barSize={9}
//           >
//             <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
//             <RadialBar dataKey="value" cornerRadius={5} background={false}>
//               <Cell fill={color} />
//               <Cell fill="hsl(var(--muted))" />
//             </RadialBar>
//           </RadialBarChart>
//         </ResponsiveContainer>
//         <div className="absolute inset-0 flex flex-col items-center justify-center">
//           <span className="text-[17px] font-bold text-foreground leading-none">
//             {pct}
//           </span>
//           <span className="text-[9px] text-muted-foreground">%</span>
//         </div>
//       </div>
//       <p className="text-[11px] font-medium text-muted-foreground text-center leading-tight">
//         {label}
//       </p>
//     </div>
//   );
// };

// /* ── Tab Pill ── */
// const TabPill = ({ tabs, active, onChange }) => (
//   <div
//     className="flex items-center gap-0.5 p-1 rounded-xl"
//     style={{
//       background: "hsl(var(--muted) / 0.6)",
//       border: "1px solid hsl(var(--border))",
//     }}
//   >
//     {tabs.map((t) => (
//       <button
//         key={t}
//         onClick={() => onChange(t)}
//         className="px-3 py-1 rounded-[9px] text-xs font-medium transition-all duration-200"
//         style={
//           active === t
//             ? {
//                 background: "hsl(var(--card))",
//                 color: "hsl(var(--foreground))",
//                 boxShadow: "0 1px 4px hsl(var(--foreground)/0.08)",
//               }
//             : { color: "hsl(var(--muted-foreground))" }
//         }
//       >
//         {t}
//       </button>
//     ))}
//   </div>
// );

// /* ════════════════════════════════════════════
//    MAIN
// ════════════════════════════════════════════ */
// export default function SystemOverview() {
//   /* raw API data */
//   const [systemSnap, setSystemSnap] = useState(null);
//   const [prevSnap, setPrevSnap] = useState(null);
//   const [solar, setSolar] = useState([]); // latest per panel
//   const [battery, setBattery] = useState([]); // latest per unit
//   const [weather, setWeather] = useState(null);

//   /* in-session history for charts */
//   const [powerHist, setPowerHist] = useState([]); // {time, acTotal, dcTotal, batAvg}
//   const [solarHist, setSolarHist] = useState({}); // { Solar_1: [{time,power}], ... }
//   const [batHist, setBatHist] = useState({}); // { Battery_1: [{time,charge}], ... }

//   const [loading, setLoading] = useState(true);
//   const [lastSync, setLastSync] = useState(null);
//   const [histTab, setHistTab] = useState("Power"); // Power | Solar | Battery
//   const [err, setErr] = useState(null);

//   /* ── fetch system ── */
//   const fetchSystem = useCallback(async () => {
//     const { ok, data, error } = await safeFetch(API_SYSTEM);
//     if (!ok) {
//       setErr(error);
//       return;
//     }
//     const arr = Array.isArray(data) ? data : [data];
//     const snap = latestOf(arr);
//     if (!snap) return;
//     setPrevSnap((prev) => prev ?? snap);
//     setSystemSnap((s) => {
//       setPrevSnap(s);
//       return snap;
//     });
//     setLastSync(new Date());
//     setErr(null);

//     /* power history point */
//     setPowerHist((prev) =>
//       [
//         ...prev,
//         {
//           time: fmtTs(snap.Timestamp) ?? new Date().toLocaleTimeString(),
//           AC: snap.Total_AC_PanelPower ?? 0,
//           DC: snap.Total_DC_PanelPower ?? 0,
//         },
//       ].slice(-30),
//     );
//   }, []);

//   /* ── fetch solar ── */
//   const fetchSolar = useCallback(async () => {
//     const { ok, data } = await safeFetch(API_SOLAR);
//     if (!ok) return;
//     const arr = Array.isArray(data) ? data : [data];
//     const latest = latestPerDevice(arr, "solarID");
//     setSolar(latest);

//     /* per-panel history */
//     setSolarHist((prev) => {
//       const next = { ...prev };
//       latest.forEach((p) => {
//         const key = p.solarID;
//         next[key] = [
//           ...(next[key] ?? []),
//           {
//             time: fmtTs(p.Timestamp) ?? new Date().toLocaleTimeString(),
//             Power: p.SolarPower ?? 0,
//             Irr: p.Irradiance ?? 0,
//           },
//         ].slice(-30);
//       });
//       return next;
//     });
//   }, []);

//   /* ── fetch battery ── */
//   const fetchBattery = useCallback(async () => {
//     const { ok, data } = await safeFetch(API_BATTERY);
//     if (!ok) return;
//     const arr = Array.isArray(data) ? data : [data];
//     const latest = latestPerDevice(arr, "batteryID");
//     setBattery(latest);

//     /* per-battery history */
//     setBatHist((prev) => {
//       const next = { ...prev };
//       latest.forEach((b) => {
//         const key = b.batteryID;
//         next[key] = [
//           ...(next[key] ?? []),
//           {
//             time: fmtTs(b.Timestamp) ?? new Date().toLocaleTimeString(),
//             Charge: b.BatteryCharge ?? 0,
//             Power: b.BatteryPower ?? 0,
//           },
//         ].slice(-30);
//       });
//       return next;
//     });
//   }, []);

//   /* ── fetch weather ── */
//   const fetchWeather = useCallback(async () => {
//     const { ok, data } = await safeFetch(
//       `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${WEATHER_KEY}&units=metric`,
//     );
//     if (ok) setWeather(data);
//   }, []);

//   /* ── intervals ── */
//   useEffect(() => {
//     Promise.all([
//       fetchSystem(),
//       fetchSolar(),
//       fetchBattery(),
//       fetchWeather(),
//     ]).finally(() => setLoading(false));
//     const t1 = setInterval(fetchSystem, REFRESH_MS);
//     const t2 = setInterval(fetchSolar, REFRESH_MS);
//     const t3 = setInterval(fetchBattery, REFRESH_MS);
//     const t4 = setInterval(fetchWeather, WEATHER_MS);
//     return () => [t1, t2, t3, t4].forEach(clearInterval);
//   }, [fetchSystem, fetchSolar, fetchBattery, fetchWeather]);

//   /* ── derived totals ── */
//   const totalSolarPower = solar.reduce((s, p) => s + (p.SolarPower ?? 0), 0);
//   const avgBatCharge = battery.length
//     ? Math.round(
//         battery.reduce((s, b) => s + (b.BatteryCharge ?? 0), 0) /
//           battery.length,
//       )
//     : null;
//   const totalBatPower = battery.reduce((s, b) => s + (b.BatteryPower ?? 0), 0);
//   const avgSolarTemp = solar.length
//     ? +(
//         solar.reduce((s, p) => s + (p.Temperature ?? 0), 0) / solar.length
//       ).toFixed(1)
//     : null;
//   const avgBatTemp = battery.length
//     ? +(
//         battery.reduce((s, b) => s + (b.BatteryTemperature ?? 0), 0) /
//         battery.length
//       ).toFixed(1)
//     : null;
//   const efficiency = systemSnap
//     ? Math.min(
//         100,
//         +(
//           (systemSnap.Total_AC_PanelPower /
//             (systemSnap.Total_DC_PanelPower || 1)) *
//           100
//         ).toFixed(1),
//       )
//     : null;

//   /* trend vs prev */
//   const trendAC =
//     prevSnap && systemSnap
//       ? +(
//           ((systemSnap.Total_AC_PanelPower - prevSnap.Total_AC_PanelPower) /
//             (prevSnap.Total_AC_PanelPower || 1)) *
//           100
//         ).toFixed(1)
//       : null;

//   /* solar comparison bar data */
//   const solarBarData = solar.map((p) => ({
//     name: p.solarID.replace("Solar_", "S"),
//     Power: p.SolarPower ?? 0,
//     Irr: p.Irradiance ?? 0,
//     Temp: p.Temperature ?? 0,
//   }));

//   /* battery comparison bar data */
//   const batBarData = battery.map((b) => ({
//     name: b.batteryID.replace("Battery_", "B"),
//     Charge: b.BatteryCharge ?? 0,
//     Power: b.BatteryPower ?? 0,
//     Temp: b.BatteryTemperature ?? 0,
//   }));

//   /* multi-line history — merge all panels/batteries by time */
//   const solarLineData = (() => {
//     const ids = Object.keys(solarHist);
//     if (!ids.length) return [];
//     const times = solarHist[ids[0]]?.map((p) => p.time) ?? [];
//     return times.map((t, i) => {
//       const obj = { time: t };
//       ids.forEach((id) => {
//         obj[id] = solarHist[id]?.[i]?.Power ?? null;
//       });
//       return obj;
//     });
//   })();

//   const batLineData = (() => {
//     const ids = Object.keys(batHist);
//     if (!ids.length) return [];
//     const times = batHist[ids[0]]?.map((p) => p.time) ?? [];
//     return times.map((t, i) => {
//       const obj = { time: t };
//       ids.forEach((id) => {
//         obj[id] = batHist[id]?.[i]?.Charge ?? null;
//       });
//       return obj;
//     });
//   })();

//   /* ─────────────────────────────────────────── */
//   return (
//     <div className="min-h-screen bg-background">
//       {/* Ambient */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         <div
//           className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.06]"
//           style={{ background: "hsl(var(--primary))" }}
//         />
//         <div
//           className="absolute -bottom-32 right-0 w-80 h-80 rounded-full blur-3xl opacity-[0.05]"
//           style={{ background: "hsl(var(--accent))" }}
//         />
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
//         {/* ══ PAGE HEADER ══ */}
//         <motion.div
//           initial={{ opacity: 0, y: -12 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
//         >
//           <div>
//             <div className="flex items-center gap-2 mb-1">
//               <div className="w-8 h-8 rounded-[10px] gradient-hero flex items-center justify-center shadow-glow">
//                 <Layers
//                   className="w-4 h-4 text-primary-foreground"
//                   strokeWidth={2.5}
//                 />
//               </div>
//               <h1 className="text-xl font-bold text-foreground tracking-tight">
//                 System Overview
//               </h1>
//             </div>
//             <p className="text-sm text-muted-foreground">
//               Total system status · {solar.length} panels · {battery.length}{" "}
//               batteries
//             </p>
//           </div>

//           <div className="flex items-center gap-3 flex-wrap">
//             {/* weather chip */}
//             {weather && (
//               <div
//                 className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs"
//                 style={{
//                   background: "hsl(var(--muted) / 0.6)",
//                   border: "1px solid hsl(var(--border))",
//                 }}
//               >
//                 <Cloud className="w-3.5 h-3.5 text-muted-foreground" />
//                 <span className="text-foreground font-medium">
//                   {Math.round(weather.main?.temp ?? 0)}°C
//                 </span>
//                 <span className="text-muted-foreground capitalize">
//                   {weather.weather?.[0]?.description}
//                 </span>
//               </div>
//             )}

//             <div
//               className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium"
//               style={{
//                 background: !err
//                   ? "hsl(var(--primary) / 0.1)"
//                   : "hsl(0 75% 55% / 0.1)",
//                 border: `1px solid ${!err ? "hsl(var(--primary) / 0.3)" : "hsl(0 75% 55% / 0.3)"}`,
//                 color: !err ? "hsl(var(--primary))" : "hsl(0 70% 45%)",
//               }}
//             >
//               {!err ? (
//                 <Wifi className="w-3.5 h-3.5" />
//               ) : (
//                 <WifiOff className="w-3.5 h-3.5" />
//               )}
//               {!err ? "Online" : "Error"}
//             </div>

//             {lastSync && (
//               <span className="text-[11px] text-muted-foreground flex items-center gap-1">
//                 <Clock className="w-3 h-3" />
//                 {lastSync.toLocaleTimeString("en-EG", {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                   second: "2-digit",
//                 })}
//               </span>
//             )}

//             <motion.button
//               whileTap={{ rotate: 180 }}
//               transition={{ duration: 0.35 }}
//               onClick={() => {
//                 fetchSystem();
//                 fetchSolar();
//                 fetchBattery();
//                 fetchWeather();
//               }}
//               className="w-8 h-8 rounded-[10px] flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
//               style={{
//                 background: "hsl(var(--muted) / 0.6)",
//                 border: "1px solid hsl(var(--border))",
//               }}
//             >
//               <RefreshCw className="w-3.5 h-3.5" />
//             </motion.button>
//           </div>
//         </motion.div>

//         {/* ══ KPIs — SYSTEM TOTALS ══ */}
//         <div>
//           <SHead
//             icon={Zap}
//             title="System Totals"
//             sub="Aggregated from all APIs"
//             color="hsl(var(--primary))"
//           />
//           {loading ? (
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
//               {[...Array(6)].map((_, i) => (
//                 <Skel key={i} className="h-28" />
//               ))}
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
//               <KpiCard
//                 icon={Zap}
//                 label="Total AC Power"
//                 value={fmt(systemSnap?.Total_AC_PanelPower, 0)}
//                 unit="W"
//                 accent="hsl(var(--primary))"
//                 trend={trendAC}
//                 delay={0.04}
//                 sub={fmtTs(systemSnap?.Timestamp)}
//               />
//               <KpiCard
//                 icon={Activity}
//                 label="Total DC Power"
//                 value={fmt(systemSnap?.Total_DC_PanelPower, 0)}
//                 unit="W"
//                 accent="hsl(var(--primary-glow))"
//                 delay={0.08}
//               />
//               <KpiCard
//                 icon={TrendingUp}
//                 label="AC Voltage"
//                 value={fmt(systemSnap?.Total_AC_PanelVoltage, 0)}
//                 unit="V"
//                 accent="hsl(var(--accent))"
//                 delay={0.12}
//               />
//               <KpiCard
//                 icon={Sun}
//                 label="Total Solar Power"
//                 value={fmt(totalSolarPower, 0)}
//                 unit="W"
//                 accent="hsl(var(--accent))"
//                 delay={0.16}
//                 sub={`${solar.length} panels`}
//               />
//               <KpiCard
//                 icon={Battery}
//                 label="Avg Battery"
//                 value={avgBatCharge ?? "—"}
//                 unit="%"
//                 accent={
//                   avgBatCharge < 30 ? "hsl(0 72% 51%)" : "hsl(var(--primary))"
//                 }
//                 delay={0.2}
//                 sub={`${battery.length} units`}
//               />
//               <KpiCard
//                 icon={Zap}
//                 label="Total Bat Power"
//                 value={fmt(totalBatPower, 0)}
//                 unit="W"
//                 accent="hsl(var(--primary))"
//                 delay={0.24}
//               />
//             </div>
//           )}
//         </div>

//         {/* ══ SYSTEM HEALTH GAUGES ══ */}
//         {!loading && systemSnap && (
//           <motion.div
//             initial={{ opacity: 0, y: 14 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.28 }}
//             className="rounded-2xl p-6"
//             style={{
//               background: "hsl(var(--card))",
//               border: "1px solid hsl(var(--border))",
//               boxShadow: "var(--shadow-card)",
//             }}
//           >
//             <SHead
//               icon={BarChart3}
//               title="System Health"
//               sub="Key performance ratios"
//               color="hsl(var(--primary))"
//             />
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center mb-6">
//               <Gauge
//                 value={efficiency ?? 0}
//                 label="Inverter Efficiency"
//                 color={healthColor(efficiency ?? 0)}
//               />
//               <Gauge
//                 value={avgBatCharge ?? 0}
//                 label="Avg Battery Charge"
//                 color={healthColor(avgBatCharge ?? 0)}
//               />
//               <Gauge
//                 value={
//                   solar.length
//                     ? Math.round(
//                         (totalSolarPower / (solar.length * 2000)) * 100,
//                       )
//                     : 0
//                 }
//                 label="Solar Utilisation"
//                 color="hsl(var(--accent))"
//               />
//               <Gauge
//                 value={
//                   battery.length
//                     ? Math.round(
//                         (totalBatPower / (battery.length * 1200)) * 100,
//                       )
//                     : 0
//                 }
//                 label="Battery Output"
//                 color="hsl(var(--primary-glow))"
//               />
//             </div>

//             {/* quick stats */}
//             <div className="pt-5 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-4">
//               {[
//                 {
//                   label: "Panels online",
//                   value: solar.length,
//                   unit: "",
//                   icon: Sun,
//                 },
//                 {
//                   label: "Batteries online",
//                   value: battery.length,
//                   unit: "",
//                   icon: Battery,
//                 },
//                 {
//                   label: "Avg panel temp",
//                   value: avgSolarTemp ?? "—",
//                   unit: "°C",
//                   icon: Thermometer,
//                 },
//                 {
//                   label: "Avg battery temp",
//                   value: avgBatTemp ?? "—",
//                   unit: "°C",
//                   icon: Thermometer,
//                 },
//               ].map((s) => (
//                 <div key={s.label} className="flex items-center gap-3">
//                   <div
//                     className="w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0"
//                     style={{ background: "hsl(var(--muted) / 0.6)" }}
//                   >
//                     <s.icon
//                       className="w-3.5 h-3.5 text-muted-foreground"
//                       strokeWidth={1.8}
//                     />
//                   </div>
//                   <div>
//                     <p className="text-[10px] text-muted-foreground">
//                       {s.label}
//                     </p>
//                     <p className="text-sm font-bold text-foreground">
//                       {s.value}
//                       {s.unit}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         )}

//         {/* ══ HISTORICAL CHARTS ══ */}
//         <motion.div
//           initial={{ opacity: 0, y: 14 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.32 }}
//           className="rounded-2xl p-5"
//           style={{
//             background: "hsl(var(--card))",
//             border: "1px solid hsl(var(--border))",
//             boxShadow: "var(--shadow-card)",
//           }}
//         >
//           <SHead
//             icon={Activity}
//             title="Historical Trends"
//             sub="In-session readings — updates every 30s"
//             color="hsl(var(--primary))"
//             right={
//               <TabPill
//                 tabs={["Power", "Solar", "Battery"]}
//                 active={histTab}
//                 onChange={setHistTab}
//               />
//             }
//           />

//           <AnimatePresence mode="wait">
//             {/* ── Power trend ── */}
//             {histTab === "Power" && (
//               <motion.div
//                 key="power"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 {powerHist.length < 2 ? (
//                   <div className="h-48 flex items-center justify-center text-sm text-muted-foreground">
//                     Collecting data… check back in a moment
//                   </div>
//                 ) : (
//                   <>
//                     <div className="flex gap-4 text-[11px] text-muted-foreground mb-3 flex-wrap">
//                       <span className="flex items-center gap-1.5">
//                         <span
//                           className="w-2 h-2 rounded-full"
//                           style={{ background: "hsl(var(--primary))" }}
//                         />
//                         AC Total (W)
//                       </span>
//                       <span className="flex items-center gap-1.5">
//                         <span
//                           className="w-2 h-2 rounded-full"
//                           style={{ background: "hsl(var(--accent))" }}
//                         />
//                         DC Total (W)
//                       </span>
//                     </div>
//                     <ResponsiveContainer width="100%" height={200}>
//                       <AreaChart
//                         data={powerHist}
//                         margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
//                       >
//                         <defs>
//                           <linearGradient id="acG" x1="0" y1="0" x2="0" y2="1">
//                             <stop
//                               offset="5%"
//                               stopColor="hsl(var(--primary))"
//                               stopOpacity={0.28}
//                             />
//                             <stop
//                               offset="95%"
//                               stopColor="hsl(var(--primary))"
//                               stopOpacity={0}
//                             />
//                           </linearGradient>
//                           <linearGradient id="dcG" x1="0" y1="0" x2="0" y2="1">
//                             <stop
//                               offset="5%"
//                               stopColor="hsl(var(--accent))"
//                               stopOpacity={0.28}
//                             />
//                             <stop
//                               offset="95%"
//                               stopColor="hsl(var(--accent))"
//                               stopOpacity={0}
//                             />
//                           </linearGradient>
//                         </defs>
//                         <CartesianGrid
//                           strokeDasharray="3 3"
//                           stroke="hsl(var(--border))"
//                         />
//                         <XAxis
//                           dataKey="time"
//                           tick={{
//                             fontSize: 10,
//                             fill: "hsl(var(--muted-foreground))",
//                           }}
//                           tickLine={false}
//                           axisLine={false}
//                         />
//                         <YAxis
//                           tick={{
//                             fontSize: 10,
//                             fill: "hsl(var(--muted-foreground))",
//                           }}
//                           tickLine={false}
//                           axisLine={false}
//                         />
//                         <Tooltip content={<ChartTip />} />
//                         <Area
//                           type="monotone"
//                           dataKey="AC"
//                           name="AC (W)"
//                           stroke="hsl(var(--primary))"
//                           fill="url(#acG)"
//                           strokeWidth={2}
//                           dot={false}
//                         />
//                         <Area
//                           type="monotone"
//                           dataKey="DC"
//                           name="DC (W)"
//                           stroke="hsl(var(--accent))"
//                           fill="url(#dcG)"
//                           strokeWidth={2}
//                           dot={false}
//                         />
//                       </AreaChart>
//                     </ResponsiveContainer>
//                   </>
//                 )}
//               </motion.div>
//             )}

//             {/* ── Solar per-panel trend ── */}
//             {histTab === "Solar" && (
//               <motion.div
//                 key="solar"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 {solarLineData.length < 2 ? (
//                   <div className="h-48 flex items-center justify-center text-sm text-muted-foreground">
//                     Collecting data… check back in a moment
//                   </div>
//                 ) : (
//                   <>
//                     <p className="text-[11px] text-muted-foreground mb-3">
//                       Power output (W) per panel over time
//                     </p>
//                     <ResponsiveContainer width="100%" height={200}>
//                       <LineChart
//                         data={solarLineData}
//                         margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
//                       >
//                         <CartesianGrid
//                           strokeDasharray="3 3"
//                           stroke="hsl(var(--border))"
//                         />
//                         <XAxis
//                           dataKey="time"
//                           tick={{
//                             fontSize: 10,
//                             fill: "hsl(var(--muted-foreground))",
//                           }}
//                           tickLine={false}
//                           axisLine={false}
//                         />
//                         <YAxis
//                           tick={{
//                             fontSize: 10,
//                             fill: "hsl(var(--muted-foreground))",
//                           }}
//                           tickLine={false}
//                           axisLine={false}
//                         />
//                         <Tooltip content={<ChartTip />} />
//                         <Legend
//                           wrapperStyle={{
//                             fontSize: 11,
//                             color: "hsl(var(--muted-foreground))",
//                           }}
//                         />
//                         {Object.keys(solarHist).map((id, i) => (
//                           <Line
//                             key={id}
//                             type="monotone"
//                             dataKey={id}
//                             name={id}
//                             stroke={PANEL_COLORS[i % PANEL_COLORS.length]}
//                             strokeWidth={2}
//                             dot={false}
//                             connectNulls
//                           />
//                         ))}
//                       </LineChart>
//                     </ResponsiveContainer>
//                   </>
//                 )}
//               </motion.div>
//             )}

//             {/* ── Battery per-unit trend ── */}
//             {histTab === "Battery" && (
//               <motion.div
//                 key="battery"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 {batLineData.length < 2 ? (
//                   <div className="h-48 flex items-center justify-center text-sm text-muted-foreground">
//                     Collecting data… check back in a moment
//                   </div>
//                 ) : (
//                   <>
//                     <p className="text-[11px] text-muted-foreground mb-3">
//                       Charge level (%) per battery unit over time
//                     </p>
//                     <ResponsiveContainer width="100%" height={200}>
//                       <LineChart
//                         data={batLineData}
//                         margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
//                       >
//                         <CartesianGrid
//                           strokeDasharray="3 3"
//                           stroke="hsl(var(--border))"
//                         />
//                         <XAxis
//                           dataKey="time"
//                           tick={{
//                             fontSize: 10,
//                             fill: "hsl(var(--muted-foreground))",
//                           }}
//                           tickLine={false}
//                           axisLine={false}
//                         />
//                         <YAxis
//                           domain={[0, 100]}
//                           tick={{
//                             fontSize: 10,
//                             fill: "hsl(var(--muted-foreground))",
//                           }}
//                           tickLine={false}
//                           axisLine={false}
//                         />
//                         <Tooltip content={<ChartTip />} />
//                         <Legend
//                           wrapperStyle={{
//                             fontSize: 11,
//                             color: "hsl(var(--muted-foreground))",
//                           }}
//                         />
//                         {Object.keys(batHist).map((id, i) => (
//                           <Line
//                             key={id}
//                             type="monotone"
//                             dataKey={id}
//                             name={id}
//                             stroke={PANEL_COLORS[i % PANEL_COLORS.length]}
//                             strokeWidth={2}
//                             dot={false}
//                             connectNulls
//                           />
//                         ))}
//                       </LineChart>
//                     </ResponsiveContainer>
//                   </>
//                 )}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>

//         {/* ══ SOLAR PANELS COMPARISON ══ */}
//         {!loading && solar.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: 14 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.36 }}
//             className="rounded-2xl p-5"
//             style={{
//               background: "hsl(var(--card))",
//               border: "1px solid hsl(var(--border))",
//               boxShadow: "var(--shadow-card)",
//             }}
//           >
//             <SHead
//               icon={Sun}
//               title="Solar Panels"
//               sub={`${solar.length} panels · latest readings`}
//               color="hsl(var(--accent))"
//             />

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Bar chart */}
//               <div>
//                 <p className="text-[11px] text-muted-foreground mb-3">
//                   Power (W) & Irradiance (W/m²) per panel
//                 </p>
//                 <ResponsiveContainer width="100%" height={180}>
//                   <BarChart
//                     data={solarBarData}
//                     margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
//                   >
//                     <CartesianGrid
//                       strokeDasharray="3 3"
//                       stroke="hsl(var(--border))"
//                     />
//                     <XAxis
//                       dataKey="name"
//                       tick={{
//                         fontSize: 10,
//                         fill: "hsl(var(--muted-foreground))",
//                       }}
//                       tickLine={false}
//                       axisLine={false}
//                     />
//                     <YAxis
//                       tick={{
//                         fontSize: 10,
//                         fill: "hsl(var(--muted-foreground))",
//                       }}
//                       tickLine={false}
//                       axisLine={false}
//                     />
//                     <Tooltip content={<ChartTip />} />
//                     <Legend wrapperStyle={{ fontSize: 11 }} />
//                     <Bar
//                       dataKey="Power"
//                       name="Power (W)"
//                       radius={[5, 5, 0, 0]}
//                       fill="hsl(var(--accent))"
//                       fillOpacity={0.85}
//                     />
//                     <Bar
//                       dataKey="Irr"
//                       name="Irradiance (W/m²)"
//                       radius={[5, 5, 0, 0]}
//                       fill="hsl(var(--primary))"
//                       fillOpacity={0.7}
//                     />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>

//               {/* Panel cards */}
//               <div className="space-y-2.5">
//                 {solar.map((p, i) => (
//                   <div
//                     key={p.solarID}
//                     className="flex items-center gap-3 rounded-[14px] px-4 py-3"
//                     style={{
//                       background: "hsl(var(--muted) / 0.5)",
//                       border: "1px solid hsl(var(--border))",
//                     }}
//                   >
//                     <div
//                       className="w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0"
//                       style={{
//                         background: `${PANEL_COLORS[i % PANEL_COLORS.length]}18`,
//                       }}
//                     >
//                       <Sun
//                         className="w-4 h-4"
//                         style={{ color: PANEL_COLORS[i % PANEL_COLORS.length] }}
//                         strokeWidth={2}
//                       />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-[13px] font-bold text-foreground">
//                         {p.solarID}
//                       </p>
//                       <p className="text-[10px] text-muted-foreground truncate">
//                         {fmt(p.SolarVoltage)}V · {fmt(p.SolarCurrent)}A ·{" "}
//                         {fmt(p.Irradiance, 0)} W/m²
//                       </p>
//                     </div>
//                     <div className="text-right shrink-0">
//                       <p className="text-[15px] font-bold text-foreground">
//                         {fmt(p.SolarPower, 0)}
//                         <span className="text-[10px] font-normal text-muted-foreground">
//                           {" "}
//                           W
//                         </span>
//                       </p>
//                       <p
//                         className="text-[10px] flex items-center justify-end gap-1"
//                         style={{
//                           color:
//                             (p.Temperature ?? 0) > 50
//                               ? "hsl(0 72% 51%)"
//                               : "hsl(var(--muted-foreground))",
//                         }}
//                       >
//                         <Thermometer className="w-3 h-3" />
//                         {fmt(p.Temperature)}°C
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* ══ BATTERIES STATUS ══ */}
//         {!loading && battery.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: 14 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="rounded-2xl p-5"
//             style={{
//               background: "hsl(var(--card))",
//               border: "1px solid hsl(var(--border))",
//               boxShadow: "var(--shadow-card)",
//             }}
//           >
//             <SHead
//               icon={Battery}
//               title="Batteries"
//               sub={`${battery.length} units · charge & output`}
//               color="hsl(var(--primary))"
//             />

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Bar chart */}
//               <div>
//                 <p className="text-[11px] text-muted-foreground mb-3">
//                   Charge (%) & Power (W) per unit
//                 </p>
//                 <ResponsiveContainer width="100%" height={180}>
//                   <BarChart
//                     data={batBarData}
//                     margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
//                   >
//                     <CartesianGrid
//                       strokeDasharray="3 3"
//                       stroke="hsl(var(--border))"
//                     />
//                     <XAxis
//                       dataKey="name"
//                       tick={{
//                         fontSize: 10,
//                         fill: "hsl(var(--muted-foreground))",
//                       }}
//                       tickLine={false}
//                       axisLine={false}
//                     />
//                     <YAxis
//                       tick={{
//                         fontSize: 10,
//                         fill: "hsl(var(--muted-foreground))",
//                       }}
//                       tickLine={false}
//                       axisLine={false}
//                     />
//                     <Tooltip content={<ChartTip />} />
//                     <Legend wrapperStyle={{ fontSize: 11 }} />
//                     <Bar
//                       dataKey="Charge"
//                       name="Charge (%)"
//                       radius={[5, 5, 0, 0]}
//                     >
//                       {batBarData.map((b, i) => (
//                         <Cell
//                           key={i}
//                           fill={healthColor(b.Charge)}
//                           fillOpacity={0.85}
//                         />
//                       ))}
//                     </Bar>
//                     <Bar
//                       dataKey="Power"
//                       name="Power (W)"
//                       radius={[5, 5, 0, 0]}
//                       fill="hsl(var(--primary-glow))"
//                       fillOpacity={0.7}
//                     />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>

//               {/* Battery cards */}
//               <div className="space-y-2.5">
//                 {battery.map((b) => {
//                   const color = healthColor(b.BatteryCharge ?? 0);
//                   return (
//                     <div
//                       key={b.batteryID}
//                       className="rounded-[14px] px-4 py-3"
//                       style={{
//                         background: "hsl(var(--muted) / 0.5)",
//                         border: "1px solid hsl(var(--border))",
//                       }}
//                     >
//                       <div className="flex items-center justify-between mb-2">
//                         <div className="flex items-center gap-2">
//                           <HealthIcon pct={b.BatteryCharge ?? 0} />
//                           <span className="text-[13px] font-bold text-foreground">
//                             {b.batteryID}
//                           </span>
//                         </div>
//                         <span
//                           className="text-[14px] font-bold"
//                           style={{ color }}
//                         >
//                           {fmt(b.BatteryCharge, 0)}%
//                         </span>
//                       </div>
//                       <div
//                         className="h-1.5 rounded-full overflow-hidden mb-2"
//                         style={{ background: "hsl(var(--border))" }}
//                       >
//                         <motion.div
//                           initial={{ width: 0 }}
//                           animate={{
//                             width: `${Math.min(b.BatteryCharge ?? 0, 100)}%`,
//                           }}
//                           transition={{ duration: 0.9, ease: "easeOut" }}
//                           className="h-full rounded-full"
//                           style={{ background: color }}
//                         />
//                       </div>
//                       <div className="flex justify-between text-[10px] text-muted-foreground">
//                         <span>
//                           {fmt(b.BatteryVoltage)}V · {fmt(b.BatteryCurrent)}A ·{" "}
//                           {fmt(b.BatteryPower, 0)} W
//                         </span>
//                         <span
//                           className="flex items-center gap-1"
//                           style={{
//                             color:
//                               (b.BatteryTemperature ?? 0) > 45
//                                 ? "hsl(0 72% 51%)"
//                                 : undefined,
//                           }}
//                         >
//                           <Thermometer className="w-3 h-3" />
//                           {fmt(b.BatteryTemperature)}°C
//                         </span>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {loading && (
//           <div className="space-y-4">
//             <Skel className="h-52" />
//             <Skel className="h-56" />
//             <Skel className="h-48" />
//           </div>
//         )}

//         <p className="text-center text-[11px] text-muted-foreground pb-6">
//           Auto-refresh every {REFRESH_MS / 1000}s
//         </p>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect, useCallback } from "react";
import {
  Zap,
  Battery,
  Sun,
  Activity,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Clock,
  Wifi,
  WifiOff,
  Thermometer,
  Layers,
  CheckCircle2,
  AlertCircle,
  XCircle,
  BarChart3,
  Droplets,
  Wind,
  Cloud,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

/* ─── APIs ──────────────────────────────────── */
const API_SYSTEM =
  "https://5f88kivgsg.execute-api.eu-west-3.amazonaws.com/API-system_summary";
const API_SOLAR =
  "https://5qo8xe66p8.execute-api.eu-west-3.amazonaws.com/solar";
const API_BATTERY =
  "https://1e2zoxsxah.execute-api.eu-west-3.amazonaws.com/buttery";
const WEATHER_KEY = "bdeb06fa12b44fa44b843321dc99e5b2";
const LAT = 28.0871,
  LON = 30.7618;
const REFRESH_MS = 30_000;
const WEATHER_MS = 600_000;

/* ─── HELPERS ────────────────────────────────── */
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
    const r = await fetch(url);
    if (!r.ok) return { ok: false, error: `HTTP ${r.status}` };
    return { ok: true, data: await r.json() };
  } catch (e) {
    return { ok: false, error: e.message };
  }
};

/* keep latest record per device id */
const latestPerDevice = (arr, idKey) => {
  if (!Array.isArray(arr) || !arr.length) return [];
  const map = {};
  arr.forEach((r) => {
    if (
      !map[r[idKey]] ||
      new Date(r.Timestamp) > new Date(map[r[idKey]].Timestamp)
    )
      map[r[idKey]] = r;
  });
  return Object.values(map);
};

/* latest single record from any array */
const latestOf = (arr) =>
  !Array.isArray(arr) || !arr.length
    ? null
    : arr.reduce((a, b) =>
        new Date(a.Timestamp) > new Date(b.Timestamp) ? a : b,
      );

/* health helpers */
const healthColor = (pct) =>
  pct >= 70
    ? "hsl(var(--primary))"
    : pct >= 35
      ? "hsl(var(--accent))"
      : "hsl(0 72% 51%)";

const HealthIcon = ({ pct }) =>
  pct >= 70 ? (
    <CheckCircle2
      className="w-3.5 h-3.5"
      style={{ color: "hsl(var(--primary))" }}
    />
  ) : pct >= 35 ? (
    <AlertCircle
      className="w-3.5 h-3.5"
      style={{ color: "hsl(var(--accent))" }}
    />
  ) : (
    <XCircle className="w-3.5 h-3.5" style={{ color: "hsl(0 72% 51%)" }} />
  );

/* panel accent colors cycling */
const PANEL_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "hsl(var(--primary-glow))",
  "hsl(174 60% 55%)",
  "hsl(43 90% 55%)",
  "hsl(200 80% 55%)",
];

/* ─── SHARED UI ─────────────────────────────── */
const Skel = ({ className }) => (
  <div
    className={`animate-pulse rounded-2xl ${className}`}
    style={{ background: "hsl(var(--muted))" }}
  />
);

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
            style={{ background: p.color ?? p.fill }}
          />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-bold text-foreground">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

/* ── KPI Card ── */
const KpiCard = ({
  icon: Icon,
  label,
  value,
  unit,
  trend,
  accent = "hsl(var(--primary))",
  delay = 0,
  sub,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    className="relative rounded-2xl p-4 overflow-hidden"
    style={{
      background: "hsl(var(--card))",
      border: "1px solid hsl(var(--border))",
      boxShadow: "var(--shadow-card)",
    }}
  >
    <div
      className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-[0.14] pointer-events-none"
      style={{ background: accent }}
    />
    <div className="flex items-start justify-between mb-3">
      <div
        className="w-9 h-9 rounded-[11px] flex items-center justify-center"
        style={{ background: `${accent}20` }}
      >
        <Icon
          className="w-[17px] h-[17px]"
          style={{ color: accent }}
          strokeWidth={2}
        />
      </div>
      {trend != null && (
        <span
          className="flex items-center gap-1 text-[11px] font-medium mt-0.5"
          style={{
            color: trend >= 0 ? "hsl(var(--primary))" : "hsl(0 72% 51%)",
          }}
        >
          {trend >= 0 ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {Math.abs(trend)}%
        </span>
      )}
    </div>
    <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">
      {label}
    </p>
    <div className="flex items-end gap-1 leading-none">
      <span className="text-[23px] font-bold text-foreground">
        {value ?? "—"}
      </span>
      {unit && (
        <span className="text-[12px] text-muted-foreground mb-0.5">{unit}</span>
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

/* ── Section Header ── */
const SHead = ({
  icon: Icon,
  title,
  sub,
  color = "hsl(var(--primary))",
  right,
}) => (
  <div className="flex items-center justify-between mb-5">
    <div className="flex items-center gap-3">
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
        {sub && (
          <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
        )}
      </div>
    </div>
    {right}
  </div>
);

/* ── Radial Gauge ── */
const Gauge = ({ value, label, color }) => {
  const pct = Math.min(100, Math.max(0, Math.round(value)));
  const data = [{ value: pct }, { value: 100 - pct }];
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div style={{ width: 90, height: 90, position: "relative" }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="70%"
            outerRadius="100%"
            startAngle={210}
            endAngle={-30}
            data={data}
            barSize={9}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar dataKey="value" cornerRadius={5} background={false}>
              <Cell fill={color} />
              <Cell fill="hsl(var(--muted))" />
            </RadialBar>
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[17px] font-bold text-foreground leading-none">
            {pct}
          </span>
          <span className="text-[9px] text-muted-foreground">%</span>
        </div>
      </div>
      <p className="text-[11px] font-medium text-muted-foreground text-center leading-tight">
        {label}
      </p>
    </div>
  );
};

/* ── Tab Pill ── */
const TabPill = ({ tabs, active, onChange }) => (
  <div
    className="flex items-center gap-0.5 p-1 rounded-xl"
    style={{
      background: "hsl(var(--muted) / 0.6)",
      border: "1px solid hsl(var(--border))",
    }}
  >
    {tabs.map((t) => (
      <button
        key={t}
        onClick={() => onChange(t)}
        className="px-3 py-1 rounded-[9px] text-xs font-medium transition-all duration-200"
        style={
          active === t
            ? {
                background: "hsl(var(--card))",
                color: "hsl(var(--foreground))",
                boxShadow: "0 1px 4px hsl(var(--foreground)/0.08)",
              }
            : { color: "hsl(var(--muted-foreground))" }
        }
      >
        {t}
      </button>
    ))}
  </div>
);

/* ════════════════════════════════════════════
   MAIN
════════════════════════════════════════════ */
export default function SystemOverview() {
  /* raw API data */
  const [systemSnap, setSystemSnap] = useState(null);
  const [prevSnap, setPrevSnap] = useState(null);
  const [solar, setSolar] = useState([]); // latest per panel
  const [battery, setBattery] = useState([]); // latest per unit
  const [weather, setWeather] = useState(null);

  /* in-session history for charts */
  const [powerHist, setPowerHist] = useState([]); // {time, acTotal, dcTotal, batAvg}
  const [solarHist, setSolarHist] = useState({}); // { Solar_1: [{time,power}], ... }
  const [batHist, setBatHist] = useState({}); // { Battery_1: [{time,charge}], ... }

  const [loading, setLoading] = useState(true);
  const [lastSync, setLastSync] = useState(null);
  const [histTab, setHistTab] = useState("Power"); // Power | Solar | Battery
  const [err, setErr] = useState(null);

  /* ── fetch system ── */
  const fetchSystem = useCallback(async () => {
    const { ok, data, error } = await safeFetch(API_SYSTEM);
    if (!ok) {
      setErr(error);
      return;
    }
    const arr = Array.isArray(data) ? data : [data];
    const snap = latestOf(arr);
    if (!snap) return;
    setPrevSnap((prev) => prev ?? snap);
    setSystemSnap((s) => {
      setPrevSnap(s);
      return snap;
    });
    setLastSync(new Date());
    setErr(null);

    /* power history point */
    setPowerHist((prev) =>
      [
        ...prev,
        {
          time: fmtTs(snap.Timestamp) ?? new Date().toLocaleTimeString(),
          AC: snap.Total_AC_PanelPower ?? 0,
          DC: snap.Total_DC_PanelPower ?? 0,
        },
      ].slice(-30),
    );
  }, []);

  /* ── fetch solar ── */
  const fetchSolar = useCallback(async () => {
    const { ok, data } = await safeFetch(API_SOLAR);
    if (!ok) return;
    const arr = Array.isArray(data) ? data : [data];
    const latest = latestPerDevice(arr, "solarID");
    setSolar(latest);

    /* per-panel history */
    setSolarHist((prev) => {
      const next = { ...prev };
      latest.forEach((p) => {
        const key = p.solarID;
        next[key] = [
          ...(next[key] ?? []),
          {
            time: fmtTs(p.Timestamp) ?? new Date().toLocaleTimeString(),
            Power: p.SolarPower ?? 0,
            Irr: p.Irradiance ?? 0,
          },
        ].slice(-30);
      });
      return next;
    });
  }, []);

  /* ── fetch battery ── */
  const fetchBattery = useCallback(async () => {
    const { ok, data } = await safeFetch(API_BATTERY);
    if (!ok) return;
    const arr = Array.isArray(data) ? data : [data];
    const latest = latestPerDevice(arr, "batteryID");
    setBattery(latest);

    /* per-battery history */
    setBatHist((prev) => {
      const next = { ...prev };
      latest.forEach((b) => {
        const key = b.batteryID;
        next[key] = [
          ...(next[key] ?? []),
          {
            time: fmtTs(b.Timestamp) ?? new Date().toLocaleTimeString(),
            Charge: b.BatteryCharge ?? 0,
            Power: b.BatteryPower ?? 0,
          },
        ].slice(-30);
      });
      return next;
    });
  }, []);

  /* ── fetch weather ── */
  const fetchWeather = useCallback(async () => {
    const { ok, data } = await safeFetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${WEATHER_KEY}&units=metric`,
    );
    if (ok) setWeather(data);
  }, []);

  /* ── intervals ── */
  useEffect(() => {
    Promise.all([
      fetchSystem(),
      fetchSolar(),
      fetchBattery(),
      fetchWeather(),
    ]).finally(() => setLoading(false));
    const t1 = setInterval(fetchSystem, REFRESH_MS);
    const t2 = setInterval(fetchSolar, REFRESH_MS);
    const t3 = setInterval(fetchBattery, REFRESH_MS);
    const t4 = setInterval(fetchWeather, WEATHER_MS);
    return () => [t1, t2, t3, t4].forEach(clearInterval);
  }, [fetchSystem, fetchSolar, fetchBattery, fetchWeather]);

  /* ── derived totals ── */
  const totalSolarPower = solar.reduce((s, p) => s + (p.SolarPower ?? 0), 0);
  const avgBatCharge = battery.length
    ? Math.round(
        battery.reduce((s, b) => s + (b.BatteryCharge ?? 0), 0) /
          battery.length,
      )
    : null;
  const totalBatPower = battery.reduce((s, b) => s + (b.BatteryPower ?? 0), 0);
  const avgSolarTemp = solar.length
    ? +(
        solar.reduce((s, p) => s + (p.Temperature ?? 0), 0) / solar.length
      ).toFixed(1)
    : null;
  const avgBatTemp = battery.length
    ? +(
        battery.reduce((s, b) => s + (b.BatteryTemperature ?? 0), 0) /
        battery.length
      ).toFixed(1)
    : null;
  const efficiency = systemSnap
    ? Math.min(
        100,
        +(
          (systemSnap.Total_AC_PanelPower /
            (systemSnap.Total_DC_PanelPower || 1)) *
          100
        ).toFixed(1),
      )
    : null;

  /* trend vs prev */
  const trendAC =
    prevSnap && systemSnap
      ? +(
          ((systemSnap.Total_AC_PanelPower - prevSnap.Total_AC_PanelPower) /
            (prevSnap.Total_AC_PanelPower || 1)) *
          100
        ).toFixed(1)
      : null;

  /* solar comparison bar data */
  const solarBarData = solar.map((p) => ({
    name: p.solarID.replace("Solar_", "S"),
    Power: p.SolarPower ?? 0,
    Irr: p.Irradiance ?? 0,
    Temp: p.Temperature ?? 0,
  }));

  /* battery comparison bar data */
  const batBarData = battery.map((b) => ({
    name: b.batteryID.replace("Battery_", "B"),
    Charge: b.BatteryCharge ?? 0,
    Power: b.BatteryPower ?? 0,
    Temp: b.BatteryTemperature ?? 0,
  }));

  /* multi-line history — merge all panels/batteries by time */
  const solarLineData = (() => {
    const ids = Object.keys(solarHist);
    if (!ids.length) return [];
    const times = solarHist[ids[0]]?.map((p) => p.time) ?? [];
    return times.map((t, i) => {
      const obj = { time: t };
      ids.forEach((id) => {
        obj[id] = solarHist[id]?.[i]?.Power ?? null;
      });
      return obj;
    });
  })();

  const batLineData = (() => {
    const ids = Object.keys(batHist);
    if (!ids.length) return [];
    const times = batHist[ids[0]]?.map((p) => p.time) ?? [];
    return times.map((t, i) => {
      const obj = { time: t };
      ids.forEach((id) => {
        obj[id] = batHist[id]?.[i]?.Charge ?? null;
      });
      return obj;
    });
  })();

  /* ─────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-background">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.06]"
          style={{ background: "hsl(var(--primary))" }}
        />
        <div
          className="absolute -bottom-32 right-0 w-80 h-80 rounded-full blur-3xl opacity-[0.05]"
          style={{ background: "hsl(var(--accent))" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
        {/* ══ PAGE HEADER ══ */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-[10px] gradient-hero flex items-center justify-center shadow-glow">
                <Layers
                  className="w-4 h-4 text-primary-foreground"
                  strokeWidth={2.5}
                />
              </div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">
                System Overview
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Total system status · {solar.length} panels · {battery.length}{" "}
              batteries
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* weather chip */}
            {weather && (
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs"
                style={{
                  background: "hsl(var(--muted) / 0.6)",
                  border: "1px solid hsl(var(--border))",
                }}
              >
                <Cloud className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-foreground font-medium">
                  {Math.round(weather.main?.temp ?? 0)}°C
                </span>
                <span className="text-muted-foreground capitalize">
                  {weather.weather?.[0]?.description}
                </span>
              </div>
            )}

            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium"
              style={{
                background: !err
                  ? "hsl(var(--primary) / 0.1)"
                  : "hsl(0 75% 55% / 0.1)",
                border: `1px solid ${!err ? "hsl(var(--primary) / 0.3)" : "hsl(0 75% 55% / 0.3)"}`,
                color: !err ? "hsl(var(--primary))" : "hsl(0 70% 45%)",
              }}
            >
              {!err ? (
                <Wifi className="w-3.5 h-3.5" />
              ) : (
                <WifiOff className="w-3.5 h-3.5" />
              )}
              {!err ? "Online" : "Error"}
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
                fetchSolar();
                fetchBattery();
                fetchWeather();
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

        {/* ══ KPIs — SYSTEM TOTALS ══ */}
        <div>
          <SHead
            icon={Zap}
            title="System Totals"
            sub="Aggregated from all APIs"
            color="hsl(var(--primary))"
          />
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[...Array(6)].map((_, i) => (
                <Skel key={i} className="h-28" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <KpiCard
                icon={Zap}
                label="Total AC Power"
                value={fmt(systemSnap?.Total_AC_PanelPower, 0)}
                unit="W"
                accent="hsl(var(--primary))"
                trend={trendAC}
                delay={0.04}
                sub={fmtTs(systemSnap?.Timestamp)}
              />
              <KpiCard
                icon={Activity}
                label="Total DC Power"
                value={fmt(systemSnap?.Total_DC_PanelPower, 0)}
                unit="W"
                accent="hsl(var(--primary-glow))"
                delay={0.08}
              />
              <KpiCard
                icon={TrendingUp}
                label="AC Voltage"
                value={fmt(systemSnap?.Total_AC_PanelVoltage, 0)}
                unit="V"
                accent="hsl(var(--accent))"
                delay={0.12}
              />
              <KpiCard
                icon={Sun}
                label="Total Solar Power"
                value={fmt(totalSolarPower, 0)}
                unit="W"
                accent="hsl(var(--accent))"
                delay={0.16}
                sub={`${solar.length} panels`}
              />
              <KpiCard
                icon={Battery}
                label="Avg Battery"
                value={avgBatCharge ?? "—"}
                unit="%"
                accent={
                  avgBatCharge < 30 ? "hsl(0 72% 51%)" : "hsl(var(--primary))"
                }
                delay={0.2}
                sub={`${battery.length} units`}
              />
              <KpiCard
                icon={Zap}
                label="Total Bat Power"
                value={fmt(totalBatPower, 0)}
                unit="W"
                accent="hsl(var(--primary))"
                delay={0.24}
              />
            </div>
          )}
        </div>

        {/* ══ SYSTEM HEALTH GAUGES ══ */}
        {!loading && systemSnap && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="rounded-2xl p-6"
            style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <SHead
              icon={BarChart3}
              title="System Health"
              sub="Key performance ratios"
              color="hsl(var(--primary))"
            />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center mb-6">
              <Gauge
                value={efficiency ?? 0}
                label="Inverter Efficiency"
                color={healthColor(efficiency ?? 0)}
              />
              <Gauge
                value={avgBatCharge ?? 0}
                label="Avg Battery Charge"
                color={healthColor(avgBatCharge ?? 0)}
              />
              <Gauge
                value={
                  solar.length
                    ? Math.round(
                        (totalSolarPower / (solar.length * 2000)) * 100,
                      )
                    : 0
                }
                label="Solar Utilisation"
                color="hsl(var(--accent))"
              />
              <Gauge
                value={
                  battery.length
                    ? Math.round(
                        (totalBatPower / (battery.length * 1200)) * 100,
                      )
                    : 0
                }
                label="Battery Output"
                color="hsl(var(--primary-glow))"
              />
            </div>

            {/* quick stats */}
            <div className="pt-5 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  label: "Panels online",
                  value: solar.length,
                  unit: "",
                  icon: Sun,
                },
                {
                  label: "Batteries online",
                  value: battery.length,
                  unit: "",
                  icon: Battery,
                },
                {
                  label: "Avg panel temp",
                  value: avgSolarTemp ?? "—",
                  unit: "°C",
                  icon: Thermometer,
                },
                {
                  label: "Avg battery temp",
                  value: avgBatTemp ?? "—",
                  unit: "°C",
                  icon: Thermometer,
                },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0"
                    style={{ background: "hsl(var(--muted) / 0.6)" }}
                  >
                    <s.icon
                      className="w-3.5 h-3.5 text-muted-foreground"
                      strokeWidth={1.8}
                    />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">
                      {s.label}
                    </p>
                    <p className="text-sm font-bold text-foreground">
                      {s.value}
                      {s.unit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ══ HISTORICAL CHARTS ══ */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
          className="rounded-2xl p-5"
          style={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <SHead
            icon={Activity}
            title="Historical Trends"
            sub="In-session readings — updates every 30s"
            color="hsl(var(--primary))"
            right={
              <TabPill
                tabs={["Power", "Solar", "Battery"]}
                active={histTab}
                onChange={setHistTab}
              />
            }
          />

          <AnimatePresence mode="wait">
            {/* ── Power trend ── */}
            {histTab === "Power" && (
              <motion.div
                key="power"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {powerHist.length < 2 ? (
                  <div className="h-48 flex items-center justify-center text-sm text-muted-foreground">
                    Collecting data… check back in a moment
                  </div>
                ) : (
                  <>
                    <div className="flex gap-4 text-[11px] text-muted-foreground mb-3 flex-wrap">
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: "hsl(var(--primary))" }}
                        />
                        AC Total (W)
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: "hsl(var(--accent))" }}
                        />
                        DC Total (W)
                      </span>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart
                        data={powerHist}
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
                          dataKey="AC"
                          name="AC (W)"
                          stroke="hsl(var(--primary))"
                          fill="url(#acG)"
                          strokeWidth={2}
                          dot={false}
                        />
                        <Area
                          type="monotone"
                          dataKey="DC"
                          name="DC (W)"
                          stroke="hsl(var(--accent))"
                          fill="url(#dcG)"
                          strokeWidth={2}
                          dot={false}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </>
                )}
              </motion.div>
            )}

            {/* ── Solar per-panel trend ── */}
            {histTab === "Solar" && (
              <motion.div
                key="solar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {solarLineData.length < 2 ? (
                  <div className="h-48 flex items-center justify-center text-sm text-muted-foreground">
                    Collecting data… check back in a moment
                  </div>
                ) : (
                  <>
                    <p className="text-[11px] text-muted-foreground mb-3">
                      Power output (W) per panel over time
                    </p>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart
                        data={solarLineData}
                        margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
                      >
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
                          tick={{
                            fontSize: 10,
                            fill: "hsl(var(--muted-foreground))",
                          }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip content={<ChartTip />} />
                        <Legend
                          wrapperStyle={{
                            fontSize: 11,
                            color: "hsl(var(--muted-foreground))",
                          }}
                        />
                        {Object.keys(solarHist).map((id, i) => (
                          <Line
                            key={id}
                            type="monotone"
                            dataKey={id}
                            name={id}
                            stroke={PANEL_COLORS[i % PANEL_COLORS.length]}
                            strokeWidth={2}
                            dot={false}
                            connectNulls
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </>
                )}
              </motion.div>
            )}

            {/* ── Battery per-unit trend ── */}
            {histTab === "Battery" && (
              <motion.div
                key="battery"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {batLineData.length < 2 ? (
                  <div className="h-48 flex items-center justify-center text-sm text-muted-foreground">
                    Collecting data… check back in a moment
                  </div>
                ) : (
                  <>
                    <p className="text-[11px] text-muted-foreground mb-3">
                      Charge level (%) per battery unit over time
                    </p>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart
                        data={batLineData}
                        margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
                      >
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
                          domain={[0, 100]}
                          tick={{
                            fontSize: 10,
                            fill: "hsl(var(--muted-foreground))",
                          }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip content={<ChartTip />} />
                        <Legend
                          wrapperStyle={{
                            fontSize: 11,
                            color: "hsl(var(--muted-foreground))",
                          }}
                        />
                        {Object.keys(batHist).map((id, i) => (
                          <Line
                            key={id}
                            type="monotone"
                            dataKey={id}
                            name={id}
                            stroke={PANEL_COLORS[i % PANEL_COLORS.length]}
                            strokeWidth={2}
                            dot={false}
                            connectNulls
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ══ SOLAR PANELS COMPARISON ══ */}
        {!loading && solar.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36 }}
            className="rounded-2xl p-5"
            style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <SHead
              icon={Sun}
              title="Solar Panels"
              sub={`${solar.length} panels · latest readings`}
              color="hsl(var(--accent))"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bar chart */}
              <div>
                <p className="text-[11px] text-muted-foreground mb-3">
                  Power (W) & Irradiance (W/m²) per panel
                </p>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart
                    data={solarBarData}
                    margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="name"
                      tick={{
                        fontSize: 10,
                        fill: "hsl(var(--muted-foreground))",
                      }}
                      tickLine={false}
                      axisLine={false}
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
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar
                      dataKey="Power"
                      name="Power (W)"
                      radius={[5, 5, 0, 0]}
                      fill="hsl(var(--accent))"
                      fillOpacity={0.85}
                    />
                    <Bar
                      dataKey="Irr"
                      name="Irradiance (W/m²)"
                      radius={[5, 5, 0, 0]}
                      fill="hsl(var(--primary))"
                      fillOpacity={0.7}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Panel cards */}
              <div className="space-y-2.5">
                {solar.map((p, i) => (
                  <div
                    key={p.solarID}
                    className="flex items-center gap-3 rounded-[14px] px-4 py-3"
                    style={{
                      background: "hsl(var(--muted) / 0.5)",
                      border: "1px solid hsl(var(--border))",
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0"
                      style={{
                        background: `${PANEL_COLORS[i % PANEL_COLORS.length]}18`,
                      }}
                    >
                      <Sun
                        className="w-4 h-4"
                        style={{ color: PANEL_COLORS[i % PANEL_COLORS.length] }}
                        strokeWidth={2}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-foreground">
                        {p.solarID}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {fmt(p.SolarVoltage)}V · {fmt(p.SolarCurrent)}A ·{" "}
                        {fmt(p.Irradiance, 0)} W/m²
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[15px] font-bold text-foreground">
                        {fmt(p.SolarPower, 0)}
                        <span className="text-[10px] font-normal text-muted-foreground">
                          {" "}
                          W
                        </span>
                      </p>
                      <p
                        className="text-[10px] flex items-center justify-end gap-1"
                        style={{
                          color:
                            (p.Temperature ?? 0) > 50
                              ? "hsl(0 72% 51%)"
                              : "hsl(var(--muted-foreground))",
                        }}
                      >
                        <Thermometer className="w-3 h-3" />
                        {fmt(p.Temperature)}°C
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ══ BATTERIES STATUS ══ */}
        {!loading && battery.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl p-5"
            style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <SHead
              icon={Battery}
              title="Batteries"
              sub={`${battery.length} units · charge & output`}
              color="hsl(var(--primary))"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bar chart */}
              <div>
                <p className="text-[11px] text-muted-foreground mb-3">
                  Charge (%) & Power (W) per unit
                </p>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart
                    data={batBarData}
                    margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="name"
                      tick={{
                        fontSize: 10,
                        fill: "hsl(var(--muted-foreground))",
                      }}
                      tickLine={false}
                      axisLine={false}
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
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar
                      dataKey="Charge"
                      name="Charge (%)"
                      radius={[5, 5, 0, 0]}
                    >
                      {batBarData.map((b, i) => (
                        <Cell
                          key={i}
                          fill={healthColor(b.Charge)}
                          fillOpacity={0.85}
                        />
                      ))}
                    </Bar>
                    <Bar
                      dataKey="Power"
                      name="Power (W)"
                      radius={[5, 5, 0, 0]}
                      fill="hsl(var(--primary-glow))"
                      fillOpacity={0.7}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Battery cards */}
              <div className="space-y-2.5">
                {battery.map((b) => {
                  const color = healthColor(b.BatteryCharge ?? 0);
                  return (
                    <div
                      key={b.batteryID}
                      className="rounded-[14px] px-4 py-3"
                      style={{
                        background: "hsl(var(--muted) / 0.5)",
                        border: "1px solid hsl(var(--border))",
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <HealthIcon pct={b.BatteryCharge ?? 0} />
                          <span className="text-[13px] font-bold text-foreground">
                            {b.batteryID}
                          </span>
                        </div>
                        <span
                          className="text-[14px] font-bold"
                          style={{ color }}
                        >
                          {fmt(b.BatteryCharge, 0)}%
                        </span>
                      </div>
                      <div
                        className="h-1.5 rounded-full overflow-hidden mb-2"
                        style={{ background: "hsl(var(--border))" }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${Math.min(b.BatteryCharge ?? 0, 100)}%`,
                          }}
                          transition={{ duration: 0.9, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ background: color }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>
                          {fmt(b.BatteryVoltage)}V · {fmt(b.BatteryCurrent)}A ·{" "}
                          {fmt(b.BatteryPower, 0)} W
                        </span>
                        <span
                          className="flex items-center gap-1"
                          style={{
                            color:
                              (b.BatteryTemperature ?? 0) > 45
                                ? "hsl(0 72% 51%)"
                                : undefined,
                          }}
                        >
                          <Thermometer className="w-3 h-3" />
                          {fmt(b.BatteryTemperature)}°C
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {loading && (
          <div className="space-y-4">
            <Skel className="h-52" />
            <Skel className="h-56" />
            <Skel className="h-48" />
          </div>
        )}

        <p className="text-center text-[11px] text-muted-foreground pb-6">
          Auto-refresh every {REFRESH_MS / 1000}s
        </p>
      </div>
    </div>
  );
}
