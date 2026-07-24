import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { NotificationService, AppNotification } from '../../core/notification.service';
import { ThemeToggleComponent } from '../../shared/theme-toggle/theme-toggle.component';
import { LangSwitcherComponent } from '../../shared/lang-switcher/lang-switcher.component';
import { AccountMenuComponent } from '../../shared/account-menu/account-menu.component';
import { LogoComponent } from '../../shared/logo/logo.component';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, RouterLink, ThemeToggleComponent, LangSwitcherComponent, AccountMenuComponent, LogoComponent, TranslatePipe],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {

  notifications: AppNotification[] = [];
  loading = true;

  constructor(private notificationService: NotificationService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.notificationService.getAll().subscribe({
      next: list => { this.notifications = list; this.loading = false; this.cdr.markForCheck(); },
      error: () => { this.loading = false; this.cdr.markForCheck(); }
    });
  }

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  markRead(n: AppNotification) {
    if (n.read) return;
    this.notificationService.markRead(n.id).subscribe(() => { n.read = true; this.cdr.markForCheck(); });
  }

  markAllRead() {
    this.notificationService.markAllRead().subscribe(() => {
      this.notifications.forEach(n => n.read = true);
      this.cdr.markForCheck();
    });
  }

  icon(type: string): string {
    switch (type) {
      case 'BOOKING_CONFIRMED': return '✅';
      case 'CAR_RENTED': return '🚗';
      case 'PAYMENT_FAILED': return '⚠️';
      default: return '🔔';
    }
  }
}
