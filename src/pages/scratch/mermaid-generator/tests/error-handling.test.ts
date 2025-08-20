import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  errorHandler,
  ErrorHandler,
  withErrorBoundary,
  withSyncErrorBoundary,
} from "../shared/core/error-handling.js";
import { MermaidError, ExportError } from "../shared/types/index.js";

describe("Error Handling System", () => {
  let mockListener: (error: Error) => void;

  beforeEach(() => {
    mockListener = vi.fn();
    errorHandler.addListener(mockListener);
  });

  it("should create a singleton instance", () => {
    const instance1 = ErrorHandler.getInstance();
    const instance2 = ErrorHandler.getInstance();
    expect(instance1).toBe(instance2);
  });

  it("should handle Mermaid errors", () => {
    const error = new MermaidError("Test error", "MERMAID_INIT_FAILED");
    errorHandler.handleError(error);
    expect(mockListener).toHaveBeenCalledWith(error);
  });

  it("should handle Export errors", () => {
    const error = new ExportError("Export failed", "svg");
    errorHandler.handleError(error);
    expect(mockListener).toHaveBeenCalledWith(error);
  });

  it("should handle async operations with error boundary", async () => {
    const error = new Error("Async operation failed");
    const operation = async () => {
      throw error;
    };

    await expect(withErrorBoundary(operation)).rejects.toThrow(error);
    expect(mockListener).toHaveBeenCalledWith(error);
  });

  it("should handle sync operations with error boundary", () => {
    const error = new Error("Sync operation failed");
    const operation = () => {
      throw error;
    };

    expect(() => withSyncErrorBoundary(operation)).toThrow(error);
    expect(mockListener).toHaveBeenCalledWith(error);
  });

  it("should remove error listeners", () => {
    errorHandler.removeListener(mockListener);
    const error = new Error("Test error");
    errorHandler.handleError(error);
    expect(mockListener).not.toHaveBeenCalled();
  });
});
