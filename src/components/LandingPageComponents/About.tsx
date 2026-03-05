import { Brain, Shield, Zap, Cloud, ArrowUpRight } from "lucide-react";
import dashboardImage from "@/assets/dashboard-preview.jpg";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export function About() {
  const features = [
    {
      icon: Zap,
      title: "IoT Integration",
      desc: "Real-time sensor data collection and device control",
    },
    {
      icon: Brain,
      title: "AI-Powered",
      desc: "Smart predictions and fault detection algorithms",
    },
    {
      icon: Cloud,
      title: "Cloud Connected",
      desc: "Secure cloud storage and remote monitoring",
    },
    {
      icon: Shield,
      title: "Secure System",
      desc: "End-to-end encryption and protected communication",
    },
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.span
                variants={fadeUp}
                custom={0}
                className="inline-block text-sm font-semibold text-primary tracking-widest uppercase mb-4"
              >
                About the Project
              </motion.span>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-4xl md:text-5xl font-black mb-6 leading-tight"
              >
                Engineering the
                <br />
                <span className="text-gradient">Future of Energy</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-lg text-muted-foreground leading-relaxed mb-8"
              >
                Our graduation project integrates IoT, AI, and embedded
                technologies to build a unified smart system for monitoring
                solar stations in real-time. The goal is to enhance energy
                efficiency, prevent faults, and enable remote supervision
                through an intuitive web dashboard.
              </motion.p>
              <motion.div
                variants={fadeUp}
                custom={3}
                className="flex items-center gap-4"
              >
                <div className="h-[3px] w-16 gradient-hero rounded-full" />
                <span className="text-sm font-semibold text-primary tracking-wide">
                  Engineering Excellence
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative group"
            >
              <div className="absolute -inset-4 gradient-hero opacity-15 blur-3xl rounded-3xl group-hover:opacity-25 transition-opacity duration-700" />
              <div className="relative rounded-2xl overflow-hidden shadow-elevated">
                <img
                  src={dashboardImage}
                  alt="Dashboard preview"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <p></p>
                  {/* <div>
                    <p className="text-sm font-semibold text-primary-foreground">
                      Live Dashboard
                    </p>
                    <p className="text-xs text-primary-foreground/70">
                      Real-time monitoring interface
                    </p>
                  </div> */}
                  <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center">
                    <ArrowUpRight className="h-5 w-5 text-accent-foreground" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Feature cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i + 3}
                className="group p-5 md:p-6 rounded-xl md:rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon
                    className="w-5 h-5 md:w-6 md:h-6 text-primary"
                    strokeWidth={2}
                  />
                </div>
                <h3 className="font-bold text-sm md:text-base mb-1 md:mb-2">
                  {f.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
