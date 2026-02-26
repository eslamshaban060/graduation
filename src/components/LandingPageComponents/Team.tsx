import { User } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const }
  }),
};

export function Team() {
  const members = [
    { name: "Islam Shaban", role: "Web & Networks", initials: "IS" },
    { name: "Mohamed El-Gioushy", role: "Embedded Systems", initials: "MG" },
    { name: "Mohamed Mostafa", role: "Networks & Security", initials: "MM" },
    { name: "Abdelrahman Ahmed", role: "Cloud & Networks", initials: "AA" },
    { name: "Ismail", role: "Control Systems", initials: "IM" },
  ];

  return (
    <section id="team" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span variants={fadeUp} custom={0} className="inline-block text-sm font-semibold text-primary tracking-widest uppercase mb-4">
            The Builders
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-black mb-4">
            Our <span className="text-gradient">Team</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-muted-foreground">
            Supervised by <span className="font-bold text-primary">Dr. Mona Said</span>
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto"
        >
          {members.map((member, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i}
              className="group relative"
            >
              <div className="relative p-6 rounded-2xl glass-card text-center hover:shadow-elevated hover:-translate-y-3 transition-all duration-500 cursor-pointer overflow-hidden">
                {/* Hover background effect */}
                <div className="absolute inset-0 gradient-hero opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="relative w-20 h-20 mx-auto mb-5">
                    <div className="absolute inset-0 rounded-full gradient-hero opacity-20 blur-md group-hover:opacity-40 transition-opacity" />
                    <div className="relative w-20 h-20 rounded-full gradient-hero flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-500">
                      <span className="text-xl font-bold text-primary-foreground">{member.initials}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                  <p className="text-xs text-muted-foreground">{member.role}</p>

                  {/* Bottom accent line */}
                  <div className="h-1 w-0 group-hover:w-12 gradient-hero rounded-full transition-all duration-500 mx-auto mt-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
