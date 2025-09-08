import { CommonModule } from '@angular/common';
import { Component, effect, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import defaultWatchTime from '../../../shared/utils/defaultValues/defaultWatchTimeValues';
import { WatchTimeForm } from '../../../shared/interfaces/watchTimeForm';

@Component({
  selector: 'series-watchtime',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './series-watchtime.html',
  styleUrl: './series-watchtime.css',
})
export class SeriesWatchtime {
  showWatchTime = input<boolean>(false);
  form = input.required<FormGroup<WatchTimeForm>>();
  constructor() {
    effect(() => {
      if (this.showWatchTime()) {
        this.resetWatchTime();
      }
    });
  }
  resetWatchTime() {
    this.form().patchValue(defaultWatchTime);
  }
}
