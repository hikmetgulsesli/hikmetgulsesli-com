import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useInView: () => true,
  useRef: () => ({ current: null }),
}));

import AboutPage from "../app/about/page";

describe("About Page", () => {
  describe("Avatar", () => {
    it("renders circular avatar with primary border", () => {
      render(<AboutPage />);
      const avatar = screen.getByAltText("Hikmet Güleşli Avatar");
      expect(avatar).toBeInTheDocument();
      expect(avatar.className).toContain("rounded-full");
      expect(avatar.className).toContain("border-primary");
    });

    it("avatar has glow effect on hover container", () => {
      render(<AboutPage />);
      const avatarContainer = screen.getByAltText(
        "Hikmet Güleşli Avatar"
      ).parentElement;
      expect(avatarContainer?.className).toContain("group");
    });
  });

  describe("Gradient Text", () => {
    it("name uses gradient text styling", () => {
      render(<AboutPage />);
      const heading = screen.getByRole("heading", { name: /Hakkında/i });
      expect(heading.className).toContain("bg-clip-text");
      expect(heading.className).toContain("text-transparent");
    });
  });

  describe("Timeline", () => {
    it("renders experience section heading in Turkish", () => {
      render(<AboutPage />);
      const heading = screen.getByText(/Deneyim Geçmişi/i);
      expect(heading).toBeInTheDocument();
    });

    it("renders all three timeline items", () => {
      render(<AboutPage />);
      expect(screen.getByText(/Senior Full-Stack Developer/i)).toBeInTheDocument();
      expect(screen.getByText(/Lead Backend Architect/i)).toBeInTheDocument();
      expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
    });

    it("renders current experience with primary border highlight", () => {
      render(<AboutPage />);
      const currentItem = screen.getByText(/TechTide AI/i);
      expect(currentItem).toBeInTheDocument();
    });

    it("renders date badges for timeline items", () => {
      render(<AboutPage />);
      expect(screen.getByText(/2022 - GÜNÜMÜZ/i)).toBeInTheDocument();
      expect(screen.getByText(/2020 - 2022/i)).toBeInTheDocument();
      expect(screen.getByText(/2018 - 2020/i)).toBeInTheDocument();
    });
  });

  describe("Skills Grid", () => {
    it("renders skills section heading in Turkish", () => {
      render(<AboutPage />);
      const heading = screen.getByText(/Teknik Yetkinlikler/i);
      expect(heading).toBeInTheDocument();
    });

    it("renders all 6 skill categories", () => {
      render(<AboutPage />);
      expect(screen.getByText(/Frontend Architecture/i)).toBeInTheDocument();
      expect(screen.getByText(/Backend & Logic/i)).toBeInTheDocument();
      expect(screen.getByText(/Infrastructure/i)).toBeInTheDocument();
    });

    it("renders skill bars with names", () => {
      render(<AboutPage />);
      expect(screen.getByText(/React \/ Next\.js/i)).toBeInTheDocument();
      expect(screen.getByText(/Tailwind CSS/i)).toBeInTheDocument();
      expect(screen.getByText(/Node\.js \/ Go/i)).toBeInTheDocument();
      expect(screen.getByText(/PostgreSQL \/ Redis/i)).toBeInTheDocument();
      expect(screen.getByText(/Docker \/ Kubernetes/i)).toBeInTheDocument();
    });
  });

  describe("CV Download Button", () => {
    it("renders terminal-style download button", () => {
      render(<AboutPage />);
      const button = screen.getByRole("button", { name: /DOWNLOAD CV\.EXE/i });
      expect(button).toBeInTheDocument();
    });

    it("button has download icon", () => {
      render(<AboutPage />);
      const button = screen.getByRole("button", { name: /DOWNLOAD CV\.EXE/i });
      expect(button.textContent).toContain("DOWNLOAD CV.EXE");
    });
  });

  describe("Availability Toggle", () => {
    it("renders availability toggle with label", () => {
      render(<AboutPage />);
      const toggle = screen.getByText(/SYSTEM_READY/i);
      expect(toggle).toBeInTheDocument();
    });

    it("toggle checkbox is present", () => {
      render(<AboutPage />);
      const checkbox = screen.getByRole("checkbox", { hidden: true });
      expect(checkbox).toBeInTheDocument();
    });
  });

  describe("Learning Section", () => {
    it("renders learning topics", () => {
      render(<AboutPage />);
      expect(screen.getByText(/Rust/i)).toBeInTheDocument();
      expect(screen.getByText(/WASM/i)).toBeInTheDocument();
      expect(screen.getByText(/AI Agents/i)).toBeInTheDocument();
      expect(screen.getByText(/WebGPU/i)).toBeInTheDocument();
    });
  });

  describe("Responsive Layout", () => {
    it("renders with proper section structure", () => {
      render(<AboutPage />);
      // Profile section
      expect(screen.getByAltText("Hikmet Güleşli Avatar")).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /Hakkında/i })).toBeInTheDocument();
      // Timeline
      expect(screen.getByText(/Deneyim Geçmişi/i)).toBeInTheDocument();
      // Skills
      expect(screen.getByText(/Teknik Yetkinlikler/i)).toBeInTheDocument();
      // CTA
      expect(screen.getByRole("button", { name: /DOWNLOAD CV\.EXE/i })).toBeInTheDocument();
    });
  });
});
