/**
 * Rewrite internal 127.0.0.1 URLs from PHP-FPM responses to the public endpoint.
 *
 * Bagisto PHP double-encodes the baseImage field (json_encode inside json_encode),
 * producing strings with literal \/ sequences. Rather than fighting JSON escaping
 * levels, we walk the parsed object tree and replace URLs at the string value level.
 */

const OLD_ORIGIN = "http://127.0.0.1/live";
const OLD_ORIGIN_ESCAPED = "http:\\/\\/127.0.0.1\\/live";

function getPublicOrigin(): string {
  return (process.env.NEXT_PUBLIC_BAGISTO_ENDPOINT || "").replace(/\/$/, "");
}

function replaceInString(str: string, publicOrigin: string): string {
  const escapedPublic = publicOrigin.replace(/\//g, "\\/");
  return str.replaceAll(OLD_ORIGIN_ESCAPED, escapedPublic).replaceAll(OLD_ORIGIN, publicOrigin);
}

function deepReplace(obj: unknown, publicOrigin: string): unknown {
  if (typeof obj === "string") {
    if (obj.includes("127.0.0.1")) {
      return replaceInString(obj, publicOrigin);
    }
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(item => deepReplace(item, publicOrigin));
  }
  if (obj && typeof obj === "object") {
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(obj)) {
      result[key] = deepReplace((obj as Record<string, unknown>)[key], publicOrigin);
    }
    return result;
  }
  return obj;
}

export function rewriteInternalUrls<T>(data: T): T {
  if (typeof window !== "undefined") return data;
  const publicOrigin = getPublicOrigin();
  if (!publicOrigin) return data;
  return deepReplace(data, publicOrigin) as T;
}
