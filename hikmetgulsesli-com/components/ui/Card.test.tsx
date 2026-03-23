import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Card Component", () => {
  it("renders default variant correctly", () => {
    render(<Card variant="default">Kart İçeriği</Card>);
    const card = screen.getByText(/kart içeriği/i);
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("bg-[var(--color-surface-container)]");
    expect(card).toHaveClass("border");
  });

  it("renders interactive variant correctly", () => {
    render(<Card variant="interactive">Etkileşimli Kart</Card>);
    const card = screen.getByText(/etkileşimli kart/i);
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("hover:border-[var(--color-primary)]");
    expect(card).toHaveClass("hover:-translate-y-1");
    expect(card).toHaveClass("hover:shadow-lg");
    expect(card).toHaveClass("cursor-pointer");
  });

  it("renders featured variant correctly", () => {
    render(<Card variant="featured">Öne Çıkan Kart</Card>);
    const card = screen.getByText(/öne çıkan kart/i);
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("border-2");
    expect(card).toHaveClass("border-[var(--color-primary)]");
  });

  it("renders all padding sizes correctly", () => {
    const { rerender } = render(<Card padding="none">Padding Yok</Card>);
    expect(screen.getByText(/padding yok/i)).toBeInTheDocument();

    rerender(<Card padding="sm">Küçük Padding</Card>);
    expect(screen.getByText(/küçük padding/i)).toBeInTheDocument();

    rerender(<Card padding="md">Orta Padding</Card>);
    expect(screen.getByText(/orta padding/i)).toBeInTheDocument();

    rerender(<Card padding="lg">Büyük Padding</Card>);
    expect(screen.getByText(/büyük padding/i)).toBeInTheDocument();
  });

  it("applies hover prop styles when true", () => {
    render(<Card hover>Hover Edilebilir</Card>);
    const card = screen.getByText(/hover edilebilir/i);
    expect(card).toHaveClass("hover:border-[var(--color-primary)]");
  });
});
