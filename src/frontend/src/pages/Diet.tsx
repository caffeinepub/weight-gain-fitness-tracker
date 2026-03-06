import { Badge } from "@/components/ui/badge";
import { Beef, Clock, Droplets, Egg, Flame, Wheat } from "lucide-react";
import { motion } from "motion/react";

const dietPlans = [
  {
    name: "Lean Bulk",
    calories: "2,800–3,200",
    protein: "175g",
    carbs: "350g",
    fat: "85g",
    description:
      "Slow and steady gains with minimal fat. Ideal for beginners and those who want clean mass.",
    badge: "Beginner",
    badgeColor: "bg-green-500/20 text-green-400 border-green-500/30",
  },
  {
    name: "Standard Bulk",
    calories: "3,200–3,800",
    protein: "200g",
    carbs: "430g",
    fat: "100g",
    description:
      "Balanced surplus for steady muscle growth. Best for intermediate athletes seeking consistent progress.",
    badge: "Intermediate",
    badgeColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  },
  {
    name: "Aggressive Bulk",
    calories: "4,000–4,500",
    protein: "240g",
    carbs: "540g",
    fat: "130g",
    description:
      "Maximum growth phase for hardgainers. High caloric surplus to maximize muscle and strength gains.",
    badge: "Advanced",
    badgeColor: "bg-fit-red/20 text-fit-red border-fit-red/30",
  },
];

const highCalorieFoods = [
  { name: "Rolled Oats", calories: 389, unit: "100g", icon: "🌾" },
  { name: "Whole Eggs", calories: 155, unit: "100g", icon: "🥚" },
  { name: "Chicken Breast", calories: 165, unit: "100g", icon: "🍗" },
  { name: "Brown Rice", calories: 370, unit: "100g (dry)", icon: "🍚" },
  { name: "Peanut Butter", calories: 588, unit: "100g", icon: "🥜" },
  { name: "Almonds", calories: 579, unit: "100g", icon: "🌰" },
  { name: "Whole Milk", calories: 61, unit: "100ml", icon: "🥛" },
  { name: "Banana", calories: 89, unit: "100g", icon: "🍌" },
  { name: "Avocado", calories: 160, unit: "100g", icon: "🥑" },
  { name: "Quinoa", calories: 368, unit: "100g (dry)", icon: "🌿" },
];

const mealSchedule = [
  {
    meal: "Breakfast",
    time: "7:00 AM",
    items: [
      "Oatmeal with banana and honey (500 kcal)",
      "3 whole eggs scrambled",
      "1 glass whole milk",
    ],
    total: "~750 kcal",
    icon: "🌅",
  },
  {
    meal: "Mid-Morning Snack",
    time: "10:00 AM",
    items: [
      "Greek yogurt with almonds",
      "Protein shake (whey + milk)",
      "1 apple",
    ],
    total: "~450 kcal",
    icon: "🍎",
  },
  {
    meal: "Lunch",
    time: "1:00 PM",
    items: [
      "200g chicken breast",
      "1.5 cups brown rice",
      "Mixed vegetables with olive oil",
      "Avocado salad",
    ],
    total: "~900 kcal",
    icon: "🍱",
  },
  {
    meal: "Pre-Workout",
    time: "4:00 PM",
    items: [
      "2 slices whole grain bread + peanut butter",
      "Banana",
      "Black coffee",
    ],
    total: "~450 kcal",
    icon: "⚡",
  },
  {
    meal: "Post-Workout",
    time: "6:30 PM",
    items: [
      "Whey protein shake",
      "Fast-digesting carbs (white rice or sports drink)",
    ],
    total: "~350 kcal",
    icon: "💪",
  },
  {
    meal: "Dinner",
    time: "8:00 PM",
    items: [
      "200g lean beef or salmon",
      "Sweet potato",
      "Steamed broccoli + olive oil",
    ],
    total: "~750 kcal",
    icon: "🍽️",
  },
  {
    meal: "Before Bed",
    time: "10:30 PM",
    items: [
      "Casein protein shake",
      "1 tbsp peanut butter",
      "Handful of almonds",
    ],
    total: "~350 kcal",
    icon: "🌙",
  },
];

const proteinSources = [
  { source: "Chicken Breast", protein: "31g", per: "100g", type: "Animal" },
  { source: "Tuna (canned)", protein: "26g", per: "100g", type: "Animal" },
  { source: "Salmon", protein: "25g", per: "100g", type: "Animal" },
  { source: "Eggs (whole)", protein: "13g", per: "100g", type: "Animal" },
  { source: "Greek Yogurt", protein: "17g", per: "170g", type: "Dairy" },
  { source: "Cottage Cheese", protein: "11g", per: "100g", type: "Dairy" },
  {
    source: "Whey Protein",
    protein: "25g",
    per: "30g scoop",
    type: "Supplement",
  },
  { source: "Lentils", protein: "9g", per: "100g (cooked)", type: "Plant" },
  { source: "Chickpeas", protein: "9g", per: "100g (cooked)", type: "Plant" },
  { source: "Tofu", protein: "8g", per: "100g", type: "Plant" },
];

