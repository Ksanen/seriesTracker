import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { SeriesSettingsService } from '../../services/seriesSettingsService';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { AddTag } from '../add-tag/add-tag';
import { Tag } from '../tag/tag';
import defaultFilterSettings from '../../../shared/utils/defaultValues/defaultFilterSettings';
import { Observable } from 'rxjs';
import { SeriesStoreService } from '../../services/seriesStoreService';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'series-filter',
  imports: [AddTag, Tag, ReactiveFormsModule, AsyncPipe],
  standalone: true,
  templateUrl: './series-filter.html',
  styleUrl: './series-filter.css',
})
export class SeriesFilter implements OnInit {
  tagNames: string[] = [];
  destroyRef = inject(DestroyRef);
  seriesFilterForm!: FormGroup;
  genreList!: Observable<string[]>;
  typeList!: Observable<string[]>;
  animationList!: Observable<string[]>;
  seriesSettings = inject(SeriesSettingsService);
  settings = toSignal(this.seriesSettings.filterSettings$, {
    initialValue: defaultFilterSettings,
  });
  constructor(private fb: FormBuilder, private store: SeriesStoreService) {}
  ngOnInit(): void {
    this.seriesFilterForm = this.fb.group({
      season: this.settings().season,
      episode: this.settings().episode,
      watched: this.settings().watched,
      type: this.settings().type,
      genre: this.settings().genre,
      animation: this.settings().animation,
    });
    this.tagNames = [...this.settings().tags];
    this.genreList = this.store.genreList$;
    this.typeList = this.store.typeList$;
    this.animationList = this.store.animationList$;
  }
  removeTag(tagNameToRemove: string) {
    this.tagNames = this.tagNames.filter(
      (tagName) => tagName !== tagNameToRemove
    );
  }
  updateFilterSettings() {
    const value = this.seriesFilterForm.value;
    value.tags = this.tagNames;
    this.seriesSettings.updateFilterSettings(value);
  }
  onSubmit() {
    this.updateFilterSettings();
  }
  clearSettings() {
    this.seriesFilterForm.reset(defaultFilterSettings);
    this.tagNames = [];
    this.updateFilterSettings();
  }
}
