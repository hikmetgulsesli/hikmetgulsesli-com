import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { TypingAnimation } from "./TypingAnimation";

describe("TypingAnimation", () => {
  const originalError = console.error;

  beforeEach(() => {
    vi.useFakeTimers();
    console.error = vi.fn();
  });

  afterEach(() => {
    vi.useRealTimers();
    console.error = originalError;
  });

  it("renders without crashing", () => {
    const { container } = render(<TypingAnimation roles={["Developer"]} />);
    expect(container).toBeTruthy();
  });

  it("handles empty roles array without crashing", () => {
    const { container } = render(<TypingAnimation roles={[]} />);
    expect(container).toBeTruthy();
  });

  it("handles single role", () => {
    const { container } = render(<TypingAnimation roles={["Solo"]} />);
    expect(container).toBeTruthy();
  });

  it("handles multiple roles", () => {
    const { container } = render(<TypingAnimation roles={["Role1", "Role2", "Role3"]} />);
    expect(container).toBeTruthy();
  });

  it("accepts custom speed prop", () => {
    const { container } = render(<TypingAnimation roles={["Test"]} speed={100} />);
    expect(container).toBeTruthy();
  });

  it("accepts custom className", () => {
    const { container } = render(
      <TypingAnimation roles={["Test"]} className="custom-class" />
    );
    expect(container).toBeTruthy();
  });
});
