function UrlForm({
  url,
  setUrl,
  loading,
  error,
  inputRef,
  handleAnalyze,
}) {
  return (
    <form
      className="input-row"
      onSubmit={(e) => {
        e.preventDefault();
        handleAnalyze();
      }}
    >
      <label htmlFor="url-input" className="visually-hidden">
        Website URL
      </label>

      <input
        id="url-input"
        ref={inputRef}
        type="text"
        className="url-input"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={loading}
        aria-invalid={Boolean(error)}
        autoComplete="url"
      />

      <button
        type="submit"
        className="analyze-btn"
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="spinner"></span>
            Analyzing...
          </>
        ) : (
          "Analyze"
        )}
      </button>
    </form>
  );
}

export default UrlForm;