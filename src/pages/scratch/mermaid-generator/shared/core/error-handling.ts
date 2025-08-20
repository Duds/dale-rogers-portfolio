// error-handling.ts - Error handling utilities

// Custom error classes
export class MermaidError extends Error {
  constructor(
    message: string,
    public code: string,
  ) {
    super(message);
    this.name = "MermaidError";
  }
}

export class ExportError extends Error {
  constructor(
    message: string,
    public format: "svg" | "png",
  ) {
    super(message);
    this.name = "ExportError";
  }
}

// Error codes
export const ErrorCodes = {
  MERMAID: {
    INIT_FAILED: "MERMAID_INIT_FAILED",
    PARSE_ERROR: "MERMAID_PARSE_ERROR",
    RENDER_ERROR: "MERMAID_RENDER_ERROR",
    THEME_ERROR: "MERMAID_THEME_ERROR",
  },
  EXPORT: {
    SVG_ERROR: "EXPORT_SVG_ERROR",
    PNG_ERROR: "EXPORT_PNG_ERROR",
    SAVE_ERROR: "EXPORT_SAVE_ERROR",
  },
  EDITOR: {
    INPUT_ERROR: "EDITOR_INPUT_ERROR",
    UPDATE_ERROR: "EDITOR_UPDATE_ERROR",
    CLEAR_ERROR: "EDITOR_CLEAR_ERROR",
  },
} as const;

// Error messages
export const ErrorMessages = {
  [ErrorCodes.MERMAID.INIT_FAILED]: "Failed to initialize Mermaid",
  [ErrorCodes.MERMAID.PARSE_ERROR]: "Failed to parse Mermaid syntax",
  [ErrorCodes.MERMAID.RENDER_ERROR]: "Failed to render diagram",
  [ErrorCodes.MERMAID.THEME_ERROR]: "Failed to apply theme",
  [ErrorCodes.EXPORT.SVG_ERROR]: "Failed to export as SVG",
  [ErrorCodes.EXPORT.PNG_ERROR]: "Failed to export as PNG",
  [ErrorCodes.EXPORT.SAVE_ERROR]: "Failed to save file",
  [ErrorCodes.EDITOR.INPUT_ERROR]: "Invalid input",
  [ErrorCodes.EDITOR.UPDATE_ERROR]: "Failed to update diagram",
  [ErrorCodes.EDITOR.CLEAR_ERROR]: "Failed to clear diagram",
} as const;

// Error handler
export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorListeners: ((error: Error) => void)[] = [];

  private constructor() {}

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  // Add error listener
  addListener(listener: (error: Error) => void): void {
    this.errorListeners.push(listener);
  }

  // Remove error listener
  removeListener(listener: (error: Error) => void): void {
    this.errorListeners = this.errorListeners.filter((l) => l !== listener);
  }

  // Handle error
  handleError(error: Error): void {
    console.error("Mermaid Generator Error:", error);
    this.errorListeners.forEach((listener) => listener(error));
  }

  // Create Mermaid error
  createMermaidError(
    code: keyof typeof ErrorCodes.MERMAID,
    message?: string,
  ): MermaidError {
    return new MermaidError(
      message || ErrorMessages[ErrorCodes.MERMAID[code]],
      ErrorCodes.MERMAID[code],
    );
  }

  // Create export error
  createExportError(format: "svg" | "png", message?: string): ExportError {
    const code =
      format === "svg"
        ? ErrorCodes.EXPORT.SVG_ERROR
        : ErrorCodes.EXPORT.PNG_ERROR;
    return new ExportError(message || ErrorMessages[code], format);
  }
}

// Get error handler instance
export const errorHandler = ErrorHandler.getInstance();

// Error boundary for async operations
export async function withErrorBoundary<T>(
  operation: () => Promise<T>,
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (error instanceof Error) {
      errorHandler.handleError(error);
    } else {
      errorHandler.handleError(new Error(String(error)));
    }
    throw error;
  }
}

// Error boundary for sync operations
export function withSyncErrorBoundary<T>(operation: () => T): T {
  try {
    return operation();
  } catch (error) {
    if (error instanceof Error) {
      errorHandler.handleError(error);
    } else {
      errorHandler.handleError(new Error(String(error)));
    }
    throw error;
  }
}

export function handleMermaidError(
  error: Error,
  context: string,
): MermaidError {
  const errorMessage = `Mermaid error in ${context}: ${error.message}`;
  return new MermaidError(errorMessage, "MERMAID_UNKNOWN_ERROR");
}
