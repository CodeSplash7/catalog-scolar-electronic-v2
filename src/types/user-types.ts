export interface UserDocument {
  profile: UserProfile;
  account: UserAccount;
}

export interface UserProfile {
  userClass: UserClass;
  firstName: string;
  lastName: string;
  fathersInitial: string;
  username: string;
  curriculumId: string; // ObjectId
}

export type UserClassGradeLevel =
  | "V"
  | "VI"
  | "VII"
  | "VIII"
  | "IX"
  | "X"
  | "XI"
  | "XII";

export type UserClassSection = "A" | "B" | "C" | "D" | "E" | "-";
export interface UserClass {
  gradeLevel: UserClassGradeLevel;
  section: UserClassSection;
}

export interface UserAccount {
  subscriptionId: string; // ObjectId
  password: UserPassword;
}

export interface UserPassword {
  salt: string;
  hash: string;
}
