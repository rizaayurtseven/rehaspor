import "server-only";
import argon2 from "argon2";

const passwordOptions = {
  type: argon2.argon2id as 2,
  memoryCost: 19_456,
  timeCost: 2,
  parallelism: 1,
};

export function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, passwordOptions);
}

export function verifyPassword(passwordHash: string, password: string): Promise<boolean> {
  return argon2.verify(passwordHash, password);
}
