import {
  Component,
  EventEmitter,
  inject,
  input,
  Input,
  Output,
} from '@angular/core';
import { SeriesInterface } from '../../../shared/interfaces/series';
import { DecimalPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Tag } from '../tag/tag';
import { ReactiveFormsModule } from '@angular/forms';
import { SeriesForm } from './series-form/series-form';
import { SeriesSettingsService } from '../../services/seriesSettingsService';
import { toSignal } from '@angular/core/rxjs-interop';
import defaultViewSettings from '../../../shared/utils/defaultValues/defaultViewSettings';
@Component({
  selector: 'series',
  imports: [DecimalPipe, CommonModule, Tag, ReactiveFormsModule, SeriesForm],
  standalone: true,
  templateUrl: './series.html',
  styleUrl: './series.css',
})
export class Series {
  even = input.required<boolean>();
  @Input() series!: SeriesInterface;
  @Output() deleteSeries = new EventEmitter<string>();
  isEditMode: boolean = false;
  seriesSettings = inject(SeriesSettingsService);
  viewSettings = toSignal(this.seriesSettings.viewSettings$, {
    initialValue: defaultViewSettings,
  });
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }
}
