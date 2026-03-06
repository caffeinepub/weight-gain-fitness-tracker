import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CalorieEntry, WeightEntry, WorkoutEntry } from "../backend.d";
import { useActor } from "./useActor";

export function useWeightEntries() {
  const { actor, isFetching } = useActor();
  return useQuery<WeightEntry[]>({
    queryKey: ["weightEntries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWeightEntries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCalorieEntries() {
  const { actor, isFetching } = useActor();
  return useQuery<CalorieEntry[]>({
    queryKey: ["calorieEntries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCalorieEntries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useWorkoutEntries() {
  const { actor, isFetching } = useActor();
  return useQuery<WorkoutEntry[]>({
    queryKey: ["workoutEntries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWorkoutEntries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTargetWeight() {
  const { actor, isFetching } = useActor();
  return useQuery<number>({
    queryKey: ["targetWeight"],
    queryFn: async () => {
      if (!actor) return 0;
      return actor.getTargetWeight();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddWeightEntry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ date, weight }: { date: string; weight: number }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.addWeightEntry(date, weight);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weightEntries"] });
    },
  });
}

export function useAddCalorieEntry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      date,
      calories,
    }: { date: string; calories: bigint }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.addCalorieEntry(date, calories);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["calorieEntries"] });
    },
  });
}

export function useAddWorkoutEntry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      date,
      exercise,
      sets,
      reps,
    }: {
      date: string;
      exercise: string;
      sets: bigint;
      reps: bigint;
    }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.addWorkoutEntry(date, exercise, sets, reps);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workoutEntries"] });
    },
  });
}

export function useSetTargetWeight() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (goal: number) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.setTargetWeight(goal);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["targetWeight"] });
    },
  });
}

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("No actor available");
      return actor.submitContact(name, email, message);
    },
  });
}
