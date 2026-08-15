import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-account-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  template: `
    <div class="account-menu" *ngIf="email; else guest">
      <button type="button" class="account-avatar" (click)="open = !open" [title]="email">
        {{ initial }}
      </button>
      <div class="account-dropdown" *ngIf="open">
        <div class="account-dropdown-email">
          <span class="account-dropdown-label">{{ 'nav.loggedInAs' | translate }}</span>
          <span class="account-dropdown-value">{{ email }}</span>
        </div>
        <button type="button" class="account-dropdown-logout" (click)="logout()">{{ 'nav.logOut' | translate }}</button>
      </div>
    </div>
    <ng-template #guest>
      <a class="btn-logout" routerLink="/login">{{ 'nav.logIn' | translate }}</a>
    </ng-template>
  `
})
export class AccountMenuComponent {

  open = false;

  constructor(private authService: AuthService, private router: Router, private hostRef: ElementRef) {}

  get email(): string | null {
    return this.authService.getLoggedInEmail();
  }

  get initial(): string {
    return this.email ? this.email.charAt(0).toUpperCase() : '?';
  }

  logout() {
    localStorage.removeItem('token');
    this.open = false;
    this.router.navigate(['/cars']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.open && !this.hostRef.nativeElement.contains(event.target)) {
      this.open = false;
    }
  }
}
