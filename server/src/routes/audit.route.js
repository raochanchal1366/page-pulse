import { Router } from "express";
import {
  fetchPage,
  InvalidUrlError,
  TimeoutError,
  NonHtmlResponseError,
  NetworkError,
} from "../services/fetcher.js";
import { parseHtml } from "../services/parser.js";

const router = Router();

router.post("/audit", async (req, res, next) => {
  const { url } = req.body;

  try {
    const { html, status, responseTimeMs } = await fetchPage(url);
    const { title, metaDescription, h1Count, imagesMissingAlt, wordCount } =
      parseHtml(html);

    res.status(200).json({
      status,
      responseTimeMs,
      title,
      metaDescription,
      h1Count,
      imagesMissingAlt,
      wordCount,
    });
  } catch (err) {
    next(err);
  }
});

export default router;