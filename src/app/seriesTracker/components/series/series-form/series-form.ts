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
import { SeriesHelperService } from '../../../services/series-helper-service';
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
  namesExcludingFirst: string[] = [];
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
    const names = structuredClone(this.series.names);
    this.namesExcludingFirst = names.splice(1);
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
    private namesService: NamesService,
    private helper: SeriesHelperService
  ) {}
  onSaveSeries() {
    this.wasValidated = true;
    if (this.helper.isFormValid(this.seriesForm) === false) return;
    const form = this.seriesForm.value;
    const series: SeriesToSend = {
      names: this.namesService.createNamesToSubmit(
        this.seriesForm,
        this.namesExcludingFirst
      ),
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
