import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusIndicator } from "./StatusIndicator";

describe("StatusIndicator Component", () => {
  it("renders online status correctly", () => {
    render(<StatusIndicator status="online" />);
    const indicator = screen.getByRole("status");
    expect(indicator).toBeInTheDocument();
  });

  it("renders offline status correctly", () => {
    render(<StatusIndicator status="offline" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders busy status correctly", () => {
    render(<StatusIndicator status="busy" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders away status correctly", () => {
    render(<StatusIndicator status="away" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders all sizes correctly", () => {
    const { rerender } = render(<StatusIndicator status="online" size="sm" />);
    expect(screen.getByRole("status")).toBeInTheDocument();

    rerender(<StatusIndicator status="online" size="md" />);
    expect(screen.getByRole("status")).toBeInTheDocument();

    rerender(<StatusIndicator status="online" size="lg" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("shows label when showLabel is true", () => {
    render(<StatusIndicator status="online" showLabel />);
    expect(screen.getByText(/çevrimiçi/i)).toBeInTheDocument();
  });

  it("online status has ping animation by default", () => {
    render(<StatusIndicator status="online" animate />);
    const indicator = screen.getByRole("status");
    expect(indicator.querySelector(".animate-ping")).toBeInTheDocument();
  });

  it("non-online status does not have animation", () => {
    render(<StatusIndicator status="offline" animate />);
    const indicator = screen.getByRole("status");
    // The ping animation class should not be present for offline
    expect(indicator.innerHTML).not.toContain("animate-ping");
  });
});
