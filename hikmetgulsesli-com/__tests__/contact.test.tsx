import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { z } from "zod";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useInView: () => true,
  useRef: () => ({ current: null }),
}));

// Contact form validation schema (extracted for unit testing)
const contactSchema = z.object({
  firstName: z
    .string()
    .min(2, "Minimum 2 karakter gerekli")
    .max(50)
    .regex(/^[a-zA-ZÇçĞğİıÖöŞşÜü\s]+$/, "Sadece harf kullanılabilir"),
  lastName: z
    .string()
    .min(2, "Minimum 2 karakter gerekli")
    .max(50)
    .regex(/^[a-zA-ZÇçĞğİıÖöŞşÜü\s]+$/, "Sadece harf kullanılabilir"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  subject: z.string().min(5, "Minimum 5 karakter gerekli").max(200),
  message: z.string().min(20, "Minimum 20 karakter gerekli").max(2000),
});

type ContactFormData = z.infer<typeof contactSchema>;

describe("Contact Form Validation Schema", () => {
  describe("firstName validation", () => {
    it("accepts valid Turkish name with 2+ characters", () => {
      const result = contactSchema.safeParse({
        firstName: "Elif",
        lastName: "Yılmaz",
        email: "elif@test.com",
        subject: "Test subject",
        message: "This is a test message with enough characters",
      });
      expect(result.success).toBe(true);
    });

    it("rejects firstName with less than 2 characters", () => {
      const result = contactSchema.safeParse({
        firstName: "A",
        lastName: "Yılmaz",
        email: "elif@test.com",
        subject: "Test subject",
        message: "This is a test message with enough characters",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe("Minimum 2 karakter gerekli");
      }
    });

    it("rejects firstName with numbers", () => {
      const result = contactSchema.safeParse({
        firstName: "Elif123",
        lastName: "Yılmaz",
        email: "elif@test.com",
        subject: "Test subject",
        message: "This is a test message with enough characters",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe("Sadece harf kullanılabilir");
      }
    });

    it("accepts Turkish characters in firstName", () => {
      const result = contactSchema.safeParse({
        firstName: "Çağla",
        lastName: "Yılmaz",
        email: "elif@test.com",
        subject: "Test subject",
        message: "This is a test message with enough characters",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("lastName validation", () => {
    it("accepts valid Turkish last name with 2+ characters", () => {
      const result = contactSchema.safeParse({
        firstName: "Elif",
        lastName: "Yılmaz",
        email: "elif@test.com",
        subject: "Test subject",
        message: "This is a test message with enough characters",
      });
      expect(result.success).toBe(true);
    });

    it("rejects lastName with less than 2 characters", () => {
      const result = contactSchema.safeParse({
        firstName: "Elif",
        lastName: "Y",
        email: "elif@test.com",
        subject: "Test subject",
        message: "This is a test message with enough characters",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe("Minimum 2 karakter gerekli");
      }
    });
  });

  describe("email validation", () => {
    it("accepts valid email format", () => {
      const result = contactSchema.safeParse({
        firstName: "Elif",
        lastName: "Yılmaz",
        email: "elif@reelforge.com",
        subject: "Test subject",
        message: "This is a test message with enough characters",
      });
      expect(result.success).toBe(true);
    });

    it("rejects invalid email format", () => {
      const result = contactSchema.safeParse({
        firstName: "Elif",
        lastName: "Yılmaz",
        email: "notanemail",
        subject: "Test subject",
        message: "This is a test message with enough characters",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe("Geçerli bir e-posta adresi giriniz");
      }
    });

    it("rejects email without @ symbol", () => {
      const result = contactSchema.safeParse({
        firstName: "Elif",
        lastName: "Yılmaz",
        email: "elifreelforge.com",
        subject: "Test subject",
        message: "This is a test message with enough characters",
      });
      expect(result.success).toBe(false);
    });

    it("rejects email without domain", () => {
      const result = contactSchema.safeParse({
        firstName: "Elif",
        lastName: "Yılmaz",
        email: "elif@",
        subject: "Test subject",
        message: "This is a test message with enough characters",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("subject validation", () => {
    it("accepts subject with 5+ characters", () => {
      const result = contactSchema.safeParse({
        firstName: "Elif",
        lastName: "Yılmaz",
        email: "elif@test.com",
        subject: "Test1",
        message: "This is a test message with enough characters",
      });
      expect(result.success).toBe(true);
    });

    it("rejects subject with less than 5 characters", () => {
      const result = contactSchema.safeParse({
        firstName: "Elif",
        lastName: "Yılmaz",
        email: "elif@test.com",
        subject: "Hi",
        message: "This is a test message with enough characters",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe("Minimum 5 karakter gerekli");
      }
    });

    it("rejects subject longer than 200 characters", () => {
      const result = contactSchema.safeParse({
        firstName: "Elif",
        lastName: "Yılmaz",
        email: "elif@test.com",
        subject: "A".repeat(201),
        message: "This is a test message with enough characters",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("message validation", () => {
    it("accepts message with 20+ characters", () => {
      const result = contactSchema.safeParse({
        firstName: "Elif",
        lastName: "Yılmaz",
        email: "elif@test.com",
        subject: "Test subject",
        message: "This message is long enough",
      });
      expect(result.success).toBe(true);
    });

    it("rejects message with less than 20 characters", () => {
      const result = contactSchema.safeParse({
        firstName: "Elif",
        lastName: "Yılmaz",
        email: "elif@test.com",
        subject: "Test subject",
        message: "Too short",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe("Minimum 20 karakter gerekli");
      }
    });

    it("rejects message longer than 2000 characters", () => {
      const result = contactSchema.safeParse({
        firstName: "Elif",
        lastName: "Yılmaz",
        email: "elif@test.com",
        subject: "Test subject",
        message: "A".repeat(2001),
      });
      expect(result.success).toBe(false);
    });
  });

  describe("complete form validation", () => {
    it("accepts a fully valid Turkish contact form submission", () => {
      const validData: ContactFormData = {
        firstName: "Ahmet",
        lastName: "Kaya",
        email: "ahmet@techcorp.com.tr",
        subject: "Yeni proje işbirliği hakkında",
        message: "Merhaba, web sitem için yeni bir proje fırsatı hakkında bilgi almak istiyorum.",
      };
      const result = contactSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("rejects form with any single invalid field", () => {
      const invalidData = {
        firstName: "Elif",
        lastName: "Yılmaz",
        email: "invalid-email",
        subject: "Test subject",
        message: "This is a test message with enough characters",
      };
      const result = contactSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});
