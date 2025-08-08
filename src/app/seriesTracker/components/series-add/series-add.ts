import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Tag } from '../tag/tag';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddTag } from '../add-tag/add-tag';
import SeriesToSend from '../../../shared/interfaces/seriesToSend';
import { CommonModule } from '@angular/common';
import { SeriesStoreService } from '../../services/seriesStoreService';
import { AppService } from '../../../services/app-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'series-add',
  imports: [Tag, FormsModule, AddTag, ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './series-add.html',
  styleUrl: './series-add.css',
})
export class SeriesAdd implements OnInit {
  seriesForm!: FormGroup;
  showWatchTime: boolean = false;
  destroyRef = inject(DestroyRef);
  showForm: boolean = false;
  ngOnInit(): void {
    this.appService.options$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((options) => {
        this.showForm = options.showAddSeriesForm;
      });
  }
  constructor(
    private fb: FormBuilder,
    private store: SeriesStoreService,
    private appService: AppService
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
    this.appService.toggleAddSeriesForm();
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
