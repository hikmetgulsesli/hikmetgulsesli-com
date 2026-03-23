import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SkeletonLoader, SkeletonText, SkeletonCircle, SkeletonCard } from "./SkeletonLoader";

describe("SkeletonLoader Component", () => {
  it("renders text variant correctly", () => {
    render(<SkeletonLoader variant="text" />);
    const skeleton = screen.getByTestId("skeleton-loader");
    expect(skeleton).toBeInTheDocument();
  });

  it("renders circular variant correctly", () => {
    render(<SkeletonLoader variant="circular" width={50} height={50} />);
    const skeleton = screen.getByTestId("skeleton-loader");
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass("rounded-full");
  });

  it("renders rectangular variant correctly", () => {
    render(<SkeletonLoader variant="rectangular" />);
    const skeleton = screen.getByTestId("skeleton-loader");
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass("rounded-lg");
  });

  it("renders card variant correctly", () => {
    render(<SkeletonLoader variant="card" />);
    const skeleton = screen.getByTestId("skeleton-loader");
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass("rounded-xl");
  });

  it("renders with custom width and height", () => {
    render(<SkeletonLoader width={200} height={100} />);
    const skeleton = screen.getByTestId("skeleton-loader");
    expect(skeleton).toHaveStyle({ width: "200px", height: "100px" });
  });

  it("renders with pulse animation", () => {
    render(<SkeletonLoader animation="pulse" />);
    const skeleton = screen.getByTestId("skeleton-loader");
    expect(skeleton).toHaveClass("animate-pulse");
  });

  it("renders with wave animation", () => {
    render(<SkeletonLoader animation="wave" />);
    const skeleton = screen.getByTestId("skeleton-loader");
    expect(skeleton).toHaveClass("overflow-hidden");
  });

  it("renders with no animation", () => {
    render(<SkeletonLoader animation="none" />);
    const skeleton = screen.getByTestId("skeleton-loader");
    expect(skeleton).not.toHaveClass("animate-pulse");
    expect(skeleton).not.toHaveClass("overflow-hidden");
  });
});

describe("Skeleton Presets", () => {
  it("SkeletonText renders text variant", () => {
    render(<SkeletonText />);
    const skeleton = screen.getByTestId("skeleton-loader");
    expect(skeleton).toHaveClass("rounded");
  });

  it("SkeletonCircle renders circular variant", () => {
    render(<SkeletonCircle width={50} height={50} />);
    const skeleton = screen.getByTestId("skeleton-loader");
    expect(skeleton).toHaveClass("rounded-full");
  });

  it("SkeletonCard renders card variant", () => {
    render(<SkeletonCard />);
    const skeleton = screen.getByTestId("skeleton-loader");
    expect(skeleton).toHaveClass("rounded-xl");
  });
});
