import { parseHtml } from "../src/services/parser.js";

describe("parseHtml", () => {
  test("extracts the page title", () => {
    const html = "<html><head><title>My Page</title></head><body></body></html>";
    const result = parseHtml(html);
    expect(result.title).toBe("My Page");
  });

  test("extracts the meta description", () => {
    const html = `
      <html>
        <head>
          <meta name="description" content="A great page about testing.">
        </head>
        <body></body>
      </html>
    `;
    const result = parseHtml(html);
    expect(result.metaDescription).toBe("A great page about testing.");
  });

  test("counts H1 tags", () => {
    const html = `
      <html>
        <body>
          <h1>First</h1>
          <h1>Second</h1>
          <h2>Not an H1</h2>
        </body>
      </html>
    `;
    const result = parseHtml(html);
    expect(result.h1Count).toBe(2);
  });

  test("counts images missing alt attributes", () => {
    const html = `
      <html>
        <body>
          <img src="a.png" alt="A description">
          <img src="b.png" alt="">
          <img src="c.png">
        </body>
      </html>
    `;
    const result = parseHtml(html);
    expect(result.imagesMissingAlt).toBe(2);
  });

  test("counts visible words correctly", () => {
    const html = "<html><body><p>The quick brown fox jumps</p></body></html>";
    const result = parseHtml(html);
    expect(result.wordCount).toBe(5);
  });

  test("handles missing title", () => {
    const html = "<html><head></head><body><p>No title here</p></body></html>";
    const result = parseHtml(html);
    expect(result.title).toBeNull();
  });

  test("handles missing meta description", () => {
    const html = "<html><head><title>Only Title</title></head><body></body></html>";
    const result = parseHtml(html);
    expect(result.metaDescription).toBeNull();
  });

  test("handles empty HTML", () => {
    const html = "";
    const result = parseHtml(html);
    expect(result).toEqual({
      title: null,
      metaDescription: null,
      h1Count: 0,
      imagesMissingAlt: 0,
      wordCount: 0,
    });
  });
});