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
import { SeriesRemovableNameInput } from '../../series-removable-name-input/series-removable-name-input';
import RemovableName from '../../../../shared/interfaces/removableName';
import { NamesService } from '../../../services/names-service';
import { Observable } from 'rxjs';
@Component({
  selector: 'series-form',
  imports: [
    FormsModule,
    Tag,
    AddTag,
    ReactiveFormsModule,
    CommonModule,
    SeriesRemovableNameInput,
  ],
  templateUrl: './series-form.html',
  styleUrl: '../series.css',
})
export class SeriesForm implements OnInit {
  @Input() series!: SeriesInterface;
  @Input() even!: boolean;
  @Output() closeForm = new EventEmitter();
  names: RemovableName[] = [];
  tagNames: string[] = [];
  seriesForm!: FormGroup;
  showWatchTime!: boolean;
  wasValidated: boolean = false;
  genreList!: Observable<string[]>;
  typeList!: Observable<string[]>;
  animationList!: Observable<string[]>;
  destroyRef = inject(DestroyRef);
  toggleShowWatchTime() {
    this.showWatchTime = !this.showWatchTime;
  }
  addNewName() {
    const newName = this.namesService.addNewName(this.names);
    if (!newName) return;
    this.names.push(newName);
  }
  removeName(id: number) {
    this.names = this.namesService.removeName(this.names, id);
  }
  ngOnInit(): void {
    this.showWatchTime = this.series.watchTimeActive;
    this.seriesForm = this.fb.group({
      name: [this.series.names[0], Validators.required],
      type: this.series.type,
      genre: this.series.genre,
      animation: this.series.animation,
      season: this.series.season,
      episode: this.series.episode,
      watchTimeActive: this.series.watchTimeActive,
      hours: this.series.watchTime.hours,
      minutes: this.series.watchTime.minutes,
      seconds: this.series.watchTime.seconds,
      watched: this.series.watched,
    });
    this.names = this.namesService.createRemovableNamesArray(this.series.names);
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
  cancelChanges() {
    this.seriesForm.reset({
      name: this.series.names[0],
      type: this.series.type,
      genre: this.series.genre,
      animation: this.series.animation,
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
    if (!this.showWatchTime) {
      this.resetWatchTime();
    }
    if (this.seriesForm.invalid) {
      console.log('invalid');
      this.wasValidated = true;
      return;
    }
    const form = this.seriesForm.value;
    let names = this.names.map((name) => name.value);
    names = this.namesService.removeUnnecessaryNames(names);
    const namesToSend: string[] = [form.name, ...names];
    const series: SeriesToSend = {
      names: namesToSend,
      type: form.type,
      genre: form.genre,
      animation: form.animation,
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
    //
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
  resetWatchTime() {
    this.seriesForm.patchValue({
      hours: 0,
      minutes: 0,
      seconds: 0,
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
