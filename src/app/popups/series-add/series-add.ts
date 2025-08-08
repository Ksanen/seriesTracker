import { Component, Input } from '@angular/core';
import { Tag } from '../../seriesTracker/components/tag/tag';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddTag } from '../../seriesTracker/components/add-tag/add-tag';
import SeriesToSend from '../../shared/interfaces/seriesToSend';
import { CommonModule } from '@angular/common';
import { SeriesStoreService } from '../../seriesTracker/services/seriesStoreService';
import { AppService } from '../../services/app-service';
@Component({
  selector: 'series-add',
  imports: [Tag, FormsModule, AddTag, ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './series-add.html',
  styleUrl: './series-add.css',
})
export class SeriesAdd {
  seriesForm!: FormGroup;
  showWatchTime: boolean = false;
  @Input() show: boolean = false;
  constructor(
    private fb: FormBuilder,
    private store: SeriesStoreService,
    private app: AppService
  ) {
    this.seriesForm = this.fb.group({
      name: ['', Validators.required],
      type: '',
      genre: '',
      season: 0,
      episode: 0,
      hours: 0,
      watchTimeActive: false,
      minutes: 0,
      seconds: 0,
      watched: 0,
    });
  }
  tagNames: string[] = [];
  close() {
    this.app.toggleAddSeriesForm();
    this.app.toggleOverlay();
  }
  removeTag(tagNameToRemove: string) {
    this.tagNames = this.tagNames.filter(
      (tagName) => tagName !== tagNameToRemove
    );
  }
  onSubmit() {
    const form = this.seriesForm.value;
    const objectToSubmit: SeriesToSend = {
      name: form.name,
      type: form.type,
      genre: form.genre,
      season: form.season,
      episode: form.episode,
      watchTimeActive: form.watchTimeActive,
      watchTime: {
        hours: form.hours,
        minutes: form.minutes,
        seconds: form.seconds,
      },
      watched: form.watched,
      tagNames: this.tagNames,
    };
    if (this.seriesForm.invalid) {
      console.log('invalid');
      return;
    }
    this.store.addSeries(objectToSubmit);
    this.close();
  }
  toggleShowWatchTime() {
    this.showWatchTime = !this.showWatchTime;
    this.resetWatchTime();
  }
  resetWatchTime() {
    this.seriesForm.patchValue({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  }
}
