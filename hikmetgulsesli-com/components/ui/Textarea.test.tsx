import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Textarea } from "./Textarea";

describe("Textarea Component", () => {
  it("renders with placeholder", () => {
    render(<Textarea placeholder="Mesajınızı yazın" />);
    expect(screen.getByPlaceholderText(/mesajınızı yazın/i)).toBeInTheDocument();
  });

  it("renders all sizes correctly", async () => {
    const { rerender } = render(<Textarea size="sm" />);
    expect(screen.getByRole("textbox")).toHaveClass("px-3", { exact: false });

    rerender(<Textarea size="md" />);
    expect(screen.getByRole("textbox")).toHaveClass("px-4", { exact: false });

    rerender(<Textarea size="lg" />);
    expect(screen.getByRole("textbox")).toHaveClass("px-5", { exact: false });
  });

  it("shows error state", () => {
    render(<Textarea error errorMessage="Mesaj çok kısa" />);
    expect(screen.getByText(/mesaj çok kısa/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveClass("border-[var(--color-error)]");
  });

  it("shows character count when showCount is true", () => {
    render(<Textarea showCount maxLength={100} value="Deneme" />);
    expect(screen.getByText(/6\/100/i)).toBeInTheDocument();
  });

  it("handles onChange", async () => {
    const user = userEvent.setup();
    render(<Textarea placeholder="Yazın" />);
    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "Merhaba Dünya");
    expect(textarea).toHaveValue("Merhaba Dünya");
  });

  it("is disabled when disabled prop is set", () => {
    render(<Textarea disabled placeholder="Devre dışı" />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("focus shows primary border and ring", () => {
    render(<Textarea placeholder="Odaklan" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("focus:border-[var(--color-primary)]");
    expect(textarea).toHaveClass("focus:ring-2");
    expect(textarea).toHaveClass("focus:ring-[rgb(16_185_129_/_0.2)]");
  });
});
