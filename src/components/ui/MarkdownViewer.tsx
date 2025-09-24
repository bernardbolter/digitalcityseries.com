// components/MarkdownViewer.tsx
import React, { useState, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface MarkdownViewerProps {
  filename: string;
  title?: string;
  showToc?: boolean;
  tocPosition?: 'top' | 'sidebar';
}

interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface TocItem {
  id: string;
  title: string;
  level: number;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ 
  filename, 
  title,
  showToc = true,
  tocPosition = 'top'
}) => {
  const [markdown, setMarkdown] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMarkdown = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/documents/${filename}`);
        if (!response.ok) {
          throw new Error(`Failed to load ${filename}: ${response.statusText}`);
        }
        const text = await response.text();
        setMarkdown(text);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        setMarkdown(`# Error\n\nFailed to load markdown file: ${filename}`);
      } finally {
        setLoading(false);
      }
    };

    loadMarkdown();
  }, [filename]);

  // Generate table of contents from markdown headings
  const tableOfContents = useMemo((): TocItem[] => {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const toc: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(markdown)) !== null) {
      const level = match[1].length;
      const title = match[2].trim();
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

      toc.push({ id, title, level });
    }

    return toc;
  }, [markdown]);

  const handlePrint = (): void => {
    window.print();
  };

  const scrollToHeading = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Create slug from heading text
  const createSlug = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  // Custom components for better rendering with anchor links
  const components = {
    code: ({ node, inline, className, children, ...props }: CodeProps) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={tomorrow}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    h1: ({ children }: { children: React.ReactNode }) => {
      const text = String(children);
      const id = createSlug(text);
      return (
        <h1 id={id} className="md-h1">
          <a href={`#${id}`} className="heading-anchor">
            {children}
          </a>
        </h1>
      );
    },
    h2: ({ children }: { children: React.ReactNode }) => {
      const text = String(children);
      const id = createSlug(text);
      return (
        <h2 id={id} className="md-h2">
          <a href={`#${id}`} className="heading-anchor">
            {children}
          </a>
        </h2>
      );
    },
    h3: ({ children }: { children: React.ReactNode }) => {
      const text = String(children);
      const id = createSlug(text);
      return (
        <h3 id={id} className="md-h3">
          <a href={`#${id}`} className="heading-anchor">
            {children}
          </a>
        </h3>
      );
    },
    h4: ({ children }: { children: React.ReactNode }) => {
      const text = String(children);
      const id = createSlug(text);
      return (
        <h4 id={id} className="md-h4">
          <a href={`#${id}`} className="heading-anchor">
            {children}
          </a>
        </h4>
      );
    },
    h5: ({ children }: { children: React.ReactNode }) => {
      const text = String(children);
      const id = createSlug(text);
      return (
        <h5 id={id} className="md-h5">
          <a href={`#${id}`} className="heading-anchor">
            {children}
          </a>
        </h5>
      );
    },
    h6: ({ children }: { children: React.ReactNode }) => {
      const text = String(children);
      const id = createSlug(text);
      return (
        <h6 id={id} className="md-h6">
          <a href={`#${id}`} className="heading-anchor">
            {children}
          </a>
        </h6>
      );
    },
    p: ({ children }: { children: React.ReactNode }) => 
      <p className="md-paragraph">{children}</p>,
    ul: ({ children }: { children: React.ReactNode }) => 
      <ul className="md-list">{children}</ul>,
    ol: ({ children }: { children: React.ReactNode }) => 
      <ol className="md-list md-list-ordered">{children}</ol>,
    li: ({ children }: { children: React.ReactNode }) => 
      <li className="md-list-item">{children}</li>,
    blockquote: ({ children }: { children: React.ReactNode }) => 
      <blockquote className="md-blockquote">{children}</blockquote>,
    table: ({ children }: { children: React.ReactNode }) => 
      <table className="md-table">{children}</table>,
    thead: ({ children }: { children: React.ReactNode }) => 
      <thead className="md-table-head">{children}</thead>,
    tbody: ({ children }: { children: React.ReactNode }) => 
      <tbody className="md-table-body">{children}</tbody>,
    tr: ({ children }: { children: React.ReactNode }) => 
      <tr className="md-table-row">{children}</tr>,
    th: ({ children }: { children: React.ReactNode }) => 
      <th className="md-table-header">{children}</th>,
    td: ({ children }: { children: React.ReactNode }) => 
      <td className="md-table-cell">{children}</td>,
    a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
      <a href={href} className="md-link" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    img: ({ src, alt }: { src?: string; alt?: string }) => {
      const imageSrc = src?.startsWith('http') || src?.startsWith('/') 
        ? src 
        : `/images/${src}`;
      
      return (
        <img 
          src={imageSrc} 
          alt={alt || ''} 
          className="md-image"
          onError={(e) => {
            console.error(`Failed to load image: ${imageSrc}`);
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      );
    },
    hr: () => <hr className="md-divider" />,
  };

  const renderTableOfContents = (): JSX.Element => (
    <div className="table-of-contents">
      <h3 className="toc-title">Table of Contents</h3>
      <nav className="toc-nav">
        {tableOfContents.map((item, index) => (
          <button
            key={index}
            className={`toc-item toc-level-${item.level}`}
            onClick={() => scrollToHeading(item.id)}
            title={`Go to ${item.title}`}
          >
            {item.title}
          </button>
        ))}
      </nav>
    </div>
  );

  if (loading) {
    return (
      <div className="markdown-viewer-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading document...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`markdown-viewer-container ${tocPosition === 'sidebar' ? 'with-sidebar-toc' : ''}`}>
      {/* Fixed Print Button */}
      <button 
        onClick={handlePrint} 
        className="print-button-fixed no-print"
        disabled={!markdown.trim()}
        title="Print Document"
      >
        🖨️ Print
      </button>

      {/* Sidebar TOC */}
      {showToc && tocPosition === 'sidebar' && (
        <div className="toc-sidebar no-print">
          {renderTableOfContents()}
        </div>
      )}

      {/* Document Content */}
      <div className="document-container">
        <div className="a4-page">
          <div className="markdown-content">
            {title && <div className="document-title no-print">{title}</div>}
            
            {/* Top TOC */}
            {showToc && tocPosition === 'top' && (
              <div className="toc-top">
                {renderTableOfContents()}
              </div>
            )}

            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={components}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {error && (
        <div className="error-overlay no-print">
          <p>⚠️ {error}</p>
        </div>
      )}
    </div>
  );
};

export default MarkdownViewer;

// Named export as well (optional)
export { MarkdownViewer };