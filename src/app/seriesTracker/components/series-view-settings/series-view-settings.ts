import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SeriesSettingsService } from '../../services/seriesSettingsService';
import { toSignal } from '@angular/core/rxjs-interop';
import defaultViewSettings from '../../../shared/utils/defaultValues/defaultViewSettings';

@Component({
  selector: 'series-view-settings',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './series-view-settings.html',
  styleUrl: './series-view-settings.css',
})
export class SeriesViewSettings {
  seriesViewForm!: FormGroup;
  seriesSettings = inject(SeriesSettingsService);
  settings = toSignal(this.seriesSettings.viewSettings$, {
    initialValue: defaultViewSettings,
  });
  constructor(private fb: FormBuilder) {
    effect(() => {
      this.seriesViewForm = this.fb.group({
        name: this.settings().name,
        season: this.settings().season,
        episode: this.settings().episode,
        watched: this.settings().watched,
        watchtime: this.settings().watchtime,
        type: this.settings().type,
        genre: this.settings().genre,
        animation: this.settings().animation,
        tags: this.settings().tags,
      });
    });
  }
  onSubmit() {
    const value = this.seriesViewForm.value;
    this.seriesSettings.saveViewSettings(value);
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
