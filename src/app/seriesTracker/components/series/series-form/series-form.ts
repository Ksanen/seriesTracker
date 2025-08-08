import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import SeriesInterface from '../../../../shared/interfaces/series';
import SeriesToSend from '../../../../shared/interfaces/seriesToSend';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeriesApiService } from '../../../services/seriesApiService';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Tag } from '../../tag/tag';
import { AddTag } from '../../add-tag/add-tag';
import { CommonModule } from '@angular/common';
import { SeriesStoreService } from '../../../services/seriesStoreService';
import { SeriesViewService } from '../../../services/seriesViewService';
@Component({
  selector: 'series-form',
  imports: [FormsModule, Tag, AddTag, ReactiveFormsModule, CommonModule],
  templateUrl: './series-form.html',
  styleUrl: './series-form.css',
})
export class SeriesForm implements OnInit {
  @Input() series!: SeriesInterface;
  @Input() even!: boolean;
  @Output() closeForm = new EventEmitter();
  tagNames: string[] = [];
  seriesForm!: FormGroup;
  showWatchTime!: boolean;
  destroyRef = inject(DestroyRef);
  toggleShowWatchTime() {
    this.showWatchTime = !this.showWatchTime;
  }
  ngOnInit(): void {
    this.showWatchTime = this.series.watchTimeActive;
    this.seriesForm = this.fb.group({
      name: [this.series.name, Validators.required],
      type: this.series.type,
      genre: this.series.genre,
      season: this.series.season,
      episode: this.series.episode,
      watchTimeActive: this.series.watchTimeActive,
      hours: this.series.watchTime.hours,
      minutes: this.series.watchTime.minutes,
      seconds: this.series.watchTime.seconds,
      watched: this.series.watched,
    });
    this.tagNames = [...this.series.tagNames];
  }
  constructor(
    private fb: FormBuilder,
    private seriesService: SeriesApiService,
    private cd: ChangeDetectorRef,
    private store: SeriesStoreService,
    private view: SeriesViewService
  ) {}
  cancelChanges() {
    this.seriesForm.reset({
      name: this.series.name,
      type: this.series.type,
      genre: this.series.genre,
      season: this.series.season,
      episode: this.series.episode,
      hours: this.series.watchTime.hours,
      watchTimeActive: this.series.watchTimeActive,
      minutes: this.series.watchTime.minutes,
      seconds: this.series.watchTime.seconds,
      watched: this.series.watched,
    });
    this.tagNames = [...this.series.tagNames];
    this.closeForm.emit();
  }
  save() {
    const form = this.seriesForm.value;
    const series: SeriesToSend = {
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
    this.seriesService
      .update(this.series._id, series)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          Object.assign(this.series, series);
          this.closeForm.emit();
          this.cd.detectChanges();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  delete() {
    this.store.idOfSeriesToDelete = this.series._id;
    this.view.toggleShowDeleteSeriesConfirmation();
    this.view.toggleOverlay();
  }
  removeTag(tagToRemove: string) {
    this.tagNames = this.tagNames.filter((tagName) => tagName !== tagToRemove);
  }
}
