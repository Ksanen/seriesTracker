import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  input,
  Input,
  OnInit,
  Output,
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
  @Input({ required: true }) series!: SeriesInterface;
  even = input.required<boolean>();
  @Output() closeForm = new EventEmitter();
  namesValues: string[] = [];
  tagNames: string[] = [];
  seriesForm!: FormGroup;
  wasValidated: boolean = false;
  genreList!: Observable<string[]>;
  typeList!: Observable<string[]>;
  animationList!: Observable<string[]>;
  destroyRef = inject(DestroyRef);
  error: string = '';
  get watchTimeForm(): FormGroup {
    return this.seriesForm.get('watchTime') as FormGroup;
  }
  ngOnInit(): void {
    this.seriesForm = this.fb.group({
      name: [this.series.names[0], Validators.required],
      type: new FormControl(this.series.type),
      genre: new FormControl(this.series.genre),
      animation: new FormControl(this.series.animation),
      season: new FormControl(this.series.season),
      episode: new FormControl(this.series.episode),
      watchTimeActive: new FormControl(this.series.watchTimeActive),
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
    let namesToSend: string[] = [form.name, ...this.namesValues];
    namesToSend = this.namesService.removeUnnecessaryNames(namesToSend);
    const series: SeriesToSend = {
      names: namesToSend,
      ...form,
      tagNames: this.tagNames,
    };
    this.store
      .updateSeries(this.series._id, series)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          Object.assign(this.series, series);
          this.close();
        },
        error: (err) => {
          switch (err.status) {
            case 409:
              this.error = 'this name already exists';
              break;
          }
          this.cd.detectChanges();
        },
      });
  }
  close() {
    this.closeForm.emit();
    this.store.getTags();
    this.wasValidated = false;
    this.error = '';
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
