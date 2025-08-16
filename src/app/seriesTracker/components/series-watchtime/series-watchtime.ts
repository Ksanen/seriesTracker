import { CommonModule } from '@angular/common';
import { Component, effect, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import defaultWatchTime from '../../../shared/utils/defaultValues/defaultWatchTimeValues';
@Component({
  selector: 'series-watchtime',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './series-watchtime.html',
  styleUrl: './series-watchtime.css',
})
export class SeriesWatchtime {
  showWatchTime = input<boolean>(false);
  form = input<FormGroup>(new FormGroup({}));
  constructor() {
    effect(() => {
      if (this.showWatchTime() === false) {
        this.resetWatchTime();
      }
    });
  }
  resetWatchTime() {
    this.form().patchValue(defaultWatchTime);
  }
}
