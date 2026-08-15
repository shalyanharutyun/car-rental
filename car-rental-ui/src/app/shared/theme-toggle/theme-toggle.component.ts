import { Component } from '@angular/core';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  template: `
    <button type="button" class="theme-toggle" (click)="themeService.toggle()"
            [title]="themeService.theme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'">
      {{ themeService.theme() === 'dark' ? '☀️' : '🌙' }}
    </button>
  `
})
export class ThemeToggleComponent {
  constructor(protected themeService: ThemeService) {}
}
