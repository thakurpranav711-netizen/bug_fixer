// ============================================
// App.js – Main App Component
// Puts everything together
// ============================================

import React, { useState } from "react";
import axios from "axios";

import Header from "./components/Header.js";
import CodeInput from "./components/CodeInput.js";
import LanguagePicker from "./components/LanguagePicker.js";
import ResultsBox from "./components/ResultsBox.js";

import "./App.css";

function App() {
  // ---------- STATE ----------
  const [code, setCode] = useState("");            // user‑entered code
  const [language, setLanguage] = useState("javascript");
  const [results, setResults] = useState("");      // AI response
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------- CHECK BUGS ----------
  const handleCheckBugs = async () => {
    if (!code.trim()) {
      setError("⚠️ Please paste some code first!");
      return;
    }

    setError("");
    setResults("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5500/api/check-bugs",
        { code, language }
      );

      if (response.data.success) {
        setResults(response.data.result);
      } else {
        setError(response.data.error || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
          "❌ Cannot connect to server. Make sure backend is running!"
      );
    } finally {
      setLoading(false);
    }
  };

  // ---------- CLEAR ----------
  const handleClear = () => {
    setCode("");
    setResults("");
    setError("");
  };

  // ---------- RENDER ----------
  return (
    <div className="app">
      <Header />

      <main className="main-content">
        {/* LEFT – INPUT */}
        <div className="input-section">
          <div className="section-top-bar">
            <LanguagePicker language={language} setLanguage={setLanguage} />
            <div className="button-group">
              <button
                className="clear-button"
                onClick={handleClear}
                disabled={loading}
              >
                🗑️ Clear
              </button>
              <button
                className="check-button"
                onClick={handleCheckBugs}
                disabled={loading || !code.trim()}
              >
                {loading ? "🔄 Checking…" : "🔍 Check for Bugs"}
              </button>
            </div>
          </div>

          <CodeInput code={code} setCode={setCode} language={language} />
        </div>

        {/* RIGHT – RESULTS */}
        <div className="results-section">
          <h2 className="results-title">📋 Results</h2>

          {error && <div className="error-box">{error}</div>}

          {loading && (
            <div className="loading-box">
              <div className="spinner"></div>
              <p>AI is analyzing your code…</p>
            </div>
          )}

          {results && !loading && <ResultsBox results={results} />}

          {!results && !loading && !error && (
            <div className="empty-state">
              <p className="empty-icon">🐛</p>
              <p>Paste your code on the left and click "Check for Bugs"</p>
              <p className="empty-sub">
                AI will analyze your code and find issues
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;