import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { SUPPORTED_LANGS, SupportedLang, saveLang } from '../../core/i18n';

const LANG_LABELS: Record<SupportedLang, string> = {
  en: 'EN',
  hy: 'ՀԱՅ',
  ru: 'РУС',
};

@Component({
  selector: 'app-lang-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lang-switcher">
      <button type="button" class="lang-toggle" (click)="open = !open">
        {{ label(translate.currentLang()) }}
      </button>
      <div class="lang-dropdown" *ngIf="open">
        <button type="button" class="lang-option" *ngFor="let lang of langs"
                [class.active]="lang === translate.currentLang()"
                (click)="select(lang)">
          {{ label(lang) }}
        </button>
      </div>
    </div>
  `
})
export class LangSwitcherComponent {
  langs = SUPPORTED_LANGS;
  open = false;

  constructor(protected translate: TranslateService, private hostRef: ElementRef) {}

  label(lang: string | null): string {
    return lang && lang in LANG_LABELS ? LANG_LABELS[lang as SupportedLang] : LANG_LABELS.en;
  }

  select(lang: SupportedLang) {
    this.translate.use(lang);
    saveLang(lang);
    this.open = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.open && !this.hostRef.nativeElement.contains(event.target)) {
      this.open = false;
    }
  }
}
