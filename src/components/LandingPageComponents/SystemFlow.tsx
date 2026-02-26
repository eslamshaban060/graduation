import { Sun, Cpu, Wifi, Server, Monitor } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: "easeOut" as const }
  }),
};

export function SystemFlow() {
  const steps = [
    { icon: Sun, title: "Solar Panels", desc: "Energy generation", color: "from-amber-400 to-orange-500" },
    { icon: Cpu, title: "Sensors", desc: "Data collection", color: "from-emerald-400 to-teal-500" },
    { icon: Wifi, title: "IoT Gateway", desc: "Transmission", color: "from-cyan-400 to-blue-500" },
    { icon: Server, title: "Cloud", desc: "Processing", color: "from-violet-400 to-purple-500" },
    { icon: Monitor, title: "Dashboard", desc: "Monitoring", color: "from-pink-400 to-rose-500" },
  ];

  return (
    <section id="flow" className="py-32 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span variants={fadeUp} custom={0} className="inline-block text-sm font-semibold text-primary tracking-widest uppercase mb-4">
            How It Works
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-black mb-4">
            System <span className="text-gradient">Flow</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-muted-foreground max-w-md mx-auto">
            From solar panels to your dashboard — seamless data flow
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-5xl mx-auto"
        >
          {/* Desktop flow */}
          <div className="hidden md:flex items-center justify-between relative">
            {/* Connecting line */}
            <div className="absolute top-12 left-[10%] right-[10%] h-[2px]">
              <div className="w-full h-full bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-full" />
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute top-0 left-0 w-full h-full gradient-hero rounded-full origin-left opacity-60"
              />
            </div>

            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="flex flex-col items-center text-center relative z-10 group"
              >
                <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-5 shadow-lg group-hover:shadow-xl group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 animate-pulse-glow`}>
                  <step.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-bold text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Mobile flow */}
          <div className="md:hidden space-y-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="flex items-center gap-5"
              >
                <div className="relative">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <step.icon className="h-7 w-7 text-white" />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[2px] h-4 gradient-hero opacity-40" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
