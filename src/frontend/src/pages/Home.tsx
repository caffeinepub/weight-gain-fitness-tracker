import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Award,
  ChevronRight,
  Dumbbell,
  Flame,
  LogIn,
  Shield,
  Star,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useCalorieEntries, useWeightEntries } from "../hooks/useQueries";

// Animated ECG/heartbeat SVG
function HeartbeatLine() {
  return (
    <svg
      viewBox="0 0 600 80"
      className="w-full h-16 opacity-60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Heartbeat ECG line animation"
    >
      <path
        d="M0,40 L80,40 L100,10 L120,70 L140,20 L160,60 L180,40 L280,40 L300,5 L320,75 L340,15 L360,65 L380,40 L480,40 L500,10 L520,70 L540,20 L560,60 L580,40 L600,40"
        stroke="oklch(0.57 0.22 27)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ecg-path"
      />
    </svg>
  );
}

// Stats Card Component
function StatsCard({
  icon: Icon,
  label,
  value,
  unit,
  ocid,
  delay = 0,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  unit?: string;
  ocid: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      data-ocid={ocid}
      className="relative group p-5 rounded-xl bg-fit-surface-2 red-glow-border overflow-hidden cursor-default"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-fit-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            {label}
          </span>
          <div className="w-8 h-8 rounded-lg bg-fit-red/15 flex items-center justify-center">
            <Icon className="w-4 h-4 text-fit-red" />
          </div>
        </div>
        <div className="text-3xl font-display font-extrabold text-white">
          {value === "–" ? (
            <span className="text-muted-foreground text-2xl">–</span>
          ) : (
            value
          )}
          {unit && value !== "–" && (
            <span className="text-base font-normal text-muted-foreground ml-1">
              {unit}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Testimonial Card
function TestimonialCard({
  initials,
  name,
  jobTitle,
  quote,
  delay = 0,
}: {
  initials: string;
  name: string;
  jobTitle: string;
  quote: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.6 }}
      className="p-6 rounded-xl bg-fit-surface-2 border border-fit-red/20 hover:border-fit-red/40 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-full bg-fit-red/20 border border-fit-red/40 flex items-center justify-center font-display font-bold text-fit-red">
          {initials}
        </div>
        <div>
          <div className="font-semibold text-white text-sm">{name}</div>
          <div className="text-xs text-muted-foreground">{jobTitle}</div>
        </div>
        <div className="ml-auto flex gap-0.5">
          {["s1", "s2", "s3", "s4", "s5"].map((k) => (
            <Star key={k} className="w-3.5 h-3.5 fill-fit-red text-fit-red" />
          ))}
        </div>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed italic">
        "{quote}"
      </p>
    </motion.div>
  );
}

export function Home() {
  const { identity, login } = useInternetIdentity();
  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();
  const { data: weightEntries } = useWeightEntries();
  const { data: calorieEntries } = useCalorieEntries();

  const latestWeight =
    weightEntries && weightEntries.length > 0
      ? weightEntries[weightEntries.length - 1].weight.toFixed(1)
      : "–";

  const latestCalories =
    calorieEntries && calorieEntries.length > 0
      ? Number(calorieEntries[calorieEntries.length - 1].calories).toString()
      : "–";

  // BMI requires both height and weight — placeholder for now
  const bmiValue = "–";
  const progressValue =
    weightEntries && weightEntries.length > 0
      ? `${Math.min(100, weightEntries.length * 10)}%`
      : "–";

  // Floating icon data
  const floatingIcons = [
    {
      id: "fi-dumbbell",
      Icon: Dumbbell,
      style: { top: "15%", left: "8%", animationDelay: "0s" },
    },
    {
      id: "fi-flame",
      Icon: Flame,
      style: { top: "25%", right: "10%", animationDelay: "1s" },
    },
    {
      id: "fi-zap",
      Icon: Zap,
      style: { bottom: "30%", left: "6%", animationDelay: "0.5s" },
    },
    {
      id: "fi-target",
      Icon: Target,
      style: { top: "60%", right: "8%", animationDelay: "1.5s" },
    },
    {
      id: "fi-shield",
      Icon: Shield,
      style: { bottom: "20%", right: "15%", animationDelay: "0.8s" },
    },
    {
      id: "fi-award",
      Icon: Award,
      style: { top: "45%", left: "4%", animationDelay: "2s" },
    },
  ];

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{
            backgroundImage:
              "url('/assets/generated/fitness-hero-bg.dim_1920x1080.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="absolute inset-0 grid-bg opacity-40" />

        {/* Floating fitness icons */}
        {floatingIcons.map(({ id, Icon, style }) => (
          <div
            key={id}
            className="absolute hidden md:flex animate-float-slow opacity-10"
            style={style as React.CSSProperties}
          >
            <Icon className="w-10 h-10 text-fit-red" />
          </div>
        ))}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fit-red/10 border border-fit-red/30 mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-fit-red animate-pulse" />
              <span className="text-fit-red text-xs font-semibold uppercase tracking-widest">
                Powered by SRIRAM
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-7xl leading-[1.05] tracking-tight mb-6"
            >
              <span className="text-fit-red animate-red-glow">Transform</span>{" "}
              <span className="text-white">Your Body –</span>
              <br />
              <span className="text-white">Track Your</span>{" "}
              <span className="text-fit-red">Weight Gain</span>
              <br />
              <span className="text-white">Journey</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-muted-foreground text-lg sm:text-xl max-w-xl mx-auto mb-8 leading-relaxed"
            >
              Log your progress, crush your goals, and build the physique you
              deserve.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/features">
                <Button
                  size="lg"
                  data-ocid="hero.primary_button"
                  className="bg-fit-red hover:bg-fit-red-bright text-white font-bold text-lg px-10 py-6 rounded-xl animate-pulse-glow shadow-red-glow transition-all duration-300 hover:scale-105 hover:shadow-red-glow-lg"
                >
                  <Dumbbell className="w-5 h-5 mr-2" />
                  Start Tracking
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-fit-red/40 text-white hover:bg-fit-red/10 font-semibold px-8 py-6 rounded-xl"
                >
                  View Dashboard
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* ECG Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-16 max-w-2xl mx-auto"
          >
            <HeartbeatLine />
          </motion.div>

          {/* Dumbbell animation */}
          <div className="flex justify-center mt-6">
            <Dumbbell
              className="w-12 h-12 text-fit-red animate-dumbbell opacity-60"
              strokeWidth={1.5}
            />
          </div>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-2">
              Your Quick Stats
            </h2>
            <p className="text-muted-foreground text-sm">
              {isLoggedIn
                ? "Live data from your profile"
                : "Log in to see your personal stats"}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              icon={TrendingUp}
              label="Weight"
              value={latestWeight}
              unit={latestWeight !== "–" ? "kg" : undefined}
              ocid="stats.weight_card"
              delay={0}
            />
            <StatsCard
              icon={Flame}
              label="Calories"
              value={latestCalories}
              unit={latestCalories !== "–" ? "kcal" : undefined}
              ocid="stats.calories_card"
              delay={0.1}
            />
            <StatsCard
              icon={Target}
              label="BMI"
              value={bmiValue}
              ocid="stats.bmi_card"
              delay={0.2}
            />
            <StatsCard
              icon={Award}
              label="Progress"
              value={progressValue}
              ocid="stats.progress_card"
              delay={0.3}
            />
          </div>

          {!isLoggedIn && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-6"
            >
              <Button
                onClick={login}
                className="bg-fit-red hover:bg-fit-red-bright text-white"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login to Track Progress
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* MOTIVATIONAL QUOTE */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative p-8 sm:p-12 rounded-2xl bg-fit-surface-2 border-l-4 border-fit-red overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-fit-red/8 to-transparent" />
            <div className="relative z-10">
              <div className="text-5xl text-fit-red font-display mb-4 leading-none">
                "
              </div>
              <blockquote className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight mb-6">
                The only bad workout is the one that didn't happen.
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-8 h-0.5 bg-fit-red" />
                <span className="text-muted-foreground text-sm font-semibold uppercase tracking-widest">
                  FitTrack Philosophy
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES TEASER */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-4">
              Everything You Need to{" "}
              <span className="text-fit-red">Gain & Grow</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A complete fitness ecosystem from weight logging to personalized
              diet plans.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: TrendingUp,
                title: "Weight Tracker",
                desc: "Log daily weight with precision. Visualize your progress over weeks and months.",
                delay: 0,
              },
              {
                icon: Flame,
                title: "Calorie Counter",
                desc: "Track your daily caloric intake to ensure you're in a surplus for maximum gains.",
                delay: 0.1,
              },
              {
                icon: Dumbbell,
                title: "Workout Logger",
                desc: "Record every set, rep, and exercise. Build a comprehensive workout history.",
                delay: 0.2,
              },
              {
                icon: Target,
                title: "BMI Calculator",
                desc: "Calculate and monitor your Body Mass Index with live color-coded feedback.",
                delay: 0.3,
              },
              {
                icon: Zap,
                title: "Progress Charts",
                desc: "Beautiful animated charts powered by Recharts to visualize your transformation.",
                delay: 0.4,
              },
              {
                icon: Award,
                title: "Goal Setting",
                desc: "Set target weights and track proximity to your goals with achievement badges.",
                delay: 0.5,
              },
            ].map(({ icon: Icon, title, desc, delay }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay, duration: 0.5 }}
                className="group p-6 rounded-xl bg-fit-surface-2 red-glow-border hover:bg-fit-surface-3 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-fit-red/15 flex items-center justify-center mb-4 group-hover:bg-fit-red/25 transition-colors">
                  <Icon className="w-6 h-6 text-fit-red" />
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-2">
                  {title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link to="/features">
              <Button
                variant="outline"
                className="border-fit-red/40 text-white hover:bg-fit-red/10"
              >
                Explore All Features
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-fit-surface-1">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-4">
              Real Results from{" "}
              <span className="text-fit-red">Real Athletes</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <TestimonialCard
              initials="RK"
              name="Rahul Kumar"
              jobTitle="Powerlifter • 6 months"
              quote="FitTrack helped me gain 12kg of lean mass in 6 months. The daily weight logging and calorie tracker kept me accountable every single day."
              delay={0}
            />
            <TestimonialCard
              initials="AP"
              name="Arjun Patel"
              jobTitle="Bodybuilder • 1 year"
              quote="The progress dashboard is incredible. Seeing my weight chart climb week over week keeps me motivated to stay consistent with my bulk."
              delay={0.15}
            />
            <TestimonialCard
              initials="VM"
              name="Vikram Malhotra"
              jobTitle="Fitness Enthusiast • 4 months"
              quote="Best fitness tracker I've used. The diet plans are spot-on for weight gain and the workout logger makes sure I never skip a session."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-fit-red/20 via-fit-red/10 to-transparent" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-4 leading-tight">
              Ready to Build Your{" "}
              <span className="text-fit-red">Dream Physique?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of fitness enthusiasts tracking their weight gain
              journey with FitTrack.
            </p>
            <Link to="/features">
              <Button
                size="lg"
                className="bg-fit-red hover:bg-fit-red-bright text-white font-bold text-lg px-10 py-6 rounded-xl shadow-red-glow hover:shadow-red-glow-lg transition-all duration-300 hover:scale-105"
              >
                Get Started Free
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
