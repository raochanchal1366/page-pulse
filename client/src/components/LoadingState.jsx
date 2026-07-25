function LoadingState() {
  return (
    <div className="empty-state loading-state">
      <span className="spinner spinner-lg"></span>

      <p>Fetching and auditing the page...</p>
    </div>
  );
}

export default LoadingState;