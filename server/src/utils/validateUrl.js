import { InvalidUrlError } from "../services/fetcher.js";

export function validateUrl(rawUrl) {
  let parsed;
  try {
    parsed = new URL(rawUrl);
  } catch {
    throw new InvalidUrlError(`"${rawUrl}" is not a valid URL.`);
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new InvalidUrlError(
      `Unsupported protocol "${parsed.protocol}". Only http and https are allowed.`
    );
  }

  return parsed;
}