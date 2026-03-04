# Phase 3 - Testing & Finalization Checklist

**Status:** IN PROGRESS  
**Variant:** `quangninh`  
**Date:** March 1, 2026

## Step 2: Enhanced Feed + UI/Branding

### ✅ Step 2.1: Official Provincial RSS Sources

**Done:**
- Added placeholder entries for Báo Quảng Ninh (baoquangninh.vn)
- Added placeholder for UBND Quảng Ninh official portal (quangninh.gov.vn)
- Updated SOURCE_RISKS mapping with official sources
- Ready for real RSS feed URLs when available

**To Complete:**
- [ ] Verify actual RSS feed endpoints exist and are valid
- [ ] Test feed aggregation in dev server
- [ ] Monitor feed parsing for encoding/XML issues
- [ ] Add fallback sources if official feeds become unavailable

### ✅ Step 2.2: Theme & Branding Implementation

**Done:**
- Created `src/styles/quangninh-theme.css` with:
  - **Light mode:** Coastal whites + Ha Long Bay ocean blue (RGB: 13, 90, 122)
  - **Dark mode:** Deep ocean tones (RGB: 13, 38, 53)
  - **Accent color:** Emerald green (RGB: 43, 155, 160) for regional identity
  - **Semantic overrides:** Oceanic palette replacing default reds/greens
  - **Panel styling:** Left border accent in teal for Quảng Ninh identity
  - **Responsive adjustments:** Mobile optimizations

**Theme Colors Used:**
```css
Light Mode:
  - Primary accent: #0D5A7A (Ocean blue)
  - Info/Positive: #2B9BA0 (Emerald)
  - Danger: #D45B5B (Muted red)
  - Success: #4DB5A0 (Teal)

Dark Mode:
  - Background: #0D2635 (Deep ocean)
  - Surface: #143847 (Slightly lighter ocean)
  - Accent: #5CDAD3 (Bright cyan)
  - Panel border: #2B5570 (Ocean blue-gray)
```

**Features Implemented:**
- ✅ Regional header styling with ocean blue border
- ✅ Map section rounded corners with subtle border
- ✅ News card left border accent in emerald
- ✅ Control button hover effects with theme color
- ✅ Empty state styling aligned with Quảng Ninh palette
- ✅ Layer toggle accent color (teal)
- ✅ Breadcrumb/navigation styling

**To Complete:**
- [ ] Import quangninh-theme.css in main.ts (DONE)
- [ ] Test theme switching (dark/light) at localhost
- [ ] Verify colors are accessible (WCAG AA contrast)
- [ ] Test on mobile devices
- [ ] Adjust color values if needed for better readability

### 📋 Step 2.3: Comprehensive Testing Checklist

#### TypeScript Compilation
```bash
npm run typecheck
# Expected: ✅ No errors
```
- [ ] All variant types include 'quangninh'
- [ ] MAP_LAYERS interface properly typed
- [ ] FEEDS object imports validate
- [ ] No import/export mismatches

#### Development Server Startup
```bash
npm run dev:quangninh
# Expected: Server on http://localhost:3001 or next available port
```
- [ ] Dev server starts without errors
- [ ] No console errors on page load
- [ ] Network tab shows successful requests
- [ ] CSS loads without 404s

#### Visual Testing - Light Mode
- [ ] **Header:** Ocean blue accent visible
- [ ] **Map:** Ha Long Bay colors display correctly
- [ ] **Panels:** Teal left border appears
- [ ] **Text:** Dark text readable on light backgrounds
- [ ] **Controls:** Map buttons have subtle borders
- [ ] **News cards:** Emerald accent visible on left
- [ ] **Empty states:** Gray placeholder text visible
- [ ] **Inputs:** Light background with visible borders

#### Visual Testing - Dark Mode
- [ ] **Theme toggle:** Sun/moon button works
- [ ] **Background:** Deep ocean color visible
- [ ] **Panels:** Light gray borders visible
- [ ] **Text:** Light text readable on dark backgrounds
- [ ] **Accents:** Bright cyan stands out
- [ ] **Map:** Still readable with dark theme
- [ ] **Controls:** Buttons visible with good contrast

