# Quảng Ninh RSS Feed Management Guide

## Overview

The Quảng Ninh Monitor aggregates news from **9 categories** across **40+ Vietnamese and international sources**. This guide explains how to manage, add, update, and monitor feeds.

## Current Feed Structure

### File Location
```
src/config/quangninh-feeds.ts
```

### Feed Categories

| Category | Purpose | Feeds |
|----------|---------|-------|
| **general** | National Vietnamese news | VnExpress, Tuổi Trẻ, Thanh Niên, BBC Việt |
| **quangninh** | Local Quảng Ninh news | Google News, Báo QN, UBND |
| **economics** | Trade, business, exports | VnExpress Kinh Tế, Reuters |
| **tourism** | Hạ Long, heritage, travel | Du lịch feeds, Google News |
| **infrastructure** | Ports, transport, airports | Cảng, giao thông, sân bay |
| **environment** | Climate, maritime, pollution | Môi trường, biến đổi khí hậu |
| **government** | Official announcements | Báo Nhân Dân, UBND Quảng Ninh |
| **asia** | Regional/international context | BBC, Reuters, Al Jazeera |
| **technology** | Tech news (optional) | VnExpress Công Nghệ, TechCrunch |

## Adding New RSS Feeds

### Step 1: Find the RSS Feed URL

**For Vietnamese news sites:**
```
VnExpress:     https://vnexpress.net/rss/[category].rss
Tuổi Trẻ:      https://tuoitre.vn/rss/[category].rss
Báo Nhân Dân:  https://nhandan.vn/rss
```

**For international:**
```
BBC:           https://www.bbc.com/vietnamese/index.xml
Reuters:       https://feeds.reuters.com/[topic]
Al Jazeera:    https://www.aljazeera.com/xml/rss/all.xml
```

**For local Quảng Ninh:**
```
Official sites (check if they have RSS):
- https://baoquangninh.vn (Báo Quảng Ninh)
- https://quangninh.gov.vn (Official portal)
- https://sggp.org.vn (Tờ rơi Tây Bắc)
```

### Step 2: Add to quangninh-feeds.ts

```typescript
export const QUANGNINH_FEEDS: Record<string, Feed[]> = {
  quangninh: [
    { 
      name: 'Báo Quảng Ninh',
      url: rss('https://baoquangninh.vn/rss/'),  // ← Wrap URL with rss()
      lang: 'vi' 
    },
    // ... add more feeds
  ],
};
```

### Step 3: Add Risk Profile

```typescript
export const SOURCE_RISKS: Record<string, { risk: 'low' | 'medium' | 'high'; note?: string }> = {
  'Báo Quảng Ninh': { 
    risk: 'low',              // 'low', 'medium', or 'high'
    note: 'Provincial newspaper'  // Optional description
  },
};
```

### Step 4: Test Feed

```bash
# Restart dev server
npm run dev:quangninh

# Check browser console for errors
# Verify feed appears in Live News panel
```

## Feed Risk Levels

### Low Risk (Trusted)
```typescript
'BBC Tiếng Việt': { risk: 'low', note: 'International broadcaster' }
'VnExpress': { risk: 'low', note: 'Major independent outlet' }
'Reuters': { risk: 'low', note: 'International news agency' }
```

### Medium Risk (State-Controlled)
```typescript
'VOV - Voice of Vietnam': { risk: 'medium', note: 'State broadcaster' }
'Báo Nhân Dân': { risk: 'medium', note: 'State newspaper' }
'UBND Quảng Ninh': { risk: 'medium', note: 'Official government' }
```

### High Risk (Unreliable/Propaganda)
```typescript
// Add sources with known bias or poor fact-checking
// (Only add if explicitly flagged as suspicious)
```

## Managing Existing Feeds

### Updating Feed URLs

If a feed URL changes:

```typescript
// ❌ OLD
{ name: 'VnExpress', url: rss('https://vnexpress.net/rss/tin-tuc.rss') },

// ✅ NEW
{ name: 'VnExpress', url: rss('https://vnexpress.net/rss/tong-hop.rss') },
```

