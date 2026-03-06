import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Award,
  Dumbbell,
  Flame,
  Lock,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { CalorieEntry, WeightEntry, WorkoutEntry } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useCalorieEntries,
  useTargetWeight,
  useWeightEntries,
  useWorkoutEntries,
} from "../hooks/useQueries";

function LockedDashboard() {
  const { login } = useInternetIdentity();
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-24 h-24 rounded-2xl bg-fit-red/10 border border-fit-red/30 flex items-center justify-center mb-6 animate-pulse-glow"
      >
        <Lock className="w-12 h-12 text-fit-red" />
      </motion.div>
      <h2 className="font-display font-extrabold text-3xl text-white mb-3">
        Dashboard Locked
      </h2>
      <p className="text-muted-foreground mb-8 max-w-sm">
        Log in to unlock your personal progress dashboard with charts, streaks,
        and achievement badges.
      </p>
      <Button
        onClick={login}
        size="lg"
        className="bg-fit-red hover:bg-fit-red-bright text-white font-bold px-10 py-6 rounded-xl animate-pulse-glow shadow-red-glow"
      >
        Login to Access Dashboard
      </Button>
    </div>
  );
}

// Radial progress meter SVG
function FitnessScoreMeter({ score }: { score: number }) {
  const clampedScore = Math.min(100, Math.max(0, score));
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedScore / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 75) return "oklch(0.62 0.24 27)";
    if (s >= 50) return "oklch(0.65 0.18 50)";
    if (s >= 25) return "oklch(0.65 0.18 80)";
    return "oklch(0.55 0.0 0)";
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-36 h-36">
        <svg
          className="w-full h-full -rotate-90"
          viewBox="0 0 100 100"
          role="img"
          aria-label={`Fitness score: ${score} out of 100`}
        >
          {/* Background track */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="oklch(0.18 0 0)"
            strokeWidth="8"
          />
          {/* Progress */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={getColor(clampedScore)}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display font-extrabold text-3xl text-white">
            {clampedScore}
          </span>
          <span className="text-muted-foreground text-xs">/ 100</span>
        </div>
      </div>
      <div className="text-center">
        <div className="font-display font-bold text-white text-lg">
          Fitness Score
        </div>
        <div className="text-muted-foreground text-sm">
          {clampedScore >= 75
            ? "Elite Athlete 🏆"
            : clampedScore >= 50
              ? "Dedicated Trainer 💪"
              : clampedScore >= 25
                ? "Good Progress 👊"
                : "Getting Started 🌱"}
        </div>
      </div>
    </div>
  );
}

interface BadgeData {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
  unlocked: boolean;
  emoji: string;
}

