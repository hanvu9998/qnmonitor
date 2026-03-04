import { Panel } from './Panel';
import { escapeHtml } from '@/utils/sanitize';

interface GoldPoint {
  ts: string;
  open: number;
  close: number;
  low: number;
  high: number;
}

interface GoldResponse {
  source: string;
  symbol: string;
  cache: 'hit' | 'miss' | 'stale';
  fetchedAt: string;
  current: {
    open: number;
    close: number;
    low: number;
    high: number;
    ts: string;
    change: number;
    changePct: number;
  } | null;
  series: GoldPoint[];
}

function formatVnd(value: number): string {
  return `${Math.round(value).toLocaleString('vi-VN')} VND`;
}

function formatTime(iso: string): string {
  const dt = new Date(iso);
  if (Number.isNaN(dt.getTime())) return 'N/A';
  return dt.toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function buildSparkline(points: number[], width = 300, height = 96): string {
  if (points.length < 2) return '';
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const coords = points.map((value, idx) => {
    const x = (idx / (points.length - 1)) * width;
    const y = height - ((value - min) / range) * (height - 8) - 4;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  return `
    <svg class="gold-sjc-chart" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-label="SJC chart">
      <polyline points="${coords}" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline>
    </svg>
  `;
}

export class GoldSjcPanel extends Panel {
  private loading = true;
  private data: GoldResponse | null = null;
  private error: string | null = null;
  private refreshBtn: HTMLButtonElement | null = null;
  private refreshing = false;

  constructor() {
    super({ id: 'gold-sjc', title: 'Biểu đồ giá vàng SJC 9999', showCount: false });
    this.createRefreshButton();
    void this.fetchData();
  }

  private createRefreshButton(): void {
    this.refreshBtn = document.createElement('button');
    this.refreshBtn.className = 'panel-refresh-btn';
    this.refreshBtn.innerHTML = '&#x21bb;';
    this.refreshBtn.title = 'Reload gold chart';
    this.refreshBtn.addEventListener('click', () => { void this.handleRefresh(); });

    const countEl = this.header.querySelector('.panel-count');
    if (countEl) {
      this.header.insertBefore(this.refreshBtn, countEl);
    } else {
      this.header.appendChild(this.refreshBtn);
    }
  }

  private async handleRefresh(): Promise<void> {
    if (this.refreshing || !this.refreshBtn) return;
    this.refreshing = true;
    this.refreshBtn.disabled = true;
    this.refreshBtn.innerHTML = '<span class="panel-summarize-spinner"></span>';
    try {
      await this.fetchData();
    } finally {
      this.refreshing = false;
      this.refreshBtn.disabled = false;
      this.refreshBtn.innerHTML = '&#x21bb;';
    }
  }

  async fetchData(): Promise<void> {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        const resp = await fetch('/api/gold-sjc', { signal: AbortSignal.timeout(12_000) });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const payload = await resp.json() as GoldResponse;
        if (!Array.isArray(payload.series) || payload.series.length === 0) {
          throw new Error('Empty data');
        }
        this.data = payload;
        this.error = null;
        this.loading = false;
        this.renderPanel();
        return;
      } catch (err) {
        if (this.isAbortError(err)) return;
        if (attempt === 0) {
          this.showRetrying('Retrying SJC data...');
          await new Promise((resolve) => setTimeout(resolve, 1500));
          continue;
        }
        this.error = err instanceof Error ? err.message : 'Failed to fetch SJC data';
      }
    }

    this.loading = false;
    this.renderPanel();
  }

  private renderPanel(): void {
    if (this.loading) {
      this.showLoading('Loading SJC gold chart...');
      return;
    }
    if (this.error || !this.data || !this.data.current) {
      this.showError(this.error || 'No SJC data available');
      return;
    }

    if (this.data.cache === 'stale') {
      this.setDataBadge('cached');
    } else {
      this.setDataBadge('live');
    }

    const closeSeries = this.data.series.map((item) => item.close);
    const chart = buildSparkline(closeSeries);
    const current = this.data.current;
    const isUp = current.change >= 0;

    const html = `
      <div class="gold-sjc-wrap">
        <div class="gold-sjc-quote-grid">
          <div class="gold-sjc-quote-item">
            <div class="gold-sjc-quote-label">Mua vào</div>
            <div class="gold-sjc-quote-value">${escapeHtml(formatVnd(current.open))}</div>
          </div>
          <div class="gold-sjc-quote-item">
            <div class="gold-sjc-quote-label">Bán ra</div>
            <div class="gold-sjc-quote-value">${escapeHtml(formatVnd(current.close))}</div>
          </div>
        </div>
        <div class="gold-sjc-top">
          <div class="gold-sjc-change ${isUp ? 'up' : 'down'}">
            ${isUp ? '+' : ''}${current.change.toLocaleString('vi-VN')} (${isUp ? '+' : ''}${current.changePct.toFixed(2)}%)
          </div>
        </div>
        <div class="gold-sjc-meta">
          <span>Mở: ${escapeHtml(formatVnd(current.open))}</span>
          <span>Thấp/Cao: ${escapeHtml(formatVnd(current.low))} - ${escapeHtml(formatVnd(current.high))}</span>
        </div>
        <div class="gold-sjc-chart-wrap">${chart}</div>
        <div class="gold-sjc-foot">Nguồn: vang.today · Cập nhật: ${escapeHtml(formatTime(current.ts))}</div>
      </div>
    `;

    this.setContent(html);
  }
}
