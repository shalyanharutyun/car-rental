import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-why-choose',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="why-choose" *ngIf="visible">
      <button type="button" class="why-choose-close" (click)="visible = false" aria-label="Dismiss">×</button>
      <h4 class="why-choose-title">Why choose MyRide</h4>
      <ul class="why-choose-list">
        <li><span class="why-choose-check">✓</span> Verified hosts &amp; inspected vehicles</li>
        <li><span class="why-choose-check">✓</span> 24/7 roadside support</li>
        <li><span class="why-choose-check">✓</span> Transparent pricing, no hidden fees</li>
        <li><span class="why-choose-check">✓</span> Flexible cancellation</li>
      </ul>
    </div>
  `
})
export class WhyChooseComponent {
  visible = true;

  show() {
    this.visible = true;
  }
}
