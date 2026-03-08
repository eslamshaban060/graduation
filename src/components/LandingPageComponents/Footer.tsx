import { Github, Linkedin, Mail, Zap, Heart } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Mail, href: "mailto:team@smartsolar.edu", label: "Email" },
  ];

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Project", href: "#about" },
    { name: "Flow", href: "#flow" },
    { name: "Team", href: "#team" },
    { name: "Features", href: "#features" },
  ];

  return (
    <footer id="contact" className="relative overflow-hidden">
      {/* Top gradient border */}
      <div className="h-px w-full gradient-hero opacity-30" />

      <div className="py-16 relative">
        <div className="absolute inset-0 gradient-mesh pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 mb-12">
              {/* Brand */}
              <div>
                <a href="#home" className="flex items-center gap-3 mb-4 group">
                  <div className="p-2 rounded-xl gradient-hero">
                    <Zap className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="font-bold text-lg">
                    Smart<span className="text-gradient">Solar</span>
                  </span>
                </a>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  An intelligent IoT & AI platform for solar power management.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest mb-4 text-primary">
                  Quick Links
                </h4>
                <div className="space-y-2">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Connect */}
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest mb-4 text-primary">
                  Connect
                </h4>
                <div className="flex gap-3">
                  {socialLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="w-10 h-10 rounded-xl glass-card flex items-center justify-center hover:gradient-hero hover:shadow-glow hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                    >
                      <link.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Faculty of Engineering
                  <br />
                  Minia University
                </p>
              </div>
            </div>

            {/* Bottom */}
            <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} Smart Solar Team. All rights
                reserved.
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                Made by Eslam Shaban
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
