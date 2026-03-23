import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toast, ToastProvider, useToast } from "./Toast";

// Test the Toast component directly
describe("Toast Component", () => {
  it("renders with title", () => {
    render(<Toast title="Test Mesajı" onDismiss={vi.fn()} />);
    expect(screen.getByText(/test mesajı/i)).toBeInTheDocument();
  });

  it("renders with description", () => {
    render(<Toast title="Test" description="Detay açıklama" onDismiss={vi.fn()} />);
    expect(screen.getByText(/detay açıklama/i)).toBeInTheDocument();
  });

  it("renders success variant with correct icon", () => {
    render(<Toast variant="success" title="Başarılı" onDismiss={vi.fn()} />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders error variant", () => {
    render(<Toast variant="error" title="Hata" onDismiss={vi.fn()} />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders warning variant", () => {
    render(<Toast variant="warning" title="Uyarı" onDismiss={vi.fn()} />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders info variant", () => {
    render(<Toast variant="info" title="Bilgi" onDismiss={vi.fn()} />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("calls onDismiss when close button is clicked", async () => {
    const user = userEvent.setup();
    const handleDismiss = vi.fn();
    render(
      <Toast title="Kapatılabilir" dismissible onDismiss={handleDismiss} />
    );
    await user.click(screen.getByRole("button", { name: /kapat/i }));
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it("renders action button when provided", () => {
    const handleAction = vi.fn();
    render(
      <Toast 
        title="Eylemli Toast" 
        action={{ label: "Geri Al", onClick: handleAction }}
        onDismiss={vi.fn()} 
      />
    );
    expect(screen.getByRole("button", { name: /geri al/i })).toBeInTheDocument();
  });

  it("calls action onClick handler", async () => {
    const user = userEvent.setup();
    const handleAction = vi.fn();
    render(
      <Toast 
        title="Eylemli Toast" 
        action={{ label: "Geri Al", onClick: handleAction }}
        onDismiss={vi.fn()} 
      />
    );
    await user.click(screen.getByRole("button", { name: /geri al/i }));
    expect(handleAction).toHaveBeenCalledTimes(1);
  });

  it("auto-dismisses after duration", () => {
    vi.useFakeTimers();
    const handleDismiss = vi.fn();
    render(<Toast title="Otomatik Kapat" duration={3000} onDismiss={handleDismiss} />);
    
    vi.advanceTimersByTime(3000);
    expect(handleDismiss).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});

// Test the ToastProvider and useToast hook
function TestComponent() {
  const { addToast } = useToast();
  return (
    <button onClick={() => addToast({ title: "Eklendi", variant: "success" })}>
      Ekle
    </button>
  );
}

describe("ToastProvider", () => {
  it("renders children", () => {
    render(
      <ToastProvider>
        <div>İçerik</div>
      </ToastProvider>
    );
    expect(screen.getByText(/içerik/i)).toBeInTheDocument();
  });

  it("adds toast when addToast is called", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    
    await user.click(screen.getByRole("button", { name: /ekle/i }));
    expect(screen.getByText(/eklendi/i)).toBeInTheDocument();
  });
});
