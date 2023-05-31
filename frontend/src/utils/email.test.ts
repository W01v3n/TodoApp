import { describe, expect, test } from "vitest";
import isValidEmail from "./email.utils";

describe("isValidEmail function", () => {
  // Define a test case for a valid email
  test("Should validate a correct email", () => {
    // Set up a correct email string
    const email = "example@example.com";
    // Verify that the function correctly validates the email
    expect(isValidEmail(email)).toBe(true);
    // If isValidEmail(email) returns true, the test will pass
  });

  // Define a test case for an invalid email
  test("Should invalidate an incorrect email", () => {
    // Set up an incorrect email string
    const email = "example.com";
    // Verify that the function correctly invalidates the email
    expect(isValidEmail(email)).toBe(false);
    // If isValidEmail(email) returns false, the test will pass
  });
});
