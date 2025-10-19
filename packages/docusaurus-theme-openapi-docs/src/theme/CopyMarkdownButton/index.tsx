import React, { useCallback, useRef, useState, useEffect } from "react";
import clsx from "clsx";
import copy from "copy-text-to-clipboard";

interface CopyMarkdownButtonProps {
  markdown: string | undefined;
}

export default function CopyMarkdownButton({ markdown }: CopyMarkdownButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const copyTimeout = useRef<number | undefined>(undefined);

  const handleCopy = useCallback(() => {
    if (!markdown) return;
    try {
      const decoded = atob(markdown);
      copy(decoded);
      setIsCopied(true);
      copyTimeout.current = window.setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } catch {
      // ignore decoding errors
    }
  }, [markdown]);

  useEffect(() => () => window.clearTimeout(copyTimeout.current), []);

  if (!markdown) return null;

  return (
    <button
      type="button"
      aria-label="Copy markdown to clipboard"
      title="Copy markdown"
      className={clsx(
        "button button--sm button--secondary margin-bottom--sm openapi-copy-markdown-btn",
        isCopied && "openapi-copy-markdown-btn--copied"
      )}
      onClick={handleCopy}
    >
      <span className="openapi-copy-markdown-btn-icons" aria-hidden="true">
        <svg
          className="openapi-copy-markdown-btn-icon"
          viewBox="0 0 24 24"
        >
          <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
        </svg>
        <svg
          className="openapi-copy-markdown-btn-icon--success"
          viewBox="0 0 24 24"
        >
          <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
        </svg>
      </span>
      {isCopied ? "Copied" : "Copy Markdown"}
    </button>
  );
}
