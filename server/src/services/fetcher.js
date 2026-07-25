const TIMEOUT_MS = 10_000;
import { validateUrl } from "../utils/validateUrl.js";

export class InvalidUrlError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidUrlError";
  }
}

export class TimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = "TimeoutError";
  }
}

export class NonHtmlResponseError extends Error {
  constructor(message) {
    super(message);
    this.name = "NonHtmlResponseError";
  }
}

export class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = "NetworkError";
  }
}


export async function fetchPage(rawUrl) {
  const url = validateUrl(rawUrl);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const startTime = Date.now();
  let response;

  try {
    response = await fetch(url.toString(), {
      signal: controller.signal,
      redirect: "follow",
    });
  } catch (err) {
    if (err.name === "AbortError") {
      throw new TimeoutError(
        `Request to "${rawUrl}" timed out after ${TIMEOUT_MS / 1000} seconds.`
      );
    }
    throw new NetworkError(
      `Failed to reach "${rawUrl}": ${err.message}`
    );
  } finally {
    clearTimeout(timeoutId);
  }

  const responseTimeMs = Date.now() - startTime;

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) {
    throw new NonHtmlResponseError(
      `Expected an HTML page but received content-type "${contentType || "unknown"}".`
    );
  }

  const html = await response.text();

  return {
    html,
    status: response.status,
    responseTimeMs,
  };
}