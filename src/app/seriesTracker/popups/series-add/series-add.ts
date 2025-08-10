import {
  Component,
  effect,
  Input,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { Tag } from '../../components/tag/tag';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddTag } from '../../components/add-tag/add-tag';
import SeriesToSend from '../../../shared/interfaces/seriesToSend';
import { CommonModule } from '@angular/common';
import { SeriesStoreService } from '../../services/seriesStoreService';
import { SeriesViewService } from '../../services/seriesViewService';
import defaultSeriesFormValues from '../../../shared/utils/defaultSeriesFormValues';
import { SeriesRemovableNameInput } from '../../components/series-removable-name-input/series-removable-name-input';
import RemovableName from '../../../shared/interfaces/removableName';
@Component({
  selector: 'series-add',
  imports: [
    Tag,
    FormsModule,
    AddTag,
    ReactiveFormsModule,
    CommonModule,
    SeriesRemovableNameInput,
  ],
  standalone: true,
  templateUrl: './series-add.html',
  styleUrl: './series-add.css',
})
export class SeriesAdd {
  removeName(id: number) {
    this.names = this.names.filter((name) => name.id !== id);
  }
  seriesForm!: FormGroup;
  names: RemovableName[] = [];
  wasValidated: boolean = false;
  showWatchTime: boolean = false;
  @Input() show: boolean = false;
  constructor(
    private fb: FormBuilder,
    private store: SeriesStoreService,
    private view: SeriesViewService
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
    this.view.toggleAddSeriesForm();
    this.view.toggleOverlay();
    this.wasValidated = false;
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
      this.wasValidated = true;
      return;
    }
    this.store.addSeries(objectToSubmit);
    this.seriesForm.reset(defaultSeriesFormValues);
    this.wasValidated = false;
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
  addNewName() {
    if (
      this.names.length > 0 &&
      this.names[this.names.length - 1].value === ''
    ) {
      return;
    }
    const idOfNames = this.names.map((name) => name.id);
    let id = Math.floor(Math.random() * 1000);
    while (idOfNames.includes(id)) {
      console.log(id);
      id = Math.floor(Math.random() * 1000);
    }
    this.names.push({
      id: id,
      value: '',
    });
  }
}
