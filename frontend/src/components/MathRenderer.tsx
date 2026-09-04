import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  content: string | number | Record<string, unknown> | null | undefined;
  inline?: boolean;
  className?: string;
  displayMode?: boolean;
}

/**
 * Renders mathematical expressions cleanly using KaTeX.
 * Handles both plain strings, formulas with LaTeX delimiters ($...$ or $$...$$),
 * and raw mathematical/symbolic expressions.
 */
export const MathRenderer: React.FC<MathRendererProps> = ({
  content,
  inline = true,
  className = '',
  displayMode = false,
}) => {
  const isDisplay = displayMode || !inline;

  const renderedHtml = useMemo(() => {
    if (content === null || content === undefined) return '';

    // If it's a number or simple primitive, convert to string
    const text = typeof content === 'object' ? JSON.stringify(content) : String(content);

    // If text has LaTeX delimiters $...$ or $$...$$
    if (text.includes('$') || text.includes('\\(') || text.includes('\\[') || text.includes('\\frac') || text.includes('\\cdot')) {
      return renderMixedContent(text);
    }

    // Check if whole text is a mathematical equation or formula (e.g. 5x + 5, F = m * a)
    const isMathLikely = /^[0-9a-zA-Z\s+\-*/^=().,_\\{}]*([=+\-*/^]|\\|[0-9][a-zA-Z]|[a-zA-Z][0-9])[0-9a-zA-Z\s+\-*/^=().,_\\{}]*$/.test(text.trim()) &&
      (!text.includes(' ') || (text.split(' ').length <= 4 && /[=+\-*/^]/.test(text)));

    if (isMathLikely) {
      try {
        return katex.renderToString(text, {
          displayMode: isDisplay,
          throwOnError: false,
        });
      } catch {
        return escapeHtml(text);
      }
    }

    return renderMixedContent(text);
  }, [content, isDisplay]);

  return (
    <span
      className={`math-rendered ${className} ${isDisplay ? 'block my-2 text-center' : 'inline'}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};

/**
 * Helper to escape HTML characters safely
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Parses mixed text containing LaTeX delimiters:
 * $$...$$ for block math, $...$ or \(...\) for inline math
 */
function renderMixedContent(text: string): string {
  // Replace $$...$$ block equations first
  let processed = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
    try {
      return `<div class="katex-display my-2 py-1 overflow-x-auto">${katex.renderToString(math.trim(), {
        displayMode: true,
        throwOnError: false,
      })}</div>`;
    } catch {
      return `<code>${escapeHtml(math)}</code>`;
    }
  });

  // Replace \[...\] block equations
  processed = processed.replace(/\\\[([\s\S]+?)\\\]/g, (_, math) => {
    try {
      return `<div class="katex-display my-2 py-1 overflow-x-auto">${katex.renderToString(math.trim(), {
        displayMode: true,
        throwOnError: false,
      })}</div>`;
    } catch {
      return `<code>${escapeHtml(math)}</code>`;
    }
  });

  // Replace $...$ inline equations
  processed = processed.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
    try {
      return `<span class="katex-inline">${katex.renderToString(math.trim(), {
        displayMode: false,
        throwOnError: false,
      })}</span>`;
    } catch {
      return `<code>${escapeHtml(math)}</code>`;
    }
  });

  // Replace \(...\) inline equations
  processed = processed.replace(/\\\(([\s\S]+?)\\\)/g, (_, math) => {
    try {
      return `<span class="katex-inline">${katex.renderToString(math.trim(), {
        displayMode: false,
        throwOnError: false,
      })}</span>`;
    } catch {
      return `<code>${escapeHtml(math)}</code>`;
    }
  });

  return processed;
}

export default MathRenderer;
