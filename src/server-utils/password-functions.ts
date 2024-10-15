"use server";
// Function to hash a password
import crypto from "crypto";
export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return { salt, hash };
}

// Function to verify a password
export async function verifyPassword(
  password: string,
  salt: string,
  hash: string
) {
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return hash === hashedPassword;
}
