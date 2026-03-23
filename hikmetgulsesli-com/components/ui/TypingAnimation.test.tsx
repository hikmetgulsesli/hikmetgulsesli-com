import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { TypingAnimation } from "./TypingAnimation";

describe("TypingAnimation", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders with correct initial elements", () => {
    render(<TypingAnimation roles={["Developer"]} />);
    
    // The component renders with an empty cursor span
    const cursor = document.querySelector('[aria-hidden="true"]');
    expect(cursor).toBeTruthy();
  });

  it("renders without crashing with empty roles", () => {
    const { container } = render(<TypingAnimation roles={[]} />);
    expect(container).toBeTruthy();
    expect(container.textContent).toBe("");
  });

  it("renders without crashing with single role", () => {
    const { container } = render(<TypingAnimation roles={["Solo"]} />);
    expect(container).toBeTruthy();
  });

  it("renders without crashing with multiple roles", () => {
    const { container } = render(<TypingAnimation roles={["Role1", "Role2", "Role3"]} />);
    expect(container).toBeTruthy();
  });

  it("applies custom className to the container", () => {
    const { container } = render(<TypingAnimation roles={["Test"]} className="custom-class" />);
    const element = container.firstElementChild as HTMLElement | null;
    expect(element).toBeTruthy();
    expect(element?.className).toContain("custom-class");
  });

  it("renders with cursor element visible", () => {
    render(<TypingAnimation roles={["Developer"]} />);
    const cursor = document.querySelector('span[aria-hidden="true"]');
    expect(cursor).toBeTruthy();
    expect(cursor?.className).toContain("bg-primary");
  });

  it("renders without console errors", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    render(<TypingAnimation roles={["Developer", "Designer"]} />);
    // Allow React act warnings but not actual errors
    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });
});
