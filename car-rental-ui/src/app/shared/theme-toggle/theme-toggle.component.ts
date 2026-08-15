import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <button type="button" class="theme-toggle" (click)="themeService.toggle()"
            [title]="(themeService.theme() === 'dark' ? 'theme.switchToLight' : 'theme.switchToDark') | translate">
      {{ themeService.theme() === 'dark' ? '☀️' : '🌙' }}
    </button>
  `
})
export class ThemeToggleComponent {
  constructor(protected themeService: ThemeService) {}
}
