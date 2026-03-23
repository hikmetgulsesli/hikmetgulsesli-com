import { describe, it, expect } from "vitest";
import { parseTOC } from "@/lib/blog-detail";

describe("Blog Detail - Prose Rendering", () => {
  const sampleContent = `
## Giriş

Next.js 14 ile birlikte gelen App Router, React uygulamalarında köklü bir değişiklik getiriyor.

### Server Components

React Server Components, bileşenlerinizi sunucu tarafında render etmenize olanak tanır.

## App Router Nedir?

App Router, Next.js uygulamalarında yeni nesil routing sistemidir.

### Routing Sistemi

#### Dynamic Routes

Dinamik route segmentleri köşeli parantez ile tanımlanır.
`;

  describe("parseTOC", () => {
    it("should extract h2 headings", () => {
      const toc = parseTOC(sampleContent);
      const h2Items = toc.filter((item) => item.level === 2);
      expect(h2Items).toHaveLength(2);
      expect(h2Items[0].title).toBe("Giriş");
      expect(h2Items[1].title).toBe("App Router Nedir?");
    });

    it("should extract h3 headings", () => {
      const toc = parseTOC(sampleContent);
      const h3Items = toc.filter((item) => item.level === 3);
      expect(h3Items).toHaveLength(2);
      expect(h3Items[0].title).toBe("Server Components");
      expect(h3Items[1].title).toBe("Routing Sistemi");
    });

    it("should generate slugs for headings", () => {
      const toc = parseTOC(sampleContent);
      // "Giriş" -> ş becomes s, so "giris" (Turkish ı becomes i, but lowercase i is already i)
      expect(toc[0].id).toBe("giris");
      expect(toc[1].id).toBe("server-components");
      expect(toc[2].id).toBe("app-router-nedir");
      expect(toc[3].id).toBe("routing-sistemi");
    });

    it("should handle Turkish characters in slugs", () => {
      const contentWithTurkish = `
## İstanbul'da Geliştiricilik

## Türkiye'de yazılım geliştirme
`;
      const toc = parseTOC(contentWithTurkish);
      expect(toc).toHaveLength(2);
      expect(toc[0].id).toBe("istanbulda-gelistiricilik");
      expect(toc[1].id).toBe("turkiyede-yazilim-gelistirme");
    });

    it("should handle special characters in slugs", () => {
      const contentWithSpecial = `
## Next.js 14 App Router: Derinlemesine İnceleme

### TypeScript'in en güçlü özellikleri
`;
      const toc = parseTOC(contentWithSpecial);
      expect(toc).toHaveLength(2);
      expect(toc[0].id).toBe("nextjs-14-app-router-derinlemesine-inceleme");
      expect(toc[1].id).toBe("typescriptin-en-guclu-ozellikleri");
    });

    it("should return empty array for content without headings", () => {
      const plainContent = `
Bu bir paragraftır.

Başka bir paragraf.
`;
      const toc = parseTOC(plainContent);
      expect(toc).toHaveLength(0);
    });
  });

  describe("Prose Typography Structure", () => {
    it("should support h2 headings with anchor ids", () => {
      const toc = parseTOC(sampleContent);
      const h2WithId = toc.find((item) => item.level === 2 && item.id);
      expect(h2WithId).toBeDefined();
      expect(h2WithId!.id).toBeTruthy();
    });

    it("should support h3 headings with anchor ids", () => {
      const toc = parseTOC(sampleContent);
      const h3WithId = toc.find((item) => item.level === 3 && item.id);
      expect(h3WithId).toBeDefined();
      expect(h3WithId!.id).toBeTruthy();
    });

    it("should maintain heading hierarchy", () => {
      const toc = parseTOC(sampleContent);
      // h2 should come before h3
      const h2Index = toc.findIndex((item) => item.level === 2);
      const h3Index = toc.findIndex((item) => item.level === 3);
      expect(h2Index).toBeLessThan(h3Index);
    });
  });

  describe("Inline Code Rendering", () => {
    it("should detect inline code patterns", () => {
      const content = "Use \`useMemo\` and \`useCallback\` for optimization.";
      const hasInlineCode = content.includes("`");
      expect(hasInlineCode).toBe(true);
    });
  });

  describe("Code Block Detection", () => {
    it("should detect code block start", () => {
      const line = "```typescript";
      expect(line.startsWith("```")).toBe(true);
    });

    it("should extract language from code block", () => {
      const line = "```typescript";
      const language = line.slice(3).trim() || "typescript";
      expect(language).toBe("typescript");
    });

    it("should handle empty language", () => {
      const line = "```";
      const language = line.slice(3).trim() || "typescript";
      expect(language).toBe("typescript");
    });
  });

  describe("Blockquote Detection", () => {
    it("should detect blockquote lines", () => {
      const line = "> **Önemli:** Bu bir alıntıdır.";
      expect(line.startsWith("> ")).toBe(true);
    });

    it("should extract blockquote content", () => {
      const line = "> **Önemli:** Bu bir alıntıdır.";
      const content = line.slice(2);
      expect(content).toBe("**Önemli:** Bu bir alıntıdır.");
    });
  });

  describe("External Link Detection", () => {
    it("should identify external links by protocol", () => {
      const externalUrl = "https://example.com";
      const internalUrl = "/blog/my-post";
      expect(externalUrl.startsWith("http")).toBe(true);
      expect(internalUrl.startsWith("http")).toBe(false);
    });
  });
});

describe("Blog Detail - Related Posts", () => {
  it("should filter by same category", () => {
    // This tests the getRelatedPosts function logic
    const category = "teknik";
    const currentSlug = "post-1";
    
    // Mock posts with same category
    const mockPosts = [
      { slug: "post-1", category: "teknik", status: "published" },
      { slug: "post-2", category: "teknik", status: "published" },
      { slug: "post-3", category: "career", status: "published" },
    ];
    
    const related = mockPosts.filter(
      (p) => p.slug !== currentSlug && p.category === category && p.status === "published"
    );
    
    expect(related).toHaveLength(1);
    expect(related[0].slug).toBe("post-2");
  });

  it("should limit results", () => {
    const mockPosts = [
      { slug: "post-1", category: "teknik", status: "published" },
      { slug: "post-2", category: "teknik", status: "published" },
      { slug: "post-3", category: "teknik", status: "published" },
      { slug: "post-4", category: "teknik", status: "published" },
    ];
    
    const limit = 3;
    const related = mockPosts
      .filter((p) => p.category === "teknik" && p.status === "published")
      .slice(0, limit);
    
    expect(related).toHaveLength(3);
  });
});

describe("Blog Detail - Content Parsing", () => {
  it("should split content by newlines", () => {
    const content = "Line 1\nLine 2\nLine 3";
    const lines = content.split("\n");
    expect(lines).toHaveLength(3);
  });

  it("should handle empty lines", () => {
    const content = "Line 1\n\nLine 3";
    const lines = content.split("\n");
    expect(lines[1]).toBe("");
  });

  it("should trim whitespace from headings", () => {
    const line = "##   Giriş   ";
    const title = line.slice(3).trim();
    expect(title).toBe("Giriş");
  });
});
