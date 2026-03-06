import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  ChevronDown,
  ChevronUp,
  Dumbbell,
  Shield,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  notes: string;
  icon: React.ComponentType<{ className?: string }>;
  difficulty: DifficultyLevel;
}

interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
}

const beginnerPlan: WorkoutDay[] = [
  {
    day: "Day 1",
    focus: "Full Body A",
    exercises: [
      {
        name: "Barbell Squat",
        sets: "3",
        reps: "8–10",
        rest: "2 min",
        notes: "Keep chest up, depth to parallel",
        icon: Dumbbell,
        difficulty: "Beginner",
      },
      {
        name: "Bench Press",
        sets: "3",
        reps: "8–10",
        rest: "2 min",
        notes: "Control the descent, pause at chest",
        icon: Dumbbell,
        difficulty: "Beginner",
      },
      {
        name: "Bent-Over Row",
        sets: "3",
        reps: "8–10",
        rest: "90 sec",
        notes: "Neutral spine, pull to lower chest",
        icon: Dumbbell,
        difficulty: "Beginner",
      },
      {
        name: "Overhead Press",
        sets: "3",
        reps: "8–10",
        rest: "90 sec",
        notes: "Brace core, press vertical",
        icon: Dumbbell,
        difficulty: "Beginner",
      },
      {
        name: "Romanian Deadlift",
        sets: "3",
        reps: "10–12",
        rest: "90 sec",
        notes: "Hip hinge, slight knee bend",
        icon: Activity,
        difficulty: "Beginner",
      },
    ],
  },
  {
    day: "Day 2",
    focus: "Full Body B",
    exercises: [
      {
        name: "Deadlift",
        sets: "3",
        reps: "5–6",
        rest: "3 min",
        notes: "Hinge from hips, chest proud",
        icon: Dumbbell,
        difficulty: "Beginner",
      },
      {
        name: "Incline Dumbbell Press",
        sets: "3",
        reps: "10–12",
        rest: "90 sec",
        notes: "30° incline, controlled motion",
        icon: Dumbbell,
        difficulty: "Beginner",
      },
      {
        name: "Lat Pulldown",
        sets: "3",
        reps: "10–12",
        rest: "90 sec",
        notes: "Pull to upper chest",
        icon: Activity,
        difficulty: "Beginner",
      },
      {
        name: "Dumbbell Lunges",
        sets: "3",
        reps: "10 each",
        rest: "90 sec",
        notes: "90° knee bend at bottom",
        icon: Zap,
        difficulty: "Beginner",
      },
      {
        name: "Plank",
        sets: "3",
        reps: "30–45 sec",
        rest: "60 sec",
        notes: "Straight body line, squeeze glutes",
        icon: Shield,
        difficulty: "Beginner",
      },
    ],
  },
  {
    day: "Day 3",
    focus: "Full Body C",
    exercises: [
      {
        name: "Goblet Squat",
        sets: "4",
        reps: "10–12",
        rest: "90 sec",
        notes: "Hold dumbbell at chest height",
        icon: Dumbbell,
        difficulty: "Beginner",
      },
      {
        name: "Push-Ups (Weighted)",
        sets: "3",
        reps: "10–15",
        rest: "90 sec",
        notes: "Add plate on back when easy",
        icon: Zap,
        difficulty: "Beginner",
      },
      {
        name: "Cable Row",
        sets: "3",
        reps: "10–12",
        rest: "90 sec",
        notes: "Keep elbows close to body",
        icon: Activity,
        difficulty: "Beginner",
      },
      {
        name: "Dumbbell Shoulder Press",
        sets: "3",
        reps: "10–12",
        rest: "90 sec",
        notes: "Press directly overhead",
        icon: Dumbbell,
        difficulty: "Beginner",
      },
      {
        name: "Bicep Curl",
        sets: "3",
        reps: "12–15",
        rest: "60 sec",
        notes: "Supinate at top",
        icon: Dumbbell,
        difficulty: "Beginner",
      },
    ],
  },
];

