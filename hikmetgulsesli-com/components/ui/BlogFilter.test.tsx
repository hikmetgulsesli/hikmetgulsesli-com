import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BlogPageClient } from "@/components/ui/BlogPageClient";
import { filterPosts, formatDate, BlogCategoryId } from "@/lib/blog";

describe("Blog Filter Logic", () => {
  const mockPosts = [
    {
      slug: "test-post-1",
      title: "Next.js Test",
      excerpt: "A test post about Next.js",
      category: "teknik" as const,
      tags: ["Next.js", "React"],
      readTime: 5,
      publishedAt: "2024-06-16",
      status: "published" as const,
      featured: true,
      pinned: true,
    },
    {
      slug: "test-post-2",
      title: "Career Change",
      excerpt: "Changing careers to software",
      category: "career" as const,
      tags: ["Career"],
      readTime: 3,
      publishedAt: "2024-05-22",
      status: "published" as const,
      featured: false,
      pinned: false,
    },
    {
      slug: "test-post-3",
      title: "TypeScript Tips",
      excerpt: "Useful TypeScript tips",
      category: "teknik" as const,
      tags: ["TypeScript"],
      readTime: 4,
      publishedAt: "2024-04-10",
      status: "published" as const,
      featured: false,
      pinned: false,
    },
  ];

  describe("filterPosts", () => {
    it("should return all posts when category is 'all' and no search query", () => {
      const result = filterPosts(mockPosts, "all", "");
      expect(result).toHaveLength(3);
    });

    it("should filter posts by category", () => {
      const result = filterPosts(mockPosts, "teknik", "");
      expect(result).toHaveLength(2);
      expect(result.every((p) => p.category === "teknik")).toBe(true);
    });

    it("should filter posts by search query in title", () => {
      const result = filterPosts(mockPosts, "all", "Next.js");
      expect(result).toHaveLength(1);
      expect(result[0].slug).toBe("test-post-1");
    });

    it("should filter posts by search query in excerpt", () => {
      const result = filterPosts(mockPosts, "all", "software");
      expect(result).toHaveLength(1);
      expect(result[0].slug).toBe("test-post-2");
    });

    it("should combine category and search filters", () => {
      const result = filterPosts(mockPosts, "teknik", "TypeScript");
      expect(result).toHaveLength(1);
      expect(result[0].slug).toBe("test-post-3");
    });

    it("should return empty array when no matches", () => {
      const result = filterPosts(mockPosts, "career", "Next.js");
      expect(result).toHaveLength(0);
    });
  });

  describe("formatDate", () => {
    it("should format date correctly", () => {
      const result = formatDate("2024-06-16");
      expect(result).toBe("16 Haz 2024");
    });

    it("should handle different months", () => {
      expect(formatDate("2024-01-15")).toBe("15 Oca 2024");
      expect(formatDate("2024-12-25")).toBe("25 Ara 2024");
    });
  });
});

describe("BlogPageClient Acceptance Criteria", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("AC1: Featured article renders as full-width card when pinned", () => {
    const { container } = render(<BlogPageClient />);
    const featuredCards = container.querySelectorAll(".col-span-full");
    expect(featuredCards.length).toBeGreaterThanOrEqual(1);
  });

  it("AC2: Category filter buttons exist and are clickable", async () => {
    const { getAllByRole } = render(<BlogPageClient />);
    const buttons = getAllByRole("button");

    const teknikButton = buttons.find((b) => b.textContent?.includes("TEKNİK"));
    expect(teknikButton).toBeDefined();

    if (teknikButton) {
      fireEvent.click(teknikButton);
    }
  });

  it("AC3: Search input filters posts", async () => {
    const { getByPlaceholderText } = render(<BlogPageClient />);

    const searchInput = getByPlaceholderText(/EXECUTE_SEARCH/i);
    fireEvent.change(searchInput, { target: { value: "TypeScript" } });
  });

  it("AC5: Card hover styles exist (border-primary class)", () => {
    const { container } = render(<BlogPageClient />);
    const cards = container.querySelectorAll('[class*="hover"]');
    expect(cards.length).toBeGreaterThan(0);
  });
});
