import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-site-options',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div [formGroup]="formGroup">
      <label for="site">Site:</label>
      <select id="site" [formControlName]="controlName">
        <option value=""></option>
        <option *ngFor="let site of sites" [value]="site">{{ site }}</option>
      </select>
    </div>
  `,
  styles: ``
})
export class SiteOptionsComponent {
  @Input() controlName!: string;
  @Input() formGroup!: FormGroup;

  readonly sites = [
    'crickhowell',
    'abergavenny',
    'llangattock',
    'llangynidr',
    'glangrywny',
    'brecon'
  ];
}
