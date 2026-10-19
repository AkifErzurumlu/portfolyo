# Portfolio Mockup Redesign Implementation Plan

**Goal:** Implement the approved 14 desktop mockups in the existing bilingual Next.js portfolio, preserving its actual project facts and working links/forms.

**Architecture:** Retain the two locale root layouts, project content model and static export. Share native HTML/CSS product preview components across home and case studies. Use the existing approved EA artwork as an illustration asset; do not flatten pages into screenshots.

**Tech Stack:** Next.js 15, React 19, TypeScript, CSS Modules; existing dependencies.

## Global Constraints

- Approved reference images: task outputs/tr-*.png and outputs/en-*.png. Match their porcelain/cobalt/navy palette, sans typography, EA branding, spatial hierarchy and individual project presentation.
- All 14 existing routes and localized metadata remain supported. Locale switching on a project retains the project.
- Karnova preview must show YKS/LGS courses: YKS Turkish, Mathematics, Science, Social Sciences; LGS Turkish, Mathematics, Science, Revolution History, Religion, English. Preview data is illustrative and labeled accordingly.
- Keep actual project ownership, source/demo links, CV downloads, known limitations and negative research outcomes. Never inherit incorrect mockup technology labels.
- Header/footer navigation must reach homepage anchors from any detail route. Responsive to 320px, keyboard access, reduced motion and readable contrast.
- Do not create another set of mockup images. Reuse approved artwork and build readable/selectable interface text with HTML.

## Task 1: Shared previews

- Create components/ProjectVisual.tsx and ProjectVisual.module.css.
- Public interface: default ProjectVisual({ slug, dil, compact? }: { slug: string; dil: Dil; compact?: boolean }).
- Render distinct learning dashboard, timetable, scientific plot, budget dashboard, library catalog and mobile vault visuals. Karnova exam buttons update course progress without navigating the surrounding project link.
- Verify TypeScript and render-level behavior; data belongs to previews, not project claims.

## Task 2: Case studies

- Replace components/ProjeDetay.tsx and its CSS. Add content/design.ts for concise bilingual headlines/lesson copy if useful, without changing content/projeler.ts facts.
- Consume shared ProjectVisual and existing Proje/Dil interfaces.
- Recreate hero, metadata, illustrated process, contribution, results, limitations, lesson, stack and previous/next navigation. Preserve every source/demo link and repo privacy note.
- Keep all six projects distinct while sharing layout primitives. Scientific outcomes and vault limitations stay explicit.

## Task 3: Shell and homepage

- Update global tokens, fonts, header/locale switch, footer, hero, home sections and form styling.
- Add shared Brand and Icon components. Keep existing contact submission behavior.
- Reuse approved EA sculpture artwork through a CSS viewport, not a screenshot page.
- Build two large featured project showcases, four smaller projects, working principles, about, stack and blue contact section.

## Verification and delivery

- Run npm run typecheck and npm run build.
- Check the static export contains all 14 routes, local assets, valid CVs and correct localized links.
- Inspect desktop and mobile in the available browser; check Karnova YKS/LGS toggles and contact required-field behavior without sending messages.
- Review the complete diff for regressions and mockup adherence, address findings, and package a reviewable source/build deliverable. Publish to the existing repository workflow only when the configured access supports it; report deployment status accurately.
