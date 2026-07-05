# Web Phase 9 — `/news` & `/news/:slug`

## Goal

Build the News list page and individual article page.

## Steps

1. Create `src/data/news.ts` — 6+ mock articles with slug, title, excerpt, date, author, image, and content
2. Create `src/components/news/ArticleCard.tsx` — card with image, date, title, excerpt, "Read More" link
3. Create `src/pages/news/NewsListPage.tsx` — hero + article grid
4. Create `src/pages/news/NewsArticlePage.tsx` — hero + full article content
5. Add routes to `src/router.tsx`
6. Build & verify

## Verification

```bash
npm run build
```

## Done

- Created `src/data/news.ts` — 6 mock articles with slug, title, excerpt, date, author, content
- Created `src/components/news/ArticleCard.tsx` — card with image, date, title, excerpt, "Read More" link
- Created `src/pages/news/NewsListPage.tsx` — hero + article grid with empty state
- Created `src/pages/news/NewsArticlePage.tsx` — hero + full article content with 404 fallback
- Added `/news` and `/news/:slug` routes to `src/router.tsx`
- Build: 0 errors
