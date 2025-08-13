import { CommonModule } from '@angular/common';
import { Component, effect, Input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'series-watchtime',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './series-watchtime.html',
  styleUrl: './series-watchtime.css',
})
export class SeriesWatchtime {
  @Input() showWatchTime = signal(false);
  @Input() form!: FormGroup;
  constructor() {
    effect(() => {
      if (this.showWatchTime() === false) {
        this.resetWatchTime();
      }
    });
  }
  resetWatchTime() {
    this.form.patchValue({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  }
}
