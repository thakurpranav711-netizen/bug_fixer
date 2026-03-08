// ============================================
// LanguagePicker.js - Dropdown to pick language
// User selects what language their code is in
// ============================================

import React from "react";

// List of supported languages
const LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "c", label: "C" },
  { value: "csharp", label: "C#" },
  { value: "typescript", label: "TypeScript" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "html", label: "HTML/CSS" },
  { value: "sql", label: "SQL" },
  { value: "bash", label: "Bash/Shell" },
  { value: "other", label: "Other" },
];

function LanguagePicker({ language, setLanguage }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <label
        htmlFor="language-select"
        style={{ fontSize: "14px", color: "#8b949e", fontWeight: 500 }}
      >
        Language:
      </label>
      <select
        id="language-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{
          background: "#21262d",
          color: "#e6edf3",
          border: "1px solid #30363d",
          padding: "8px 14px",
          borderRadius: "8px",
          fontSize: "14px",
          cursor: "pointer",
          outline: "none",
        }}
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguagePicker;