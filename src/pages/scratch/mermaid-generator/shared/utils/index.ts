// Mermaid Generator Core Utilities
import type { DiagramConfig, ExportOptions, EditorState } from '../types';

export const defaultConfig: DiagramConfig = {
  theme: 'default',
  securityLevel: 'loose',
  flowchart: {
    htmlLabels: true,
    curve: 'basis',
    nodeSpacing: 50,
    rankSpacing: 50,
    padding: 15,
    useMaxWidth: false
  },
  themeVariables: {
    fontFamily: '"Poppins", sans-serif',
    fontSize: '14px',
    primaryColor: '#E0F2F1',
    primaryTextColor: '#004c45',
    primaryBorderColor: '#004c45',
    lineColor: '#00796B',
    secondaryColor: '#F5F5F5',
    tertiaryColor: '#B2DFDB',
    mainBkg: '#E0F2F1',
    nodeTextColor: '#004c45',
    clusterBkg: '#F5F5F5',
    clusterBorder: '#004c45',
    titleColor: '#004c45',
    edgeLabelBackground: '#ffffff',
    edgeLabelColor: '#004c45'
  }
};

export const defaultState: EditorState = {
  content: '',
  autoUpdate: false,
  zoom: 100,
  theme: 'default'
};

export function exportDiagram(svg: SVGElement, options: ExportOptions): void {
  // Implementation will be moved from PoC
}

export function applyTheme(svg: SVGElement, config: DiagramConfig): void {
  // Implementation will be moved from PoC
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}