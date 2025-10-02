// components/MarkdownViewer.tsx
import React, { 
  useState, 
  useEffect, 
  useMemo, 
  AnchorHTMLAttributes, 
  BlockquoteHTMLAttributes,
  HTMLAttributes,
  ImgHTMLAttributes
} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
interface MarkdownViewerProps {
  filename: string;
  title?: string;
  showToc?: boolean;
  tocPosition?: 'top' | 'sidebar';
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
    h1: (props: HTMLAttributes<HTMLHeadingElement>) => {
      // Must use props.children and spread {...props}
      const text = String(props.children); 
      const id = createSlug(text);
      return (
        <h1 id={id} className="md-h1" {...props}>
          <a href={`#${id}`} className="heading-anchor">
            {props.children}
          </a>
        </h1>
      );
    },
    h2: (props: HTMLAttributes<HTMLHeadingElement>) => {
      const text = String(props.children); 
      const id = createSlug(text);
      return (
        <h2 id={id} className="md-h2" {...props}>
          <a href={`#${id}`} className="heading-anchor">
            {props.children}
          </a>
        </h2>
      );
    },
    h3: (props: HTMLAttributes<HTMLHeadingElement>) => {
      const text = String(props.children);
      const id = createSlug(text);
      return (
        <h3 id={id} className="md-h3">
          <a href={`#${id}`} className="heading-anchor">
            {props.children}
          </a>
        </h3>
      );
    },
    h4: (props: HTMLAttributes<HTMLHeadingElement>) => {
      const text = String(props.children);
      const id = createSlug(text);
      return (
        <h4 id={id} className="md-h4">
          <a href={`#${id}`} className="heading-anchor">
            {props.children}
          </a>
        </h4>
      );
    },
    h5: (props: HTMLAttributes<HTMLHeadingElement>) => {
      const text = String(props.children);
      const id = createSlug(text);
      return (
        <h5 id={id} className="md-h5">
          <a href={`#${id}`} className="heading-anchor">
            {props.children}
          </a>
        </h5>
      );
    },
    h6: (props: HTMLAttributes<HTMLHeadingElement>) => {
      const text = String(props.children);
      const id = createSlug(text);
      return (
        <h6 id={id} className="md-h6">
          <a href={`#${id}`} className="heading-anchor">
            {props.children}
          </a>
        </h6>
      );
    },
    p: (props: HTMLAttributes<HTMLParagraphElement>) => 
      <p className="md-paragraph" {...props}>{props.children}</p>,
      
    ul: (props: HTMLAttributes<HTMLUListElement>) => 
      <ul className="md-list" {...props}>{props.children}</ul>,
      
    ol: (props: HTMLAttributes<HTMLUListElement>) => 
      <ol className="md-list md-list-ordered" {...props}>{props.children}</ol>,
      
    li: (props: HTMLAttributes<HTMLLIElement>) => 
      <li className="md-list-item" {...props}>{props.children}</li>,

    blockquote: (props: BlockquoteHTMLAttributes<HTMLQuoteElement>) => 
  <blockquote className="md-blockquote" {...props}>{props.children}</blockquote>,
    table: (props: HTMLAttributes<HTMLTableElement>) => 
      <table className="md-table" {...props}>{props.children}</table>,
      
    thead: (props: HTMLAttributes<HTMLTableSectionElement>) => 
      <thead className="md-table-head" {...props}>{props.children}</thead>,
      
    tbody: (props: HTMLAttributes<HTMLTableSectionElement>) => 
      <tbody className="md-table-body" {...props}>{props.children}</tbody>,
      
    tr: (props: HTMLAttributes<HTMLTableRowElement>) => 
      <tr className="md-table-row" {...props}>{props.children}</tr>,
      
    th: (props: HTMLAttributes<HTMLTableCellElement>) => 
      <th className="md-table-header" {...props}>{props.children}</th>,
      
    td: (props: HTMLAttributes<HTMLTableCellElement>) => 
      <td className="md-table-cell" {...props}>{props.children}</td>,
    a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    return <a {...props}>{props.children}</a>;
    },
    img: (props: ImgHTMLAttributes<HTMLImageElement>) => {
      // Destructure src and alt, and collect the rest of the props
      const { src, alt, ...restProps } = props;
      let imageSrc = '';

      // --- Type Guard: Check if 'src' is actually a string before using 'startsWith' ---
      if (typeof src === 'string') {
          // Now it's safe to use string methods
          imageSrc = src.startsWith('http') || src.startsWith('/') 
              ? src 
              : `/images/${src}`;
      }
      // Note: If src is a Blob or undefined, imageSrc will be '' or whatever fallback you prefer.
      // Given the previous error, we must avoid touching it unless it's a string.
      
      return (
          <img 
            src={imageSrc} 
            alt={alt || ''} 
            className="md-image"
            onError={(e) => {
              console.error(`Failed to load image: ${imageSrc}`);
              // Safely hide the element if it fails to load
              (e.target as HTMLImageElement).style.display = 'none';
            }}
            // Spread the rest of the attributes (like width, height, etc.)
            {...restProps} 
          />
      );
  },
    hr: () => <hr className="md-divider" />,
  };

  const renderTableOfContents = (): React.ReactElement => (
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