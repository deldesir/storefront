/**
 * Rewrite internal 127.0.0.1 URLs from PHP-FPM responses.
 *
 * Bagisto PHP (via fastcgi_pass) builds asset URLs with http://127.0.0.1.
 * Next.js Image blocks fetching from private IPs (SSRF protection).
 * Even rewriting to the public domain can fail if the server's /etc/hosts
 * maps the domain back to 127.0.0.1 (common in IIAB deployments).
 *
 * Solution: strip the origin entirely, producing relative paths like
 * /live/storage/... or /live/cache/... that Next.js serves locally.
 *
 * For nested JSON strings (e.g. baseImage), we also handle the escaped
 * \/ variant that survives PHP's double json_encode.
 */

const OLD_ORIGIN = "http://127.0.0.1/live";
const OLD_ORIGIN_ESCAPED = "http:\\/\\/127.0.0.1\\/live";

function getBasePath(): string {
  return process.env.NEXT_BASE_PATH || "/live";
}

function replaceInString(str: string, basePath: string): string {
  const escapedBase = basePath.replace(/\//g, "\\/");
  return str.replaceAll(OLD_ORIGIN_ESCAPED, escapedBase).replaceAll(OLD_ORIGIN, basePath);
}

function deepReplace(obj: unknown, basePath: string): unknown {
  if (typeof obj === "string") {
    if (obj.includes("127.0.0.1")) {
      return replaceInString(obj, basePath);
    }
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(item => deepReplace(item, basePath));
  }
  if (obj && typeof obj === "object") {
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(obj)) {
      result[key] = deepReplace((obj as Record<string, unknown>)[key], basePath);
    }
    return result;
  }
  return obj;
}

export function rewriteInternalUrls<T>(data: T): T {
  if (typeof window !== "undefined") return data;
  const basePath = getBasePath();
  if (!basePath) return data;
  return deepReplace(data, basePath) as T;
}
