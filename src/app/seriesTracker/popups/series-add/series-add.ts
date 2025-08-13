import { Component, Input, OnInit } from '@angular/core';
import { Tag } from '../../components/tag/tag';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddTag } from '../../components/add-tag/add-tag';
import { SeriesToSend } from '../../../shared/interfaces/series';
import { CommonModule } from '@angular/common';
import { SeriesStoreService } from '../../services/seriesStoreService';
import { SeriesViewService } from '../../services/seriesViewService';
import defaultSeriesFormValues from '../../../shared/utils/defaultValues/defaultSeriesFormValues';
import RemovableName from '../../../shared/interfaces/removableName';
import { NamesService } from '../../services/names-service';
import { Observable } from 'rxjs';
import { SeriesNames } from '../../components/series-names/series-names';
@Component({
  selector: 'series-add',
  imports: [
    Tag,
    FormsModule,
    AddTag,
    ReactiveFormsModule,
    CommonModule,
    SeriesNames,
  ],
  standalone: true,
  templateUrl: './series-add.html',
  styleUrl: './series-add.css',
})
export class SeriesAdd implements OnInit {
  genreList!: Observable<string[]>;
  typeList!: Observable<string[]>;
  animationList!: Observable<string[]>;
  namesValues!: string[];
  ngOnInit(): void {
    this.genreList = this.store.genreList$;
    this.typeList = this.store.typeList$;
    this.animationList = this.store.animationList$;
  }
  seriesForm!: FormGroup;
  names: RemovableName[] = [];
  wasValidated: boolean = false;
  showWatchTime: boolean = false;
  @Input() show: boolean = false;
  constructor(
    private fb: FormBuilder,
    private store: SeriesStoreService,
    private view: SeriesViewService,
    private namesService: NamesService
  ) {
    this.seriesForm = this.fb.group({
      name: ['', Validators.required],
      type: '',
      genre: '',
      animation: '',
      season: null,
      episode: null,
      watchTimeActive: false,
      hours: 0,
      minutes: 0,
      seconds: 0,
      watched: 0,
    });
  }
  tagNames: string[] = [];
  close() {
    this.view.toggleAddSeriesForm();
    this.view.toggleOverlay();
    this.wasValidated = false;
    this.seriesForm.reset(defaultSeriesFormValues);
    this.names = [];
    this.showWatchTime = false;
  }
  removeTag(tagNameToRemove: string) {
    this.tagNames = this.tagNames.filter(
      (tagName) => tagName !== tagNameToRemove
    );
  }
  onSubmit() {
    if (!this.showWatchTime) {
      this.resetWatchTime();
    }
    if (this.seriesForm.invalid) {
      this.wasValidated = true;
      return;
    }
    const form = this.seriesForm.value;
    let names = this.namesService.removeUnnecessaryNames(this.namesValues);

    const namesToSubmit = [form.name, ...names];
    const objectToSubmit: SeriesToSend = {
      names: namesToSubmit,
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

    this.store.addSeries(objectToSubmit);
    this.seriesForm.reset(defaultSeriesFormValues);
    this.wasValidated = false;
    this.close();
  }
  toggleShowWatchTime() {
    this.showWatchTime = !this.showWatchTime;
  }
  resetWatchTime() {
    this.seriesForm.patchValue({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  }
}
