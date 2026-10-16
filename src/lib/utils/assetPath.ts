/**
 * Helper to ensure static public assets (images, icons, etc.)
 * resolve correctly both on root deployments and subpath deployments (e.g. GitHub Pages /olenna).
 */
export function assetPath(path: string): string {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  // If basePath is already present, do not duplicate
  if (basePath && cleanPath.startsWith(basePath)) {
    return cleanPath;
  }

  return `${basePath}${cleanPath}`;
}