const muscleBuildingPlan = [
  {
    day: "Day 1",
    focus: "Push (Chest, Shoulders, Triceps)",
    exercises: [
      {
        name: "Barbell Bench Press",
        sets: "4",
        reps: "6–8",
        rest: "3 min",
        notes: "Competition grip, arch back",
        icon: Dumbbell,
        difficulty: "Intermediate" as DifficultyLevel,
      },
      {
        name: "Incline Dumbbell Press",
        sets: "3",
        reps: "8–10",
        rest: "2 min",
        notes: "Full stretch at bottom",
        icon: Dumbbell,
        difficulty: "Intermediate" as DifficultyLevel,
      },
      {
        name: "Overhead Press",
        sets: "4",
        reps: "6–8",
        rest: "2 min",
        notes: "Bar path travels around head",
        icon: Dumbbell,
        difficulty: "Intermediate" as DifficultyLevel,
      },
      {
        name: "Cable Lateral Raises",
        sets: "3",
        reps: "12–15",
        rest: "60 sec",
        notes: "Slight elbow bend, slow eccentric",
        icon: Activity,
        difficulty: "Intermediate" as DifficultyLevel,
      },
      {
        name: "Tricep Pushdown",
        sets: "3",
        reps: "12–15",
        rest: "60 sec",
        notes: "Lock elbows, full extension",
        icon: Zap,
        difficulty: "Intermediate" as DifficultyLevel,
      },
    ],
  },
  {
    day: "Day 2",
    focus: "Pull (Back, Biceps)",
    exercises: [
      {
        name: "Pull-Ups / Weighted Pull-Ups",
        sets: "4",
        reps: "6–8",
        rest: "2 min",
        notes: "Full ROM, dead hang to chin over",
        icon: Dumbbell,
        difficulty: "Intermediate" as DifficultyLevel,
      },
      {
        name: "Barbell Row",
        sets: "4",
        reps: "6–8",
        rest: "2 min",
        notes: "Overhand grip, 45° torso",
        icon: Dumbbell,
        difficulty: "Intermediate" as DifficultyLevel,
      },
      {
        name: "Cable Row (Seated)",
        sets: "3",
        reps: "10–12",
        rest: "90 sec",
        notes: "Squeeze between shoulder blades",
        icon: Activity,
        difficulty: "Intermediate" as DifficultyLevel,
      },
      {
        name: "Face Pulls",
        sets: "3",
        reps: "15–20",
        rest: "60 sec",
        notes: "External rotation at end",
        icon: Activity,
        difficulty: "Intermediate" as DifficultyLevel,
      },
      {
        name: "Barbell Curl",
        sets: "3",
        reps: "10–12",
        rest: "60 sec",
        notes: "Keep elbows still, full range",
        icon: Dumbbell,
        difficulty: "Intermediate" as DifficultyLevel,
      },
    ],
  },
  {
    day: "Day 3",
    focus: "Legs (Quads, Hams, Glutes)",
    exercises: [
      {
        name: "Barbell Squat",
        sets: "4",
        reps: "6–8",
        rest: "3 min",
        notes: "Break parallel, drive through heels",
        icon: Dumbbell,
        difficulty: "Intermediate" as DifficultyLevel,
      },
      {
        name: "Romanian Deadlift",
        sets: "3",
        reps: "8–10",
        rest: "2 min",
        notes: "Hamstring stretch, bar close to legs",
        icon: Dumbbell,
        difficulty: "Intermediate" as DifficultyLevel,
      },
      {
        name: "Leg Press",
        sets: "3",
        reps: "10–12",
        rest: "90 sec",
        notes: "Shoulder-width foot placement",
        icon: Activity,
        difficulty: "Intermediate" as DifficultyLevel,
      },
      {
        name: "Leg Curl",
        sets: "3",
        reps: "10–12",
        rest: "60 sec",
        notes: "Hips flat on bench",
        icon: Activity,
        difficulty: "Intermediate" as DifficultyLevel,
      },
      {
        name: "Calf Raises",
        sets: "4",
        reps: "15–20",
        rest: "60 sec",
        notes: "Full stretch at bottom, hold top",
        icon: Zap,
        difficulty: "Intermediate" as DifficultyLevel,
      },
    ],
  },
  {
    day: "Day 4",
    focus: "Upper (Strength Focus)",
    exercises: [
      {
        name: "Close-Grip Bench Press",
        sets: "4",
        reps: "6–8",
        rest: "2 min",
        notes: "Hands shoulder-width, triceps focus",
        icon: Dumbbell,
        difficulty: "Advanced" as DifficultyLevel,
      },
      {
        name: "Weighted Dips",
        sets: "3",
        reps: "8–10",
        rest: "2 min",
        notes: "Slight forward lean for chest",
        icon: Dumbbell,
        difficulty: "Advanced" as DifficultyLevel,
      },
      {
        name: "T-Bar Row",
        sets: "4",
        reps: "8–10",
        rest: "90 sec",
        notes: "Chest supported, full contraction",
        icon: Dumbbell,
        difficulty: "Advanced" as DifficultyLevel,
      },
      {
        name: "Arnold Press",
        sets: "3",
        reps: "10–12",
        rest: "90 sec",
        notes: "Rotate palms during press",
        icon: Dumbbell,
        difficulty: "Intermediate" as DifficultyLevel,
      },
      {
        name: "Skullcrusher",
        sets: "3",
        reps: "10–12",
        rest: "60 sec",
        notes: "Lower to forehead, control eccentric",
        icon: Zap,
        difficulty: "Intermediate" as DifficultyLevel,
      },
    ],
  },
  {
    day: "Day 5",
    focus: "Lower + Core",
    exercises: [
      {
        name: "Front Squat",
        sets: "4",
        reps: "6–8",
        rest: "3 min",
        notes: "High elbow position, upright torso",
        icon: Dumbbell,
        difficulty: "Advanced" as DifficultyLevel,
      },
      {
        name: "Hip Thrust",
        sets: "4",
        reps: "10–12",
        rest: "90 sec",
        notes: "Squeeze glutes at top, drive hips",
        icon: Activity,
        difficulty: "Intermediate" as DifficultyLevel,
      },
      {
        name: "Hack Squat",
        sets: "3",
        reps: "10–12",
        rest: "90 sec",
        notes: "Low foot placement for quads",
        icon: Dumbbell,
        difficulty: "Intermediate" as DifficultyLevel,
      },
      {
        name: "Cable Pull-Through",
        sets: "3",
        reps: "12–15",
        rest: "60 sec",
        notes: "Hip hinge movement",
        icon: Activity,
        difficulty: "Intermediate" as DifficultyLevel,
      },
      {
        name: "Dragon Flag",
        sets: "3",
        reps: "5–8",
        rest: "90 sec",
        notes: "Full body tension, slow lower",
        icon: Shield,
        difficulty: "Advanced" as DifficultyLevel,
      },
    ],
  },
];

