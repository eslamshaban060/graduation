import { useState, useEffect } from "react";
import {
  Home,
  FolderOpen,
  GitBranch,
  Users,
  Sparkles,
  Mail,
  LogIn,
  Zap,
  AlignJustify,
  X,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

/* ─────────────────────────────────────────── */
const navLinks = [
  { name: "Home", href: "#home", icon: Home },
  { name: "Project", href: "#about", icon: FolderOpen },
  { name: "Flow", href: "#flow", icon: GitBranch },
  { name: "Team", href: "#team", icon: Users },
  { name: "Features", href: "#features", icon: Sparkles },
  { name: "Contact", href: "#contact", icon: Mail },
];

/* ─────────────────────────────────────────── */
export function Navbar() {
  const [active, setActive] = useState("#home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  /* lock body scroll when sidebar open */
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const go = (href) => {
    setActive(href);
    setSidebarOpen(false);
  };

  /* ════════════════════════════════════════════
     RENDER
  ════════════════════════════════════════════ */
  return (
    <>
      {/* ══════════════════════════════════════
          SHARED NAV SHELL
      ══════════════════════════════════════ */}
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-50 h-16"
      >
        {/* Adaptive backdrop — only after scroll */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 bg-background/80 backdrop-blur-2xl border-b border-border"
        />

        <div className="relative h-full container mx-auto px-5 flex items-center justify-between gap-4">
          {/* ── Logo ── */}
          <a
            href="#home"
            onClick={() => go("#home")}
            className="flex items-center gap-2.5 shrink-0 group select-none"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-[11px] gradient-hero blur-[10px] opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
              <div className="relative w-9 h-9 rounded-[11px] gradient-hero flex items-center justify-center shadow-glow">
                <Zap
                  className="w-[17px] h-[17px] text-primary-foreground"
                  strokeWidth={2.8}
                />
              </div>
            </div>
            <span className="font-bold text-[15px] tracking-tight text-foreground leading-none">
              Smart
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--gradient-hero)" }}
              >
                Solar
              </span>
            </span>
          </a>

          {/* ── Desktop center pill ── */}
          <nav className="hidden md:flex items-center gap-0.5 bg-muted/50 border border-border/70 rounded-2xl p-[5px]">
            {navLinks.map((link) => {
              const active_ = active === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => go(link.href)}
                  className="relative px-[14px] py-[7px] text-[13px] font-medium rounded-[11px] select-none transition-colors duration-150"
                  style={{
                    color: active_
                      ? "hsl(var(--primary-foreground))"
                      : "hsl(var(--muted-foreground))",
                  }}
                >
                  {active_ && (
                    <motion.span
                      layoutId="pill"
                      className="absolute inset-0 rounded-[11px] gradient-hero shadow-glow"
                      transition={{
                        type: "spring",
                        stiffness: 440,
                        damping: 38,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggle />

            {/* Desktop Sign In */}
            <motion.a
              href="/login"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="hidden md:flex items-center gap-2 px-4 py-[9px] rounded-[11px] text-[13px] font-semibold gradient-hero text-primary-foreground shadow-glow hover:opacity-90 transition-opacity"
            >
              <LogIn className="w-[15px] h-[15px]" />
              Sign In
            </motion.a>

            {/* ── Mobile sidebar toggle ── */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setSidebarOpen(true)}
              className="
                md:hidden flex items-center justify-center
                w-9 h-9 rounded-[11px]
                bg-muted/60 border border-border
                text-foreground hover:bg-muted transition-colors
              "
              aria-label="Open menu"
            >
              <AlignJustify className="w-[18px] h-[18px]" strokeWidth={1.8} />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ══════════════════════════════════════
          MOBILE FULLSCREEN TOP DRAWER
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Modern Fullscreen Drawer from Top */}
            <motion.aside
              key="drawer"
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 40,
                mass: 1,
              }}
              className="
                fixed inset-0 z-[70]
                bg-background/98 backdrop-blur-2xl
                flex flex-col
                md:hidden
                overflow-hidden
                
              "
              style={{
                background:
                  "linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)",
              }}
            >
              {/* Animated gradient orbs - bigger for fullscreen */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.12, 0.22, 0.12],
                  x: [0, 40, 0],
                  y: [0, 30, 0],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-10 right-10 w-96 h-96 rounded-full blur-3xl pointer-events-none"
                style={{ background: "hsl(var(--primary))" }}
              />
              <motion.div
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.08, 0.18, 0.08],
                  x: [0, -30, 0],
                  y: [0, 40, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="absolute bottom-32 left-10 w-80 h-80 rounded-full blur-3xl pointer-events-none"
                style={{ background: "hsl(var(--accent))" }}
              />

              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 4,
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl pointer-events-none"
                style={{ background: "hsl(var(--primary-glow))" }}
              />

              {/* Header with close button */}
              <div className="relative px-6 pt-8 pb-4 flex items-center justify-between">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <div className="relative">
                    <motion.div
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.4, 0.7, 0.4],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 rounded-xl gradient-hero blur-lg"
                    />
                    <div className="relative w-11 h-11 rounded-xl gradient-hero flex items-center justify-center shadow-lg">
                      <Zap
                        className="w-6 h-6 text-primary-foreground"
                        strokeWidth={2.5}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-lg tracking-tight leading-none">
                      <span className="text-foreground">Smart</span>
                      <span
                        className="bg-clip-text text-transparent"
                        style={{ backgroundImage: "var(--gradient-hero)" }}
                      >
                        Solar
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-1 tracking-wide">
                      Energy Management System
                    </p>
                  </div>
                </motion.div>

                <motion.button
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9, rotate: 180 }}
                  onClick={() => setSidebarOpen(false)}
                  className="
                    w-11 h-11 rounded-xl 
                    bg-muted/40 backdrop-blur-sm
                    border border-border/50
                    flex items-center justify-center 
                    text-muted-foreground hover:text-foreground
                    hover:bg-muted/60 hover:border-border
                    transition-all duration-300
                    shadow-sm
                  "
                >
                  <X className="w-5 h-5" strokeWidth={2} />
                </motion.button>
              </div>

              {/* Centered Content Container with scroll support */}
              <div className="relative flex-1 pt-20 flex flex-col items-center justify-center px-6 py-4 overflow-y-auto">
                {/* Navigation Grid/Stack */}
                <nav className="w-full max-w-md space-y-2 my-auto">
                  {navLinks.map((link, i) => {
                    const Icon = link.icon;
                    const isActive = active === link.href;
                    return (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        onClick={() => go(link.href)}
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          delay: 0.25 + i * 0.08,
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                        whileHover={{ scale: 1.03, x: 4 }}
                        whileTap={{ scale: 0.97 }}
                        className={`
                          relative group flex items-center gap-4 
                          px-5 py-3.5 rounded-2xl
                          text-base font-semibold select-none
                          transition-all duration-300
                          overflow-hidden
                          ${
                            isActive
                              ? "text-primary-foreground"
                              : "text-muted-foreground hover:text-foreground"
                          }
                        `}
                      >
                        {/* Active background with gradient */}
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 gradient-hero shadow-glow"
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 40,
                            }}
                            style={{ borderRadius: "1rem" }}
                          />
                        )}

                        {/* Hover effect for inactive items */}
                        {!isActive && (
                          <div className="absolute inset-0 bg-muted/0 group-hover:bg-muted/50 rounded-2xl transition-all duration-300" />
                        )}

                        {/* Icon container with pulse */}
                        <motion.div
                          className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center"
                          animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 0.4 }}
                          style={{
                            background: isActive
                              ? "rgba(255,255,255,0.15)"
                              : "transparent",
                          }}
                        >
                          <Icon
                            className="w-5 h-5 shrink-0"
                            strokeWidth={isActive ? 2.5 : 2}
                          />
                        </motion.div>

                        {/* Label */}
                        <span className="relative z-10 flex-1 text-left">
                          {link.name}
                        </span>

                        {/* Active indicator - pulsing dot */}
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="relative z-10 flex items-center gap-2"
                          >
                            <motion.div
                              animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="w-2.5 h-2.5 rounded-full bg-primary-foreground"
                            />
                          </motion.div>
                        )}

                        {/* Inactive arrow hint */}
                        {!isActive && (
                          <ChevronRight className="relative z-10 w-5 h-5 opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                        )}
                      </motion.a>
                    );
                  })}
                </nav>
              </div>

              {/* Bottom CTA Section - compact */}
              <div className="relative px-6 pb-6 pt-3">
                {/* Divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4"
                />

                <motion.a
                  href="/login"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.75,
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="
                    relative group
                    flex items-center justify-center gap-3
                    w-full max-w-md mx-auto
                    py-4 rounded-2xl
                    gradient-hero text-primary-foreground
                    text-base font-bold
                    shadow-glow
                    overflow-hidden
                    transition-all duration-300
                  "
                >
                  {/* Animated shimmer effect */}
                  <motion.div
                    animate={{
                      x: ["-200%", "200%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 2,
                    }}
                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12"
                  />

                  <LogIn className="w-5 h-5 relative z-10" strokeWidth={2.5} />
                  <span className="relative z-10">Sign In to Dashboard</span>
                  <ArrowUpRight className="w-5 h-5 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 relative z-10" />
                </motion.a>

                {/* Decorative animated dots - smaller */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.85 }}
                  className="mt-4 flex justify-center gap-2"
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        opacity: [0.2, 0.6, 0.2],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background:
                          i === 2
                            ? "hsl(var(--primary))"
                            : "hsl(var(--primary) / 0.3)",
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
