---
# layout: ../../layouts/BaseLayout.astro
title: Creating a portfolio with Astro
summary: A retrospective on how web development has improved from my own perspective
publishDate: 2023-05-08
tags: ["development", "astro"]
---

## Let's create some requirements

This is my second time around creating a portfolio from scratch. I had previously created [a repository](https://github.com/kevinthemself/castrokevin.com) for and hosted my portfolio by using simple HTML/JS/CSS and added some fanciness using special fonts, CSS Libraries, etc. I was apparently obsessed with parallax background images that scrolled, which is funny looking back now. I didn't have as much of an eye for design, but, alas, I was young and intrepid, and in my defense parallax scrolling images were _all the rage_ when I was looking at good examples of engineering portfolios.

<!-- Add some images of the ol' castrokevin.com portfolio here -->

I wanted to do a couple things differently this time around:

1. Create my portfolio while learning something new
2. Host my portfolio as cheaply as possible
3. Facilitate creating a blog hosted at the same place in my portfolio (where _fingers-crossed_ you're reading this right now!)
4. Keep things as neat as possible

## Learn some new stuff!

```astro
---
import BaseLayout from "../layouts/Base.astro";
import { request } from "@octokit/request";

// get all the blog posts from my public gist
const blog = await request("GET /gists/<my-gist-id>");
const posts: Object = blog.data.files;
---

<BaseLayout title="Blog">
  <main>
    <h1>Blog</h1>
    {
      Object.entries(posts).map(([title, data]) => (
        <>
          <h2>{title}</h2>
          <p>{data.content}</p>
        </>
      ))
    }
  </main>
</BaseLayout>
```
