import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";
import type {
  Project,
  BlogPost,
  Author,
  TechItem,
  ContactFormData,
  ProjectCategory,
} from "@/types";

describe("Utility Functions", () => {
  describe("cn (className merger)", () => {
    it("should merge class names correctly", () => {
      const result = cn("text-primary", "bg-surface");
      expect(result).toBe("text-primary bg-surface");
    });

    it("should handle conditional classes", () => {
      const isActive = true;
      const result = cn("base-class", isActive && "active-class");
      expect(result).toBe("base-class active-class");
    });

    it("should handle falsy values", () => {
      const isActive = false;
      const result = cn("base-class", isActive && "active-class");
      expect(result).toBe("base-class");
    });

    it("should merge Tailwind classes properly", () => {
      const result = cn("px-4 py-2", "px-6");
      expect(result).toContain("px-6");
    });
  });
});

describe("Type Definitions", () => {
  describe("Project", () => {
    it("should accept valid project object", () => {
      const project: Project = {
        id: "test-project",
        title: "Test Project",
        slug: "test-project",
        description: "A test project",
        longDescription: "Detailed description",
        image: "https://example.com/image.jpg",
        imageAlt: "Test image",
        category: "WEB",
        tags: ["React", "TypeScript"],
        featured: true,
        status: "completed",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(project.title).toBe("Test Project");
      expect(project.category).toBe("WEB");
    });

    it("should enforce project categories", () => {
      const categories: ProjectCategory[] = ["WEB", "MOBIL", "AÇIK KAYNAK", "FREELANCE"];
      categories.forEach((cat) => {
        expect(["WEB", "MOBIL", "AÇIK KAYNAK", "FREELANCE"]).toContain(cat);
      });
    });
  });

  describe("BlogPost", () => {
    it("should accept valid blog post object", () => {
      const author: Author = {
        id: "test-author",
        name: "Test Author",
        title: "Developer",
      };

      const post: BlogPost = {
        id: "test-post",
        title: "Test Post",
        slug: "test-post",
        excerpt: "A test excerpt",
        content: "Full content",
        coverImage: "https://example.com/cover.jpg",
        category: "Teknik",
        tags: ["React"],
        author,
        readTime: 5,
        published: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(post.title).toBe("Test Post");
      expect(post.published).toBe(true);
    });
  });

  describe("ContactFormData", () => {
    it("should accept valid contact form data", () => {
      const formData: ContactFormData = {
        name: "Elif",
        surname: "Yılmaz",
        email: "elif@example.com",
        projectType: "web",
        message: "Hello, I have a project idea...",
      };

      expect(formData.name).toBe("Elif");
      expect(formData.email).toBe("elif@example.com");
    });
  });

  describe("TechItem", () => {
    it("should accept valid tech item with proficiency", () => {
      const tech: TechItem = {
        id: "react",
        name: "React",
        category: "Frontend",
        proficiency: 95,
        description: "UI Library",
      };

      expect(tech.proficiency).toBe(95);
      expect(tech.category).toBe("Frontend");
    });
  });
});

describe("Data Module", () => {
  it("should export author data", async () => {
    const { author } = await import("@/lib/data");
    expect(author.name).toBe("Hikmet Güleşli");
  });

  it("should export projects array", async () => {
    const { projects } = await import("@/lib/data");
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  it("should export blog posts array", async () => {
    const { blogPosts } = await import("@/lib/data");
    expect(Array.isArray(blogPosts)).toBe(true);
  });

  it("should export tech stack array", async () => {
    const { techStack } = await import("@/lib/data");
    expect(Array.isArray(techStack)).toBe(true);
  });

  it("should export helper functions", async () => {
    const { getFeaturedProjects, getProjectBySlug, getBlogPostBySlug } = await import("@/lib/data");

    const featured = getFeaturedProjects();
    expect(Array.isArray(featured)).toBe(true);
    expect(featured.every((p) => p.featured)).toBe(true);

    const project = getProjectBySlug("vesta-dashboard");
    expect(project?.title).toBe("Vesta Dashboard");

    const post = getBlogPostBySlug("optimizing-react-60fps");
    expect(post?.title).toBe("Optimizing React for 60fps and Beyond");
  });

  it("projects should have valid categories", async () => {
    const { projects } = await import("@/lib/data");
    const validCategories = ["WEB", "MOBIL", "AÇIK KAYNAK", "FREELANCE"];

    projects.forEach((project) => {
      expect(validCategories).toContain(project.category);
    });
  });

  it("blog posts should have valid categories", async () => {
    const { blogPosts } = await import("@/lib/data");
    const validCategories = ["Teknik", "Kariyer", "Kişisel", "Tutorial", "Tümü"];

    blogPosts.forEach((post) => {
      expect(validCategories).toContain(post.category);
    });
  });
});
