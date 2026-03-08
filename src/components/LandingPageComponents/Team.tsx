// import { motion } from "framer-motion";
// import { Crown } from "lucide-react";

// import islamImg from "@/assets/islam.jpg";
// import gioushy from "@/assets/gioushy.jpg";
// import mostafa from "@/assets/mostafa.jpg";
// import abdelrahman from "@/assets/abdelrahman.jpg";
// import ismailImg from "@/assets/ismail.jpg";

// const fadeUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" as const },
//   }),
// };

// const scaleIn = {
//   hidden: { opacity: 0, scale: 0.8 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: { duration: 0.7, ease: "easeOut" as const },
//   },
// };

// export function Team() {
//   const supervisor = {
//     name: "Dr. Mona Said",
//     role: "Project Supervisor",
//     initials: "MS",
//   };

//   const members = [
//     { name: "Islam Shaban", role: "Web & Networks", image: islamImg },
//     { name: "Mohamed El-Gioushy", role: "Embedded Systems", initials: "Mg" },
//     { name: "Mohamed Mostafa", role: "Networks & Security", initials: "Mm" },
//     { name: "Abdelrahman Ahmed", role: "Cloud & Networks", image: abdelrahman },
//     { name: "Ismail Mohamed", role: "Control Systems", initials: "Im" },
//     { name: "Omar Khaled", role: "Networks", initials: "Ok" },
//   ];

//   return (
//     <section id="team" className="py-32 relative overflow-hidden">
//       <div className="absolute inset-0 gradient-mesh pointer-events-none" />

//       <div className="container mx-auto px-6 relative z-10">
//         {/* Header */}
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <motion.span
//             variants={fadeUp}
//             custom={0}
//             className="inline-block text-sm font-semibold text-primary tracking-widest uppercase mb-4"
//           >
//             Our Team
//           </motion.span>
//           <motion.h2
//             variants={fadeUp}
//             custom={1}
//             className="text-4xl md:text-5xl font-black mb-4"
//           >
//             Meet Our Team
//           </motion.h2>
//           <motion.div
//             variants={fadeUp}
//             custom={2}
//             className="w-20 h-1 gradient-hero rounded-full mx-auto"
//           />
//         </motion.div>

//         {/* Supervisor - Featured Card */}
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           variants={scaleIn}
//           className="max-w-md mx-auto mb-8"
//         >
//           <div className="relative p-1 rounded-3xl gradient-hero shadow-glow">
//             <div className="relative rounded-3xl bg-card p-8 text-center overflow-hidden">
//               {/* Crown badge */}
//               <div className="absolute top-4 right-4">
//                 <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center shadow-lg">
//                   <Crown className="h-5 w-5 text-accent-foreground" />
//                 </div>
//               </div>

//               {/* Initials Avatar */}
//               <div className="relative w-36 h-36 mx-auto mb-5">
//                 <div className="absolute -inset-1 rounded-full gradient-hero opacity-30 blur-md animate-pulse-glow" />
//                 <div className="relative w-36 h-36 rounded-full gradient-hero flex items-center justify-center border-4 border-primary/20">
//                   <span className="text-3xl font-black text-primary-foreground">
//                     {supervisor.initials}
//                   </span>
//                 </div>
//               </div>

//               <span className="inline-block text-xs font-bold text-primary tracking-widest uppercase mb-2">
//                 Supervisor
//               </span>
//               <h3 className="text-2xl font-black mb-1">{supervisor.name}</h3>
//               <p className="text-sm text-muted-foreground">{supervisor.role}</p>

//               {/* Decorative line */}
//               <div className="mt-5 flex items-center justify-center gap-2">
//                 <div className="h-px w-12 gradient-hero opacity-50" />
//                 <div className="w-2 h-2 rounded-full gradient-hero" />
//                 <div className="h-px w-12 gradient-hero opacity-50" />
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Connecting line */}
//         <motion.div
//           initial={{ scaleY: 0 }}
//           whileInView={{ scaleY: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           className="w-px h-16 gradient-hero mx-auto origin-top opacity-40"
//         />

//         {/* Team label */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.4, delay: 0.5 }}
//           className="text-center mb-8"
//         >
//           <span className="inline-block px-5 py-2 rounded-full glass-card text-xs font-bold text-primary tracking-widest uppercase">
//             Team Members
//           </span>
//         </motion.div>

//         {/* Team Grid - 3 columns on md for 6 members */}
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-50px" }}
//           className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-4xl mx-auto"
//         >
//           {members.map((member, i) => (
//             <motion.div
//               key={i}
//               variants={fadeUp}
//               custom={i + 2}
//               className="group"
//             >
//               <div className="relative rounded-2xl glass-card p-5 text-center hover:shadow-elevated hover:-translate-y-3 transition-all duration-500 cursor-pointer overflow-hidden">
//                 <div className="absolute inset-0 gradient-hero opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500" />