Then restart the dev server:
```bash
npm run dev:quangninh
```

### Disabling a Feed (Temporary)

Comment it out:
```typescript
// { name: 'Feed Name', url: rss('...'), lang: 'vi' },
```

### Removing a Feed (Permanent)

Delete the line and update SOURCE_RISKS:
```typescript
// Remove from QUANGNINH_FEEDS
// Remove from SOURCE_RISKS
```

## Feed Categories Details

### General (7 sources)
Purpose: Daily Vietnamese news  
Includes: National stories, business, politics  
Update frequency: Hourly

**Sources:**
- VnExpress (Independent, largest circulation)
- Tuổi Trẻ Online (Independent newspaper)
- Thanh Niên (Independent newspaper)
- Báo Nhân Dân (Communist Party official)
- BBC Tiếng Việt (International, balanced)
- VOV (State radio/TV)
- VietnamPlus (State news agency)

### Quảng Ninh Local (3+ sources)
Purpose: Regional-specific news  
Includes: Local government, events, business  
Update frequency: Daily

**Sources:**
- Google News - Quảng Ninh (News aggregator)
- Báo Quảng Ninh (Official provincial paper)
- UBND Quảng Ninh (Government portal)

**To add:**
- Báo Hạ Long (if RSS available)
- Báo Móng Cái (if RSS available)
- Radio Quảng Ninh (if RSS available)

### Economics (3 sources)
Purpose: Trade, manufacturing, business  
Includes: Export/import data, commerce, markets  
Update frequency: Daily-Hourly

**Sources:**
- VnExpress - Kinh Tế (Business section)
- Thanh Niên - Kinh Tế (Business section)
- Google News - Vietnamese trade
- Reuters (International context)

### Tourism (3 sources)
Purpose: Hạ Long Bay, heritage sites, travel  
Includes: Tourism news, UNESCO, travel guides  
Update frequency: Weekly-Daily

**Sources:**
- VnExpress - Du Lịch (Travel section)
- Google News - Hạ Long (Local tourism)
- Google News - Vietnam UNESCO

### Infrastructure (3 sources)
Purpose: Ports, transportation, airports  
Includes: Shipping, roads, rail, airports  
Update frequency: Daily

**Sources:**
- Google News - Cảng Hải Phòng (Port news)
- Google News - Giao Thông QN (Transport)
- Google News - Sân Bay Nội Bài (Airport)

### Environment (3 sources)
Purpose: Climate, maritime, pollution  
Includes: Environmental news, maritime issues  
Update frequency: Weekly-Daily

**Sources:**
- VnExpress - Môi Trường (Environment section)
- Google News - Biển Quảng Ninh (Maritime)
- Google News - Khí Hậu (Climate)

### Government (3 sources)
Purpose: Official announcements, policies  
Includes: Government decisions, regulations  
Update frequency: Daily-Weekly

**Sources:**
- VnExpress - Xã Hội (Social affairs)
- Báo Nhân Dân - Chính Trị (Politics)
- Google News - UBND Quảng Ninh

### Asia Regional (3 sources)
Purpose: International context  
Includes: Regional news, market trends  
Update frequency: Daily-Hourly

**Sources:**
- BBC News - Asia (International)
- Reuters - Asia Pacific (International)
- Al Jazeera English (International)

### Technology (2 sources)
Purpose: Tech ecosystem, startups (optional)  
Includes: Tech companies, AI, startups  
Update frequency: Daily-Hourly

**Sources:**
- VnExpress - Công Nghệ (Tech section)
- TechCrunch (International tech news)

## Monitoring Feed Health

### Common Issues

**Issue:** Feed returns 404 error
```
Solution:
1. Check URL is correct: https://...rss
2. Visit URL in browser to verify it exists
3. Update URL in quangninh-feeds.ts
4. Restart dev server
```

**Issue:** Feed has no items/empty
```
Solution:
1. Check if feed updates frequently
2. Verify RSS format is valid (use https://validator.w3.org/feed/)
3. Check if proxy can access URL (not blocked)
4. Consider replacing with more active feed
```

