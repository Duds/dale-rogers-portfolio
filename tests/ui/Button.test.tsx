import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Button } from "../../src/components/ui/Button";
import { renderWithProviders, mockConsole } from "../utils/test-helpers";

mockConsole();

describe("Button Component", () => {
  const defaultProps = {
    children: "Click me",
    onClick: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders with correct text", () => {
      renderWithProviders(<Button {...defaultProps} />);
      expect(screen.getByRole("button")).toHaveTextContent("Click me");
    });

    it("renders as a button element by default", () => {
      renderWithProviders(<Button {...defaultProps} />);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("applies default variant styles", () => {
      renderWithProviders(<Button {...defaultProps} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-primary", "text-primary-foreground");
    });

    it("applies default size styles", () => {
      renderWithProviders(<Button {...defaultProps} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-10", "px-4", "py-2");
    });
  });

  describe("Variants", () => {
    it("applies secondary variant styles", () => {
      renderWithProviders(<Button variant="secondary" {...defaultProps} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-secondary", "text-secondary-foreground");
    });

    it("applies destructive variant styles", () => {
      renderWithProviders(<Button variant="destructive" {...defaultProps} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "bg-destructive",
        "text-destructive-foreground",
      );
    });

    it("applies outline variant styles", () => {
      renderWithProviders(<Button variant="outline" {...defaultProps} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("border", "bg-background");
    });

    it("applies ghost variant styles", () => {
      renderWithProviders(<Button variant="ghost" {...defaultProps} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "hover:bg-accent",
        "hover:text-accent-foreground",
      );
    });

    it("applies link variant styles", () => {
      renderWithProviders(<Button variant="link" {...defaultProps} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("text-primary", "underline-offset-4");
    });
  });

  describe("Sizes", () => {
    it("applies small size styles", () => {
      renderWithProviders(<Button size="sm" {...defaultProps} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-9", "px-3");
    });

    it("applies large size styles", () => {
      renderWithProviders(<Button size="lg" {...defaultProps} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-11", "px-8");
    });

    it("applies icon size styles", () => {
      renderWithProviders(<Button size="icon" {...defaultProps} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-10", "w-10");
    });
  });

  describe("Interactive Behavior", () => {
    it("calls onClick when clicked", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      renderWithProviders(<Button {...defaultProps} onClick={handleClick} />);

      await user.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("supports keyboard interaction", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      renderWithProviders(<Button {...defaultProps} onClick={handleClick} />);

      const button = screen.getByRole("button");
      button.focus();

      await user.keyboard("{Enter}");
      expect(handleClick).toHaveBeenCalledTimes(1);

      await user.keyboard(" ");
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it("applies hover styles", () => {
      renderWithProviders(<Button {...defaultProps} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("hover:bg-primary/90");
    });

    it("applies focus styles", () => {
      renderWithProviders(<Button {...defaultProps} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "focus-visible:outline-none",
        "focus-visible:ring-2",
      );
    });
  });

  describe("Disabled State", () => {
    it("can be disabled", () => {
      renderWithProviders(<Button disabled {...defaultProps} />);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("applies disabled styles", () => {
      renderWithProviders(<Button disabled {...defaultProps} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "disabled:pointer-events-none",
        "disabled:opacity-50",
      );
    });

    it("does not call onClick when disabled", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      renderWithProviders(
        <Button disabled {...defaultProps} onClick={handleClick} />,
      );

      await user.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Customization", () => {
    it("applies custom className", () => {
      renderWithProviders(
        <Button className="custom-class" {...defaultProps} />,
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
    });

    it("forwards ref correctly", () => {
      const ref = vi.fn();
      renderWithProviders(<Button ref={ref} {...defaultProps} />);
      expect(ref).toHaveBeenCalledWith(screen.getByRole("button"));
    });

    it("forwards additional props", () => {
      renderWithProviders(
        <Button data-testid="test-button" {...defaultProps} />,
      );
      expect(screen.getByTestId("test-button")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has correct role", () => {
      renderWithProviders(<Button {...defaultProps} />);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("supports aria-label", () => {
      renderWithProviders(
        <Button aria-label="Custom label" {...defaultProps} />,
      );
      expect(
        screen.getByRole("button", { name: "Custom label" }),
      ).toBeInTheDocument();
    });

    it("supports aria-describedby", () => {
      renderWithProviders(
        <div>
          <div id="description">Button description</div>
          <Button aria-describedby="description" {...defaultProps} />
        </div>,
      );
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-describedby", "description");
    });

    it("supports aria-pressed for toggle buttons", () => {
      renderWithProviders(<Button aria-pressed="true" {...defaultProps} />);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-pressed", "true");
    });

    it("has proper focus management", () => {
      renderWithProviders(<Button {...defaultProps} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("focus-visible:outline-none");
    });
  });

  describe("Edge Cases", () => {
    it("renders with empty children", () => {
      renderWithProviders(<Button onClick={vi.fn()} />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("");
    });

    it("handles undefined onClick gracefully", () => {
      expect(() => {
        renderWithProviders(<Button>Click me</Button>);
      }).not.toThrow();
    });

    it("combines multiple variants correctly", () => {
      renderWithProviders(
        <Button
          variant="outline"
          size="lg"
          className="custom"
          {...defaultProps}
        />,
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("border", "h-11", "custom");
    });
  });

  describe("Performance", () => {
    it("renders quickly", async () => {
      const start = performance.now();

      renderWithProviders(<Button {...defaultProps} />);

      const end = performance.now();
      const renderTime = end - start;

      expect(renderTime).toBeLessThan(100);
    });

    it("does not re-render unnecessarily", () => {
      const { rerender } = renderWithProviders(<Button {...defaultProps} />);
      const button = screen.getByRole("button", { name: "Click me" });

      rerender(<Button {...defaultProps} />);

      expect(button).toBeInTheDocument();
    });
  });

  describe("Integration", () => {
    it("works with form elements", () => {
      renderWithProviders(
        <form>
          <Button type="submit" {...defaultProps} />
        </form>,
      );
      const button = screen.getByRole("button", { name: "Click me" });
      expect(button).toHaveAttribute("type", "submit");
    });

    it("works with other UI components", () => {
      renderWithProviders(
        <div>
          <Button {...defaultProps} />
          <Button variant="secondary" {...defaultProps} />
        </div>,
      );

      const buttons = screen.getAllByRole("button", { name: "Click me" });
      expect(buttons).toHaveLength(2);
      expect(buttons[0]).toHaveClass("bg-primary");
      expect(buttons[1]).toHaveClass("bg-secondary");
    });
  });
});
