import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import { Dumbbell, LogIn, LogOut, Menu, User, X } from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const navLinks = [
  { label: "Home", to: "/", ocid: "nav.home_link" },
  { label: "Features", to: "/features", ocid: "nav.features_link" },
  { label: "Diet Plans", to: "/diet", ocid: "nav.diet_link" },
  { label: "Workouts", to: "/workout", ocid: "nav.workout_link" },
  { label: "Dashboard", to: "/dashboard", ocid: "nav.dashboard_link" },
  { label: "About", to: "/about", ocid: "nav.about_link" },
  { label: "Contact", to: "/contact", ocid: "nav.contact_link" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { identity, login, clear, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const location = useLocation();
  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();

  const principalStr = isLoggedIn
    ? `${identity.getPrincipal().toString().slice(0, 8)}...`
    : null;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-fit-red/20 backdrop-blur-md"
      style={{ background: "oklch(0.08 0 0 / 0.95)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Dumbbell
                className="w-7 h-7 text-fit-red group-hover:animate-dumbbell transition-transform"
                strokeWidth={2.5}
              />
            </div>
            <span className="font-display font-extrabold text-lg tracking-tight">
              <span className="text-white">FitTrack</span>
              <span className="text-fit-red"> | SRIRAM</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid={link.ocid}
                  className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-fit-red bg-fit-red/10"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-fit-surface-2 border border-fit-red/20">
                  <User className="w-3.5 h-3.5 text-fit-red" />
                  <span className="text-xs text-muted-foreground font-mono">
                    {principalStr}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={clear}
                  data-ocid="nav.logout_button"
                  className="border-fit-red/40 text-fit-red hover:bg-fit-red hover:text-white transition-all"
                >
                  <LogOut className="w-3.5 h-3.5 mr-1" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={login}
                  disabled={isLoggingIn || isInitializing}
                  data-ocid="nav.login_button"
                  className="text-muted-foreground hover:text-white"
                >
                  <LogIn className="w-3.5 h-3.5 mr-1" />
                  {isLoggingIn ? "Connecting..." : "Login"}
                </Button>
                <Button
                  size="sm"
                  onClick={login}
                  disabled={isLoggingIn || isInitializing}
                  data-ocid="nav.signup_button"
                  className="bg-fit-red hover:bg-fit-red-bright text-white font-semibold animate-pulse-glow"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="lg:hidden p-2 text-muted-foreground hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="lg:hidden border-t border-fit-red/10 py-4 px-4"
          style={{ background: "oklch(0.08 0 0 / 0.98)" }}
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid={link.ocid}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-2.5 rounded text-sm font-medium transition-all ${
                    isActive
                      ? "text-fit-red bg-fit-red/10"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3 mt-3 border-t border-fit-red/10 flex flex-col gap-2">
              {isLoggedIn ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    clear();
                    setMenuOpen(false);
                  }}
                  data-ocid="nav.logout_button"
                  className="border-fit-red/40 text-fit-red"
                >
                  <LogOut className="w-3.5 h-3.5 mr-1" />
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      login();
                      setMenuOpen(false);
                    }}
                    data-ocid="nav.login_button"
                    className="text-muted-foreground"
                  >
                    <LogIn className="w-3.5 h-3.5 mr-1" />
                    Login
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      login();
                      setMenuOpen(false);
                    }}
                    data-ocid="nav.signup_button"
                    className="bg-fit-red hover:bg-fit-red-bright text-white"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
