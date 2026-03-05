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
          MOBILE SIDEBAR OVERLAY + DRAWER
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Scrim */}
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-[60] bg-foreground/20 backdrop-blur-sm md:hidden"
            />

            {/* Drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 340,
                damping: 36,
                mass: 0.8,
              }}
              className="
                fixed top-0 right-0 bottom-0 z-[70]
                w-[78vw] max-w-[320px]
                bg-card border-l border-border
                flex flex-col
                md:hidden
                overflow-hidden
              "
            >
              {/* Subtle glow inside drawer */}
              <div
                className="absolute -top-20 -right-20 w-52 h-52 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ background: "hsl(var(--primary))" }}
              />
              <div
                className="absolute bottom-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-10 pointer-events-none"
                style={{ background: "hsl(var(--accent))" }}
              />

              {/* Drawer header */}
              <div className="relative flex items-center justify-between px-5 pt-5 pb-4 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-[10px] gradient-hero blur-md opacity-50" />
                    <div className="relative w-8 h-8 rounded-[10px] gradient-hero flex items-center justify-center">
                      <Zap
                        className="w-4 h-4 text-primary-foreground"
                        strokeWidth={2.5}
                      />
                    </div>
                  </div>
                  <span className="font-bold text-sm text-foreground tracking-tight">
                    Smart
                    <span
                      className="bg-clip-text text-transparent"
                      style={{ backgroundImage: "var(--gradient-hero)" }}
                    >
                      Solar
                    </span>
                  </span>
                </div>

                <motion.button
                  whileTap={{ scale: 0.88, rotate: 90 }}
                  onClick={() => setSidebarOpen(false)}
                  className="w-8 h-8 rounded-[10px] bg-muted/60 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Nav links */}
              <nav className="relative flex-1 overflow-y-auto px-3 py-4 space-y-1">
                {navLinks.map((link, i) => {
                  const Icon = link.icon;
                  const isActive = active === link.href;
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={() => go(link.href)}
                      initial={{ opacity: 0, x: 28 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: i * 0.055,
                        ease: [0.22, 1, 0.36, 1],
                        duration: 0.35,
                      }}
                      className={`
                        flex items-center gap-3.5 px-4 py-3.5 rounded-[13px]
                        text-sm font-medium select-none
                        transition-all duration-200
                        ${
                          isActive
                            ? "gradient-hero text-primary-foreground shadow-glow"
                            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                        }
                      `}
                    >
                      <Icon
                        className="w-[17px] h-[17px] shrink-0"
                        strokeWidth={isActive ? 2.5 : 1.8}
                      />
                      <span className="flex-1">{link.name}</span>
                      {isActive && (
                        <ChevronRight className="w-4 h-4 opacity-70" />
                      )}
                    </motion.a>
                  );
                })}
              </nav>

              {/* Drawer footer — Sign In CTA */}
              <div className="relative px-4 pb-8 pt-4 border-t border-border">
                <motion.a
                  href="/login"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  whileTap={{ scale: 0.97 }}
                  className="
                    flex items-center justify-center gap-2.5
                    w-full py-3.5 rounded-[13px]
                    gradient-hero text-primary-foreground
                    text-sm font-semibold shadow-glow
                    hover:opacity-90 transition-opacity
                  "
                >
                  <LogIn className="w-4 h-4" />
                  Sign In to Dashboard
                  <ArrowUpRight className="w-4 h-4 opacity-70" />
                </motion.a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
