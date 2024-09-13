import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-end-year-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div [formGroup]="formGroup">
      <label for="endYear">End Year:</label>
      <input id="endYear" [formControlName]="controlName" />
    </div>
  `,
  styles: ``
})
export class EndYearInputComponent {
  @Input() controlName!: string;
  @Input() formGroup!: FormGroup;
}
