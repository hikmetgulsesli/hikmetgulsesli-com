import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button Component", () => {
  it("renders primary variant correctly", () => {
    render(<Button variant="primary">Gönder</Button>);
    const button = screen.getByRole("button", { name: /gönder/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-[var(--color-primary)]");
  });

  it("renders secondary variant correctly", () => {
    render(<Button variant="secondary">İptal</Button>);
    const button = screen.getByRole("button", { name: /iptal/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("border");
  });

  it("renders ghost variant correctly", () => {
    render(<Button variant="ghost">Kapat</Button>);
    const button = screen.getByRole("button", { name: /kapat/i });
    expect(button).toBeInTheDocument();
  });

  it("renders icon variant correctly", () => {
    render(<Button variant="icon" aria-label="Menü">☰</Button>);
    const button = screen.getByRole("button", { name: /menü/i });
    expect(button).toBeInTheDocument();
  });

  it("renders destructive variant correctly", () => {
    render(<Button variant="destructive">Sil</Button>);
    const button = screen.getByRole("button", { name: /sil/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-[var(--color-error)]");
  });

  it("renders link variant correctly", () => {
    render(<Button variant="link">Detaylar</Button>);
    const button = screen.getByRole("button", { name: /detaylar/i });
    expect(button).toBeInTheDocument();
  });

  it("renders all sizes correctly", () => {
    const { rerender } = render(<Button size="sm">Küçük</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-8");

    rerender(<Button size="md">Orta</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-10");

    rerender(<Button size="lg">Büyük</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-12");
  });

  it("shows loading spinner and disables interaction", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Button loading onClick={handleClick}>
        Gönder
      </Button>
    );
    const button = screen.getByRole("button", { name: "" });
    expect(button).toBeDisabled();
    expect(button.querySelector('[class*="animate-spin"]')).toBeInTheDocument();
  });

  it("renders with leftIcon", () => {
    render(
      <Button leftIcon={<span data-testid="icon">★</span>}>
        Sevdim
      </Button>
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders with rightIcon", () => {
    render(
      <Button rightIcon={<span data-testid="arrow">→</span>}>
        Devam
      </Button>
    );
    expect(screen.getByTestId("arrow")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is set", () => {
    render(<Button disabled>Devre Dışı</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("calls onClick handler", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Tıkla</Button>);
    await user.click(screen.getByRole("button", { name: /tıkla/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
