import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../src/components/ui/Card";
import { Button } from "../../src/components/ui/Button";
import { renderWithProviders, mockConsole } from "../utils/test-helpers";

mockConsole();

describe("Card Component", () => {
  describe("Card", () => {
    it("renders with correct base classes", () => {
      renderWithProviders(<Card>Card content</Card>);
      const card = screen.getByText("Card content").closest("div");
      expect(card).toHaveClass(
        "rounded-lg",
        "border",
        "bg-card",
        "text-card-foreground",
        "shadow-sm",
      );
    });

    it("applies custom className", () => {
      renderWithProviders(<Card className="custom-card">Card content</Card>);
      const card = screen.getByText("Card content").closest("div");
      expect(card).toHaveClass("custom-card");
    });

    it("forwards additional props", () => {
      renderWithProviders(<Card data-testid="test-card">Card content</Card>);
      expect(screen.getByTestId("test-card")).toBeInTheDocument();
    });

    it("renders children correctly", () => {
      renderWithProviders(
        <Card>
          <div data-testid="child">Child content</div>
        </Card>,
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });
  });

  describe("CardHeader", () => {
    it("renders with correct classes", () => {
      renderWithProviders(
        <Card>
          <CardHeader data-testid="header">
            <div>Header content</div>
          </CardHeader>
        </Card>,
      );
      const header = screen.getByTestId("header");
      expect(header).toHaveClass("flex", "flex-col", "space-y-1.5", "p-6");
    });

    it("applies custom className", () => {
      renderWithProviders(
        <Card>
          <CardHeader className="custom-header" data-testid="header">
            <div>Header content</div>
          </CardHeader>
        </Card>,
      );
      const header = screen.getByTestId("header");
      expect(header).toHaveClass("custom-header");
    });

    it("forwards additional props", () => {
      renderWithProviders(
        <Card>
          <CardHeader data-testid="test-header">
            <div>Header content</div>
          </CardHeader>
        </Card>,
      );
      expect(screen.getByTestId("test-header")).toBeInTheDocument();
    });
  });

  describe("CardTitle", () => {
    it("renders as h3 by default", () => {
      renderWithProviders(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
        </Card>,
      );
      const title = screen.getByRole("heading", { level: 3 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent("Card Title");
    });

    it("applies correct typography classes", () => {
      renderWithProviders(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
        </Card>,
      );
      const title = screen.getByRole("heading", { level: 3 });
      expect(title).toHaveClass(
        "text-2xl",
        "font-semibold",
        "leading-none",
        "tracking-tight",
      );
    });

    it("applies custom className", () => {
      renderWithProviders(
        <Card>
          <CardHeader>
            <CardTitle className="custom-title">Card Title</CardTitle>
          </CardHeader>
        </Card>,
      );
      const title = screen.getByRole("heading", { level: 3 });
      expect(title).toHaveClass("custom-title");
    });

    it("forwards additional props", () => {
      renderWithProviders(
        <Card>
          <CardHeader>
            <CardTitle data-testid="test-title">Card Title</CardTitle>
          </CardHeader>
        </Card>,
      );
      expect(screen.getByTestId("test-title")).toBeInTheDocument();
    });
  });

  describe("CardDescription", () => {
    it("renders with correct text", () => {
      renderWithProviders(
        <Card>
          <CardHeader>
            <CardDescription>Card description</CardDescription>
          </CardHeader>
        </Card>,
      );
      expect(screen.getByText("Card description")).toBeInTheDocument();
    });

    it("applies correct typography classes", () => {
      renderWithProviders(
        <Card>
          <CardHeader>
            <CardDescription>Card description</CardDescription>
          </CardHeader>
        </Card>,
      );
      const description = screen.getByText("Card description");
      expect(description).toHaveClass("text-sm", "text-muted-foreground");
    });

    it("applies custom className", () => {
      renderWithProviders(
        <Card>
          <CardHeader>
            <CardDescription className="custom-description">
              Card description
            </CardDescription>
          </CardHeader>
        </Card>,
      );
      const description = screen.getByText("Card description");
      expect(description).toHaveClass("custom-description");
    });
  });

  describe("CardContent", () => {
    it("renders with correct classes", () => {
      renderWithProviders(
        <Card>
          <CardContent data-testid="content">
            <div>Content</div>
          </CardContent>
        </Card>,
      );
      const content = screen.getByTestId("content");
      expect(content).toHaveClass("p-6", "pt-0");
    });

    it("applies custom className", () => {
      renderWithProviders(
        <Card>
          <CardContent className="custom-content" data-testid="content">
            <div>Content</div>
          </CardContent>
        </Card>,
      );
      const content = screen.getByTestId("content");
      expect(content).toHaveClass("custom-content");
    });

    it("renders children correctly", () => {
      renderWithProviders(
        <Card>
          <CardContent>
            <div data-testid="content-child">Content</div>
          </CardContent>
        </Card>,
      );
      expect(screen.getByTestId("content-child")).toBeInTheDocument();
    });
  });

  describe("CardFooter", () => {
    it("renders with correct classes", () => {
      renderWithProviders(
        <Card>
          <CardFooter data-testid="footer">
            <div>Footer content</div>
          </CardFooter>
        </Card>,
      );
      const footer = screen.getByTestId("footer");
      expect(footer).toHaveClass("flex", "items-center", "p-6", "pt-0");
    });

    it("applies custom className", () => {
      renderWithProviders(
        <Card>
          <CardFooter className="custom-footer" data-testid="footer">
            <div>Footer content</div>
          </CardFooter>
        </Card>,
      );
      const footer = screen.getByTestId("footer");
      expect(footer).toHaveClass("custom-footer");
    });

    it("supports justify-between layout", () => {
      renderWithProviders(
        <Card>
          <CardFooter className="justify-between">
            <Button>Left</Button>
            <Button>Right</Button>
          </CardFooter>
        </Card>,
      );
      const footer = screen.getByText("Left").closest("div");
      expect(footer).toHaveClass("justify-between");
    });
  });

  describe("Component Composition", () => {
    it("renders complete card structure", () => {
      renderWithProviders(
        <Card>
          <CardHeader>
            <CardTitle>Complete Card</CardTitle>
            <CardDescription>With all sections</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Main content area</p>
          </CardContent>
          <CardFooter>
            <Button>Action</Button>
          </CardFooter>
        </Card>,
      );

      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
        "Complete Card",
      );
      expect(screen.getByText("With all sections")).toBeInTheDocument();
      expect(screen.getByText("Main content area")).toBeInTheDocument();
      expect(screen.getByRole("button")).toHaveTextContent("Action");
    });

    it("works with multiple cards", () => {
      renderWithProviders(
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Card 1</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card 2</CardTitle>
            </CardHeader>
          </Card>
        </div>,
      );

      const titles = screen.getAllByRole("heading", { level: 3 });
      expect(titles).toHaveLength(2);
      expect(titles[0]).toHaveTextContent("Card 1");
      expect(titles[1]).toHaveTextContent("Card 2");
    });

    it("supports nested content", () => {
      renderWithProviders(
        <Card>
          <CardContent>
            <div>
              <h4>Nested heading</h4>
              <p>Nested paragraph</p>
              <ul>
                <li>List item 1</li>
                <li>List item 2</li>
              </ul>
            </div>
          </CardContent>
        </Card>,
      );

      expect(screen.getByText("Nested heading")).toBeInTheDocument();
      expect(screen.getByText("Nested paragraph")).toBeInTheDocument();
      expect(screen.getByText("List item 1")).toBeInTheDocument();
      expect(screen.getByText("List item 2")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper heading structure", () => {
      renderWithProviders(
        <Card>
          <CardHeader>
            <CardTitle>Main Title</CardTitle>
            <CardDescription>Description</CardDescription>
          </CardHeader>
        </Card>,
      );

      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading).toHaveTextContent("Main Title");
    });

    it("supports aria-label on card", () => {
      renderWithProviders(
        <Card aria-label="User profile card">
          <CardContent>Content</CardContent>
        </Card>,
      );

      const card = screen.getByLabelText("User profile card");
      expect(card).toBeInTheDocument();
    });

    it("supports aria-describedby", () => {
      renderWithProviders(
        <Card>
          <div id="card-description">This is a card description</div>
          <CardContent aria-describedby="card-description">Content</CardContent>
        </Card>,
      );

      const content = screen.getByText("Content");
      expect(content).toHaveAttribute("aria-describedby", "card-description");
    });
  });

  describe("Styling and Layout", () => {
    it("applies consistent spacing", () => {
      renderWithProviders(
        <Card>
          <CardHeader data-testid="header">
            <CardTitle>Title</CardTitle>
          </CardHeader>
          <CardContent data-testid="content">Content</CardContent>
          <CardFooter data-testid="footer">Footer</CardFooter>
        </Card>,
      );

      const header = screen.getByTestId("header");
      const content = screen.getByTestId("content");
      const footer = screen.getByTestId("footer");

      expect(header).toHaveClass("p-6");
      expect(content).toHaveClass("p-6", "pt-0");
      expect(footer).toHaveClass("p-6", "pt-0");
    });

    it("supports custom width classes", () => {
      renderWithProviders(
        <Card className="w-[350px]" data-testid="custom-width-card">
          <CardContent>Content</CardContent>
        </Card>,
      );

      const card = screen.getByTestId("custom-width-card");
      expect(card).toHaveClass("w-[350px]");
    });

    it("supports text alignment", () => {
      renderWithProviders(
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Centered Title</CardTitle>
          </CardHeader>
        </Card>,
      );

      const header = screen.getByText("Centered Title").closest("div");
      expect(header).toHaveClass("text-center");
    });
  });

  describe("Edge Cases", () => {
    it("renders with empty content", () => {
      renderWithProviders(
        <Card>
          <CardContent data-testid="empty-content"></CardContent>
        </Card>,
      );

      const content = screen.getByTestId("empty-content");
      expect(content).toBeInTheDocument();
    });

    it("handles undefined children gracefully", () => {
      expect(() => {
        renderWithProviders(
          <Card>
            <CardContent>{undefined}</CardContent>
          </Card>,
        );
      }).not.toThrow();
    });

    it("combines multiple className props correctly", () => {
      renderWithProviders(
        <Card className="border-2 bg-blue-50" data-testid="multi-class-card">
          <CardContent>Content</CardContent>
        </Card>,
      );

      const card = screen.getByTestId("multi-class-card");
      expect(card).toHaveClass("border-2", "bg-blue-50");
    });
  });

  describe("Performance", () => {
    it("renders quickly", async () => {
      const start = performance.now();

      renderWithProviders(
        <Card>
          <CardContent>Content</CardContent>
        </Card>,
      );

      const end = performance.now();
      const renderTime = end - start;

      expect(renderTime).toBeLessThan(100);
    });

    it("handles large content efficiently", () => {
      const largeContent = Array.from(
        { length: 1000 },
        (_, i) => `<div key="${i}">Content item ${i}</div>`,
      ).join("");

      expect(() => {
        renderWithProviders(
          <Card>
            <CardContent dangerouslySetInnerHTML={{ __html: largeContent }} />
          </Card>,
        );
      }).not.toThrow();
    });
  });

  describe("Integration with Other Components", () => {
    it("works with Button components", () => {
      renderWithProviders(
        <Card>
          <CardFooter>
            <Button variant="outline">Cancel</Button>
            <Button>Submit</Button>
          </CardFooter>
        </Card>,
      );

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(2);
      expect(buttons[0]).toHaveTextContent("Cancel");
      expect(buttons[1]).toHaveTextContent("Submit");
    });

    it("works with form elements", () => {
      renderWithProviders(
        <Card>
          <CardContent>
            <form>
              <input type="text" placeholder="Enter text" />
              <Button type="submit">Submit</Button>
            </form>
          </CardContent>
        </Card>,
      );

      expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });
  });
});