function AchievementBadgeCard({ badge }: { badge: BadgeData }) {
  return (
    <div
      className={`p-4 rounded-xl border text-center transition-all duration-300 ${
        badge.unlocked
          ? "bg-fit-red/10 border-fit-red/40 shadow-red-glow"
          : "bg-fit-surface-2 border-border opacity-50"
      }`}
    >
      <div
        className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center ${
          badge.unlocked ? "bg-fit-red/20" : "bg-muted/20"
        }`}
      >
        <span className="text-2xl">{badge.emoji}</span>
      </div>
      <div
        className={`font-display font-bold text-sm mb-1 ${badge.unlocked ? "text-white" : "text-muted-foreground"}`}
      >
        {badge.name}
      </div>
      <div className="text-xs text-muted-foreground">{badge.desc}</div>
      {badge.unlocked && (
        <Badge className="mt-2 bg-fit-red/20 text-fit-red border-fit-red/30 text-xs">
          Unlocked
        </Badge>
      )}
    </div>
  );
}

export function Dashboard() {
  const { identity } = useInternetIdentity();
  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();
  const [timeFilter, setTimeFilter] = useState<"weekly" | "monthly">("weekly");

  const { data: weightEntries } = useWeightEntries();
  const { data: calorieEntries } = useCalorieEntries();
  const { data: workoutEntries } = useWorkoutEntries();
  const { data: targetWeight } = useTargetWeight();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-16">
        <LockedDashboard />
      </div>
    );
  }

  // Filter data based on time filter
  const filterData = <T extends { date: string }>(
    data: T[] | undefined,
  ): T[] => {
    if (!data) return [];
    const sorted = [...data].sort((a, b) => a.date.localeCompare(b.date));
    const days = timeFilter === "weekly" ? 7 : 30;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    const cutoffStr = cutoff.toISOString().split("T")[0];
    const filtered = sorted.filter((d) => d.date >= cutoffStr);
    return filtered.length > 0 ? filtered : sorted.slice(-days);
  };

  const filteredWeight = filterData<WeightEntry>(weightEntries);
  const filteredCalories = filterData<CalorieEntry>(calorieEntries);
  const filteredWorkouts = filterData<WorkoutEntry>(workoutEntries);

  const weightChartData = filteredWeight.map((e) => ({
    date: e.date,
    weight: e.weight,
  }));

  const calorieChartData = filteredCalories.map((e) => ({
    date: e.date,
    calories: Number(e.calories),
  }));

  // Calculate fitness score
  const totalLogs =
    (weightEntries?.length ?? 0) +
    (workoutEntries?.length ?? 0) +
    (calorieEntries?.length ?? 0);
  const hasGoal = targetWeight && targetWeight > 0 ? 1 : 0;
  const latestWeight =
    weightEntries && weightEntries.length > 0
      ? weightEntries[weightEntries.length - 1].weight
      : 0;
  const goalProximity =
    targetWeight && targetWeight > 0 && latestWeight > 0
      ? Math.max(0, 100 - Math.abs(latestWeight - targetWeight) * 5)
      : 0;
  const fitnessScore = Math.min(
    100,
    Math.round(
      (Math.min(totalLogs, 30) / 30) * 50 +
        (hasGoal ? 10 : 0) +
        goalProximity * 0.4,
    ),
  );

  // Achievement badges
  const badges: BadgeData[] = [
    {
      name: "First Log",
      emoji: "🌟",
      icon: Star,
      desc: "Log your first weight entry",
      unlocked: (weightEntries?.length ?? 0) >= 1,
    },
    {
      name: "7-Day Streak",
      emoji: "🔥",
      icon: Flame,
      desc: "Log 7 days in a row",
      unlocked: (weightEntries?.length ?? 0) >= 7,
    },
    {
      name: "Goal Setter",
      emoji: "🎯",
      icon: Target,
      desc: "Set your target weight",
      unlocked: (targetWeight ?? 0) > 0,
    },
    {
      name: "Calorie Counter",
      emoji: "⚡",
      icon: Zap,
      desc: "Log 5+ calorie entries",
      unlocked: (calorieEntries?.length ?? 0) >= 5,
    },
    {
      name: "Workout Warrior",
      emoji: "💪",
      icon: Dumbbell,
      desc: "Log 10+ workouts",
      unlocked: (workoutEntries?.length ?? 0) >= 10,
    },
    {
      name: "Progress Champion",
      emoji: "🏆",
      icon: Trophy,
      desc: "Achieve a fitness score of 50+",
      unlocked: fitnessScore >= 50,
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <div className="relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-hero-radial opacity-50" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <Badge className="bg-fit-red/10 border-fit-red/30 text-fit-red mb-3 text-xs font-semibold uppercase tracking-widest">
                Your Dashboard
              </Badge>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                Progress <span className="text-fit-red">Overview</span>
              </h1>
            </div>

            {/* Time Filter */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setTimeFilter("weekly")}
                data-ocid="dashboard.weekly_tab"
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  timeFilter === "weekly"
                    ? "bg-fit-red text-white"
                    : "bg-fit-surface-2 text-muted-foreground hover:text-white border border-fit-red/20"
                }`}
              >
                Weekly
              </button>
              <button
                type="button"
                onClick={() => setTimeFilter("monthly")}
                data-ocid="dashboard.monthly_tab"
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  timeFilter === "monthly"
                    ? "bg-fit-red text-white"
                    : "bg-fit-surface-2 text-muted-foreground hover:text-white border border-fit-red/20"
                }`}
              >
                Monthly
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-8">
        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              label: "Weight Logs",
              value: weightEntries?.length ?? 0,
              icon: TrendingUp,
              unit: "entries",
            },
            {
              label: "Calorie Logs",
              value: calorieEntries?.length ?? 0,
              icon: Flame,
              unit: "entries",
            },
            {
              label: "Workouts",
              value: workoutEntries?.length ?? 0,
              icon: Dumbbell,
              unit: "sessions",
            },
            {
              label: "Target Weight",
              value:
                targetWeight && targetWeight > 0
                  ? `${targetWeight.toFixed(1)}`
                  : "Not Set",
              icon: Target,
              unit: targetWeight && targetWeight > 0 ? "kg" : "",
            },
          ].map(({ label, value, icon: Icon, unit }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-4 rounded-xl bg-fit-surface-2 border border-fit-red/15"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-fit-red" />
                <span className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">
                  {label}
                </span>
              </div>
              <div className="font-display font-extrabold text-2xl text-white">
                {value}
                {unit && (
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    {unit}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weight Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="p-5 rounded-xl bg-fit-surface-2 border border-fit-red/20"
            data-ocid="dashboard.chart_point"
          >
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-4 h-4 text-fit-red" />
              <h3 className="font-display font-bold text-white">
                Weight Progress
              </h3>
              <Badge className="ml-auto bg-fit-red/15 text-fit-red border-fit-red/25 text-xs">
                {timeFilter === "weekly" ? "7 days" : "30 days"}
              </Badge>
            </div>
            {weightChartData.length < 2 ? (
              <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
                <div className="text-center">
                  <Activity className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p>Log at least 2 weight entries to see your chart</p>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={weightChartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(0.22 0 0)"
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "oklch(0.55 0 0)", fontSize: 10 }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "oklch(0.55 0 0)", fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    domain={["auto", "auto"]}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(0.14 0 0)",
                      border: "1px solid oklch(0.57 0.22 27 / 0.4)",
                      borderRadius: "8px",
                      color: "oklch(0.97 0 0)",
                      fontSize: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="oklch(0.57 0.22 27)"
                    strokeWidth={2.5}
                    dot={{ fill: "oklch(0.57 0.22 27)", r: 4, strokeWidth: 0 }}
                    name="Weight (kg)"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </motion.div>

          {/* Calorie Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="p-5 rounded-xl bg-fit-surface-2 border border-fit-red/20"
          >
            <div className="flex items-center gap-2 mb-5">
              <Flame className="w-4 h-4 text-fit-red" />
              <h3 className="font-display font-bold text-white">
                Calorie Intake
              </h3>
              <Badge className="ml-auto bg-fit-red/15 text-fit-red border-fit-red/25 text-xs">
                {timeFilter === "weekly" ? "7 days" : "30 days"}
              </Badge>
            </div>
            {calorieChartData.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
                <div className="text-center">
                  <Flame className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p>No calorie data yet. Start logging!</p>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={calorieChartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(0.22 0 0)"
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "oklch(0.55 0 0)", fontSize: 10 }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "oklch(0.55 0 0)", fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(0.14 0 0)",
                      border: "1px solid oklch(0.57 0.22 27 / 0.4)",
                      borderRadius: "8px",
                      color: "oklch(0.97 0 0)",
                      fontSize: "12px",
                    }}
                  />
                  <Bar
                    dataKey="calories"
                    fill="oklch(0.57 0.22 27)"
                    radius={[4, 4, 0, 0]}
                    name="Calories (kcal)"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </motion.div>
        </div>

        {/* Workout History + Fitness Score */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Workout History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 p-5 rounded-xl bg-fit-surface-2 border border-fit-red/20"
          >
            <div className="flex items-center gap-2 mb-5">
              <Dumbbell className="w-4 h-4 text-fit-red" />
              <h3 className="font-display font-bold text-white">
                Workout History
              </h3>
            </div>
            {filteredWorkouts.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground text-sm">
                <Dumbbell className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p>No workouts logged yet.</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {filteredWorkouts
                  .slice()
                  .reverse()
                  .map((w, i) => (
                    <div
                      key={`${w.date}-${w.exercise}-${i}`}
                      className="flex items-center justify-between p-3 rounded-lg bg-fit-surface-3 border border-fit-red/10"
                    >
                      <div>
                        <div className="font-semibold text-white text-sm">
                          {w.exercise}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {w.date}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-white text-sm">
                          {Number(w.sets)}×{Number(w.reps)}
                        </span>
                        <div className="text-muted-foreground text-xs">
                          sets × reps
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </motion.div>

          {/* Fitness Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-5 rounded-xl bg-fit-surface-2 border border-fit-red/20 flex items-center justify-center"
          >
            <FitnessScoreMeter score={fitnessScore} />
          </motion.div>
        </div>

        {/* Achievement Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-5 rounded-xl bg-fit-surface-2 border border-fit-red/20"
        >
          <div className="flex items-center gap-2 mb-5">
            <Trophy className="w-4 h-4 text-fit-red" />
            <h3 className="font-display font-bold text-white">
              Achievement Badges
            </h3>
            <Badge className="ml-auto bg-fit-red/15 text-fit-red border-fit-red/25 text-xs">
              {badges.filter((b) => b.unlocked).length}/{badges.length} Unlocked
            </Badge>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {badges.map((badge) => (
              <AchievementBadgeCard key={badge.name} badge={badge} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
