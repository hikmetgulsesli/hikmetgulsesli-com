import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Badge } from "./Badge";

describe("Badge Component", () => {
  it("renders default variant correctly", () => {
    render(<Badge variant="default">Varsayılan</Badge>);
    expect(screen.getByText(/varsayılan/i)).toBeInTheDocument();
  });

  it("renders primary variant with correct background", () => {
    render(<Badge variant="primary">Primary</Badge>);
    const badge = screen.getByText(/primary/i);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-[rgb(16_185_129_/_0.2)]");
  });

  it("renders secondary variant with correct background", () => {
    render(<Badge variant="secondary">Secondary</Badge>);
    const badge = screen.getByText(/secondary/i);
    expect(badge).toHaveClass("bg-[rgb(99_102_241_/_0.2)]");
  });

  it("renders success variant with correct background", () => {
    render(<Badge variant="success">Başarılı</Badge>);
    const badge = screen.getByText(/başarılı/i);
    expect(badge).toHaveClass("bg-[rgb(34_197_94_/_0.2)]");
  });

  it("renders warning variant with correct background", () => {
    render(<Badge variant="warning">Uyarı</Badge>);
    const badge = screen.getByText(/uyarı/i);
    expect(badge).toHaveClass("bg-[rgb(245_158_11_/_0.2)]");
  });

  it("renders error variant with correct background", () => {
    render(<Badge variant="error">Hata</Badge>);
    const badge = screen.getByText(/hata/i);
    expect(badge).toHaveClass("bg-[rgb(239_68_68_/_0.2)]");
  });

  it("renders all sizes correctly", () => {
    const { rerender } = render(<Badge size="sm">Küçük</Badge>);
    expect(screen.getByText(/küçük/i)).toHaveClass("text-xs");

    rerender(<Badge size="md">Orta</Badge>);
    expect(screen.getByText(/orta/i)).toHaveClass("text-sm");
  });

  it("shows remove button when removable is true", () => {
    const handleRemove = vi.fn();
    render(
      <Badge removable onRemove={handleRemove}>
        Kaldırılabilir
      </Badge>
    );
    const removeButton = screen.getByRole("button", { name: /kaldır/i });
    expect(removeButton).toBeInTheDocument();
  });

  it("calls onRemove when remove button is clicked", async () => {
    const user = userEvent.setup();
    const handleRemove = vi.fn();
    render(
      <Badge removable onRemove={handleRemove}>
        Kaldır
      </Badge>
    );
    await user.click(screen.getByRole("button", { name: /kaldır/i }));
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });
});
