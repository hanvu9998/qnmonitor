// Quang Ninh Monitor - Regional feeds configuration
// Focused on news sources relevant to Quang Ninh Province, Vietnam

import type { Feed } from '@/types';

const rss = (url: string) => `/api/rss-proxy?url=${encodeURIComponent(url)}`;

export const QUANGNINH_FEEDS: Record<string, Feed[]> = {
  // General Vietnamese news
  general: [
    { name: 'VnExpress', url: rss('https://vnexpress.net/rss/tin-tuc.rss'), lang: 'vi' },
    { name: 'Tuoi Tre Online', url: rss('https://tuoitre.vn/rss/trang-chu.rss'), lang: 'vi' },
    { name: 'Thanh Nien', url: rss('https://thanhnien.vn/rss'), lang: 'vi' },
    { name: 'Bao Nhan Dan', url: rss('https://nhandan.vn/rss'), lang: 'vi' },
    { name: 'BBC Tieng Viet', url: rss('https://www.bbc.com/vietnamese/index.xml'), lang: 'vi' },
    { name: 'VOV - Voice of Vietnam', url: rss('https://vov.vn/rss'), lang: 'vi' },
    { name: 'VietnamPlus', url: rss('https://www.vietnamplus.vn/rss'), lang: 'vi' },
  ],

  // Quang Ninh local news
  quangninh: [
    { name: 'Google News - Quang Ninh', url: rss('https://news.google.com/rss/search?q=Quang+Ninh+when:7d&hl=vi&gl=VN&ceid=VN:vi'), lang: 'vi' },
    { name: 'Bao Quang Ninh', url: rss('https://baoquangninh.vn/rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - An toan giao thong', url: rss('https://baoquangninh.vn/rss/news/an-toan-giao-thong.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Ban doc', url: rss('https://baoquangninh.vn/rss/news/ban-doc.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Lay y kien gop y', url: rss('https://baoquangninh.vn/rss/news/lay-y-kien-gop-y.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Theo dong thu ban doc', url: rss('https://baoquangninh.vn/rss/news/theo-dong-thu-ban-doc.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Ban doc viet tra loi ban doc', url: rss('https://baoquangninh.vn/rss/news/ban-doc-viet-tra-loi-ban-doc.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Chinh tri', url: rss('https://baoquangninh.vn/rss/news/chinh-tri.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Xay dung dang', url: rss('https://baoquangninh.vn/rss/news/xay-dung-dang.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Hoc lam theo Bac', url: rss('https://baoquangninh.vn/rss/news/hoc-lam-theo-bac.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Phong chong tham nhung', url: rss('https://baoquangninh.vn/rss/news/phong-chong-tham-nhung.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - So ban nganh voi cu tri', url: rss('https://baoquangninh.vn/rss/news/so-ban-nganh-voi-cu-tri.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Quoc phong toan dan', url: rss('https://baoquangninh.vn/rss/news/quoc-phong-toan-dan.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Du lich', url: rss('https://baoquangninh.vn/rss/news/du-lich.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Diem den bon mua', url: rss('https://baoquangninh.vn/rss/news/diem-den-bon-mua.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Trai nghiem kham pha', url: rss('https://baoquangninh.vn/rss/news/trai-nghiem-kham-pha.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Xu huong du lich', url: rss('https://baoquangninh.vn/rss/news/xu-huong-du-lich.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Kinh te', url: rss('https://baoquangninh.vn/rss/news/kinh-te.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Dich vu thuong mai', url: rss('https://baoquangninh.vn/rss/news/dich-vu-thuong-mai.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Cong nghiep ha tang', url: rss('https://baoquangninh.vn/rss/news/cong-nghiep-ha-tang.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Nong nghiep nong thon', url: rss('https://baoquangninh.vn/rss/news/nong-nghiep-nong-thon.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Xuc tien dau tu', url: rss('https://baoquangninh.vn/rss/news/xuc-tien-dau-tu.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Bao ve moi truong', url: rss('https://baoquangninh.vn/rss/news/bao-ve-moi-truong.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Than khoang san', url: rss('https://baoquangninh.vn/rss/news/than-khoang-san.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Khoa hoc cong nghe', url: rss('https://baoquangninh.vn/rss/news/khoa-hoc-cong-nghe.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Chuyen doi so', url: rss('https://baoquangninh.vn/rss/news/chuyen-doi-so.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Thuc hien NQ57 ve KHCN', url: rss('https://baoquangninh.vn/rss/news/thuc-hien-NQ57-ve-KHCN.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Multimedia', url: rss('https://baoquangninh.vn/rss/news/multimedia.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Podcast', url: rss('https://baoquangninh.vn/rss/news/podcast.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - E-magazine', url: rss('https://baoquangninh.vn/rss/news/e-magazine.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Infographics', url: rss('https://baoquangninh.vn/rss/news/infographics.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Video', url: rss('https://baoquangninh.vn/rss/news/video.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Cuoc song qua anh', url: rss('https://baoquangninh.vn/rss/news/cuoc-song-qua-anh.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Shorts', url: rss('https://baoquangninh.vn/rss/news/shorts.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Quoc te', url: rss('https://baoquangninh.vn/rss/news/quoc-te.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Quang Tay', url: rss('https://baoquangninh.vn/rss/news/quang-tay.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Phap luat', url: rss('https://baoquangninh.vn/rss/news/phap-luat.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - The thao', url: rss('https://baoquangninh.vn/rss/news/the-thao.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Xa hoi', url: rss('https://baoquangninh.vn/rss/news/xa-hoi.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Giao duc', url: rss('https://baoquangninh.vn/rss/news/giao-duc.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Nhip song tre', url: rss('https://baoquangninh.vn/rss/news/nhip-song-tre.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Phong su', url: rss('https://baoquangninh.vn/rss/news/phong-su.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Y te', url: rss('https://baoquangninh.vn/rss/news/y-te.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Tam long nhan ai', url: rss('https://baoquangninh.vn/rss/news/tam-long-nhan-ai.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Van hoa van nghe', url: rss('https://baoquangninh.vn/rss/news/van-hoa-van-nghe.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Dat va nguoi Quang Ninh', url: rss('https://baoquangninh.vn/rss/news/dat-va-nguoi-quang-ninh.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Van hoa nghe thuat', url: rss('https://baoquangninh.vn/rss/news/van-hoa-nghe-thuat.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Nhip song di san', url: rss('https://baoquangninh.vn/rss/news/nhip-song-di-san.rss'), lang: 'vi' },
    { name: 'Bao Quang Ninh - Doi song', url: rss('https://baoquangninh.vn/rss/news/doi-song.rss'), lang: 'vi' },
  ],

  // Quang Ninh public security (ANTT)
  antt: [
    { name: 'Cong an Quang Ninh - Tong hop', url: rss('https://conganquangninh.gov.vn/rss/'), lang: 'vi' },
    {
      name: 'Google News - Cong an Quang Ninh',
      url: rss('https://news.google.com/rss/search?q=site:conganquangninh.gov.vn+OR+%22C%C3%B4ng+an+Qu%E1%BA%A3ng+Ninh%22+when:14d&hl=vi&gl=VN&ceid=VN:vi'),
      lang: 'vi',
    },
  ],

  // Quang Ninh government
  government: [
    { name: 'Quang Ninh Portal - Cat 82', url: rss('https://www.quangninh.gov.vn/Trang/Tin-tuc-su-kien.aspx?Cat=82'), lang: 'vi' },
    {
      name: 'Google News - Quang Ninh Portal Cat 82',
      url: rss('https://news.google.com/rss/search?q=site:quangninh.gov.vn+Cat+82+OR+%22Tin+t%E1%BB%A9c+s%E1%BB%B1+ki%E1%BB%87n%22+when:14d&hl=vi&gl=VN&ceid=VN:vi'),
      lang: 'vi',
    },
  ],

  // Social media watch (MXH)
  mxh: [
    {
      name: 'Facebook - Nguoi Quang Ninh Real',
      url: rss('https://news.google.com/rss/search?q=site:facebook.com/nguoiquangninhreal+OR+%22Nguoi+Quang+Ninh+Real%22+when:14d&hl=vi&gl=VN&ceid=VN:vi'),
      lang: 'vi',
    },
    {
      name: 'Facebook - Fanpage Quang Ninh 24/7',
      url: rss('https://news.google.com/rss/search?q=site:facebook.com/Fanpagequangninh24h+OR+%22Fanpage+Quang+Ninh+24h%22+when:14d&hl=vi&gl=VN&ceid=VN:vi'),
      lang: 'vi',
    },
    {
      name: 'Facebook - Xe Quang Ninh',
      url: rss('https://news.google.com/rss/search?q=site:facebook.com/xequangninh999+OR+%22Xe+Quang+Ninh%22+when:14d&hl=vi&gl=VN&ceid=VN:vi'),
      lang: 'vi',
    },
  ],
};

// Source risk profiles for Vietnamese sources
export const SOURCE_RISKS: Record<string, { risk: 'low' | 'medium' | 'high'; note?: string }> = {
  'BBC Tieng Viet': { risk: 'low', note: 'International broadcaster' },
  VnExpress: { risk: 'low', note: 'Major independent news outlet' },
  'Tuoi Tre Online': { risk: 'low', note: 'Major newspaper' },
  'Thanh Nien': { risk: 'low', note: 'Major newspaper' },
  'VOV - Voice of Vietnam': { risk: 'medium', note: 'State broadcaster' },
  'Bao Nhan Dan': { risk: 'medium', note: 'State newspaper' },
  'Google News - Quang Ninh': { risk: 'low', note: 'News aggregator' },
  'Cong an Quang Ninh - Tong hop': { risk: 'low', note: 'Official provincial police portal' },
  'Bao Quang Ninh': { risk: 'low', note: 'Provincial newspaper' },
  'Quang Ninh Portal - Cat 82': { risk: 'low', note: 'Official Quang Ninh portal category page' },
  'Facebook - Nguoi Quang Ninh Real': { risk: 'medium', note: 'Social media source via news indexing' },
  'Facebook - Fanpage Quang Ninh 24/7': { risk: 'medium', note: 'Social media source via news indexing' },
  'Facebook - Xe Quang Ninh': { risk: 'medium', note: 'Social media source via news indexing' },
};

// Feed categories for UI organization
export const FEED_CATEGORIES = {
  general: 'Tin t?c chung',
  quangninh: 'Bao Quang Ninh',
  antt: 'Tin ANTT Qu?ng Ninh',
  government: 'Ch�nh quy?n Qu?ng Ninh',
  mxh: 'Tin MXH',
} as const;
