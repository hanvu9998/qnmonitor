import type { NewsItem } from '@/types';
import { NewsPanel } from './NewsPanel';
import { escapeHtml } from '@/utils/sanitize';

export interface SocialTab {
  id: string;
  label: string;
  sourceNames: string[];
}

export class SocialNewsPanel extends NewsPanel {
  private tabs: SocialTab[];
  private activeTabId: string;
  private allItems: NewsItem[] = [];
  private tabContainer: HTMLElement;

  constructor(id: string, title: string, tabs: SocialTab[]) {
    super(id, title);
    this.tabs = tabs;
    this.activeTabId = tabs[0]?.id ?? 'all';

    this.tabContainer = document.createElement('div');
    this.tabContainer.className = 'social-tabs';
    this.getElement().insertBefore(this.tabContainer, this.content);
    this.renderTabs();
  }

  public override renderNews(items: NewsItem[]): void {
    this.allItems = items;
    super.renderNews(this.filterItemsByActiveTab(items));
  }

  public override renderFilteredEmpty(message: string): void {
    super.renderFilteredEmpty(message);
  }

  private filterItemsByActiveTab(items: NewsItem[]): NewsItem[] {
    const tab = this.tabs.find((t) => t.id === this.activeTabId);
    if (!tab) return items;
    const allowed = new Set(tab.sourceNames);
    return items.filter((item) => allowed.has(item.source));
  }

  private renderTabs(): void {
    this.tabContainer.innerHTML = this.tabs
      .map((tab) => {
        const active = tab.id === this.activeTabId ? 'active' : '';
        return `<button class="social-tab ${active}" data-tab-id="${escapeHtml(tab.id)}">${escapeHtml(tab.label)}</button>`;
      })
      .join('');

    this.tabContainer.querySelectorAll<HTMLButtonElement>('.social-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tabId = btn.dataset.tabId;
        if (!tabId || tabId === this.activeTabId) return;
        this.activeTabId = tabId;
        this.renderTabs();
        super.renderNews(this.filterItemsByActiveTab(this.allItems));
      });
    });
  }
}