const homeWorkouts = [
  {
    name: "Push-Ups",
    sets: "4",
    reps: "15–20",
    notes: "Hands shoulder-width, body straight",
    icon: Zap,
    difficulty: "Beginner" as DifficultyLevel,
    variations: "Wide, narrow, incline, decline",
  },
  {
    name: "Bodyweight Squat",
    sets: "4",
    reps: "20–25",
    notes: "Depth to parallel, arms forward for balance",
    icon: Activity,
    difficulty: "Beginner" as DifficultyLevel,
    variations: "Jump squats, pause squats, pistol (advanced)",
  },
  {
    name: "Pull-Ups",
    sets: "3",
    reps: "8–12",
    notes: "Dead hang start, chin over bar",
    icon: Dumbbell,
    difficulty: "Intermediate" as DifficultyLevel,
    variations: "Chin-ups, wide grip, commando",
  },
  {
    name: "Dips (Chair)",
    sets: "3",
    reps: "12–15",
    notes: "Hands on chair edge, lower 90°",
    icon: Dumbbell,
    difficulty: "Beginner" as DifficultyLevel,
    variations: "Straight leg, weighted (bag on lap)",
  },
  {
    name: "Plank",
    sets: "3",
    reps: "45–60 sec",
    notes: "Straight line from head to heels",
    icon: Shield,
    difficulty: "Beginner" as DifficultyLevel,
    variations: "Side plank, plank shoulder taps, pike",
  },
  {
    name: "Glute Bridge",
    sets: "4",
    reps: "15–20",
    notes: "Thrust hips up, squeeze at top",
    icon: Activity,
    difficulty: "Beginner" as DifficultyLevel,
    variations: "Single-leg, weighted, pause reps",
  },
  {
    name: "Mountain Climbers",
    sets: "3",
    reps: "30 sec",
    notes: "Fast alternating knee drive",
    icon: Zap,
    difficulty: "Beginner" as DifficultyLevel,
    variations: "Cross-body, slow (core focus)",
  },
  {
    name: "Burpees",
    sets: "3",
    reps: "10–15",
    notes: "Explosive jump, land softly",
    icon: Zap,
    difficulty: "Intermediate" as DifficultyLevel,
    variations: "Half burpee, weighted, box jump burpee",
  },
];

