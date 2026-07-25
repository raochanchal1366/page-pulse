import MetricRow from "./MetricRow";

function ReportCard({ report }) {
  return (
    <div className="dashboard">
      <section className="report-section">
        <h2 className="section-title">Page Information</h2>

        <MetricRow
          label="Title"
          value={report.title || "Not found"}
        />

        <MetricRow
          label="Meta Description"
          value={report.metaDescription || "Not found"}
        />
      </section>

      <section className="report-section">
        <h2 className="section-title">Performance</h2>

        <MetricRow
          label="Status"
          value={report.status}
          badge
        />

        <MetricRow
          label="Response Time"
          value={`${report.responseTimeMs} ms`}
        />
      </section>

      <section className="report-section">
        <h2 className="section-title">SEO Analysis</h2>

        <MetricRow
          label="H1 Count"
          value={report.h1Count}
        />

        <MetricRow
          label="Images Missing Alt"
          value={report.imagesMissingAlt}
        />

        <MetricRow
          label="Word Count"
          value={report.wordCount}
        />
      </section>
    </div>
  );
}

export default ReportCard;