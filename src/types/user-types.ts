export interface User {
  id: string; // ObjectId
  profile: UserProfile;
  account: UserAccount;
}

export interface UserProfile {
  class: UserClass;
  fullName: string;
  curriculumId: string; // ObjectId
  fathersInitial: string;
}

export interface UserClass {
  gradeLevel: string;
  section: string;
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
