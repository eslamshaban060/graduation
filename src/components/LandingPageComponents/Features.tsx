import { Activity, Cloud, Lock, Brain, BarChart3, Wifi } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const }
  }),
};

export function Features() {
  const features = [
    { icon: Activity, title: "Real-time Monitoring", desc: "Track performance and system health with live data updates." },
    { icon: Cloud, title: "Cloud Integration", desc: "Seamless cloud connectivity and access from anywhere." },
    { icon: Lock, title: "Secure Communication", desc: "End-to-end encryption for complete data protection." },
    { icon: Brain, title: "Smart Fault Prediction", desc: "AI detects anomalies before failures occur." },
    { icon: BarChart3, title: "Energy Analytics", desc: "Deep insights to optimize energy production." },
    { icon: Wifi, title: "IoT Connectivity", desc: "Robust sensor and device integration." },
  ];

  return (
    <section id="features" className="py-32 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span variants={fadeUp} custom={0} className="inline-block text-sm font-semibold text-primary tracking-widest uppercase mb-4">
            Capabilities
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-black mb-4">
            Key <span className="text-gradient">Features</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-muted-foreground max-w-md mx-auto">
            Powerful capabilities that make our system stand out
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i}
              className="group relative p-7 rounded-2xl glass-card hover:shadow-elevated hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 gradient-hero opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:gradient-hero group-hover:shadow-glow transition-all duration-500">
                  <f.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
