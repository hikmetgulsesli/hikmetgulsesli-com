import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FilterBar } from "./FilterBar";
import { categories } from "@/lib/projects";

describe("FilterBar", () => {
  const defaultProps = {
    activeCategory: "all" as const,
    onCategoryChange: vi.fn(),
    searchQuery: "",
    onSearchChange: vi.fn(),
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders all category buttons", () => {
    render(<FilterBar {...defaultProps} />);

    categories.forEach((category) => {
      expect(screen.getByRole("button", { name: category.label })).toBeDefined();
    });
  });

  it("calls onCategoryChange when category button is clicked", () => {
    render(<FilterBar {...defaultProps} />);

    const webButton = screen.getByRole("button", { name: "WEB" });
    fireEvent.click(webButton);

    expect(defaultProps.onCategoryChange).toHaveBeenCalledWith("web");
  });

  it("shows active state for selected category", () => {
    render(<FilterBar {...defaultProps} activeCategory="web" />);

    const webButton = screen.getByRole("button", { name: "WEB" });
    expect(webButton.className).toContain("bg-primary");
  });

  it("renders search input with placeholder", () => {
    render(<FilterBar {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText("Proje Ara...");
    expect(searchInput).toBeDefined();
  });

  it("calls onSearchChange when search input changes", () => {
    render(<FilterBar {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText("Proje Ara...");
    fireEvent.change(searchInput, { target: { value: "sentinel" } });

    expect(defaultProps.onSearchChange).toHaveBeenCalledWith("sentinel");
  });

  it("displays Cmd+K hint on desktop", () => {
    render(<FilterBar {...defaultProps} />);

    // kbd element should be present
    const kbdElements = document.querySelectorAll("kbd");
    expect(kbdElements.length).toBeGreaterThan(0);
  });

  it("has sticky positioning", () => {
    const { container } = render(<FilterBar {...defaultProps} />);
    const filterBar = container.firstChild;
    expect(filterBar?.className).toContain("sticky");
    expect(filterBar?.className).toContain("top-16");
  });

  it("has backdrop blur effect", () => {
    const { container } = render(<FilterBar {...defaultProps} />);
    const filterBar = container.firstChild;
    expect(filterBar?.className).toContain("backdrop-blur");
  });
});

describe("FilterBar interaction", () => {
  it("can switch between categories", () => {
    const onCategoryChange = vi.fn();
    render(
      <FilterBar
        activeCategory="all"
        onCategoryChange={onCategoryChange}
        searchQuery=""
        onSearchChange={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "MOBİL" }));
    expect(onCategoryChange).toHaveBeenCalledWith("mobile");

    fireEvent.click(screen.getByRole("button", { name: "AÇIK KAYNAK" }));
    expect(onCategoryChange).toHaveBeenCalledWith("open-source");

    fireEvent.click(screen.getByRole("button", { name: "FREELANCE" }));
    expect(onCategoryChange).toHaveBeenCalledWith("freelance");
  });

  it("can clear and retype search query", () => {
    const onSearchChange = vi.fn();
    const { rerender } = render(
      <FilterBar
        activeCategory="all"
        onCategoryChange={vi.fn()}
        searchQuery=""
        onSearchChange={onSearchChange}
      />
    );

    const searchInput = screen.getByPlaceholderText("Proje Ara...");

    fireEvent.change(searchInput, { target: { value: "ai" } });
    expect(onSearchChange).toHaveBeenLastCalledWith("ai");

    rerender(
      <FilterBar
        activeCategory="all"
        onCategoryChange={vi.fn()}
        searchQuery="ai"
        onSearchChange={onSearchChange}
      />
    );

    fireEvent.change(searchInput, { target: { value: "dashboard" } });
    expect(onSearchChange).toHaveBeenLastCalledWith("dashboard");
  });
});
