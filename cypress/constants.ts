// routes
const availablePages = ['HOME', 'ABOUT_ME', 'BLOG', 'WORK'] as const;
type PageName = (typeof availablePages)[number];

type Page = {
  route: string;
  title: string;
  friendlyText: string;
};

export const HOME: Page = {
  route: '/',
  title: 'Kevin Castro // Senior Software Engineer',
  friendlyText: 'home',
};

export const ABOUT_ME: Page = {
  route: '/about-me',
  title: 'Kevin Castro // About Me',
  friendlyText: 'about',
};

export const BLOG: Page = {
  route: '/blog',
  title: 'Kevin Castro // Blog',
  friendlyText: 'blog',
};

export const WORK: Page = {
  route: '/work',
  title: 'Kevin Castro // Work',
  friendlyText: 'work',
};

export const PAGES: Record<PageName, Page> = {
  HOME,
  ABOUT_ME,
  BLOG,
  WORK,
};

// content collections
// use this as a workaround to the module `astro:content` generated in .astro/ not being accessible in webpack headless browser runtime
export const BLOG_DIR = 'src/content/blog';
export const PROJECTS_DIR = 'src/content/projects';
export const TEST_PROJECT_SLUG = 'jubel-health';
export const TEST_PROJECT_NAME = 'Jubel Health';

// the ordering enforced on /work: latest engagement to oldest, with
// Castro Home Builders (no formal dates) pinned last
export const FIRST_WORK_SLUG = 'rowland-ai';
export const LAST_WORK_SLUG = 'castro-home-builders';