//                 <div className="relative z-10">
//                   {/* Photo or Initials */}
//                   <div className="relative w-20 h-20 mx-auto mb-4">
//                     <div className="absolute -inset-1 rounded-full gradient-hero opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500" />
//                     {"image" in member && member.image ? (
//                       <img
//                         src={member.image}
//                         alt={member.name}
//                         className="relative w-20 h-20 rounded-full object-cover border-2 border-border group-hover:border-primary/40 transition-colors duration-500"
//                       />
//                     ) : (
//                       <div className="relative w-20 h-20 rounded-full gradient-hero flex items-center justify-center border-2 border-primary/20 group-hover:scale-110 transition-transform duration-500">
//                         <span className="text-xl font-bold text-primary-foreground">
//                           {"initials" in member ? member.initials : ""}
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   <h3 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors duration-300">
//                     {member.name}
//                   </h3>
//                   <p className="text-xs text-muted-foreground">{member.role}</p>

//                   <div className="h-0.5 w-0 group-hover:w-10 gradient-hero rounded-full transition-all duration-500 mx-auto mt-3" />
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }
import { motion } from "framer-motion";
import { Crown } from "lucide-react";

import islamImg from "@/assets/islam.jpg";
import gioushy from "@/assets/gioushy.jpg";
import mostafa from "@/assets/mostafa.jpg";
import abdelrahman from "@/assets/abdelrahman.jpg";
import ismailImg from "@/assets/ismail.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export function Team() {
  const supervisor = {
    name: "Dr. Mona Said",
    role: "Project Supervisor",
    initials: "MS",
  };

  const members = [
    { name: "Islam Shaban", role: "Web & Networks", image: islamImg },
    { name: "Mohamed El-Gioushy", role: "Embedded Systems", initials: "Mg" },
    { name: "Mohamed Mostafa", role: "Networks & Security", initials: "Mm" },
    { name: "Abdelrahman Ahmed", role: "Cloud & Networks", image: abdelrahman },
    { name: "Ismail Mohamed", role: "Control Systems", initials: "Im" },
    { name: "Omar Khaled", role: "Networks", initials: "Ok" },
  ];

  return (
    <section id="team" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeUp}
            custom={0}
            className="inline-block text-sm font-semibold text-primary tracking-widest uppercase mb-4"
          >
            Our Team
          </motion.span>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-4xl md:text-5xl font-black mb-4"
          >
            Meet Our Team
          </motion.h2>
          <motion.div
            variants={fadeUp}
            custom={2}
            className="w-20 h-1 gradient-hero rounded-full mx-auto"
          />
        </motion.div>

        {/* Supervisor - Featured Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          className="max-w-md mx-auto mb-8"
        >
          <div className="relative p-1 rounded-3xl gradient-hero shadow-glow">
            <div className="relative rounded-3xl bg-card p-8 text-center overflow-hidden">
              {/* Crown badge */}
              <div className="absolute top-4 right-4">
                <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center shadow-lg">
                  <Crown className="h-5 w-5 text-accent-foreground" />
                </div>
              </div>

              {/* Initials Avatar */}
              <div className="relative w-36 h-36 mx-auto mb-5">
                <div className="absolute -inset-1 rounded-full gradient-hero opacity-30 blur-md animate-pulse-glow" />
                <div className="relative w-36 h-36 rounded-full gradient-hero flex items-center justify-center border-4 border-primary/20">
                  <span className="text-3xl font-black text-primary-foreground">
                    {supervisor.initials}
                  </span>
                </div>
              </div>

              <span className="inline-block text-xs font-bold text-primary tracking-widest uppercase mb-2">
                Supervisor
              </span>
              <h3 className="text-2xl font-black mb-1">{supervisor.name}</h3>
              <p className="text-sm text-muted-foreground">{supervisor.role}</p>

              {/* Decorative line */}
              <div className="mt-5 flex items-center justify-center gap-2">
                <div className="h-px w-12 gradient-hero opacity-50" />
                <div className="w-2 h-2 rounded-full gradient-hero" />
                <div className="h-px w-12 gradient-hero opacity-50" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Connecting line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-px h-16 gradient-hero mx-auto origin-top opacity-40"
        />

        {/* Team label */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="text-center mb-8"
        >
          <span className="inline-block px-5 py-2 rounded-full glass-card text-xs font-bold text-primary tracking-widest uppercase">
            Team Members
          </span>
        </motion.div>

        {/* Team Grid - Enhanced Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto"
        >
          {members.map((member, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i + 2}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <div className="relative rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 p-6 text-center hover:border-primary/30 hover:bg-card/80 hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10 space-y-4">
                  {/* Photo or Initials */}
                  <div className="relative w-24 h-24 mx-auto">
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {"image" in member && member.image ? (
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-border group-hover:border-primary/40 transition-all duration-300 shadow-lg">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center border-4 border-primary/20 group-hover:border-primary/40 shadow-lg group-hover:shadow-glow transition-all duration-300">
                        <span className="text-2xl font-bold text-primary-foreground">
                          {"initials" in member ? member.initials : ""}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Name and Role */}
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {member.role}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                    className="h-1 bg-gradient-to-r from-primary via-primary-glow to-primary rounded-full mx-auto w-12 group-hover:w-20 transition-all duration-300"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
