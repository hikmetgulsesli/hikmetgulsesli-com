import { describe, it, expect } from "vitest";
import {
  getAllProjects,
  getProjectBySlug,
  getFeaturedProjects,
  filterProjects,
  getPaginatedProjects,
  toProject,
  categories,
  type CategoryId,
} from "@/lib/projects";

describe("Projects Library", () => {
  describe("getAllProjects", () => {
    it("should return only published projects", () => {
      const projects = getAllProjects();
      projects.forEach((project) => {
        expect(project.status).toBe("published");
      });
    });

    it("should return at least 3 projects", () => {
      const projects = getAllProjects();
      expect(projects.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe("getProjectBySlug", () => {
    it("should return a project by valid slug", () => {
      const project = getProjectBySlug("vesta-dashboard");
      expect(project).toBeDefined();
      expect(project?.slug).toBe("vesta-dashboard");
      expect(project?.title).toBe("Vesta Dashboard");
    });

    it("should return undefined for invalid slug", () => {
      const project = getProjectBySlug("nonexistent-project");
      expect(project).toBeUndefined();
    });
  });

  describe("getFeaturedProjects", () => {
    it("should return only featured projects", () => {
      const projects = getFeaturedProjects();
      projects.forEach((project) => {
        expect(project.featured).toBe(true);
      });
    });

    it("should return at most 6 projects by default", () => {
      const projects = getFeaturedProjects();
      expect(projects.length).toBeLessThanOrEqual(6);
    });

    it("should respect custom limit", () => {
      const projects = getFeaturedProjects(2);
      expect(projects.length).toBeLessThanOrEqual(2);
    });
  });

  describe("filterProjects", () => {
    const allProjectsData = getAllProjects();

    it("should return all projects when category is 'all'", () => {
      const filtered = filterProjects(allProjectsData, "all", "");
      expect(filtered.length).toBe(allProjectsData.length);
    });

    it("should filter by category 'web'", () => {
      const filtered = filterProjects(allProjectsData, "web", "");
      filtered.forEach((project) => {
        expect(project.category).toBe("web");
      });
    });

    it("should filter by category 'mobile'", () => {
      const filtered = filterProjects(allProjectsData, "mobile", "");
      filtered.forEach((project) => {
        expect(project.category).toBe("mobile");
      });
    });

    it("should filter by category 'open-source'", () => {
      const filtered = filterProjects(allProjectsData, "open-source", "");
      filtered.forEach((project) => {
        expect(project.category).toBe("open-source");
      });
    });

    it("should filter by category 'freelance'", () => {
      const filtered = filterProjects(allProjectsData, "freelance", "");
      filtered.forEach((project) => {
        expect(project.category).toBe("freelance");
      });
    });

    it("should filter by search query", () => {
      const filtered = filterProjects(allProjectsData, "all", "vesta");
      expect(filtered.length).toBeGreaterThan(0);
      expect(filtered[0].title.toLowerCase()).toContain("vesta");
    });

    it("should combine category and search filters", () => {
      const filtered = filterProjects(allProjectsData, "web", "ai");
      filtered.forEach((project) => {
        expect(project.category).toBe("web");
        const searchLower = "ai";
        expect(
          project.title.toLowerCase().includes(searchLower) ||
            project.shortDescription.toLowerCase().includes(searchLower)
        ).toBe(true);
      });
    });
  });

  describe("getPaginatedProjects", () => {
    it("should return paginated results", () => {
      const result = getPaginatedProjects(1, 3);
      expect(result.data.length).toBeLessThanOrEqual(3);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(3);
      expect(result.hasNext).toBeDefined();
      expect(result.hasPrev).toBeDefined();
    });

    it("should filter by category in pagination", () => {
      const result = getPaginatedProjects(1, 10, "web");
      result.data.forEach((project) => {
        expect(project.category).toBe("web");
      });
    });

    it("should filter by search in pagination", () => {
      const result = getPaginatedProjects(1, 10, undefined, "dashboard");
      result.data.forEach((project) => {
        const searchLower = "dashboard";
        expect(
          project.title.toLowerCase().includes(searchLower) ||
            project.shortDescription.toLowerCase().includes(searchLower)
        ).toBe(true);
      });
    });

    it("should return correct pagination metadata", () => {
      const result = getPaginatedProjects(1, 2);
      expect(result.totalPages).toBeGreaterThan(0);
      expect(result.hasNext).toBe(result.page < result.totalPages);
      expect(result.hasPrev).toBe(result.page > 1);
    });
  });

  describe("toProject", () => {
    it("should convert ProjectData to Project", () => {
      const projectData = getProjectBySlug("vesta-dashboard");
      expect(projectData).toBeDefined();

      const project = toProject(projectData!);
      expect(project.slug).toBe(projectData!.slug);
      expect(project.title).toBe(projectData!.title);
      expect(project.shortDescription).toBe(projectData!.shortDescription);
      expect(project.thumbnail).toBe(projectData!.thumbnail);
      expect(project.category).toBe(projectData!.category);
      expect(project.techStack).toEqual(["Next.js", "TypeScript", "Python", "TensorFlow", "PostgreSQL", "Redis"]);
      expect(project.githubUrl).toBe(projectData!.githubUrl);
      expect(project.liveUrl).toBe(projectData!.liveUrl);
    });
  });

  describe("categories", () => {
    it("should have 5 categories", () => {
      expect(categories.length).toBe(5);
    });

    it("should include 'all' category", () => {
      const allCategory = categories.find((c) => c.id === "all");
      expect(allCategory).toBeDefined();
      expect(allCategory?.label).toBe("TÜMÜ");
    });

    it("should have correct category IDs", () => {
      const ids = categories.map((c) => c.id);
      expect(ids).toContain("all");
      expect(ids).toContain("web");
      expect(ids).toContain("mobile");
      expect(ids).toContain("open-source");
      expect(ids).toContain("freelance");
    });
  });

  describe("Project data integrity", () => {
    it("all projects should have required fields", () => {
      const projects = getAllProjects();
      projects.forEach((project) => {
        expect(project.slug).toBeDefined();
        expect(project.title).toBeDefined();
        expect(project.shortDescription).toBeDefined();
        expect(project.thumbnail).toBeDefined();
        expect(project.category).toBeDefined();
        expect(project.techStack).toBeDefined();
        expect(Array.isArray(project.techStack)).toBe(true);
        expect(project.publishedAt).toBeDefined();
        expect(project.status).toBe("published");
      });
    });

    it("all projects should have at least one tech stack item", () => {
      const projects = getAllProjects();
      projects.forEach((project) => {
        expect(project.techStack.length).toBeGreaterThan(0);
      });
    });
  });
});