const difficultyColors: Record<DifficultyLevel, string> = {
  Beginner: "bg-green-500/20 text-green-400 border-green-500/30",
  Intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Advanced: "bg-fit-red/20 text-fit-red border-fit-red/30",
};

function ExerciseCard({
  exercise,
}: { exercise: Exercise & { variations?: string } }) {
  const Icon = exercise.icon;
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-fit-surface-3 border border-fit-red/10 hover:border-fit-red/25 transition-all duration-200">
      <div className="w-10 h-10 rounded-lg bg-fit-red/15 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-5 h-5 text-fit-red" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="font-semibold text-white text-sm">
            {exercise.name}
          </span>
          <Badge className={`${difficultyColors[exercise.difficulty]} text-xs`}>
            {exercise.difficulty}
          </Badge>
        </div>
        <div className="flex gap-4 text-xs text-muted-foreground mb-1.5">
          <span>
            <span className="text-fit-red font-bold">{exercise.sets}</span> sets
          </span>
          <span>
            <span className="text-fit-red font-bold">{exercise.reps}</span> reps
          </span>
          <span>
            Rest: <span className="text-white">{exercise.rest}</span>
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{exercise.notes}</p>
        {"variations" in exercise && exercise.variations && (
          <p className="text-xs text-muted-foreground/60 mt-1 italic">
            Variations: {exercise.variations as string}
          </p>
        )}
      </div>
    </div>
  );
}

export function Workout() {
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
              Training
            </Badge>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-4">
              Workout <span className="text-fit-red">Plans</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Structured training programs from beginner full-body routines to
              advanced PPL splits.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-12">
        {/* Beginner Plan */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-2xl text-white">
                Beginner Full-Body Plan
              </h2>
              <p className="text-muted-foreground text-sm">
                3 days/week · 45–60 min per session
              </p>
            </div>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-3">
            {beginnerPlan.map((day, i) => (
              <AccordionItem
                key={day.day}
                value={day.day}
                className="border border-fit-red/15 rounded-xl overflow-hidden bg-fit-surface-2"
              >
                <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-fit-surface-3 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-fit-red/15 flex items-center justify-center text-fit-red font-extrabold text-sm">
                      {i + 1}
                    </div>
                    <div className="text-left">
                      <div className="font-display font-bold text-white">
                        {day.day}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {day.focus}
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5">
                  <div className="space-y-2 pt-2">
                    {day.exercises.map((ex) => (
                      <ExerciseCard key={ex.name} exercise={ex} />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Muscle Building PPL */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-10 h-10 rounded-xl bg-fit-red/15 flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-fit-red" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-2xl text-white">
                Muscle Building PPL Split
              </h2>
              <p className="text-muted-foreground text-sm">
                5 days/week · 60–75 min per session
              </p>
            </div>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-3">
            {muscleBuildingPlan.map((day, i) => (
              <AccordionItem
                key={day.day + day.focus}
                value={`ppl-${i}`}
                className="border border-fit-red/15 rounded-xl overflow-hidden bg-fit-surface-2"
              >
                <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-fit-surface-3 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-fit-red/15 flex items-center justify-center text-fit-red font-extrabold text-sm">
                      {i + 1}
                    </div>
                    <div className="text-left">
                      <div className="font-display font-bold text-white">
                        {day.day}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {day.focus}
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5">
                  <div className="space-y-2 pt-2">
                    {day.exercises.map((ex) => (
                      <ExerciseCard key={ex.name} exercise={ex} />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Home Workouts */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
              <Zap className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-2xl text-white">
                Home Workout Routines
              </h2>
              <p className="text-muted-foreground text-sm">
                No equipment needed · 30–45 min
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {homeWorkouts.map((ex, i) => (
              <motion.div
                key={ex.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <ExerciseCard exercise={{ ...ex, rest: "60 sec" }} />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