#### Map Functionality
- [ ] **Map loads:** Base layer displays (CARTO/local style)
- [ ] **Default zoom:** Quảng Ninh region visible on first load
- [ ] **Region selector:** Dropdown includes "Quảng Ninh" option
- [ ] **View switching:** Clicking regions updates map
- [ ] **Zoom animation:** Smooth flyTo transition (1000ms)
- [ ] **Zoom controls:** +/- buttons work
- [ ] **Reset button:** Home icon zooms to default region
- [ ] **Map layers:** Toggle controls functional

#### Map Layers Visibility
- [ ] ✅ **AIS:** Port shipping visible (blue circles)
- [ ] ✅ **Weather:** If active, shows weather patterns
- [ ] ✅ **Economic zones:** Trade route areas visible
- [ ] ✅ **Waterways:** Rivers/coastal waters marked
- [ ] ✅ **Natural disasters:** If any, displayed
- [ ] ❌ **Conflicts/Military:** Should NOT appear
- [ ] ❌ **Cyber threats:** Should NOT appear
- [ ] ❌ **Data centers:** Should NOT appear (outside region)

#### RSS Feeds & News Panel
- [ ] **Live News panel loads:** No 404 errors in network tab
- [ ] **Feed categories visible:**
  - [ ] General (VnExpress, Tuổi Trẻ, etc.)
  - [ ] Quảng Ninh (Google News + placeholders)
  - [ ] Economics (trading/business news)
  - [ ] Tourism (Hạ Long, heritage news)
  - [ ] Infrastructure (port/airport/transport)
  - [ ] Environment (climate/maritime)
  - [ ] Government (official announcements)
  - [ ] Asia (international context)
  - [ ] Technology (VnExpress Tech + TechCrunch)
- [ ] **News items render:** Titles, sources, timestamps visible
- [ ] **Source risk indicator:** Low/Medium/High badges show
- [ ] **Article links:** Clickable and open correctly
- [ ] **Feed refresh:** Panel updates regularly

#### Localization
- [ ] **UI Language:** Vietnamese labels appear
  - [ ] "Bản đồ Quảng Ninh" (Map panel)
  - [ ] "Tin tức trực tiếp" (Live News)
  - [ ] "Kinh tế" (Economics)
  - [ ] "Du lịch" (Tourism)
  - [ ] "Cơ sở hạ tầng" (Infrastructure)
  - [ ] "Môi trường" (Environment)
  - [ ] "Chính quyền" (Government)
- [ ] **Region selector:** Shows "Quảng Ninh" (not "quangninh")
- [ ] **Map controls:** Tooltips in correct language
- [ ] **Settings panel:** Vietnamese menu options

#### URL State Persistence
```
Test URLs:
- http://localhost:3001/?view=quangninh
- http://localhost:3001/?view=global
- http://localhost:3001/?view=asia
```
- [ ] ?view=quangninh → Map zooms to Quảng Ninh
- [ ] ?view=global → Map zooms to global
- [ ] Browser back button works
- [ ] localStorage preserves state

#### Mobile Responsiveness
```
Test on:
- iPhone 12 (390x844)
- iPad (768x1024)
- Galaxy S21 (360x800)
- Touch interactions
```
- [ ] **Layout:** Single-column on mobile
- [ ] **Map:** SVG fallback displays (if WebGL unavailable)
- [ ] **Panels:** Stack vertically
- [ ] **Controls:** Touch-friendly button sizes
- [ ] **Performance:** No lag or slowdown
- [ ] **Orientation:** Works in portrait & landscape
- [ ] **Font sizing:** Readable without zoom

#### Performance Metrics
```bash
# Dev Tools > Lighthouse
```
- [ ] **First Contentful Paint (FCP):** < 2s
- [ ] **Largest Contentful Paint (LCP):** < 3s
- [ ] **Time to Interactive (TTI):** < 4s
- [ ] **Cumulative Layout Shift (CLS):** < 0.1
- [ ] **Network requests:** < 50 total
- [ ] **JS bundle size:** Check for bloat
- [ ] **CSS size:** quangninh-theme.css < 50KB

