# Quick Start - Quảng Ninh Monitor RSS Feeds

## TL;DR

### Start Development Server
```bash
npm run dev:quangninh
```

Open browser → `http://localhost:3000`

You should see:
- Quảng Ninh map as default view
- 9+ feed panels with Vietnamese news articles
- Auto-refreshing content from 40+ regional sources

---

## What Was Fixed (Phase 3.6)

**Issue:** RSS feeds not showing on localhost  
**Cause #1:** feeds.ts missing 'quangninh' routing case  
**Cause #2:** panel-layout.ts not creating dynamic panels for variant-specific categories  
**Solution:** Added 2 small code fixes (18 lines total)

---

## Feed Panels You'll See

✅ Tin tức chung (General News)  
✅ Tin Quảng Ninh (Quảng Ninh Local)  
✅ Kinh tế (Economics)  
✅ Du lịch & Văn hóa (Tourism & Culture)  
✅ Cơ sở hạ tầng (Infrastructure)  
✅ Môi trường & Biển (Environment & Sea)  
✅ Chính quyền (Government)  
✅ Tin tức Châu Á (Asia News)  
✅ Công nghệ (Technology)  

**Each panel:**
- Shows latest articles in Vietnamese
- Auto-refreshes every 5 minutes
- Pulls from 40+ RSS feed sources
- Displays publication date and source

---

## Verification

After opening localhost:3000:
1. ✓ Map shows Quảng Ninh as default view
2. ✓ Scroll down to see feed panels
3. ✓ Each panel has Vietnamese title
4. ✓ Articles show Vietnamese titles and dates
5. ✓ Sources are Vietnamese (VnExpress, BBC Việt, etc.)

If anything doesn't show:
- Press F12 → Console tab
- Look for RSS loading messages
- No red errors should appear

---

## Files Changed

| File | What | Status |
|------|------|--------|
| src/config/feeds.ts | Added QUANGNINH_FEEDS routing | ✅ FIXED |
| src/app/panel-layout.ts | Added dynamic panel creation | ✅ FIXED |

---

## Documentation

📖 For detailed info, see:
- `PHASE_3_6_COMPLETION.md` - This phase summary
- `PHASE_3_BUG_FIXES_SUMMARY.md` - Technical analysis
- `QUANGNINH_RSS_FEEDS_FIX.md` - Setup guide

---

## That's It!

Everything is ready. Just run:
```bash
npm run dev:quangninh
```

Feeds should display on localhost:3000 ✅
