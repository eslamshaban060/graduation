import { ArrowRight, Users, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-solar.jpg";
import { motion } from "framer-motion";
import { Scroll } from "lucide-react";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Modern background with image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Solar power system"
          className="w-full h-full object-cover opacity-50 dark:opacity-12"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
      </div>

      {/* Subtle animated grid */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-[0.07] dark:opacity-[0.05]">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Elegant glow orbs */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.06, 0.12, 0.06],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent rounded-full blur-[100px]"
      />

      {/* Content */}
      <div className="container mx-auto px-6 z-10 relative pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/40 bg-background/40 backdrop-blur-xl mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-sm font-medium">
                Graduation Project 2026
              </span>
              <Sparkles className="w-3.5 h-3.5 text-accent" strokeWidth={2} />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1] tracking-tight"
          >
            Smart Solar
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-glow to-primary">
              Power System
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            An intelligent IoT & AI platform for monitoring and optimizing
            renewable energy systems.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-16"
          >
            <Button
              size="lg"
              className="px-8 h-14 text-base font-semibold rounded-xl gradient-hero shadow-glow hover:shadow-elevated transition-all duration-300 hover:scale-[1.02] group text-primary-foreground"
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Project
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 h-14 text-base font-semibold rounded-xl bg-background/40 backdrop-blur-xl border-border/40 hover:bg-background/60 hover:border-primary/20 transition-all duration-300 hover:text-primary hover:scale-[1.02]"
              onClick={() =>
                document
                  .getElementById("team")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Users className="mr-2 h-5 w-5" />
              Meet the Team
            </Button>
          </motion.div>

          {/* University info */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-muted-foreground"
          >
            Faculty of Engineering • Minia University
          </motion.p>
        </div>
      </div>
    </section>
  );
}
