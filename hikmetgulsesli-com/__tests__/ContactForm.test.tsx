import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContactForm } from "@/components/forms/ContactForm";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock Toast
const mockAddToast = vi.fn();
const mockRemoveToast = vi.fn();

vi.mock("@/components/ui/Toast", () => ({
  useToast: () => ({
    addToast: mockAddToast,
    removeToast: mockRemoveToast,
    toasts: [],
  }),
}));

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("ContactForm Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockReset();
  });

  describe("Rendering", () => {
    it("renders all 5 form fields", () => {
      render(<ContactForm />);

      expect(screen.getByLabelText(/^Ad$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^Soyad$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^E-posta$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^Konu$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^Mesaj$/i)).toBeInTheDocument();
    });

    it("renders submit button", () => {
      render(<ContactForm />);
      expect(screen.getByRole("button", { name: /Mesaj Gönder/i })).toBeInTheDocument();
    });

    it("renders loading state correctly", () => {
      render(<ContactForm />);
      const button = screen.getByRole("button", { name: /Mesaj Gönder/i });
      expect(button).not.toBeDisabled();
    });
  });

  describe("Validation", () => {
    it("shows validation error when firstName is too short", async () => {
      render(<ContactForm />);

      const firstNameInput = screen.getByLabelText(/^Ad$/i);
      fireEvent.change(firstNameInput, { target: { value: "A" } });

      const submitButton = screen.getByRole("button", { name: /Mesaj Gönder/i });
      fireEvent.click(submitButton);

      // Validation error should appear
      await waitFor(() => {
        expect(screen.queryByText("Ad en az 2 karakter olmalı")).toBeInTheDocument();
      });
    });

    it("shows validation error when email is invalid", async () => {
      render(<ContactForm />);

      fireEvent.change(screen.getByLabelText(/^Ad$/i), { target: { value: "Elif" } });
      fireEvent.change(screen.getByLabelText(/^Soyad$/i), { target: { value: "Yılmaz" } });
      fireEvent.change(screen.getByLabelText(/^E-posta$/i), { target: { value: "notvalidemail" } });
      fireEvent.change(screen.getByLabelText(/^Konu$/i), { target: { value: "Test konu" } });
      fireEvent.change(screen.getByLabelText(/^Mesaj$/i), { target: { value: "Bu bir test mesajıdır yeterli uzunlukta." } });

      const submitButton = screen.getByRole("button", { name: /Mesaj Gönder/i });
      fireEvent.click(submitButton);

      expect(await screen.findByText(/Geçerli bir e-posta adresi girin/i)).toBeInTheDocument();
    });

    it("shows validation error when message is too short", async () => {
      render(<ContactForm />);

      fireEvent.change(screen.getByLabelText(/^Ad$/i), { target: { value: "Elif" } });
      fireEvent.change(screen.getByLabelText(/^Soyad$/i), { target: { value: "Yılmaz" } });
      fireEvent.change(screen.getByLabelText(/^E-posta$/i), { target: { value: "elif@test.com" } });
      fireEvent.change(screen.getByLabelText(/^Konu$/i), { target: { value: "Test konu" } });
      fireEvent.change(screen.getByLabelText(/^Mesaj$/i), { target: { value: "Kısa mesaj" } });

      const submitButton = screen.getByRole("button", { name: /Mesaj Gönder/i });
      fireEvent.click(submitButton);

      expect(await screen.findByText(/Mesaj en az 20 karakter olmalı/i)).toBeInTheDocument();
    });
  });

  describe("Form Submission", () => {
    it("calls API with correct data on valid submission", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: { id: "msg_123" } }),
      });

      render(<ContactForm />);

      fireEvent.change(screen.getByLabelText(/^Ad$/i), { target: { value: "Elif" } });
      fireEvent.change(screen.getByLabelText(/^Soyad$/i), { target: { value: "Yılmaz" } });
      fireEvent.change(screen.getByLabelText(/^E-posta$/i), { target: { value: "elif@reelforge.com" } });
      fireEvent.change(screen.getByLabelText(/^Konu$/i), { target: { value: "Yeni proje fırsatı" } });
      fireEvent.change(screen.getByLabelText(/^Mesaj$/i), { target: { value: "Merhaba, web sitem için yardım almak istiyorum." } });

      const submitButton = screen.getByRole("button", { name: /Mesaj Gönder/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: "Elif",
            lastName: "Yılmaz",
            email: "elif@reelforge.com",
            subject: "Yeni proje fırsatı",
            message: "Merhaba, web sitem için yardım almak istiyorum.",
          }),
        });
      });
    });

    it("shows success toast and resets form on successful submission", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: { id: "msg_123" } }),
      });

      render(<ContactForm />);

      fireEvent.change(screen.getByLabelText(/^Ad$/i), { target: { value: "Ahmet" } });
      fireEvent.change(screen.getByLabelText(/^Soyad$/i), { target: { value: "Kaya" } });
      fireEvent.change(screen.getByLabelText(/^E-posta$/i), { target: { value: "ahmet@techcorp.com.tr" } });
      fireEvent.change(screen.getByLabelText(/^Konu$/i), { target: { value: "İşbirliği teklifi" } });
      fireEvent.change(screen.getByLabelText(/^Mesaj$/i), { target: { value: "Merhaba, yeni projeniz hakkında bilgi almak istiyorum." } });

      const submitButton = screen.getByRole("button", { name: /Mesaj Gönder/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockAddToast).toHaveBeenCalledWith(
          expect.objectContaining({
            variant: "success",
            title: "Mesajınız başarıyla gönderildi!",
          })
        );
      });

      // Form should be reset (fields should be empty)
      expect(screen.getByLabelText(/^Ad$/i)).toHaveValue("");
      expect(screen.getByLabelText(/^Soyad$/i)).toHaveValue("");
      expect(screen.getByLabelText(/^E-posta$/i)).toHaveValue("");
      expect(screen.getByLabelText(/^Konu$/i)).toHaveValue("");
      expect(screen.getByLabelText(/^Mesaj$/i)).toHaveValue("");
    });

    it("shows error toast on API failure", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ success: false, error: { message: "Sunucu hatası" } }),
      });

      render(<ContactForm />);

      fireEvent.change(screen.getByLabelText(/^Ad$/i), { target: { value: "Elif" } });
      fireEvent.change(screen.getByLabelText(/^Soyad$/i), { target: { value: "Yılmaz" } });
      fireEvent.change(screen.getByLabelText(/^E-posta$/i), { target: { value: "elif@test.com" } });
      fireEvent.change(screen.getByLabelText(/^Konu$/i), { target: { value: "Test konu" } });
      fireEvent.change(screen.getByLabelText(/^Mesaj$/i), { target: { value: "Test mesajı yeterli uzunlukta." } });

      const submitButton = screen.getByRole("button", { name: /Mesaj Gönder/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockAddToast).toHaveBeenCalledWith(
          expect.objectContaining({
            variant: "error",
            title: "Bir hata oluştu, lütfen tekrar deneyin",
          })
        );
      });
    });

    it("disables form during submission", async () => {
      // Create a slow promise that doesn't resolve immediately
      let resolveSlowly: (value: unknown) => void;
      const pendingPromise = new Promise((resolve) => {
        resolveSlowly = resolve as (value: unknown) => void;
      });
      
      mockFetch.mockImplementationOnce(
        () =>
          pendingPromise.then(() => ({ ok: true, json: async () => ({ success: true }) }))
      );

      render(<ContactForm />);

      fireEvent.change(screen.getByLabelText(/^Ad$/i), { target: { value: "Elif" } });
      fireEvent.change(screen.getByLabelText(/^Soyad$/i), { target: { value: "Yılmaz" } });
      fireEvent.change(screen.getByLabelText(/^E-posta$/i), { target: { value: "elif@test.com" } });
      fireEvent.change(screen.getByLabelText(/^Konu$/i), { target: { value: "Test konu" } });
      fireEvent.change(screen.getByLabelText(/^Mesaj$/i), { target: { value: "Test mesajı yeterli uzunlukta." } });

      const submitButton = screen.getByRole("button", { name: /Mesaj Gönder/i });
      fireEvent.click(submitButton);

      // Check that button shows loading state and is disabled
      await waitFor(() => {
        expect(screen.queryByText(/Gönderiliyor.../i)).toBeInTheDocument();
      });
      expect(submitButton).toBeDisabled();

      // Resolve the request
      resolveSlowly!(undefined);

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });
    });
  });
});