#### Browser Compatibility
- [ ] **Chrome/Edge 120+:** ✅ Works
- [ ] **Firefox 121+:** ✅ Works
- [ ] **Safari 17+:** ✅ Works
- [ ] **Mobile Safari:** ✅ Works
- [ ] **Samsung Internet:** ✅ Works

#### Error Handling
- [ ] **Missing feed:** Graceful error message
- [ ] **Invalid URL in ?view parameter:** Defaults to 'global'
- [ ] **WebGL unavailable:** Falls back to SVG map
- [ ] **Network timeout:** Retry mechanism works
- [ ] **RSS proxy errors:** Logged without breaking UI

#### Console & Debugging
```bash
# Browser DevTools > Console
```
- [ ] **No errors:** Clean console on load
- [ ] **No warnings:** Max 3 warnings allowed (third-party libs)
- [ ] **Deprecation warnings:** Zero from our code
- [ ] **Network errors:** None related to Quảng Ninh variant
- [ ] **CSS issues:** No missing fonts or images

#### Build Verification
```bash
npm run build:quangninh
```
- [ ] **Build completes:** No errors or critical warnings
- [ ] **Output size:** dist/ < 2MB
- [ ] **Index file:** dist/index.html generated
- [ ] **Assets:** CSS/JS minified and bundled
- [ ] **Source maps:** Generated for debugging

#### Production Build Testing
```bash
# Run built version locally
npx serve dist
# Visit http://localhost:3000
```
- [ ] **Production build serves:** No 404s
- [ ] **App loads:** Same as dev version
- [ ] **Performance:** Same or better than dev
- [ ] **Theme works:** Light/dark toggle functional
- [ ] **All features:** Map, feeds, panels work

---

## Step 3: Documentation & Deployment

### 📄 Files to Create/Update

**Create:**
- [ ] `PHASE_3_TESTING.md` (This file - expanded)
- [ ] `PHASE_3_DEPLOYMENT.md` (Deployment instructions)
- [ ] `QUANGNINH_THEME_GUIDE.md` (Theme customization docs)
- [ ] `QUANGNINH_RSS_SOURCES.md` (Feed management)

**Update:**
- [ ] `README.md` - Add Quảng Ninh variant section
- [ ] `.github/workflows/test-*.yml` - Add variant build tests
- [ ] `docs/DEPLOYMENT.md` - Add Quảng Ninh deployment notes

### 🚀 Next Steps Before Phase 4

1. **Complete all testing checkboxes** above
2. **Fix any failing tests** (CSS, TypeScript, visual)
3. **Run final build** and verify production output
4. **Commit to git** with message: "Phase 3: Quảng Ninh theme + feeds complete"
5. **Prepare for deployment** (environment setup, domain configuration)

### 🎯 Success Criteria for Phase 3

- ✅ All tests passing (see checklist above)
- ✅ No TypeScript errors (`npm run typecheck`)
- ✅ No console errors in browser
- ✅ Build succeeds (`npm run build:quangninh`)
- ✅ Production version works on localhost
- ✅ Theme looks professional (light & dark)
- ✅ Feeds load and display correctly
- ✅ All localization strings in Vietnamese
- ✅ Documentation complete

---

## Quick Test Commands

```bash
# Type checking
npm run typecheck

# Start dev server
npm run dev:quangninh

# Build production
npm run build:quangninh

# Run production build locally
npx serve dist

# Check bundle size
npm run build:quangninh && du -sh dist/
```

## Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Theme not loading | Verify import in `main.ts` exists |
| Map colors wrong | Check `[data-variant="quangninh"]` CSS rules |
| Feeds 404 | Verify RSS proxy URLs in `quangninh-feeds.ts` |
| TypeScript errors | Run `npm install` to ensure all types available |
| Build hangs | Try `npm ci && npm run build:quangninh` |
| Port 3001 in use | Kill process or use `--port 3002` flag |

---

**Status:** Ready for Step 2 Final Testing  
**Estimated Time:** 2-3 hours (full test run)  
**Next Update:** After completing all test checkboxes
