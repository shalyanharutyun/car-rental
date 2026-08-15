import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-why-choose',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="why-choose" *ngIf="visible">
      <button type="button" class="why-choose-close" (click)="visible = false" aria-label="Dismiss">×</button>
      <h4 class="why-choose-title">{{ 'whyChoose.title' | translate }}</h4>
      <ul class="why-choose-list">
        <li><span class="why-choose-check">✓</span> {{ 'whyChoose.item1' | translate }}</li>
        <li><span class="why-choose-check">✓</span> {{ 'whyChoose.item2' | translate }}</li>
        <li><span class="why-choose-check">✓</span> {{ 'whyChoose.item3' | translate }}</li>
        <li><span class="why-choose-check">✓</span> {{ 'whyChoose.item4' | translate }}</li>
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
