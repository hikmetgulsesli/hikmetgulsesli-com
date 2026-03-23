import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Accordion } from "./Accordion";

describe("Accordion", () => {
  const mockItems = [
    {
      value: "item-1",
      title: "İlk Öğe",
      content: <p>İlk öğe içeriği</p>,
    },
    {
      value: "item-2",
      title: "İkinci Öğe",
      content: <p>İkinci öğe içeriği</p>,
    },
    {
      value: "item-3",
      title: "Üçüncü Öğe",
      content: <p>Üçüncü öğe içeriği</p>,
    },
  ];

  it("renders all accordion items", () => {
    render(<Accordion items={mockItems} />);
    
    expect(screen.getByText("İlk Öğe")).toBeInTheDocument();
    expect(screen.getByText("İkinci Öğe")).toBeInTheDocument();
    expect(screen.getByText("Üçüncü Öğe")).toBeInTheDocument();
  });

  it("opens the first item by default when defaultValue is provided", () => {
    render(<Accordion items={mockItems} defaultValue="item-1" />);
    
    expect(screen.getByText("İlk öğe içeriği")).toBeInTheDocument();
  });

  it("opens item when clicking on closed item", async () => {
    render(<Accordion items={mockItems} />);
    
    // Initially closed
    expect(screen.queryByText("İlk öğe içeriği")).not.toBeInTheDocument();
    
    // Click to open
    fireEvent.click(screen.getByText("İlk Öğe"));
    
    await waitFor(() => {
      expect(screen.getByText("İlk öğe içeriği")).toBeInTheDocument();
    });
  });

  it("applies custom className", () => {
    const { container } = render(
      <Accordion items={mockItems} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
