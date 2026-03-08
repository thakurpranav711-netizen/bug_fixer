// ============================================
// Header.js - Top Header Bar
// Shows app title and description
// ============================================

import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">🐛 AI Bug Checker</h1>
        <p className="header-subtitle">
          Paste your code → Pick a language → Get instant bug reports from AI
        </p>
      </div>
    </header>
  );
}

export default Header;