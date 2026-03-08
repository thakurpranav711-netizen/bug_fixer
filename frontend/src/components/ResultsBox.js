// ============================================
// ResultsBox.js - Shows Bug Check Results
// Displays the AI response in a nice format
// ============================================

import React from "react";
import ReactMarkdown from "react-markdown";
import "./ResultsBox.css";

function ResultsBox({ results }) {
  return (
    <div className="results-box">
      <ReactMarkdown
        components={{
          // Style code blocks nicely
          code({ node, inline, className, children, ...props }) {
            if (inline) {
              return (
                <code className="inline-code" {...props}>
                  {children}
                </code>
              );
            }
            return (
              <div className="code-block-wrapper">
                <button
                  className="copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(String(children))
                  }
                >
                  📋 Copy
                </button>
                <pre className="code-block">
                  <code {...props}>{children}</code>
                </pre>
              </div>
            );
          },
          // Style headings
          h2({ children }) {
            return <h2 className="result-heading">{children}</h2>;
          },
          // Style list items
          li({ children }) {
            return <li className="result-list-item">{children}</li>;
          },
        }}
      >
        {results}
      </ReactMarkdown>
    </div>
  );
}

export default ResultsBox;