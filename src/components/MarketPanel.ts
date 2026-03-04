import { Panel } from './Panel';
import { t } from '@/services/i18n';
import type { MarketData, CryptoData } from '@/types';
import { formatPrice, formatChange, getChangeClass, getHeatmapClass } from '@/utils';
import { escapeHtml } from '@/utils/sanitize';
import { SITE_VARIANT } from '@/config';

function miniSparkline(data: number[] | undefined, change: number | null, w = 50, h = 16): string {
  if (!data || data.length < 2) return '';
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const color = change != null && change >= 0 ? 'var(--green)' : 'var(--red)';
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 2) - 1;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" class="mini-sparkline"><polyline points="${points}" fill="none" stroke="${color}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

function formatMarketPrice(stock: MarketData): string {
  const price = stock.price ?? null;
  if (price == null) return 'N/A';
  if (stock.symbol.endsWith('.VN')) {
    return `${price.toLocaleString('vi-VN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })} VN\u0110`;
  }
  return formatPrice(price);
}

export class MarketPanel extends Panel {
  private refreshBtn: HTMLButtonElement | null = null;
  private refreshing = false;
  private refreshHandler: (() => Promise<void> | void) | null = null;

  constructor() {
    super({
      id: 'markets',
      title: SITE_VARIANT === 'quangninh' ? 'Ch\u1EE9ng kho\u00E1n Vi\u1EC7t Nam' : t('panels.markets'),
    });
    this.createRefreshButton();
  }

  public setRefreshHandler(handler: () => Promise<void> | void): void {
    this.refreshHandler = handler;
  }

  private createRefreshButton(): void {
    this.refreshBtn = document.createElement('button');
    this.refreshBtn.className = 'panel-refresh-btn';
    this.refreshBtn.innerHTML = '&#x21bb;';
    this.refreshBtn.title = 'Refresh this panel';
    this.refreshBtn.addEventListener('click', () => { void this.handleRefresh(); });

    const countEl = this.header.querySelector('.panel-count');
    if (countEl) {
      this.header.insertBefore(this.refreshBtn, countEl);
    } else {
      this.header.appendChild(this.refreshBtn);
    }
  }

  private async handleRefresh(): Promise<void> {
    if (this.refreshing || !this.refreshBtn || !this.refreshHandler) return;
    this.refreshing = true;
    this.refreshBtn.disabled = true;
    this.refreshBtn.innerHTML = '<span class="panel-summarize-spinner"></span>';
    try {
      await this.refreshHandler();
    } finally {
      this.refreshing = false;
      this.refreshBtn.disabled = false;
      this.refreshBtn.innerHTML = '&#x21bb;';
    }
  }

  public renderMarkets(data: MarketData[], rateLimited?: boolean): void {
    if (data.length === 0) {
      this.setDataBadge('unavailable');
      this.showError(rateLimited ? t('common.rateLimitedMarket') : t('common.failedMarketData'));
      return;
    }

    this.setDataBadge(rateLimited ? 'cached' : 'live');

    const html = data
      .map(
        (stock) => `
      <div class="market-item">
        <div class="market-info">
          <span class="market-name">${escapeHtml(stock.name)}</span>
          <span class="market-symbol">${escapeHtml(stock.display)}</span>
        </div>
        <div class="market-data">
          ${miniSparkline(stock.sparkline, stock.change)}
          <span class="market-price">${formatMarketPrice(stock)}</span>
          <span class="market-change ${getChangeClass(stock.change!)}">${formatChange(stock.change!)}</span>
        </div>
      </div>
    `
      )
      .join('');

    this.setContent(html);
  }
}

export class HeatmapPanel extends Panel {
  constructor() {
    super({ id: 'heatmap', title: t('panels.heatmap') });
  }

  public renderHeatmap(data: Array<{ name: string; change: number | null }>): void {
    const validData = data.filter((d) => d.change !== null);

    if (validData.length === 0) {
      this.showError(t('common.failedSectorData'));
      return;
    }

    const html =
      '<div class="heatmap">' +
      validData
        .map(
          (sector) => `
        <div class="heatmap-cell ${getHeatmapClass(sector.change!)}">
          <div class="sector-name">${escapeHtml(sector.name)}</div>
          <div class="sector-change ${getChangeClass(sector.change!)}">${formatChange(sector.change!)}</div>
        </div>
      `
        )
        .join('') +
      '</div>';

    this.setContent(html);
  }
}

export class CommoditiesPanel extends Panel {
  constructor() {
    super({ id: 'commodities', title: t('panels.commodities') });
  }

  public renderCommodities(data: Array<{ display: string; price: number | null; change: number | null; sparkline?: number[] }>): void {
    const validData = data.filter((d) => d.price !== null);

    if (validData.length === 0) {
      this.showError(t('common.failedCommodities'));
      return;
    }

    const html =
      '<div class="commodities-grid">' +
      validData
        .map(
          (c) => `
        <div class="commodity-item">
          <div class="commodity-name">${escapeHtml(c.display)}</div>
          ${miniSparkline(c.sparkline, c.change, 60, 18)}
          <div class="commodity-price">${formatPrice(c.price!)}</div>
          <div class="commodity-change ${getChangeClass(c.change!)}">${formatChange(c.change!)}</div>
        </div>
      `
        )
        .join('') +
      '</div>';

    this.setContent(html);
  }
}

export class CryptoPanel extends Panel {
  private refreshBtn: HTMLButtonElement | null = null;
  private refreshing = false;
  private refreshHandler: (() => Promise<void> | void) | null = null;

  constructor() {
    super({ id: 'crypto', title: t('panels.crypto') });
    this.createRefreshButton();
  }

  public setRefreshHandler(handler: () => Promise<void> | void): void {
    this.refreshHandler = handler;
  }

  private createRefreshButton(): void {
    this.refreshBtn = document.createElement('button');
    this.refreshBtn.className = 'panel-refresh-btn';
    this.refreshBtn.innerHTML = '&#x21bb;';
    this.refreshBtn.title = 'Refresh this panel';
    this.refreshBtn.addEventListener('click', () => { void this.handleRefresh(); });

    const countEl = this.header.querySelector('.panel-count');
    if (countEl) {
      this.header.insertBefore(this.refreshBtn, countEl);
    } else {
      this.header.appendChild(this.refreshBtn);
    }
  }

  private async handleRefresh(): Promise<void> {
    if (this.refreshing || !this.refreshBtn || !this.refreshHandler) return;
    this.refreshing = true;
    this.refreshBtn.disabled = true;
    this.refreshBtn.innerHTML = '<span class="panel-summarize-spinner"></span>';
    try {
      await this.refreshHandler();
    } finally {
      this.refreshing = false;
      this.refreshBtn.disabled = false;
      this.refreshBtn.innerHTML = '&#x21bb;';
    }
  }

  public renderCrypto(data: CryptoData[]): void {
    if (data.length === 0) {
      this.setDataBadge('unavailable');
      this.showError(t('common.failedCryptoData'));
      return;
    }

    this.setDataBadge('live');

    const html = data
      .map(
        (coin) => `
      <div class="market-item">
        <div class="market-info">
          <span class="market-name">${escapeHtml(coin.name)}</span>
          <span class="market-symbol">${escapeHtml(coin.symbol)}</span>
        </div>
        <div class="market-data">
          ${miniSparkline(coin.sparkline, coin.change)}
          <span class="market-price">$${coin.price.toLocaleString()}</span>
          <span class="market-change ${getChangeClass(coin.change)}">${formatChange(coin.change)}</span>
        </div>
      </div>
    `
      )
      .join('');

    this.setContent(html);
  }
}


