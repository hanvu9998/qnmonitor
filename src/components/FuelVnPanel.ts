import { Panel } from './Panel';
import { escapeHtml } from '@/utils/sanitize';

interface FuelItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  change: number;
  changePct: number;
}

interface FuelResponse {
  source: string;
  cache: 'hit' | 'miss' | 'stale';
  fetchedAt: string;
  effectiveAt: string | null;
  items: FuelItem[];
}

function formatVnd(value: number): string {
  return `${Math.round(value).toLocaleString('vi-VN')} VND`;
}

function formatTime(iso: string | null): string {
  if (!iso) return 'N/A';
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

export class FuelVnPanel extends Panel {
  private loading = true;
  private data: FuelResponse | null = null;
  private error: string | null = null;
  private refreshBtn: HTMLButtonElement | null = null;
  private refreshing = false;

  constructor() {
    super({ id: 'fuel-vn', title: 'Giá xăng dầu Việt Nam', showCount: true });
    this.createRefreshButton();
    void this.fetchData();
  }

  private createRefreshButton(): void {
    this.refreshBtn = document.createElement('button');
    this.refreshBtn.className = 'panel-refresh-btn';
    this.refreshBtn.innerHTML = '&#x21bb;';
    this.refreshBtn.title = 'Reload fuel prices';
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
        const resp = await fetch('/api/fuel-vn', { signal: AbortSignal.timeout(12_000) });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const payload = await resp.json() as FuelResponse;
        if (!Array.isArray(payload.items) || payload.items.length === 0) {
          throw new Error('Empty fuel data');
        }
        this.data = payload;
        this.error = null;
        this.loading = false;
        this.renderPanel();
        return;
      } catch (err) {
        if (this.isAbortError(err)) return;
        if (attempt === 0) {
          this.showRetrying('Retrying fuel prices...');
          await new Promise((resolve) => setTimeout(resolve, 1500));
          continue;
        }
        this.error = err instanceof Error ? err.message : 'Failed to fetch fuel prices';
      }
    }

    this.loading = false;
    this.renderPanel();
  }

  private renderPanel(): void {
    if (this.loading) {
      this.showLoading('Loading Vietnam fuel prices...');
      return;
    }

    if (this.error || !this.data || this.data.items.length === 0) {
      this.setDataBadge('unavailable');
      this.showError(this.error || 'No fuel price data available');
      this.setCount(0);
      return;
    }

    this.setDataBadge(this.data.cache === 'stale' ? 'cached' : 'live');
    this.setCount(this.data.items.length);

    const rows = this.data.items.map((item) => {
      const isUp = item.change >= 0;
      const changeClass = item.change === 0 ? 'flat' : isUp ? 'up' : 'down';
      const changeLabel = item.change === 0
        ? '0'
        : `${isUp ? '+' : ''}${item.change.toLocaleString('vi-VN')} (${isUp ? '+' : ''}${item.changePct.toFixed(2)}%)`;

      return `
        <div class="fuel-vn-row">
          <div class="fuel-vn-name">${escapeHtml(item.name)}</div>
          <div class="fuel-vn-right">
            <div class="fuel-vn-price">${escapeHtml(formatVnd(item.price))}</div>
            <div class="fuel-vn-change ${changeClass}">${escapeHtml(changeLabel)}</div>
          </div>
        </div>
      `;
    }).join('');

    this.setContent(`
      <div class="fuel-vn-wrap">
        <div class="fuel-vn-list">${rows}</div>
        <div class="fuel-vn-foot">
          Nguồn: ${escapeHtml(this.data.source)} · Kỳ điều hành: ${escapeHtml(formatTime(this.data.effectiveAt))} · Cập nhật: ${escapeHtml(formatTime(this.data.fetchedAt))}
        </div>
      </div>
    `);
  }
}