**Issue:** Feed items missing/truncated
```
Solution:
1. Check character encoding (should be UTF-8)
2. Verify feed content isn't behind login
3. Check if RSS proxy handles special characters
4. Test URL directly: /api/rss-proxy?url=https://...
```

**Issue:** Feed takes too long to load
```
Solution:
1. Check feed server response time
2. Consider reducing number of feeds
3. Set up caching/timeout in proxy
4. Check network bandwidth
```

## RSS Proxy Integration

The app uses `/api/rss-proxy?url=...` to fetch feeds.

### How It Works
```
Feed URL in quangninh-feeds.ts:
  rss('https://example.com/feed.xml')

Becomes:
  /api/rss-proxy?url=https%3A%2F%2Fexample.com%2Ffeed.xml

Proxy:
  1. Fetches remote RSS
  2. Validates XML
  3. Returns parsed items
  4. Handles CORS
  5. Caches results
```

### Debugging Feed Issues

Open browser DevTools > Network tab:
```
Look for requests to:
  /api/rss-proxy?url=...

Check response:
  - Status: 200 (success)
  - Content-Type: application/json
  - Body: Should contain parsed feed items
```

## Feed Refresh Strategy

Feeds are updated:
- **On page load:** All feeds fetched once
- **Periodic refresh:** Every 5-10 minutes (configurable)
- **Manual refresh:** User can click refresh button

To adjust refresh interval, edit:
```typescript
// src/app/panel-layout.ts or similar
const FEED_REFRESH_INTERVAL = 5 * 60 * 1000;  // 5 minutes
```

## Adding Category-Specific Sections

To display feeds by category in UI:

```typescript
export const FEED_CATEGORIES = {
  general: 'Tin tức chung',
  quangninh: 'Quảng Ninh',
  economics: 'Kinh tế',
  tourism: 'Du lịch & Văn hóa',
  infrastructure: 'Cơ sở hạ tầng',
  environment: 'Môi trường',
  government: 'Chính quyền',
  asia: 'Châu Á',
  technology: 'Công nghệ',
};
```

**Panel label:** `"Live News - Quảng Ninh"` (shows category)

## Performance Considerations

### Feed Count Impact
- **20-30 feeds:** Minimal impact (< 100KB per page load)
- **40-50 feeds:** Noticeable (takes 2-3 sec to load all)
- **100+ feeds:** Significant (may timeout if slow proxy)

### Optimization Tips
```typescript
// Limit items per feed
const ITEMS_PER_FEED = 10;

// Cache responses (API level)
const CACHE_TTL = 5 * 60;  // 5 minutes

// Load high-priority feeds first
const PRIORITY_FEEDS = ['general', 'quangninh'];
```

## Testing New Feeds

### Step 1: Add feed locally
```typescript
export const QUANGNINH_FEEDS = {
  test: [
    { name: 'Test Feed', url: rss('https://...'), lang: 'vi' }
  ],
};
```

### Step 2: Start dev server
```bash
npm run dev:quangninh
```

### Step 3: Check console
```javascript
// In DevTools console
fetch('/api/rss-proxy?url=https://...')
  .then(r => r.json())
  .then(d => console.log(d))
```

### Step 4: Verify in UI
- Check Live News panel shows items
- Verify source risk badge displays
- Check timestamps are correct
- Verify links work

## Updating Documentation

After making changes, update:
1. This file (`QUANGNINH_RSS_SOURCES.md`)
2. `QUANGNINH_IMPLEMENTATION.md` (Phase 1 doc)
3. `README.md` (if major changes)

## Rollback Procedure

If feed updates break the app:

```bash
# Git rollback
git checkout src/config/quangninh-feeds.ts

# Restart
npm run dev:quangninh
```

## Future Enhancements

- [ ] Feed categorization by keyword/topic
- [ ] User-customizable feed selection
- [ ] Feed scheduling (fetch at specific times)
- [ ] Feed deduplication (remove duplicate articles)
- [ ] Sentiment analysis per feed
- [ ] Source quality scoring system

---

**Last Updated:** March 1, 2026  
**Feed Count:** 40+ sources  
**Categories:** 9  
**Update Frequency:** Hourly to Daily
