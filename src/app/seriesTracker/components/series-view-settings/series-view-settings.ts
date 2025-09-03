import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SeriesSettingsService } from '../../services/seriesSettingsService';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'series-view-settings',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './series-view-settings.html',
  styleUrl: './series-view-settings.css',
})
export class SeriesViewSettings implements OnInit {
  destroyRef = inject(DestroyRef);
  seriesViewForm!: FormGroup;
  constructor(
    private SeriesSettings: SeriesSettingsService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.SeriesSettings.viewSettings$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((settings) => {
        this.seriesViewForm = this.fb.group({
          name: settings.name,
          season: settings.season,
          episode: settings.episode,
          watched: settings.watched,
          watchtime: settings.watchtime,
          type: settings.type,
          genre: settings.genre,
          animation: settings.animation,
          tags: settings.tags,
        });
        this.cd.detectChanges();
      });
  }
  onSubmit() {
    const value = this.seriesViewForm.value;
    this.SeriesSettings.saveViewSettings(value);
  }
  setAllFields(value: boolean) {
    const updated = Object.keys(this.seriesViewForm.value).reduce(
      (acc, key) => {
        acc[key] = value;
        return acc;
      },
      {} as any
    );
    this.seriesViewForm.patchValue(updated);
  }
}
