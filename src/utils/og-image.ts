import { existsSync } from 'node:fs';
import path from 'node:path';

/**
 * Resolves a per-page OG/share card path (see tools/og-cards/) to itself if
 * the file has actually been generated into public/, or undefined otherwise
 * so the caller can fall back to the site-wide default. A project/post can
 * be published before its card is generated — this keeps that a silent
 * fallback instead of a broken og:image URL.
 */
export function resolveOgImage(publicPath: string): string | undefined {
  const fsPath = path.join(process.cwd(), 'public', publicPath);
  return existsSync(fsPath) ? publicPath : undefined;
}
