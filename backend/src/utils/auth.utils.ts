import * as argon2 from "argon2";

export async function hashPassword(password: string): Promise<string | null> {
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch (error) {
    console.log(`Error hashing password, error was: ${error}`);
    return null;
  }
}

export async function verifyPassword(
  password: string,
  passwordHash: string
): Promise<boolean | null> {
  try {
    if (await argon2.verify(passwordHash, password)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(`Error verifying password, error was: ${error}`);
    return null;
  }
}
