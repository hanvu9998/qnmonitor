export interface ServerFeed {
  name: string;
  url: string;
  lang?: string;
}

const gn = (q: string) =>
  `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-US&gl=US&ceid=US:en`;

export const VARIANT_FEEDS: Record<string, Record<string, ServerFeed[]>> = {
  full: {
    politics: [
      { name: 'BBC World', url: 'https://feeds.bbci.co.uk/news/world/rss.xml' },
      { name: 'Guardian World', url: 'https://www.theguardian.com/world/rss' },
      { name: 'AP News', url: gn('site:apnews.com') },
      { name: 'Reuters World', url: gn('site:reuters.com world') },
      { name: 'CNN World', url: gn('site:cnn.com world news when:1d') },
    ],
    us: [
      { name: 'NPR News', url: 'https://feeds.npr.org/1001/rss.xml' },
      { name: 'Politico', url: gn('site:politico.com when:1d') },
      { name: 'Axios', url: 'https://api.axios.com/feed/' },
    ],
    europe: [
      { name: 'France 24', url: 'https://www.france24.com/en/rss' },
      { name: 'EuroNews', url: 'https://www.euronews.com/rss?format=xml' },
      { name: 'Le Monde', url: 'https://www.lemonde.fr/en/rss/une.xml' },
      { name: 'DW News', url: 'https://rss.dw.com/xml/rss-en-all' },
    ],
    middleeast: [
      { name: 'BBC Middle East', url: 'https://feeds.bbci.co.uk/news/world/middle_east/rss.xml' },
      { name: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml' },
      { name: 'Guardian ME', url: 'https://www.theguardian.com/world/middleeast/rss' },
    ],
    tech: [
      { name: 'Hacker News', url: 'https://hnrss.org/frontpage' },
      { name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/technology-lab' },
      { name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml' },
      { name: 'MIT Tech Review', url: 'https://www.technologyreview.com/feed/' },
    ],
    ai: [
      { name: 'AI News', url: gn('(OpenAI OR Anthropic OR Google AI OR "large language model" OR ChatGPT) when:2d') },
      { name: 'VentureBeat AI', url: 'https://venturebeat.com/category/ai/feed/' },
      { name: 'The Verge AI', url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml' },
      { name: 'MIT Tech Review', url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed' },
      { name: 'ArXiv AI', url: 'https://export.arxiv.org/rss/cs.AI' },
    ],
    finance: [
      { name: 'CNBC', url: 'https://www.cnbc.com/id/100003114/device/rss/rss.html' },
      { name: 'MarketWatch', url: gn('site:marketwatch.com markets when:1d') },
      { name: 'Yahoo Finance', url: 'https://finance.yahoo.com/news/rssindex' },
      { name: 'Financial Times', url: 'https://www.ft.com/rss/home' },
      { name: 'Reuters Business', url: gn('site:reuters.com business markets') },
    ],
    gov: [
      { name: 'White House', url: gn('site:whitehouse.gov') },
      { name: 'State Dept', url: gn('site:state.gov OR "State Department"') },
      { name: 'Pentagon', url: gn('site:defense.gov OR Pentagon') },
      { name: 'Federal Reserve', url: 'https://www.federalreserve.gov/feeds/press_all.xml' },
      { name: 'SEC', url: 'https://www.sec.gov/news/pressreleases.rss' },
      { name: 'UN News', url: 'https://news.un.org/feed/subscribe/en/news/all/rss.xml' },
      { name: 'CISA', url: 'https://www.cisa.gov/cybersecurity-advisories/all.xml' },
    ],
    africa: [
      { name: 'BBC Africa', url: 'https://feeds.bbci.co.uk/news/world/africa/rss.xml' },
      { name: 'News24', url: 'https://feeds.news24.com/articles/news24/TopStories/rss' },
    ],
    latam: [
      { name: 'BBC Latin America', url: 'https://feeds.bbci.co.uk/news/world/latin_america/rss.xml' },
      { name: 'Guardian Americas', url: 'https://www.theguardian.com/world/americas/rss' },
    ],
    asia: [
      { name: 'BBC Asia', url: 'https://feeds.bbci.co.uk/news/world/asia/rss.xml' },
      { name: 'The Diplomat', url: 'https://thediplomat.com/feed/' },
      { name: 'Nikkei Asia', url: gn('site:asia.nikkei.com when:3d') },
      { name: 'CNA', url: 'https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml' },
    ],
    energy: [
      { name: 'Oil & Gas', url: gn('(oil price OR OPEC OR "natural gas" OR pipeline OR LNG) when:2d') },
    ],
    thinktanks: [
      { name: 'Foreign Policy', url: 'https://foreignpolicy.com/feed/' },
      { name: 'Atlantic Council', url: 'https://www.atlanticcouncil.org/feed/' },
      { name: 'Foreign Affairs', url: 'https://www.foreignaffairs.com/rss.xml' },
    ],
    crisis: [
      { name: 'CrisisWatch', url: 'https://www.crisisgroup.org/rss' },
      { name: 'IAEA', url: 'https://www.iaea.org/feeds/topnews' },
      { name: 'WHO', url: 'https://www.who.int/rss-feeds/news-english.xml' },
    ],
    layoffs: [
      { name: 'TechCrunch Layoffs', url: 'https://techcrunch.com/tag/layoffs/feed/' },
    ],
  },

  tech: {
    tech: [
      { name: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
      { name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml' },
      { name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/technology-lab' },
      { name: 'Hacker News', url: 'https://hnrss.org/frontpage' },
    ],
    ai: [
      { name: 'AI News', url: gn('(OpenAI OR Anthropic OR Google AI OR "large language model" OR ChatGPT) when:2d') },
      { name: 'VentureBeat AI', url: 'https://venturebeat.com/category/ai/feed/' },
      { name: 'The Verge AI', url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml' },
      { name: 'ArXiv AI', url: 'https://export.arxiv.org/rss/cs.AI' },
    ],
    startups: [
      { name: 'TechCrunch Startups', url: 'https://techcrunch.com/category/startups/feed/' },
      { name: 'VentureBeat', url: 'https://venturebeat.com/feed/' },
      { name: 'Crunchbase News', url: 'https://news.crunchbase.com/feed/' },
    ],
    security: [
      { name: 'Krebs Security', url: 'https://krebsonsecurity.com/feed/' },
      { name: 'Dark Reading', url: 'https://www.darkreading.com/rss.xml' },
    ],
    github: [
      { name: 'GitHub Blog', url: 'https://github.blog/feed/' },
    ],
    funding: [
      { name: 'VC News', url: gn('("Series A" OR "Series B" OR "Series C" OR "venture capital" OR "funding round") when:2d') },
    ],
    cloud: [
      { name: 'InfoQ', url: 'https://feed.infoq.com/' },
      { name: 'The New Stack', url: 'https://thenewstack.io/feed/' },
    ],
    layoffs: [
      { name: 'TechCrunch Layoffs', url: 'https://techcrunch.com/tag/layoffs/feed/' },
    ],
    finance: [
      { name: 'CNBC Tech', url: 'https://www.cnbc.com/id/19854910/device/rss/rss.html' },
      { name: 'Yahoo Finance', url: 'https://finance.yahoo.com/rss/topstories' },
    ],
  },

  finance: {
    markets: [
      { name: 'CNBC', url: 'https://www.cnbc.com/id/100003114/device/rss/rss.html' },
      { name: 'Yahoo Finance', url: 'https://finance.yahoo.com/rss/topstories' },
      { name: 'Seeking Alpha', url: 'https://seekingalpha.com/market_currents.xml' },
    ],
    forex: [
      { name: 'Forex News', url: gn('(forex OR currency OR "exchange rate" OR FX OR "US dollar") when:2d') },
    ],
    bonds: [
      { name: 'Bond Market', url: gn('("bond market" OR "treasury yield" OR "bond yield" OR "fixed income") when:2d') },
    ],
    commodities: [
      { name: 'Oil & Gas', url: gn('(oil price OR OPEC OR "natural gas" OR pipeline OR LNG) when:2d') },
      { name: 'Gold & Metals', url: gn('("gold price" OR "silver price" OR "precious metals" OR "copper price") when:2d') },
    ],
    crypto: [
      { name: 'CoinDesk', url: 'https://www.coindesk.com/arc/outboundfeeds/rss/' },
      { name: 'Cointelegraph', url: 'https://cointelegraph.com/rss' },
    ],
    centralbanks: [
      { name: 'Federal Reserve', url: 'https://www.federalreserve.gov/feeds/press_all.xml' },
    ],
    economic: [
      { name: 'Economic Data', url: gn('(CPI OR inflation OR GDP OR "economic data" OR "jobs report") when:2d') },
    ],
    ipo: [
      { name: 'IPO News', url: gn('(IPO OR "initial public offering" OR "stock market debut") when:2d') },
    ],
  },

  happy: {
    positive: [
      { name: 'Good News Network', url: 'https://www.goodnewsnetwork.org/feed/' },
      { name: 'Positive.News', url: 'https://www.positive.news/feed/' },
      { name: 'Reasons to be Cheerful', url: 'https://reasonstobecheerful.world/feed/' },
      { name: 'Optimist Daily', url: 'https://www.optimistdaily.com/feed/' },
    ],
    science: [
      { name: 'ScienceDaily', url: 'https://www.sciencedaily.com/rss/all.xml' },
      { name: 'Nature News', url: 'https://feeds.nature.com/nature/rss/current' },
      { name: 'Singularity Hub', url: 'https://singularityhub.com/feed/' },
    ],
  },

  quangninh: {
    general: [
      { name: 'VnExpress', url: 'https://vnexpress.net/rss/tin-tuc.rss' },
      { name: 'Tuoi Tre Online', url: 'https://tuoitre.vn/rss/trang-chu.rss' },
      { name: 'Thanh Nien', url: 'https://thanhnien.vn/rss' },
      { name: 'Bao Nhan Dan', url: 'https://nhandan.vn/rss/home.rss' },
      { name: 'BBC Tieng Viet', url: 'https://www.bbc.com/vietnamese/index.xml' },
      { name: 'VOV - Voice of Vietnam', url: 'https://vov.vn/rss' },
      { name: 'VietnamPlus', url: 'https://www.vietnamplus.vn/rss' },
    ],
    quangninh: [
      { name: 'Google News - Quang Ninh', url: 'https://news.google.com/rss/search?q=Quang+Ninh+when:7d&hl=vi&gl=VN&ceid=VN:vi' },
      { name: 'Bao Quang Ninh', url: 'https://baoquangninh.vn/rss' },
      { name: 'Bao Quang Ninh - An toan giao thong', url: 'https://baoquangninh.vn/rss/news/an-toan-giao-thong.rss' },
      { name: 'Bao Quang Ninh - Ban doc', url: 'https://baoquangninh.vn/rss/news/ban-doc.rss' },
      { name: 'Bao Quang Ninh - Lay y kien gop y', url: 'https://baoquangninh.vn/rss/news/lay-y-kien-gop-y.rss' },
      { name: 'Bao Quang Ninh - Theo dong thu ban doc', url: 'https://baoquangninh.vn/rss/news/theo-dong-thu-ban-doc.rss' },
      { name: 'Bao Quang Ninh - Ban doc viet tra loi ban doc', url: 'https://baoquangninh.vn/rss/news/ban-doc-viet-tra-loi-ban-doc.rss' },
      { name: 'Bao Quang Ninh - Chinh tri', url: 'https://baoquangninh.vn/rss/news/chinh-tri.rss' },
      { name: 'Bao Quang Ninh - Xay dung dang', url: 'https://baoquangninh.vn/rss/news/xay-dung-dang.rss' },
      { name: 'Bao Quang Ninh - Hoc lam theo Bac', url: 'https://baoquangninh.vn/rss/news/hoc-lam-theo-bac.rss' },
      { name: 'Bao Quang Ninh - Phong chong tham nhung', url: 'https://baoquangninh.vn/rss/news/phong-chong-tham-nhung.rss' },
      { name: 'Bao Quang Ninh - So ban nganh voi cu tri', url: 'https://baoquangninh.vn/rss/news/so-ban-nganh-voi-cu-tri.rss' },
      { name: 'Bao Quang Ninh - Quoc phong toan dan', url: 'https://baoquangninh.vn/rss/news/quoc-phong-toan-dan.rss' },
      { name: 'Bao Quang Ninh - Du lich', url: 'https://baoquangninh.vn/rss/news/du-lich.rss' },
      { name: 'Bao Quang Ninh - Diem den bon mua', url: 'https://baoquangninh.vn/rss/news/diem-den-bon-mua.rss' },
      { name: 'Bao Quang Ninh - Trai nghiem kham pha', url: 'https://baoquangninh.vn/rss/news/trai-nghiem-kham-pha.rss' },
      { name: 'Bao Quang Ninh - Xu huong du lich', url: 'https://baoquangninh.vn/rss/news/xu-huong-du-lich.rss' },
      { name: 'Bao Quang Ninh - Kinh te', url: 'https://baoquangninh.vn/rss/news/kinh-te.rss' },
      { name: 'Bao Quang Ninh - Dich vu thuong mai', url: 'https://baoquangninh.vn/rss/news/dich-vu-thuong-mai.rss' },
      { name: 'Bao Quang Ninh - Cong nghiep ha tang', url: 'https://baoquangninh.vn/rss/news/cong-nghiep-ha-tang.rss' },
      { name: 'Bao Quang Ninh - Nong nghiep nong thon', url: 'https://baoquangninh.vn/rss/news/nong-nghiep-nong-thon.rss' },
      { name: 'Bao Quang Ninh - Xuc tien dau tu', url: 'https://baoquangninh.vn/rss/news/xuc-tien-dau-tu.rss' },
      { name: 'Bao Quang Ninh - Bao ve moi truong', url: 'https://baoquangninh.vn/rss/news/bao-ve-moi-truong.rss' },
      { name: 'Bao Quang Ninh - Than khoang san', url: 'https://baoquangninh.vn/rss/news/than-khoang-san.rss' },
      { name: 'Bao Quang Ninh - Khoa hoc cong nghe', url: 'https://baoquangninh.vn/rss/news/khoa-hoc-cong-nghe.rss' },
      { name: 'Bao Quang Ninh - Chuyen doi so', url: 'https://baoquangninh.vn/rss/news/chuyen-doi-so.rss' },
      { name: 'Bao Quang Ninh - Thuc hien NQ57 ve KHCN', url: 'https://baoquangninh.vn/rss/news/thuc-hien-NQ57-ve-KHCN.rss' },
      { name: 'Bao Quang Ninh - Multimedia', url: 'https://baoquangninh.vn/rss/news/multimedia.rss' },
      { name: 'Bao Quang Ninh - Podcast', url: 'https://baoquangninh.vn/rss/news/podcast.rss' },
      { name: 'Bao Quang Ninh - E-magazine', url: 'https://baoquangninh.vn/rss/news/e-magazine.rss' },
      { name: 'Bao Quang Ninh - Infographics', url: 'https://baoquangninh.vn/rss/news/infographics.rss' },
      { name: 'Bao Quang Ninh - Video', url: 'https://baoquangninh.vn/rss/news/video.rss' },
      { name: 'Bao Quang Ninh - Cuoc song qua anh', url: 'https://baoquangninh.vn/rss/news/cuoc-song-qua-anh.rss' },
      { name: 'Bao Quang Ninh - Shorts', url: 'https://baoquangninh.vn/rss/news/shorts.rss' },
      { name: 'Bao Quang Ninh - Quoc te', url: 'https://baoquangninh.vn/rss/news/quoc-te.rss' },
      { name: 'Bao Quang Ninh - Quang Tay', url: 'https://baoquangninh.vn/rss/news/quang-tay.rss' },
      { name: 'Bao Quang Ninh - Phap luat', url: 'https://baoquangninh.vn/rss/news/phap-luat.rss' },
      { name: 'Bao Quang Ninh - The thao', url: 'https://baoquangninh.vn/rss/news/the-thao.rss' },
      { name: 'Bao Quang Ninh - Xa hoi', url: 'https://baoquangninh.vn/rss/news/xa-hoi.rss' },
      { name: 'Bao Quang Ninh - Giao duc', url: 'https://baoquangninh.vn/rss/news/giao-duc.rss' },
      { name: 'Bao Quang Ninh - Nhip song tre', url: 'https://baoquangninh.vn/rss/news/nhip-song-tre.rss' },
      { name: 'Bao Quang Ninh - Phong su', url: 'https://baoquangninh.vn/rss/news/phong-su.rss' },
      { name: 'Bao Quang Ninh - Y te', url: 'https://baoquangninh.vn/rss/news/y-te.rss' },
      { name: 'Bao Quang Ninh - Tam long nhan ai', url: 'https://baoquangninh.vn/rss/news/tam-long-nhan-ai.rss' },
      { name: 'Bao Quang Ninh - Van hoa van nghe', url: 'https://baoquangninh.vn/rss/news/van-hoa-van-nghe.rss' },
      { name: 'Bao Quang Ninh - Dat va nguoi Quang Ninh', url: 'https://baoquangninh.vn/rss/news/dat-va-nguoi-quang-ninh.rss' },
      { name: 'Bao Quang Ninh - Van hoa nghe thuat', url: 'https://baoquangninh.vn/rss/news/van-hoa-nghe-thuat.rss' },
      { name: 'Bao Quang Ninh - Nhip song di san', url: 'https://baoquangninh.vn/rss/news/nhip-song-di-san.rss' },
      { name: 'Bao Quang Ninh - Doi song', url: 'https://baoquangninh.vn/rss/news/doi-song.rss' },
    ],
    antt: [
      { name: 'Cong an Quang Ninh - Tong hop', url: 'https://conganquangninh.gov.vn/rss/' },
      {
        name: 'Google News - Cong an Quang Ninh',
        url: 'https://news.google.com/rss/search?q=site:conganquangninh.gov.vn+OR+%22C%C3%B4ng+an+Qu%E1%BA%A3ng+Ninh%22+when:14d&hl=vi&gl=VN&ceid=VN:vi',
      },
    ],
    government: [
      { name: 'Quang Ninh Portal - Cat 82', url: 'https://www.quangninh.gov.vn/Trang/Tin-tuc-su-kien.aspx?Cat=82' },
      {
        name: 'Google News - Quang Ninh Portal Cat 82',
        url: 'https://news.google.com/rss/search?q=site:quangninh.gov.vn+Cat+82+OR+%22Tin+t%E1%BB%A9c+s%E1%BB%B1+ki%E1%BB%87n%22+when:14d&hl=vi&gl=VN&ceid=VN:vi',
      },
    ],
    mxh: [
      {
        name: 'Facebook - Nguoi Quang Ninh Real',
        url: 'https://news.google.com/rss/search?q=site:facebook.com/nguoiquangninhreal+OR+%22Nguoi+Quang+Ninh+Real%22+when:14d&hl=vi&gl=VN&ceid=VN:vi',
      },
      {
        name: 'Facebook - Fanpage Quang Ninh 24/7',
        url: 'https://news.google.com/rss/search?q=site:facebook.com/Fanpagequangninh24h+OR+%22Fanpage+Quang+Ninh+24h%22+when:14d&hl=vi&gl=VN&ceid=VN:vi',
      },
      {
        name: 'Facebook - Xe Quang Ninh',
        url: 'https://news.google.com/rss/search?q=site:facebook.com/xequangninh999+OR+%22Xe+Quang+Ninh%22+when:14d&hl=vi&gl=VN&ceid=VN:vi',
      },
    ],
  },
};

export const INTEL_SOURCES: ServerFeed[] = [
  { name: 'Defense One', url: 'https://www.defenseone.com/rss/all/' },
  { name: 'Breaking Defense', url: 'https://breakingdefense.com/feed/' },
  { name: 'The War Zone', url: 'https://www.twz.com/feed' },
  { name: 'Defense News', url: 'https://www.defensenews.com/arc/outboundfeeds/rss/?outputType=xml' },
  { name: 'Military Times', url: 'https://www.militarytimes.com/arc/outboundfeeds/rss/?outputType=xml' },
  { name: 'Task & Purpose', url: 'https://taskandpurpose.com/feed/' },
  { name: 'USNI News', url: 'https://news.usni.org/feed' },
  { name: 'gCaptain', url: 'https://gcaptain.com/feed/' },
  { name: 'Oryx OSINT', url: 'https://www.oryxspioenkop.com/feeds/posts/default?alt=rss' },
  { name: 'Foreign Policy', url: 'https://foreignpolicy.com/feed/' },
  { name: 'Foreign Affairs', url: 'https://www.foreignaffairs.com/rss.xml' },
  { name: 'Atlantic Council', url: 'https://www.atlanticcouncil.org/feed/' },
  { name: 'Bellingcat', url: gn('site:bellingcat.com') },
  { name: 'Krebs Security', url: 'https://krebsonsecurity.com/feed/' },
  { name: 'Arms Control Assn', url: gn('site:armscontrol.org') },
  { name: 'Bulletin of Atomic Scientists', url: gn('site:thebulletin.org') },
  { name: 'FAO News', url: 'https://www.fao.org/feeds/fao-newsroom-rss' },
];
