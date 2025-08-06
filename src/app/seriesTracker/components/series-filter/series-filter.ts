import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { SeriesSettingsService } from '../../services/seriesSettingsService';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AddTag } from '../add-tag/add-tag';
import { Tag } from '../tag/tag';

@Component({
  selector: 'series-filter',
  imports: [AddTag, Tag],
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
          tags: settings.tags,
        });
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
    this.SeriesSettings.saveViewSettings(value);
  }
}
