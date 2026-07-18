import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-oauth2-redirect',
  standalone: true,
  template: `
    <div class="auth-page">
      <p>Signing you in...</p>
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
