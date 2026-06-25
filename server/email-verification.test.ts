import { describe, it, expect, beforeAll } from "vitest";
import { addAuthorizedEmail, isEmailAuthorized, deleteAuthorizedEmail } from "./db";

describe("Email Verification System", () => {
  const testEmail = "test@example.com";

  beforeAll(async () => {
    // Limpar email de teste se existir
    try {
      await deleteAuthorizedEmail(testEmail);
    } catch (e) {
      // Ignorar se não existir
    }
  });

  it("should return false for unauthorized email", async () => {
    const result = await isEmailAuthorized("unauthorized@example.com");
    expect(result).toBe(false);
  });

  it("should add email to authorized list", async () => {
    await addAuthorizedEmail({
      email: testEmail,
      name: "Test User",
      productName: "Test Product",
      addedBy: "manual",
      isActive: true,
    });

    const isAuthorized = await isEmailAuthorized(testEmail);
    expect(isAuthorized).toBe(true);
  });

  it("should verify authorized email", async () => {
    const result = await isEmailAuthorized(testEmail);
    expect(result).toBe(true);
  });

  it("should clean up test data", async () => {
    await deleteAuthorizedEmail(testEmail);
    const result = await isEmailAuthorized(testEmail);
    expect(result).toBe(false);
  });
});
