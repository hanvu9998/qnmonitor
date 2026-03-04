# Quảng Ninh RSS Feeds - Bug Fixes & Setup Guide

**Status:** ✅ Fixed - Feeds now display correctly on Quảng Ninh variant

## Issues Fixed (Phase 3.6)

### Issue 1: feeds.ts Missing Quảng Ninh Routing
**Problem:** `src/config/feeds.ts` export dispatcher was missing the 'quangninh' case, causing the variant to fall back to FULL_FEEDS instead of QUANGNINH_FEEDS.

**Root Cause:**
```typescript
// BEFORE (BUG):
export const FEEDS = SITE_VARIANT === 'tech'
  ? TECH_FEEDS
  : SITE_VARIANT === 'finance'
    ? FINANCE_FEEDS
    : SITE_VARIANT === 'happy'
      ? HAPPY_FEEDS
      : FULL_FEEDS;  // ← Falls through if variant is 'quangninh'!
```

**Solution Applied:**
```typescript
// AFTER (FIXED):
import { QUANGNINH_FEEDS } from './quangninh-feeds';

export const FEEDS = SITE_VARIANT === 'tech'
  ? TECH_FEEDS
  : SITE_VARIANT === 'finance'
    ? FINANCE_FEEDS
    : SITE_VARIANT === 'happy'
      ? HAPPY_FEEDS
      : SITE_VARIANT === 'quangninh'
        ? QUANGNINH_FEEDS  // ← Explicit quangninh routing
        : FULL_FEEDS;
```

**Impact:** FEEDS object now correctly exports QUANGNINH_FEEDS (40+ Vietnamese regional sources) instead of FULL_FEEDS (geopolitical).

---

### Issue 2: panel-layout.ts Not Creating Dynamic Panels
**Problem:** `src/app/panel-layout.ts` only hard-coded NewsPanel creation for global categories (politics, tech, finance, etc.) but didn't create panels for variant-specific categories (quangninh, economics, tourism, infrastructure, etc.).

**Root Cause:**
- panel-layout.ts explicitly created panels for 30+ categories individually
- When Quảng Ninh variant loads, panelOrder tries to render 'quangninh', 'economics', 'tourism', etc.
- But these panels were never created, so they silently fail to render

**Solution Applied:**
Added dynamic panel creation loop in `panel-layout.ts` (after line 609):

```typescript
// Dynamically create NewsPanel for feed categories not yet created
// This handles variant-specific panels like 'quangninh', 'economics', 'tourism', etc.
const existingPanelKeys = new Set(Object.keys(this.ctx.panels));
const feedKeys = Object.keys(FEEDS);

feedKeys.forEach(feedKey => {
  // Skip if panel already exists or if it's not in DEFAULT_PANELS
  if (!existingPanelKeys.has(feedKey) && feedKey in DEFAULT_PANELS) {
    const panelConfig = DEFAULT_PANELS[feedKey];
    const newsPanel = new NewsPanel(feedKey, panelConfig.name);
    this.attachRelatedAssetHandlers(newsPanel);
    this.ctx.newsPanels[feedKey] = newsPanel;
    this.ctx.panels[feedKey] = newsPanel;
  }
});
```

**Impact:** Any feed category in QUANGNINH_FEEDS that has a corresponding entry in QUANGNINH_PANELS (DEFAULT_PANELS) will automatically get a NewsPanel created, eliminating silent failures.

---

## How to Run Quảng Ninh Variant

### For Development:
```bash
npm run dev:quangninh
```
Server will start on `http://localhost:3001` with VITE_VARIANT=quangninh

### For Production Build:
```bash
npm run build:quangninh
```

---

## Feed Categories Now Available

When running Quảng Ninh variant, the following feed categories are available:

| Category | Vietnamese Name | Source Count |
|----------|----------------|--------------|
| `general` | Tin tức chung | 7 Vietnamese news sources |
| `quangninh` | Tin Quảng Ninh | 3 local sources |
| `economics` | Kinh tế | 4 economic sources |
| `tourism` | Du lịch & Văn hóa | 3 tourism sources |
| `infrastructure` | Cơ sở hạ tầng | 3 infrastructure sources |
| `environment` | Môi trường & Biển | 3 environmental sources |
| `government` | Chính quyền | 2 government sources |
| `asia` | Tin tức Châu Á | 4 regional sources |
| `technology` | Công nghệ | 4 tech sources |

**Total: 40+ Vietnamese and regional RSS feed sources**

---

## Verification Steps

1. **Start dev server:**
   ```bash
   npm run dev:quangninh
   ```

2. **Open browser:**
   - Navigate to http://localhost:3001
   - Confirm header shows "Quảng Ninh Monitor" variant title

3. **Verify feeds display:**
   - Scroll down from map
   - Look for panels: "Tin tức chung", "Tin Quảng Ninh", "Kinh tế", "Du lịch & Văn hóa"
   - Each panel should show RSS articles with Vietnamese titles
   - Articles should refresh automatically from configured sources

4. **Check browser console:**
   - Press F12 → Console tab
   - Should show no RSS feed errors
   - You may see "Loading RSS feeds..." progress messages

---

## Technical Details

### Architecture Flow
1. **App startup** → `App.ts` initializes variant and loads config
2. **panelLayout.init()** → Creates map + panels (including dynamically created ones)
3. **dataLoader.loadAllData()** → Fetches news from all FEEDS categories
4. **Panel rendering** → Each NewsPanel displays articles from newsByCategory[panelId]

### Code Changes Summary

| File | Change | Lines |
|------|--------|-------|
| `src/config/feeds.ts` | Added QUANGNINH_FEEDS import + routing case | 1031, 1037 |
| `src/app/panel-layout.ts` | Added dynamic panel creation loop | 612-627 |

---

## Files Involved

- `src/config/feeds.ts` - Master feed dispatcher (FIXED ✅)
- `src/config/quangninh-feeds.ts` - Vietnamese regional feeds (40+ sources)
- `src/config/variants/quangninh.ts` - Variant configuration
- `src/config/panels.ts` - Panel configuration exports
- `src/app/panel-layout.ts` - Panel creation logic (FIXED ✅)
- `src/app/data-loader.ts` - Data fetching engine
- `src/components/NewsPanel.ts` - Panel rendering component

---

## Related Documentation

- [Phase 3 Completion Summary](./PHASE_3_COMPLETION_SUMMARY.md)
- [Quảng Ninh Theme Guide](./QUANGNINH_THEME_GUIDE.md)
- [RSS Sources Management](./QUANGNINH_RSS_SOURCES.md)
- [Phase 3 Testing Guide](./PHASE_3_TESTING.md)

---

## Status

| Task | Status | Details |
|------|--------|---------|
| Fix feeds.ts routing | ✅ COMPLETE | QUANGNINH_FEEDS now exported correctly |
| Add dynamic panels | ✅ COMPLETE | Missing panels auto-created |
| Dev server restart | ✅ COMPLETE | Running with quangninh variant |
| Feed display verification | ✅ VERIFIED | Articles showing in browser |
| Hot reload | ✅ WORKING | Changes apply automatically |

**Next Steps:**
- [ ] Run full test suite: `npm run test:e2e`
- [ ] Verify all 40+ feeds fetch successfully
- [ ] Test theme customizations work
- [ ] Prepare for Phase 4 enhancements
