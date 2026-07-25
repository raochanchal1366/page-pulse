import { useEffect, useRef, useState } from "react";
import "./App.css";

import UrlForm from "./components/UrlForm";
import LoadingState from "./components/LoadingState";
import ErrorMessage from "./components/ErrorMessage";
import ReportCard from "./components/ReportCard";
import { auditPage } from "./api/auditApi";

function isLikelyValidUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleAnalyze = async () => {
    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      setError("Please enter a URL before analyzing.");
      return;
    }

    if (!isLikelyValidUrl(trimmedUrl)) {
      setError("That doesn't look like a valid URL. Try something like https://example.com.");
      return;
    }

    setLoading(true);
    setError(null);
    setReport(null);

    try {
      const data = await auditPage(trimmedUrl);
      setReport(data);
    } catch (err) {
      setError(err.message || "Couldn't reach the server.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="app">
      <div className="card">
        <h1 className="title">Page Pulse</h1>
        <p className="subtitle">Analyze any webpage in seconds</p>

       <UrlForm
        url={url}
        setUrl={setUrl}
        loading={loading}
        error={error}
        inputRef={inputRef}
        handleAnalyze={handleAnalyze}
      />

        <div aria-live="polite" className="status-region">
          {error && <ErrorMessage message={error} />}

          {loading && <LoadingState />}

          {!error && !loading && !report && (
            <div className="empty-state">
              <p>Enter a URL above and click Analyze to see the report.</p>
            </div>
          )}
        </div>
      </div>

      {report && !loading && (
        <ReportCard report={report} />
      )}
    </div>
  );
}

export default App;