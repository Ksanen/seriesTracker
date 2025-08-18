import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { Tag } from '../../components/tag/tag';
import {
  FormBuilder,
  FormControl,
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
import { NamesService } from '../../services/names-service';
import { Observable } from 'rxjs';
import { SeriesNames } from '../../components/series-names/series-names';
import { SeriesWatchtime } from '../../components/series-watchtime/series-watchtime';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'series-add',
  imports: [
    Tag,
    FormsModule,
    AddTag,
    ReactiveFormsModule,
    CommonModule,
    SeriesNames,
    SeriesWatchtime,
  ],
  standalone: true,
  templateUrl: './series-add.html',
  styleUrl: './series-add.css',
})
export class SeriesAdd implements OnInit {
  show = input<boolean>(false);
  genreList!: Observable<string[]>;
  typeList!: Observable<string[]>;
  animationList!: Observable<string[]>;
  namesValues: string[] = [];
  destroyRef = inject(DestroyRef);
  error: string = '';
  ngOnInit(): void {
    this.genreList = this.store.genreList$;
    this.typeList = this.store.typeList$;
    this.animationList = this.store.animationList$;
  }
  seriesForm!: FormGroup;
  wasValidated: boolean = false;
  get watchTimeGroup(): FormGroup {
    return this.seriesForm.get('watchTime') as FormGroup;
  }
  constructor(
    private fb: FormBuilder,
    private store: SeriesStoreService,
    private view: SeriesViewService,
    private namesService: NamesService,
    private cd: ChangeDetectorRef
  ) {
    this.seriesForm = this.fb.group({
      name: ['', Validators.required],
      type: '',
      genre: '',
      animation: '',
      season: null,
      episode: null,
      watchTimeActive: false,
      watchTime: new FormGroup({
        hours: new FormControl(0),
        minutes: new FormControl(0),
        seconds: new FormControl(0),
      }),
      watched: 0,
    });
  }
  tagNames: string[] = [];
  close() {
    this.view.toggleAddSeriesForm();
    this.wasValidated = false;
    this.seriesForm.reset(defaultSeriesFormValues);
    this.namesValues = [];
    this.error = '';
  }
  removeTag(tagNameToRemove: string) {
    this.tagNames = this.tagNames.filter(
      (tagName) => tagName !== tagNameToRemove
    );
  }
  onSubmit() {
    if (this.seriesForm.invalid) {
      this.wasValidated = true;
      return;
    }
    const form = this.seriesForm.value;
    let names: string[] = this.namesService.removeUnnecessaryNames(
      this.namesValues
    );
    const namesToSubmit = [form.name, ...names];
    const objectToSubmit: SeriesToSend = {
      names: namesToSubmit,
      ...form,
      tagNames: this.tagNames,
    };
    this.store
      .addSeries(objectToSubmit)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.close();
        },
        error: (e) => {
          switch (e.status) {
            case 409:
              this.error = 'this name already exists';
              break;
          }
          this.cd.detectChanges();
        },
      });
  }
}