function SectionHeader({
  title,
  subtitle,
  delay = 0,
}: {
  title: string;
  subtitle?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="mb-8"
    >
      <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-2">
        {title}
      </h2>
      {subtitle && <p className="text-muted-foreground text-sm">{subtitle}</p>}
    </motion.div>
  );
}

export function Diet() {
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
              Nutrition
            </Badge>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-4">
              Weight Gain <span className="text-fit-red">Diet Plans</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Science-backed nutrition strategies to fuel your muscle growth and
              weight gain journey.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-16">
        {/* Diet Plans */}
        <section>
          <SectionHeader
            title="Choose Your Bulk Strategy"
            subtitle="Select the plan that matches your experience level and goals"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dietPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-6 rounded-2xl bg-fit-surface-2 red-glow-border hover:bg-fit-surface-3 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-extrabold text-xl text-white">
                    {plan.name}
                  </h3>
                  <Badge className={`${plan.badgeColor} text-xs font-semibold`}>
                    {plan.badge}
                  </Badge>
                </div>
                <div className="text-3xl font-display font-extrabold text-fit-red mb-1">
                  {plan.calories}
                </div>
                <div className="text-muted-foreground text-xs mb-4">
                  calories per day
                </div>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: "Protein", value: plan.protein, icon: Beef },
                    { label: "Carbs", value: plan.carbs, icon: Wheat },
                    { label: "Fat", value: plan.fat, icon: Droplets },
                  ].map(({ label, value, icon: Icon }) => (
                    <div
                      key={label}
                      className="text-center p-2 rounded-lg bg-fit-surface-3"
                    >
                      <Icon className="w-3.5 h-3.5 text-fit-red mx-auto mb-1" />
                      <div className="font-bold text-white text-sm">
                        {value}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {plan.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* High Calorie Foods */}
        <section>
          <SectionHeader
            title="High Calorie Power Foods"
            subtitle="Best calorie-dense foods for your weight gain diet"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {highCalorieFoods.map((food, i) => (
              <motion.div
                key={food.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="p-4 rounded-xl bg-fit-surface-2 border border-fit-red/15 hover:border-fit-red/40 transition-all duration-300 text-center group"
              >
                <div className="text-3xl mb-2">{food.icon}</div>
                <div className="font-semibold text-white text-sm mb-1">
                  {food.name}
                </div>
                <div className="text-fit-red font-extrabold text-lg">
                  {food.calories}
                </div>
                <div className="text-muted-foreground text-xs">
                  kcal/{food.unit}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Meal Schedule */}
        <section>
          <SectionHeader
            title="Sample Meal Schedule"
            subtitle="A full day of eating optimized for maximum muscle growth"
          />
          <div className="space-y-3">
            {mealSchedule.map((meal, i) => (
              <motion.div
                key={meal.meal}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="p-5 rounded-xl bg-fit-surface-2 border border-fit-red/15 hover:border-fit-red/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl mt-0.5">{meal.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display font-bold text-white">
                        {meal.meal}
                      </h3>
                      <div className="flex items-center gap-1 text-muted-foreground text-xs">
                        <Clock className="w-3 h-3" />
                        {meal.time}
                      </div>
                      <Badge className="ml-auto bg-fit-red/15 text-fit-red border-fit-red/25 text-xs font-semibold">
                        {meal.total}
                      </Badge>
                    </div>
                    <ul className="text-muted-foreground text-sm space-y-0.5">
                      {meal.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="text-fit-red mt-1.5 text-xs">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Protein Sources */}
        <section>
          <SectionHeader
            title="Top Protein Sources"
            subtitle="Maximize your protein intake for muscle synthesis"
          />
          <div className="overflow-hidden rounded-xl border border-fit-red/20">
            <table className="w-full">
              <thead>
                <tr className="bg-fit-red/10 border-b border-fit-red/20">
                  <th className="text-left px-4 py-3 text-xs font-bold text-white uppercase tracking-widest">
                    Source
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-white uppercase tracking-widest">
                    Protein
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-white uppercase tracking-widest hidden sm:table-cell">
                    Per
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-white uppercase tracking-widest hidden md:table-cell">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody>
                {proteinSources.map((source, i) => (
                  <motion.tr
                    key={source.source}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-fit-red/10 hover:bg-fit-surface-2 transition-colors"
                  >
                    <td className="px-4 py-3 font-semibold text-white text-sm">
                      {source.source}
                    </td>
                    <td className="px-4 py-3 font-extrabold text-fit-red">
                      {source.protein}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs hidden sm:table-cell">
                      {source.per}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <Badge
                        className={`text-xs ${
                          source.type === "Animal"
                            ? "bg-fit-red/15 text-fit-red border-fit-red/25"
                            : source.type === "Dairy"
                              ? "bg-blue-500/15 text-blue-400 border-blue-500/25"
                              : source.type === "Supplement"
                                ? "bg-purple-500/15 text-purple-400 border-purple-500/25"
                                : "bg-green-500/15 text-green-400 border-green-500/25"
                        }`}
                      >
                        {source.type}
                      </Badge>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
