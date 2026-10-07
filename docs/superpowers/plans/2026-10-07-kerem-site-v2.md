# Kerem site v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans (owner chose Native).

**Goal:** Rebuild the page per v2 spec: dark gallery look, serif display, scroll/stagger animations, filters, The Loupe; keep the lightbox engine.
**Architecture:** index.html (content) · style.css (tokens, layout, motion) · lightbox.js (unchanged engine, renamed) · effects.js (progressive enhancements). No build.
**Spec:** docs/superpowers/specs/2026-10-07-kerem-site-v2-design.md

## Global Constraints
See spec §Constraints and §Design system. All verification is in-browser (ruling in ledger).

## Review Focus
1. Reduced-motion: no element left at opacity 0 (reveal must default visible when JS absent or RM on).
2. Filter leaves ≥1 tile visible per category; lightbox indices stay correct after filtering (open hidden tile never happens).
3. Loupe on touch: dragging inside image must not scroll page; leaving image hides loupe.
4. Nav hide-on-scroll never hides while lightbox open or at top of page.
5. Fonts fail to load → system serif/sans fallback keeps layout (no FOIT longer than 100ms: `font-display: swap`).

### Task 1: HTML v2 — all sections + data attributes. Verify: all ids/classes present, 11 images 200, console clean. Commit.
### Task 2: CSS v2 — tokens, fonts, hero, statement, grid+filters, loupe, process, about, book, footer, reveal states, RM/RT fallbacks. Verify: desktop+375 screenshots, no hscroll, RM: everything visible. Commit.
### Task 3: Rename main.js→lightbox.js (git mv), add effects.js: hero stagger, reveal observer, nav hide, filters, loupe, parallax. Verify: each behaviour in browser + lightbox regression. Commit.
### Task 4: README placeholders list. Commit.
