import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  SeriesInterface,
  SeriesToSend,
} from '../../../../shared/interfaces/series';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeriesApiService } from '../../../services/seriesApiService';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Tag } from '../../tag/tag';
import { AddTag } from '../../add-tag/add-tag';
import { CommonModule } from '@angular/common';
import { SeriesStoreService } from '../../../services/seriesStoreService';
import { SeriesViewService } from '../../../services/seriesViewService';
import { NamesService } from '../../../services/names-service';
import { Observable } from 'rxjs';
import { SeriesNames } from '../../series-names/series-names';
import { SeriesWatchtime } from '../../series-watchtime/series-watchtime';
@Component({
  selector: 'series-form',
  imports: [
    FormsModule,
    Tag,
    AddTag,
    ReactiveFormsModule,
    CommonModule,
    SeriesNames,
    SeriesWatchtime,
  ],
  templateUrl: './series-form.html',
  styleUrl: '../series.css',
})
export class SeriesForm implements OnInit {
  @Input() series!: SeriesInterface;
  @Input() even!: boolean;
  @Output() closeForm = new EventEmitter();
  namesValues: string[] = [];
  tagNames: string[] = [];
  seriesForm!: FormGroup;
  showWatchTime = signal(false);
  wasValidated: boolean = false;
  genreList!: Observable<string[]>;
  typeList!: Observable<string[]>;
  animationList!: Observable<string[]>;
  destroyRef = inject(DestroyRef);
  toggleShowWatchTime() {
    this.showWatchTime.set(!this.showWatchTime());
  }
  get watchTimeForm(): FormGroup {
    return this.seriesForm.get('watchTime') as FormGroup;
  }
  ngOnInit(): void {
    this.showWatchTime.set(this.series.watchTimeActive);
    this.seriesForm = this.fb.group({
      name: [this.series.names[0], Validators.required],
      type: this.series.type,
      genre: this.series.genre,
      animation: this.series.animation,
      season: this.series.season,
      episode: this.series.episode,
      watchTimeActive: this.series.watchTimeActive,
      watchTime: new FormGroup({
        hours: new FormControl(this.series.watchTime.hours),
        minutes: new FormControl(this.series.watchTime.minutes),
        seconds: new FormControl(this.series.watchTime.seconds),
      }),
      watched: this.series.watched,
    });
    this.namesValues = this.series.names;
    this.tagNames = [...this.series.tagNames];
    this.genreList = this.store.genreList$;
    this.typeList = this.store.typeList$;
    this.animationList = this.store.animationList$;
  }
  constructor(
    private fb: FormBuilder,
    private seriesService: SeriesApiService,
    private cd: ChangeDetectorRef,
    private store: SeriesStoreService,
    private view: SeriesViewService,
    private namesService: NamesService
  ) {}
  onSaveSeries() {
    if (this.seriesForm.invalid) {
      console.log('invalid');
      this.wasValidated = true;
      return;
    }
    const form = this.seriesForm.value;
    const names = this.namesService.removeUnnecessaryNames(this.namesValues);
    const namesToSend: string[] = [form.name, ...names];
    const series: SeriesToSend = {
      names: namesToSend,
      ...form,
      tagNames: this.tagNames,
    };
    this.seriesService
      .update(this.series._id, series)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          Object.assign(this.series, series);
          this.closeForm.emit();
          this.store.getTags();
          this.cd.detectChanges();
          this.wasValidated = false;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  delete() {
    this.store.setIdOfSeriesToDelete(this.series._id);
    this.view.toggleShowDeleteSeriesConfirmation();
    this.view.toggleOverlay();
  }
  removeTag(tagToRemove: string) {
    this.tagNames = this.tagNames.filter((tagName) => tagName !== tagToRemove);
  }
}
