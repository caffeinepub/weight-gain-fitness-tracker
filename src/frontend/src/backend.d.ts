import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface WorkoutEntry {
    date: string;
    reps: bigint;
    sets: bigint;
    exercise: string;
}
export interface WeightEntry {
    weight: number;
    date: string;
}
export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
}
export interface CalorieEntry {
    date: string;
    calories: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCalorieEntry(date: string, calories: bigint): Promise<void>;
    addWeightEntry(date: string, weight: number): Promise<void>;
    addWorkoutEntry(date: string, exercise: string, sets: bigint, reps: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllContacts(): Promise<Array<ContactSubmission>>;
    getCallerUserRole(): Promise<UserRole>;
    getCalorieEntries(): Promise<Array<CalorieEntry>>;
    getTargetWeight(): Promise<number>;
    getWeightEntries(): Promise<Array<WeightEntry>>;
    getWorkoutEntries(): Promise<Array<WorkoutEntry>>;
    isCallerAdmin(): Promise<boolean>;
    setTargetWeight(goal: number): Promise<void>;
    submitContact(name: string, email: string, message: string): Promise<void>;
}
