const DEFAULT_BACKEND_URL =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_API_URL) ||
  "https://api.shahidur.dev";

export const DEFAULT_PROJECT_PLACEHOLDER = "/assets/carrent.png";
export const DEFAULT_AVATAR_PLACEHOLDER = "/images/portrait.jpg";

export const getBackendBaseUrl = () => {
  return DEFAULT_BACKEND_URL.replace(/\/api\/?$/, "").replace(/\/+$/, "");
};

/**
 * Resolves an image URL:
 * - If already absolute (http:// or https://), returns it as is.
 * - If local static asset (/assets/... or /images/...), returns it as is.
 * - If relative backend path (e.g. /uploads/image.png), prefixes it with backend base URL.
 * - If null or invalid, returns the fallback image.
 */
export const resolveImageUrl = (url, fallback = null) => {
  if (!url || typeof url !== "string") return fallback;
  const trimmed = url.trim();
  if (!trimmed) return fallback;

  // Absolute URLs
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  // Local static files in public directory
  if (trimmed.startsWith("/assets/") || trimmed.startsWith("/images/")) {
    return trimmed;
  }

  // Relative backend URLs (e.g. /uploads/image.png)
  const baseUrl = getBackendBaseUrl();
  return `${baseUrl}${trimmed.startsWith("/") ? "" : "/"}${trimmed}`;
};
