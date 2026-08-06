import { Component, effect, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from './core/theme.service';
import { DEFAULT_LANG } from './core/i18n';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('car-rental-ui');

  private readonly document = inject(DOCUMENT);
  private readonly translate = inject(TranslateService);

  constructor(private themeService: ThemeService) {
    effect(() => {
      this.document.documentElement.lang = this.translate.currentLang() || DEFAULT_LANG;
    });
  }
}
