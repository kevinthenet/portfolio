// routes
const availablePages = [
  "HOME",
  "ABOUT_ME",
  "BLOG",
  "PROJECTS",
  "SKILLS",
] as const;
type PageName = (typeof availablePages)[number];

type Page = {
  route: string;
  title: string;
  friendlyText: string;
};

export const HOME: Page = {
  route: "/",
  title: "Kevin Castro // Portfolio",
  friendlyText: "Home",
};
export const ABOUT_ME: Page = {
  route: "/about-me",
  title: "Kevin Castro // About Me",
  friendlyText: "About Me",
};
export const BLOG: Page = {
  route: "/blog",
  title: "Kevin Castro // Blog",
  friendlyText: "Blog",
};
export const PROJECTS: Page = {
  route: "/projects",
  title: "Kevin Castro // Projects",
  friendlyText: "Projects",
};
export const SKILLS: Page = {
  route: "/skills",
  title: "Kevin Castro // Skills",
  friendlyText: "Skills",
};
export const PAGES: Record<PageName, Page> = {
  HOME,
  ABOUT_ME,
  BLOG,
  PROJECTS,
  SKILLS,
};

// content collections
// use this as a possible workaround to the types generated in .astro not being accessible
export const BLOG_DIR = "src/content/blog";
export const PROJECTS_DIR = "src/content/projects";

// artifacts
export const RESUME_FILE_NAME = "Kevin-Castro-Resume.pdf";
