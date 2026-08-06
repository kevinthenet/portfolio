#!/usr/bin/env node
// Generates the site's 1200x630 OG/Twitter share cards.
//
// Usage:
//   node generate.mjs            regenerate every card
//   node generate.mjs --only rowland-ai,pvcase   regenerate just these ids
//
// See README.md for the design system this mirrors and the on-disk
// output conventions.

import { chromium } from 'playwright';
import matter from 'gray-matter';
import sharp from 'sharp';
import {
  readFileSync,
  readdirSync,
  writeFileSync,
  mkdirSync,
  rmSync,
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../..');
const PUBLIC_DIR = path.join(REPO_ROOT, 'public');
const TEMPLATE = readFileSync(path.join(__dirname, 'template.html'), 'utf-8');

const onlyArg = process.argv.find((a) => a.startsWith('--only'));
const onlyIds = onlyArg ? onlyArg.split('=')[1].split(',') : null;

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Headline is JetBrains Mono at a fixed size, so long names need a smaller
// size to stay inside the 1020px content column without wrapping oddly.
function headlineSize(headline) {
  if (headline.length > 18) return 58;
  if (headline.length > 12) return 66;
  return 74;
}

function metricSize(metric) {
  return metric.length > 55 ? 24 : 27;
}

function readFrontmatter(dir) {
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const id = f.replace(/\.md$/, '');
      const { data } = matter(readFileSync(path.join(dir, f), 'utf-8'));
      return { id, data };
    });
}

function buildCards() {
  const cards = [];

  // Site-wide personal card — not sourced from a content collection.
  cards.push({
    id: 'site-wide',
    outputPath: path.join(PUBLIC_DIR, 'og-image.png'),
    boot1: 'identity verified: kevin castro',
    boot2: '7yrs exp: healthcare / energy / conversational AI',
    headline: 'Kevin Castro',
    metric: 'Senior Software Engineer',
    tagline:
      'Secure, AI-powered, and data-intensive systems<br/>for high-stakes, regulated domains.',
    prompt: 'whoami',
  });

  const projects = readFrontmatter(
    path.join(REPO_ROOT, 'src/content/projects')
  );
  for (const { id, data } of projects) {
    const boot2 = data.date ? `${data.tag} / ${data.date}` : data.tag;
    cards.push({
      id: `project:${id}`,
      outputPath: path.join(PUBLIC_DIR, 'og', `${id}.png`),
      boot1: `project verified: ${data.name}`,
      boot2,
      headline: data.name,
      metric: data.subtitle,
      tagline: data.blurb,
      prompt: `cd work/${id}`,
    });
  }

  const posts = readFrontmatter(path.join(REPO_ROOT, 'src/content/blog'));
  for (const { id, data } of posts) {
    const year = data.publishDate
      ? new Date(data.publishDate).getFullYear()
      : undefined;
    const boot2 = [data.tags?.[0], year].filter(Boolean).join(' / ');
    cards.push({
      id: `blog:${id}`,
      outputPath: path.join(PUBLIC_DIR, 'og', 'blog', `${id}.png`),
      boot1: `post verified: ${data.title}`,
      boot2: boot2 || 'blog',
      headline: data.title,
      // Blog frontmatter only has one descriptive field (summary), unlike
      // projects (subtitle + blurb) — use tags for the green metric line
      // instead of repeating summary in both slots.
      metric: (data.tags ?? []).slice(0, 3).join(' · ') || 'blog',
      tagline: data.summary,
      prompt: `cat blog/${id}.md`,
    });
  }

  return cards;
}

async function render(browser, card) {
  const html = TEMPLATE.replaceAll('__BOOT_1__', escapeHtml(card.boot1))
    .replaceAll('__BOOT_2__', escapeHtml(card.boot2))
    .replaceAll('__HEADLINE__', escapeHtml(card.headline))
    .replaceAll('__METRIC__', escapeHtml(card.metric))
    .replaceAll('__TAGLINE__', card.tagline) // may legitimately contain a <br/>
    .replaceAll('__PROMPT__', escapeHtml(card.prompt))
    .replaceAll('__HEADLINE_SIZE__', String(headlineSize(card.headline)))
    .replaceAll('__METRIC_SIZE__', String(metricSize(card.metric)));

  const tmpHtmlPath = path.join(
    __dirname,
    `.tmp-${path.basename(card.outputPath)}.html`
  );
  writeFileSync(tmpHtmlPath, html);

  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 2, // supersample, then downscale with sharp for crisper text
  });
  await page.goto('file://' + tmpHtmlPath);
  await page.waitForTimeout(300);
  const rawPath = tmpHtmlPath.replace(/\.html$/, '.raw.png');
  await page.screenshot({ path: rawPath });
  await page.close();
  rmSync(tmpHtmlPath);

  mkdirSync(path.dirname(card.outputPath), { recursive: true });
  await sharp(rawPath)
    .resize(1200, 630, { kernel: 'lanczos3' })
    .toFile(card.outputPath);
  rmSync(rawPath);
}

async function main() {
  const cards = buildCards().filter((c) => {
    if (!onlyIds) return true;
    const shortId = c.id.split(':').pop();
    return onlyIds.includes(shortId);
  });

  if (cards.length === 0) {
    console.log('No matching cards to generate.');
    return;
  }

  const browser = await chromium.launch();
  for (const card of cards) {
    await render(browser, card);
    console.log(
      'generated',
      card.id,
      '->',
      path.relative(REPO_ROOT, card.outputPath)
    );
  }
  await browser.close();
}

main();
