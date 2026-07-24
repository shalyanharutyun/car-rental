import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  template: `
    <a class="logo" routerLink="/cars">
      <span class="logo-word">
        <span class="logo-my">My</span><span class="logo-ride">Ride</span>
        <svg class="logo-icon" viewBox="0 0 42 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M2 17c6-.8 10.5-5 16-8.6C23.3 4 29.5 3 36 5" stroke="var(--logo-icon)" stroke-width="2.4" stroke-linecap="round" fill="none"/>
          <path d="M32 1.5l6 3.5-6 3.5" stroke="var(--logo-icon)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <path d="M3 17.8c0-1.2.6-2.3 1.6-2.9l2.3-4.6a4 4 0 0 1 3.6-2.2h7.8a4 4 0 0 1 3.6 2.2l2.3 4.6c1 .6 1.6 1.7 1.6 2.9v2.3a1.3 1.3 0 0 1-1.3 1.3H23a1.3 1.3 0 0 1-1.3-1.3v-.5H8.3v.5A1.3 1.3 0 0 1 7 21.4H4.3A1.3 1.3 0 0 1 3 20.1v-2.3Z" fill="var(--logo-navy)"/>
          <circle cx="7.7" cy="18.9" r="1.5" fill="var(--surface)"/>
          <circle cx="19.3" cy="18.9" r="1.5" fill="var(--surface)"/>
        </svg>
      </span>
      <span class="logo-tagline" *ngIf="showTagline">{{ 'logo.tagline' | translate }}</span>
    </a>
  `
})
export class LogoComponent {
  @Input() showTagline = false;
}
