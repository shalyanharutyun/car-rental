import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-oauth2-redirect',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <div class="auth-page">
      <p>{{ 'auth.signingIn' | translate }}</p>
    </div>
  `
})
export class OAuth2RedirectComponent {

  constructor(route: ActivatedRoute, router: Router) {
    const token = route.snapshot.queryParamMap.get('token');

    if (token) {
      localStorage.setItem('token', token);
      router.navigate(['/cars']);
    } else {
      router.navigate(['/login']);
    }
  }
}
