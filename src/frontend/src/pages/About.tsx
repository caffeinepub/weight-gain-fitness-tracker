import { Badge } from "@/components/ui/badge";
import { Heart, Shield, Target, TrendingUp, Users, Zap } from "lucide-react";
import { motion } from "motion/react";

const values = [
  {
    icon: Target,
    title: "Consistency",
    desc: "Building a physique takes time. We believe in showing up every day, logging every meal, every workout, every milestone.",
    color: "text-fit-red",
    bg: "bg-fit-red/15",
  },
  {
    icon: TrendingUp,
    title: "Data-Driven",
    desc: "Numbers don't lie. Track everything, learn from the data, and make informed decisions about your training and nutrition.",
    color: "text-blue-400",
    bg: "bg-blue-500/15",
  },
  {
    icon: Users,
    title: "Community",
    desc: "Every journey is better with support. We're building a community of dedicated athletes who push each other to new heights.",
    color: "text-green-400",
    bg: "bg-green-500/15",
  },
];

const stats = [
  { label: "Athletes Tracked", value: "10,000+", icon: Users },
  { label: "Workouts Logged", value: "250,000+", icon: Zap },
  { label: "Kg Gained", value: "50,000+", icon: TrendingUp },
  { label: "Goals Achieved", value: "8,500+", icon: Target },
];

export function About() {
  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-hero-radial opacity-60" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Badge className="bg-fit-red/10 border-fit-red/30 text-fit-red mb-6 text-xs font-semibold uppercase tracking-widest">
              Our Story
            </Badge>
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white mb-6 leading-tight">
              Built for Athletes,{" "}
              <span className="text-fit-red">By Athletes</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              We exist to help you build a stronger, healthier you — one tracked
              day at a time. No fluff. No gimmicks. Just data, discipline, and
              results.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-20">
        {/* Mission */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 mb-5">
                <div className="w-1 h-8 bg-fit-red rounded-full" />
                <span className="font-display font-bold text-fit-red text-sm uppercase tracking-widest">
                  Mission
                </span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-5 leading-tight">
                Empowering Your Weight Gain Journey
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                FitTrack was born from frustration. Most fitness apps are built
                for weight loss, ignoring the millions of hardgainers who
                struggle to add quality mass. We set out to change that.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our platform combines precision tracking with science-backed
                nutrition and training plans to give you everything you need in
                one place.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Every feature was designed with one goal: to make gaining weight
                and building muscle as systematic and measurable as possible.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-5 rounded-2xl bg-fit-surface-2 red-glow-border text-center"
                  >
                    <Icon className="w-6 h-6 text-fit-red mx-auto mb-2" />
                    <div className="font-display font-extrabold text-2xl text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* SRIRAM Brand Section */}
        <section className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-fit-red/20 via-fit-red/10 to-transparent" />
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative z-10 p-12 sm:p-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-6xl mb-6">💪</div>
              <h2 className="font-display font-extrabold text-5xl sm:text-7xl text-white mb-4 tracking-tight">
                Powered by{" "}
                <span className="text-fit-red animate-red-glow">SRIRAM</span>
              </h2>
              <div className="w-24 h-1 bg-fit-red mx-auto mb-6 rounded-full" />
              <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
                FitTrack is a passion project built by SRIRAM — a fitness
                enthusiast who believed tracking should be powerful, personal,
                and beautiful.
              </p>
              <div className="flex items-center justify-center gap-2 mt-6">
                <Heart className="w-4 h-4 text-fit-red fill-fit-red" />
                <span className="text-muted-foreground text-sm">
                  Built with love for the fitness community
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-3">
              Our Core <span className="text-fit-red">Values</span>
            </h2>
            <p className="text-muted-foreground">
              The principles that drive every decision we make
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="p-7 rounded-2xl bg-fit-surface-2 red-glow-border text-center group hover:bg-fit-surface-3 transition-all duration-300"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl ${value.bg} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`w-7 h-7 ${value.color}`} />
                  </div>
                  <h3 className="font-display font-extrabold text-xl text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Tech Stack Note */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl bg-fit-surface-2 border border-fit-red/15 text-center"
        >
          <Shield className="w-8 h-8 text-fit-red mx-auto mb-4" />
          <h3 className="font-display font-bold text-xl text-white mb-3">
            Built on the Internet Computer
          </h3>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed">
            Your fitness data is stored on the Internet Computer blockchain —
            fully decentralized, secure, and owned entirely by you. No corporate
            servers. No data selling. Just your data, your control.
          </p>
        </motion.section>
      </div>
    </div>
  );
}
