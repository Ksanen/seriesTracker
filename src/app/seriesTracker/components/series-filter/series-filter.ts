import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { SeriesSettingsService } from '../../services/seriesSettingsService';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AddTag } from '../add-tag/add-tag';
import { Tag } from '../tag/tag';
import defaultFilterSettingsValues from '../../../shared/utils/defaultFilterSettingsValues';

@Component({
  selector: 'series-filter',
  imports: [AddTag, Tag, ReactiveFormsModule],
  standalone: true,
  templateUrl: './series-filter.html',
  styleUrl: './series-filter.css',
})
export class SeriesFilter {
  tagNames: string[] = [];
  destroyRef = inject(DestroyRef);
  seriesFilterForm!: FormGroup;
  constructor(
    private SeriesSettings: SeriesSettingsService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.SeriesSettings.filterSettings$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((settings) => {
        this.seriesFilterForm = this.fb.group({
          season: settings.season,
          episode: settings.episode,
          watched: settings.watched,
          type: settings.type,
          genre: settings.genre,
        });
        this.tagNames = [...settings.tags];
        this.cd.detectChanges();
      });
  }
  removeTag(tagNameToRemove: string) {
    this.tagNames = this.tagNames.filter(
      (tagName) => tagName !== tagNameToRemove
    );
  }
  onSubmit() {
    const value = this.seriesFilterForm.value;
    value.tags = this.tagNames;
    this.SeriesSettings.saveFilterSettings(value);
  }
  clearSettings() {
    this.seriesFilterForm.reset(defaultFilterSettingsValues);
    this.tagNames = [];
  }
}
