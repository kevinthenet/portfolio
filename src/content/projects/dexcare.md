---
name: DexCare
subtitle: Near-native relational performance from a hybrid object store
tag: Healthcare
date: '2023'
blurb: Hybrid object storage inside a relational database.
link: https://www.dexcare.com/
technology_used:
  ['Node.js', 'TypeScript', 'OpenAPI', 'PostgreSQL', 'Amazon RDS']
skills: ['Database Design', 'API Development']
photos:
  [
    {
      image: '../../assets/projects/dexcare/dexcare-landing-page.png',
      alt: 'DexCare website landing page with header text: "The control center for patient access"',
    },
    {
      image: '../../assets/projects/dexcare/dexcare-product-search-schedule.png',
      alt: 'DexCare Search & Schedule product page hero showing a patient search and appointment time-selection mockup',
    },
    {
      image: '../../assets/projects/dexcare/dexcare-product-pathway-diagram.png',
      alt: 'DexCare "One Doorway" diagram showing homepage, services, providers, articles, locations, and conditions pages all connecting to a single "Care, confirmed" booking flow',
    },
  ]
---

A short-term engagement solving a specific systems-design problem: give a medical scheduling platform the flexible schema of a non-relational store without losing relational query performance. I architected a hybrid object-storage layer inside DexCare's relational database architecture, delivering performance comparable to native relational queries within the four-month contract window.
