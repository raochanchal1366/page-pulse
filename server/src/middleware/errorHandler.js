import {
  InvalidUrlError,
  TimeoutError,
  NonHtmlResponseError,
  NetworkError,
} from "../services/fetcher.js";

export function errorHandler(err, req, res, next) {
  if (err instanceof InvalidUrlError) {
    return res.status(400).json({ error: "INVALID_URL", message: err.message });
  }
  if (err instanceof TimeoutError) {
    return res.status(408).json({ error: "TIMEOUT", message: err.message });
  }
  if (err instanceof NonHtmlResponseError) {
    return res.status(422).json({ error: "NON_HTML_RESPONSE", message: err.message });
  }
  if (err instanceof NetworkError) {
    return res.status(502).json({ error: "NETWORK_ERROR", message: err.message });
  }

  res.status(500).json({ error: "INTERNAL_ERROR", message: "Something went wrong." });
}