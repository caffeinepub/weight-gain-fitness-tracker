import Map "mo:core/Map";
import List "mo:core/List";
import Float "mo:core/Float";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the user system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // --- Types ---
  type WeightEntry = {
    date : Text;
    weight : Float;
  };

  type CalorieEntry = {
    date : Text;
    calories : Nat;
  };

  type WorkoutEntry = {
    date : Text;
    exercise : Text;
    sets : Nat;
    reps : Nat;
  };

  type ContactSubmission = {
    name : Text;
    email : Text;
    message : Text;
  };

  // --- Persistent State ---
  let weightEntries = Map.empty<Principal, List.List<WeightEntry>>();
  let calorieEntries = Map.empty<Principal, List.List<CalorieEntry>>();
  let workoutEntries = Map.empty<Principal, List.List<WorkoutEntry>>();
  let userGoals = Map.empty<Principal, Float>();
  let contactSubmissions = List.empty<ContactSubmission>();

  // --- Weight Log ---
  public shared ({ caller }) func addWeightEntry(date : Text, weight : Float) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add weight entries");
    };
    switch (weightEntries.get(caller)) {
      case (null) {
        let newList = List.singleton<WeightEntry>({ date; weight });
        weightEntries.add(caller, newList);
      };
      case (?entries) {
        entries.add({ date; weight });
      };
    };
  };

  public query ({ caller }) func getWeightEntries() : async [WeightEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can retrieve weight entries");
    };
    switch (weightEntries.get(caller)) {
      case (null) { [];
      };
      case (?entries) { entries.toArray() };
    };
  };

  // --- Calorie Log ---
  public shared ({ caller }) func addCalorieEntry(date : Text, calories : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add calorie entries");
    };
    switch (calorieEntries.get(caller)) {
      case (null) {
        let newList = List.singleton<CalorieEntry>({ date; calories });
        calorieEntries.add(caller, newList);
      };
      case (?entries) {
        entries.add({ date; calories });
      };
    };
  };

  public query ({ caller }) func getCalorieEntries() : async [CalorieEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can retrieve calorie entries");
    };
    switch (calorieEntries.get(caller)) {
      case (null) { [];
      };
      case (?entries) { entries.toArray() };
    };
  };

  // --- Workout Log ---
  public shared ({ caller }) func addWorkoutEntry(date : Text, exercise : Text, sets : Nat, reps : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add workout entries");
    };
    switch (workoutEntries.get(caller)) {
      case (null) {
        let newList = List.singleton<WorkoutEntry>({ date; exercise; sets; reps });
        workoutEntries.add(caller, newList);
      };
      case (?entries) {
        entries.add({ date; exercise; sets; reps });
      };
    };
  };

  public query ({ caller }) func getWorkoutEntries() : async [WorkoutEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can retrieve workout entries");
    };
    switch (workoutEntries.get(caller)) {
      case (null) { [];
      };
      case (?entries) { entries.toArray() };
    };
  };

  // --- User Goals ---
  public shared ({ caller }) func setTargetWeight(goal : Float) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can set target weight");
    };
    if (goal <= 0.0) { Runtime.trap("Goal must be positive") } else {
      userGoals.add(caller, goal);
    };
  };

  public query ({ caller }) func getTargetWeight() : async Float {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can retrieve target weight");
    };
    switch (userGoals.get(caller)) {
      case (null) { Runtime.trap("Goal not set") };
      case (?goal) { goal };
    };
  };

  // --- Contact Submission ---
  public shared ({ caller }) func submitContact(name : Text, email : Text, message : Text) : async () {
    contactSubmissions.add({
      name;
      email;
      message;
    });
  };

  public query ({ caller }) func getAllContacts() : async [ContactSubmission] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view contact submissions");
    };
    contactSubmissions.toArray();
  };
};
