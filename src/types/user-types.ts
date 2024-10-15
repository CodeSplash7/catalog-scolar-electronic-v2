export interface UserDocument {
  profile: UserProfile;
  account: UserAccount;
}

export interface UserProfile {
  userClass: UserClass;
  firstName: string;
  lastName: string;
  fathersInitial: string;
  curriculumId: string; // ObjectId
}

export interface UserClass {
  gradeLevel: "V" | "VI" | "VII" | "VIII" | "IX" | "X" | "XI" | "XII";
  section: "A" | "B" | "C" | "D" | "E" | null;
}

export interface UserAccount {
  subscriptionId: string; // ObjectId
  email: string;
  password: UserPassword;
}

export interface UserPassword {
  salt: string;
  hash: string;
}
