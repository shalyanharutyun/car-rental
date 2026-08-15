import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANG, SUPPORTED_LANGS, SupportedLang, saveLang } from '../../core/i18n';

const LANG_LABELS: Record<SupportedLang, string> = {
  en: 'EN',
  hy: 'Հայ',
  ru: 'Рус',
};

@Component({
  selector: 'app-lang-switcher',
  standalone: true,
  template: `
    <div class="lang-switcher">
      <button type="button" class="lang-toggle" (click)="open.set(!open())">
        {{ label(translate.currentLang()) }}
      </button>
      @if (open()) {
        <div class="lang-dropdown">
          @for (lang of langs; track lang) {
            <button type="button" class="lang-option"
                    [class.active]="lang === translate.currentLang()"
                    (click)="select(lang)">
              {{ label(lang) }}
            </button>
          }
        </div>
      }
    </div>
  `
})
export class LangSwitcherComponent {
  protected readonly langs = SUPPORTED_LANGS;
  protected readonly open = signal(false);
  protected readonly translate = inject(TranslateService);

  private readonly hostRef = inject(ElementRef);

  label(lang: string | null): string {
    return lang && lang in LANG_LABELS ? LANG_LABELS[lang as SupportedLang] : LANG_LABELS[DEFAULT_LANG];
  }

  select(lang: SupportedLang) {
    this.translate.use(lang);
    saveLang(lang);
    this.open.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.open() && !this.hostRef.nativeElement.contains(event.target)) {
      this.open.set(false);
    }
  }
}

