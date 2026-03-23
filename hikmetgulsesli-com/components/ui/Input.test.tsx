import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

describe("Input Component", () => {
  it("renders with placeholder", () => {
    render(<Input placeholder="Adınızı girin" />);
    expect(screen.getByPlaceholderText(/adınızı girin/i)).toBeInTheDocument();
  });

  it("renders all sizes correctly", async () => {
    const { rerender } = render(<Input size="sm" />);
    expect(screen.getByRole("textbox")).toHaveClass("h-8", { exact: false });

    rerender(<Input size="md" />);
    expect(screen.getByRole("textbox")).toHaveClass("h-10", { exact: false });

    rerender(<Input size="lg" />);
    expect(screen.getByRole("textbox")).toHaveClass("h-12", { exact: false });
  });

  it("shows error state with error prop", () => {
    render(<Input error errorMessage="Geçersiz giriş" />);
    expect(screen.getByText(/geçersiz giriş/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveClass("border-[var(--color-error)]");
  });

  it("shows error message when provided", () => {
    render(<Input errorMessage="Bu alan zorunludur" />);
    expect(screen.getByText(/bu alan zorunludur/i)).toBeInTheDocument();
  });

  it("renders with leftIcon", () => {
    render(
      <Input leftIcon={<span data-testid="search-icon">🔍</span>} placeholder="Ara" />
    );
    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
  });

  it("renders with rightIcon", () => {
    render(
      <Input rightIcon={<span data-testid="clear-icon">✕</span>} placeholder="Temizle" />
    );
    expect(screen.getByTestId("clear-icon")).toBeInTheDocument();
  });

  it("handles onChange", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Yazın" />);
    const input = screen.getByRole("textbox");
    await user.type(input, "Merhaba");
    expect(input).toHaveValue("Merhaba");
  });

  it("is disabled when disabled prop is set", () => {
    render(<Input disabled placeholder="Devre dışı" />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("focus shows primary border and ring", () => {
    render(<Input placeholder="Odaklan" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("focus:border-[var(--color-primary)]");
    expect(input).toHaveClass("focus:ring-2");
    expect(input).toHaveClass("focus:ring-[rgb(16_185_129_/_0.2)]");
  });
});
