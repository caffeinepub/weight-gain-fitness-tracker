import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  BarChart3,
  Calculator,
  Dumbbell,
  Flame,
  Lock,
  Target,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAddCalorieEntry,
  useAddWeightEntry,
  useAddWorkoutEntry,
  useCalorieEntries,
  useSetTargetWeight,
  useTargetWeight,
  useWeightEntries,
  useWorkoutEntries,
} from "../hooks/useQueries";

function LoginPrompt() {
  const { login } = useInternetIdentity();
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-fit-red/10 border border-fit-red/30 flex items-center justify-center mb-4">
        <Lock className="w-8 h-8 text-fit-red" />
      </div>
      <h3 className="font-display font-bold text-xl text-white mb-2">
        Login Required
      </h3>
      <p className="text-muted-foreground text-sm mb-6 max-w-xs">
        Please log in to access tracking features and save your progress.
      </p>
      <Button
        onClick={login}
        className="bg-fit-red hover:bg-fit-red-bright text-white font-semibold"
      >
        Login to Continue
      </Button>
    </div>
  );
}

function WeightLogTab() {
  const { identity } = useInternetIdentity();
  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [weight, setWeight] = useState("");
  const { data: entries, isLoading } = useWeightEntries();
  const addWeight = useAddWeightEntry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight || !date) return;
    try {
      await addWeight.mutateAsync({ date, weight: Number.parseFloat(weight) });
      toast.success("Weight entry logged!");
      setWeight("");
    } catch {
      toast.error("Failed to log weight. Please try again.");
    }
  };

  if (!isLoggedIn) return <LoginPrompt />;

  const sortedEntries = [...(entries || [])].sort((a, b) =>
    a.date.localeCompare(b.date),
  );

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-xl bg-fit-surface-2 border border-fit-red/20 space-y-4"
      >
        <h3 className="font-display font-bold text-white text-lg">
          Log Your Weight
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm">Date</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              data-ocid="weight.date_input"
              className="bg-fit-surface-3 border-fit-red/20 text-white focus:border-fit-red"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm">Weight (kg)</Label>
            <Input
              type="number"
              step="0.1"
              min="20"
              max="300"
              placeholder="e.g. 75.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              data-ocid="weight.weight_input"
              className="bg-fit-surface-3 border-fit-red/20 text-white focus:border-fit-red"
              required
            />
          </div>
        </div>
        <Button
          type="submit"
          disabled={addWeight.isPending}
          data-ocid="weight.submit_button"
          className="bg-fit-red hover:bg-fit-red-bright text-white font-semibold w-full sm:w-auto"
        >
          {addWeight.isPending ? "Logging..." : "Log Weight"}
        </Button>
      </form>

      <div className="space-y-3">
        <h3 className="font-display font-bold text-white">Recent Entries</h3>
        {isLoading ? (
          <div className="text-muted-foreground text-sm">Loading...</div>
        ) : sortedEntries.length === 0 ? (
          <div className="p-8 rounded-xl bg-fit-surface-2 border border-border text-center text-muted-foreground text-sm">
            No weight entries yet. Log your first weight above!
          </div>
        ) : (
          <div className="space-y-2">
            {sortedEntries
              .slice(-10)
              .reverse()
              .map((entry, i) => (
                <div
                  key={`${entry.date}-${i}`}
                  className="flex items-center justify-between p-4 rounded-lg bg-fit-surface-2 border border-fit-red/10"
                >
                  <span className="text-muted-foreground text-sm">
                    {entry.date}
                  </span>
                  <span className="font-bold text-white">
                    {entry.weight.toFixed(1)}{" "}
                    <span className="text-muted-foreground font-normal text-xs">
                      kg
                    </span>
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CalorieLogTab() {
  const { identity } = useInternetIdentity();
  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [calories, setCalories] = useState("");
  const { data: entries, isLoading } = useCalorieEntries();
  const addCalorie = useAddCalorieEntry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!calories || !date) return;
    try {
      await addCalorie.mutateAsync({
        date,
        calories: BigInt(Math.round(Number.parseFloat(calories))),
      });
      toast.success("Calorie entry logged!");
      setCalories("");
    } catch {
      toast.error("Failed to log calories.");
    }
  };

  if (!isLoggedIn) return <LoginPrompt />;

  const sortedEntries = [...(entries || [])].sort((a, b) =>
    a.date.localeCompare(b.date),
  );

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-xl bg-fit-surface-2 border border-fit-red/20 space-y-4"
      >
        <h3 className="font-display font-bold text-white text-lg">
          Log Calories
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm">Date</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              data-ocid="calorie.date_input"
              className="bg-fit-surface-3 border-fit-red/20 text-white focus:border-fit-red"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm">
              Calories (kcal)
            </Label>
            <Input
              type="number"
              min="0"
              max="10000"
              placeholder="e.g. 3200"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              data-ocid="calorie.calories_input"
              className="bg-fit-surface-3 border-fit-red/20 text-white focus:border-fit-red"
              required
            />
          </div>
        </div>
        <Button
          type="submit"
          disabled={addCalorie.isPending}
          data-ocid="calorie.submit_button"
          className="bg-fit-red hover:bg-fit-red-bright text-white font-semibold"
        >
          {addCalorie.isPending ? "Logging..." : "Log Calories"}
        </Button>
      </form>

      <div className="space-y-3">
        <h3 className="font-display font-bold text-white">Recent Entries</h3>
        {isLoading ? (
          <div className="text-muted-foreground text-sm">Loading...</div>
        ) : sortedEntries.length === 0 ? (
          <div className="p-8 rounded-xl bg-fit-surface-2 border border-border text-center text-muted-foreground text-sm">
            No calorie entries yet. Log your intake above!
          </div>
        ) : (
          <div className="space-y-2">
            {sortedEntries
              .slice(-10)
              .reverse()
              .map((entry, i) => (
                <div
                  key={`${entry.date}-${i}`}
                  className="flex items-center justify-between p-4 rounded-lg bg-fit-surface-2 border border-fit-red/10"
                >
                  <span className="text-muted-foreground text-sm">
                    {entry.date}
                  </span>
                  <span className="font-bold text-white">
                    {Number(entry.calories).toLocaleString()}{" "}
                    <span className="text-muted-foreground font-normal text-xs">
                      kcal
                    </span>
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

function WorkoutLogTab() {
  const { identity } = useInternetIdentity();
  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const { data: entries, isLoading } = useWorkoutEntries();
  const addWorkout = useAddWorkoutEntry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !exercise || !sets || !reps) return;
    try {
      await addWorkout.mutateAsync({
        date,
        exercise,
        sets: BigInt(Math.round(Number.parseFloat(sets))),
        reps: BigInt(Math.round(Number.parseFloat(reps))),
      });
      toast.success("Workout logged!");
      setExercise("");
      setSets("");
      setReps("");
    } catch {
      toast.error("Failed to log workout.");
    }
  };

  if (!isLoggedIn) return <LoginPrompt />;

  const sortedEntries = [...(entries || [])].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-xl bg-fit-surface-2 border border-fit-red/20 space-y-4"
      >
        <h3 className="font-display font-bold text-white text-lg">
          Log Workout
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm">Date</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              data-ocid="workout.date_input"
              className="bg-fit-surface-3 border-fit-red/20 text-white focus:border-fit-red"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm">
              Exercise Name
            </Label>
            <Input
              type="text"
              placeholder="e.g. Bench Press"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              data-ocid="workout.exercise_input"
              className="bg-fit-surface-3 border-fit-red/20 text-white focus:border-fit-red"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm">Sets</Label>
            <Input
              type="number"
              min="1"
              max="100"
              placeholder="e.g. 4"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              data-ocid="workout.sets_input"
              className="bg-fit-surface-3 border-fit-red/20 text-white focus:border-fit-red"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm">Reps</Label>
            <Input
              type="number"
              min="1"
              max="1000"
              placeholder="e.g. 8"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              data-ocid="workout.reps_input"
              className="bg-fit-surface-3 border-fit-red/20 text-white focus:border-fit-red"
              required
            />
          </div>
        </div>
        <Button
          type="submit"
          disabled={addWorkout.isPending}
          data-ocid="workout.submit_button"
          className="bg-fit-red hover:bg-fit-red-bright text-white font-semibold"
        >
          {addWorkout.isPending ? "Logging..." : "Log Workout"}
        </Button>
      </form>

      <div className="space-y-3">
        <h3 className="font-display font-bold text-white">Recent Workouts</h3>
        {isLoading ? (
          <div className="text-muted-foreground text-sm">Loading...</div>
        ) : sortedEntries.length === 0 ? (
          <div className="p-8 rounded-xl bg-fit-surface-2 border border-border text-center text-muted-foreground text-sm">
            No workouts logged yet. Start tracking above!
          </div>
        ) : (
          <div className="space-y-2">
            {sortedEntries.slice(0, 10).map((entry, i) => (
              <div
                key={`${entry.date}-${entry.exercise}-${i}`}
                className="flex items-center justify-between p-4 rounded-lg bg-fit-surface-2 border border-fit-red/10"
              >
                <div>
                  <div className="font-semibold text-white text-sm">
                    {entry.exercise}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {entry.date}
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-white text-sm">
                    {Number(entry.sets)}×{Number(entry.reps)}
                  </span>
                  <div className="text-muted-foreground text-xs">
                    sets × reps
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BMICalculatorTab() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  const calculate = () => {
    const h = Number.parseFloat(height) / 100;
    const w = Number.parseFloat(weight);
    if (h > 0 && w > 0) {
      setBmi(w / (h * h));
    }
  };

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-blue-400" };
    if (bmi < 25) return { label: "Normal Weight", color: "text-green-400" };
    if (bmi < 30) return { label: "Overweight", color: "text-yellow-400" };
    return { label: "Obese", color: "text-fit-red" };
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="p-6 rounded-xl bg-fit-surface-2 border border-fit-red/20 space-y-4">
        <h3 className="font-display font-bold text-white text-lg">
          BMI Calculator
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm">Height (cm)</Label>
            <Input
              type="number"
              min="100"
              max="250"
              placeholder="e.g. 175"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              data-ocid="bmi.height_input"
              className="bg-fit-surface-3 border-fit-red/20 text-white focus:border-fit-red"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm">Weight (kg)</Label>
            <Input
              type="number"
              min="20"
              max="300"
              step="0.1"
              placeholder="e.g. 70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              data-ocid="bmi.weight_input"
              className="bg-fit-surface-3 border-fit-red/20 text-white focus:border-fit-red"
            />
          </div>
          <Button
            onClick={calculate}
            data-ocid="bmi.calculate_button"
            className="bg-fit-red hover:bg-fit-red-bright text-white font-semibold w-full"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Calculate BMI
          </Button>
        </div>

        {bmi !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 rounded-lg bg-fit-surface-3 border border-fit-red/20 text-center"
          >
            <div className="text-5xl font-display font-extrabold text-white mb-2">
              {bmi.toFixed(1)}
            </div>
            <Badge
              className={`${getBmiCategory(bmi).color} bg-transparent border border-current text-sm font-semibold`}
            >
              {getBmiCategory(bmi).label}
            </Badge>
            <div className="mt-4 grid grid-cols-4 gap-1 text-xs">
              {[
                { range: "<18.5", label: "Under", color: "bg-blue-500/60" },
                {
                  range: "18.5–24.9",
                  label: "Normal",
                  color: "bg-green-500/60",
                },
                { range: "25–29.9", label: "Over", color: "bg-yellow-500/60" },
                { range: "30+", label: "Obese", color: "bg-fit-red/60" },
              ].map((cat) => (
                <div key={cat.label} className={`p-2 rounded ${cat.color}`}>
                  <div className="font-bold text-white">{cat.label}</div>
                  <div className="text-white/70">{cat.range}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function ProgressChartTab() {
  const { identity } = useInternetIdentity();
  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();
  const { data: entries, isLoading } = useWeightEntries();

  if (!isLoggedIn) return <LoginPrompt />;

  const chartData = [...(entries || [])]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((e) => ({ date: e.date, weight: e.weight }));

  return (
    <div className="space-y-6">
      <h3 className="font-display font-bold text-white text-lg">
        Weight Progress Chart
      </h3>
      {isLoading ? (
        <div className="h-64 rounded-xl bg-fit-surface-2 animate-pulse border border-fit-red/10" />
      ) : chartData.length < 2 ? (
        <div className="p-12 rounded-xl bg-fit-surface-2 border border-border text-center">
          <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">
            Log at least 2 weight entries to see your progress chart.
          </p>
        </div>
      ) : (
        <div className="p-5 rounded-xl bg-fit-surface-2 border border-fit-red/20">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 10, bottom: 10, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0 0)" />
              <XAxis
                dataKey="date"
                tick={{ fill: "oklch(0.55 0 0)", fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: "oklch(0.22 0 0)" }}
              />
              <YAxis
                tick={{ fill: "oklch(0.55 0 0)", fontSize: 11 }}
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
                  fontSize: "13px",
                }}
                labelStyle={{ color: "oklch(0.55 0 0)" }}
              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="oklch(0.57 0.22 27)"
                strokeWidth={2.5}
                dot={{ fill: "oklch(0.57 0.22 27)", r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "oklch(0.62 0.24 27)" }}
                name="Weight (kg)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

function GoalSettingTab() {
  const { identity } = useInternetIdentity();
  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();
  const [targetInput, setTargetInput] = useState("");
  const { data: currentGoal, isLoading } = useTargetWeight();
  const setTarget = useSetTargetWeight();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetInput) return;
    try {
      await setTarget.mutateAsync(Number.parseFloat(targetInput));
      toast.success("Goal updated!");
      setTargetInput("");
    } catch {
      toast.error("Failed to update goal.");
    }
  };

  if (!isLoggedIn) return <LoginPrompt />;

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="p-6 rounded-xl bg-fit-surface-2 border border-fit-red/20 space-y-4">
        <h3 className="font-display font-bold text-white text-lg">
          Set Your Target Weight
        </h3>
        {currentGoal !== undefined && currentGoal > 0 && !isLoading && (
          <div className="p-4 rounded-lg bg-fit-red/10 border border-fit-red/30">
            <div className="text-xs text-muted-foreground mb-1">
              Current Goal
            </div>
            <div className="text-2xl font-display font-extrabold text-white">
              {currentGoal.toFixed(1)}{" "}
              <span className="text-muted-foreground font-normal text-base">
                kg
              </span>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm">
              Target Weight (kg)
            </Label>
            <Input
              type="number"
              step="0.1"
              min="20"
              max="300"
              placeholder="e.g. 85.0"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              data-ocid="goal.target_input"
              className="bg-fit-surface-3 border-fit-red/20 text-white focus:border-fit-red"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={setTarget.isPending}
            data-ocid="goal.submit_button"
            className="bg-fit-red hover:bg-fit-red-bright text-white font-semibold w-full"
          >
            <Target className="w-4 h-4 mr-2" />
            {setTarget.isPending ? "Saving..." : "Set Goal"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export function Features() {
  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-hero-radial opacity-50" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-fit-red/10 border-fit-red/30 text-fit-red mb-4 text-xs font-semibold uppercase tracking-widest">
              Tracking Tools
            </Badge>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-4">
              All Your Fitness <span className="text-fit-red">Features</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Log weights, calories, and workouts. Calculate BMI, visualize
              progress, and set goals.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Tabs defaultValue="weight">
          <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-fit-surface-2 border border-fit-red/10 p-1 rounded-xl mb-8">
            <TabsTrigger
              value="weight"
              data-ocid="features.weight_tab"
              className="flex-1 min-w-[120px] data-[state=active]:bg-fit-red data-[state=active]:text-white text-muted-foreground"
            >
              <TrendingUp className="w-3.5 h-3.5 mr-1" /> Weight Log
            </TabsTrigger>
            <TabsTrigger
              value="calorie"
              data-ocid="features.calorie_tab"
              className="flex-1 min-w-[120px] data-[state=active]:bg-fit-red data-[state=active]:text-white text-muted-foreground"
            >
              <Flame className="w-3.5 h-3.5 mr-1" /> Calorie Log
            </TabsTrigger>
            <TabsTrigger
              value="workout"
              data-ocid="features.workout_tab"
              className="flex-1 min-w-[120px] data-[state=active]:bg-fit-red data-[state=active]:text-white text-muted-foreground"
            >
              <Dumbbell className="w-3.5 h-3.5 mr-1" /> Workouts
            </TabsTrigger>
            <TabsTrigger
              value="bmi"
              data-ocid="features.bmi_tab"
              className="flex-1 min-w-[120px] data-[state=active]:bg-fit-red data-[state=active]:text-white text-muted-foreground"
            >
              <Calculator className="w-3.5 h-3.5 mr-1" /> BMI
            </TabsTrigger>
            <TabsTrigger
              value="chart"
              data-ocid="features.chart_tab"
              className="flex-1 min-w-[120px] data-[state=active]:bg-fit-red data-[state=active]:text-white text-muted-foreground"
            >
              <BarChart3 className="w-3.5 h-3.5 mr-1" /> Progress
            </TabsTrigger>
            <TabsTrigger
              value="goal"
              data-ocid="features.goal_tab"
              className="flex-1 min-w-[120px] data-[state=active]:bg-fit-red data-[state=active]:text-white text-muted-foreground"
            >
              <Target className="w-3.5 h-3.5 mr-1" /> Goals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weight">
            <WeightLogTab />
          </TabsContent>
          <TabsContent value="calorie">
            <CalorieLogTab />
          </TabsContent>
          <TabsContent value="workout">
            <WorkoutLogTab />
          </TabsContent>
          <TabsContent value="bmi">
            <BMICalculatorTab />
          </TabsContent>
          <TabsContent value="chart">
            <ProgressChartTab />
          </TabsContent>
          <TabsContent value="goal">
            <GoalSettingTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
