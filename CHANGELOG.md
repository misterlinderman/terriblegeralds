# Changelog

All notable changes to this project are documented here.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Planned
- Google Analytics re-integration
- Mobile hamburger navigation parity with Astro site
- Email notifications for new contact inquiries

### Added
- `npm run seed:events` script to upsert sample events (Barry O's Tavern)
- Improved admin events form with address, auto-slug, and map/event page URLs

---

## [0.1.0] - 2026-06-01

### Added
- MERN monorepo scaffold adapted from [baseapp](https://github.com/misterlinderman/baseapp)
- Public React pages: Home, Events, Comeback City Pizza
- Admin dashboard with Auth0-protected CRUD for events, menu, FAQs, site content, inquiries
- Express API with MongoDB models replacing Storyblok and getform.io
- Seed script for menu, FAQ, and site copy from legacy Astro HTML
- Legacy Astro build preserved at `legacy/astro-dist/`
- Documentation: architecture, deployment, migration, versioning
- Cursor rules and `AGENTS.md` for AI-assisted development
- Vercel and Railway deployment configuration

### Changed
- Contact form now posts to internal API instead of getform.io
- Events loaded from MongoDB instead of Storyblok CDN

[Unreleased]: https://github.com/misterlinderman/terriblegeralds/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/misterlinderman/terriblegeralds/releases/tag/v0.1.0
