// Mermaid Generator Types

// Diagram configuration
export interface DiagramConfig {
  theme: string;
  securityLevel: "loose" | "strict";
  flowchart: {
    htmlLabels: boolean;
    curve: string;
    nodeSpacing: number;
    rankSpacing: number;
    padding: number;
    useMaxWidth: boolean;
  };
  themeVariables: {
    fontFamily: string;
    fontSize: string;
    primaryColor: string;
    primaryTextColor: string;
    primaryBorderColor: string;
    lineColor: string;
    secondaryColor: string;
    tertiaryColor: string;
    mainBkg: string;
    nodeTextColor: string;
    clusterBkg: string;
    clusterBorder: string;
    titleColor: string;
    edgeLabelBackground: string;
    edgeLabelColor: string;
  };
}

// Export options
export interface ExportOptions {
  format: "svg" | "png";
  filename: string;
  scale?: number;
  padding?: number;
}

// Editor state
export interface EditorState {
  content: string;
  autoUpdate: boolean;
  zoom: number;
  theme: string;
}

// Error types
export class MermaidError extends Error {
  constructor(
    message: string,
    public code: string
  ) {
    super(message);
    this.name = "MermaidError";
  }
}

export class ExportError extends Error {
  constructor(
    message: string,
    public format: "svg" | "png"
  ) {
    super(message);
    this.name = "ExportError";
  }
}

// Event types
export interface DiagramEvent {
  type: "update" | "export" | "error";
  payload: unknown;
}

// Component props
export interface MermaidEditorProps {
  initialContent?: string;
  autoUpdate?: boolean;
  theme?: string;
}

export interface MermaidPreviewProps {
  initialZoom?: number;
  maxZoom?: number;
  minZoom?: number;
}

export interface MermaidControlsProps {
  onExport?: (format: "svg" | "png") => void;
  onSave?: (format: "txt" | "html") => void;
  onClear?: () => void;
  onExample?: () => void;
}
