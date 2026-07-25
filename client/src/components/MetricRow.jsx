function MetricRow({ label, value, badge = false }) {
  return (
    <div className="metric-row">
      <span className="metric-label">{label}</span>

      <span className={badge ? "metric-value badge" : "metric-value"}>
        {value}
      </span>
    </div>
  );
}

export default MetricRow;