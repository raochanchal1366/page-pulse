import * as cheerio from "cheerio";

export function parseHtml(html) {
  const $ = cheerio.load(html);

  const title = $("title").first().text().trim() || null;

  const metaDescription =
    $('meta[name="description"]').attr("content")?.trim() || null;

  const h1Count = $("h1").length;

  let imagesMissingAlt = 0;
  $("img").each((_, el) => {
    const alt = $(el).attr("alt");
    if (alt === undefined || alt.trim() === "") {
      imagesMissingAlt += 1;
    }
  });

  const bodyText = $("body").text().replace(/\s+/g, " ").trim();
  const wordCount = bodyText.length > 0 ? bodyText.split(" ").length : 0;

  return {
    title,
    metaDescription,
    h1Count,
    imagesMissingAlt,
    wordCount,
  };
}