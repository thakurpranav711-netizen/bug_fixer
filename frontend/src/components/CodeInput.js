// ============================================
// CodeInput.js - Text Area Where User Pastes Code
// Big text box with line numbers feel
// ============================================

import React from "react";
import "./CodeInput.css";

function CodeInput({ code, setCode, language }) {
  // Count lines for display
  const lineCount = code.split("\n").length;

  return (
    <div className="code-input-wrapper">
      {/* Line Numbers */}
      <div className="line-numbers">
        {Array.from({ length: Math.max(lineCount, 20) }, (_, i) => (
          <span key={i + 1} className="line-number">
            {i + 1}
          </span>
        ))}
      </div>

      {/* Text Area */}
      <textarea
        className="code-textarea"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder={`Paste your ${language} code here...\n\nExample:\nfunction add(a, b) {\n  return a - b; // Bug: should be a + b\n}`}
        spellCheck="false"
        autoCapitalize="off"
        autoCorrect="off"
      />
    </div>
  );
}

export default CodeInput;