import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ImageCarousel } from "./ImageCarousel";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

describe("ImageCarousel", () => {
  const mockImages = [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg",
  ];

  it("renders nothing when images array is empty", () => {
    const { container } = render(<ImageCarousel images={[]} alt="Test" />);
    expect(container.firstChild).toBeNull();
  });

  it("shows correct number of images in counter", () => {
    render(<ImageCarousel images={mockImages} alt="Test" />);
    
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("navigates to next image on next button click", async () => {
    render(<ImageCarousel images={mockImages} alt="Test" />);
    
    const nextButton = screen.getByLabelText("Sonraki görsel");
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText("2 / 3")).toBeInTheDocument();
    });
  });

  it("navigates to previous image on prev button click", async () => {
    render(<ImageCarousel images={mockImages} alt="Test" />);
    
    // First go to second image
    const nextButton = screen.getByLabelText("Sonraki görsel");
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText("2 / 3")).toBeInTheDocument();
    });
    
    // Then go back
    const prevButton = screen.getByLabelText("Önceki görsel");
    fireEvent.click(prevButton);
    
    await waitFor(() => {
      expect(screen.getByText("1 / 3")).toBeInTheDocument();
    });
  });

  it("wraps around to first image when navigating past last", async () => {
    render(<ImageCarousel images={mockImages} alt="Test" />);
    
    // Click next 3 times
    const nextButton = screen.getByLabelText("Sonraki görsel");
    fireEvent.click(nextButton); // 2
    fireEvent.click(nextButton); // 3
    fireEvent.click(nextButton); // wraps to 1
    
    await waitFor(() => {
      expect(screen.getByText("1 / 3")).toBeInTheDocument();
    });
  });

  it("wraps around to last image when navigating before first", async () => {
    render(<ImageCarousel images={mockImages} alt="Test" />);
    
    // Click prev
    const prevButton = screen.getByLabelText("Önceki görsel");
    fireEvent.click(prevButton);
    
    await waitFor(() => {
      expect(screen.getByText("3 / 3")).toBeInTheDocument();
    });
  });

  it("applies custom className", () => {
    const { container } = render(
      <ImageCarousel images={mockImages} alt="Test" className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
