import { Dumbbell } from "lucide-react";
import { SiInstagram, SiX, SiYoutube } from "react-icons/si";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* Red to black gradient background */}
      <div className="bg-footer-gradient">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Dumbbell className="w-6 h-6 text-white" strokeWidth={2.5} />
                <span className="font-display font-extrabold text-white text-lg">
                  FitTrack | SRIRAM
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Your ultimate weight gain and fitness tracking platform. Built
                for athletes, by athletes.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-bold text-white mb-3 text-sm uppercase tracking-widest">
                Quick Links
              </h4>
              <div className="flex flex-col gap-1.5">
                {[
                  { label: "Home", href: "/" },
                  { label: "Features", href: "/features" },
                  { label: "Diet Plans", href: "/diet" },
                  { label: "Workout Plans", href: "/workout" },
                  { label: "Dashboard", href: "/dashboard" },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-display font-bold text-white mb-3 text-sm uppercase tracking-widest">
                Follow Us
              </h4>
              <div className="flex gap-4 mb-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
                  aria-label="Instagram"
                >
                  <SiInstagram className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
                  aria-label="Twitter/X"
                >
                  <SiX className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
                  aria-label="YouTube"
                >
                  <SiYoutube className="w-4 h-4" />
                </a>
              </div>
              <p className="text-white/50 text-xs">
                Join our fitness community and share your progress journey.
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/20 pt-6 flex items-center justify-center">
            <p className="text-white font-semibold text-sm text-center">
              © {year} Weight Gain Tracker | Powered by SRIRAM
            </p>
          </div>
        </div>
      </div>

      {/* Decorative glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-fit-red to-transparent" />
    </footer>
  );
}
