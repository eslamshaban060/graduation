import {
  GraduationCap,
  Code,
  Network,
  Shield,
  Cloud,
  Cpu,
  Gauge,
} from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Team() {
  const supervisor = {
    name: "Dr. Mona Said",
    title: "Project Supervisor",
    department: "Faculty of Engineering, Minia University",
  };

  const members = [
    {
      name: "Eslam Shaba Gomah",
      role: "Web Development",
      icon: Code,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "Mohamed El-Gioushy",
      role: "Embedded Systems",
      icon: Cpu,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      name: "Mohamed Mostafa",
      role: "Security & Networks",
      icon: Shield,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      name: "Omar Khaled Mohamed",
      role: "Network Systems",
      icon: Network,
      gradient: "from-orange-500 to-red-500",
    },
    {
      name: "Abdelrahman Ahmed",
      role: "Cloud & Networks",
      icon: Cloud,
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      name: "Ismail Mohamed Hassan",
      role: "Control Systems",
      icon: Gauge,
      gradient: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <section id="team" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-block text-sm font-semibold text-primary mb-3"
            >
              THE TEAM
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            >
              Meet the{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary">
                Innovators
              </span>
            </motion.h2>
          </motion.div>

          {/* Supervisor Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 md:mb-16"
          >
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary-glow/20 to-primary/20 rounded-3xl" />
              <div className="relative p-6 md:p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 shadow-xl">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* Icon instead of image */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-primary-glow blur-xl opacity-50" />
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-glow">
                      <GraduationCap
                        className="w-10 h-10 md:w-12 md:h-12 text-primary-foreground"
                        strokeWidth={2}
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
                      SUPERVISOR
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-1">
                      {supervisor.name}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground mb-1">
                      {supervisor.title}
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground/80">
                      {supervisor.department}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Team Members Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          >
            {members.map((member, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i + 3}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div className="relative p-5 md:p-6 rounded-xl md:rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:bg-card/80 hover:shadow-xl transition-all duration-300">
                  {/* Icon with gradient */}
                  <div
                    className={`relative w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-xl md:rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                  >
                    <member.icon
                      className="w-7 h-7 md:w-8 md:h-8 text-white"
                      strokeWidth={2}
                    />
                  </div>

                  {/* Info */}
                  <div className="text-center">
                    <h3 className="font-bold text-sm md:text-base mb-1.5">
                      {member.name}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${member.gradient} rounded-b-xl md:rounded-b-2xl`}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
