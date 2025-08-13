import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { SeriesSettingsService } from '../../services/seriesSettingsService';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  constructor(
    private SeriesSettings: SeriesSettingsService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private store: SeriesStoreService
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
          animation: settings.animation,
        });
        this.tagNames = [...settings.tags];
        this.cd.detectChanges();
      });
    this.genreList = this.store.genreList$;
    this.typeList = this.store.typeList$;
    this.animationList = this.store.animationList$;
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
    this.seriesFilterForm.reset(defaultFilterSettings);
    this.tagNames = [];
  }
}
