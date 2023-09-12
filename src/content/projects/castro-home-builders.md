---
name: Castro Home Builders
subtitle: Static site for a Bay Area General Contractor
link: https://castrohomebuilders.com/
technology_used: ['Javascript', 'Astro', 'TailwindCSS', 'AlpineJS', 'FormKeep']
skills: ['Website Development', 'CI/CD']
photos:
  [
    {
      url: '/chb-navigation.gif',
      alt: 'GIF of a user scrolling through Castro Home Builders home page and navigating to contact page',
    },
    {
      url: '/chb-home-page-desktop.png',
      alt: 'Castro Home Builders home page on desktop',
    },
    {
      url: '/chb-home-page-mobile.png',
      alt: 'Castro Home Builders home page on mobile',
    },
    {
      url: '/chb-contact-page-submission.gif',
      alt: 'GIF of a user submitting a Castro Home Builders Contact page submission, animated',
    },
  ]
---

Castro Home Builders is my father's general contracting business. I had created a website a while back and wanted to create a new web page for his business to help gain more customers and improve his positioning online. Included as part of this I wanted to do a soft rebrand of the company to revitalize it's look in-person and online.

The first part of the effort was porting over the old static website to a new Astro project. I leveraged existing themes to spin up the site and worked on updating the text to lend itself more towards a call to action: users should reach out to the company and get a free estimate of work. I created a simple landing page with some information that they can peruse, such as services offered, and a contact page that would make things as easy as possible to get in touch with the company.

The second part of the effort involved lowering the cost of hosting and creating a workflow that enabled as little intervention on the site as possible to convert users. For hosting, I opted for free GitHub Pages hosting as it allowed for me to leverage the free GitHub Actions minutes and simplify creating the CI/CD pipeline for this site. For creating an email workflow from the contact page, I used FormKeep.

As far as the rebranding, I opted to keep the colors the same, and maintain some cohesion in the logo itself, but modernized the logo for a newer, sleeker look. This would help distinguish Castro Home Builders from its peers in the construction space, whose sites tend to be less maintained and do not look as modern.

Overall, this project seems to have worked out well and will bear fruit in the long term.
