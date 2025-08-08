import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import SeriesInterface from '../../../shared/interfaces/series';
import { DecimalPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Tag } from '../tag/tag';
import { ReactiveFormsModule } from '@angular/forms';
import { SeriesForm } from './series-form/series-form';
import { SeriesSettingsService } from '../../services/seriesSettingsService';
import seriesViewSettings from '../../../shared/interfaces/seriesSettings/seriesViewSettings';
import { ChangeDetectorRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'series',
  imports: [DecimalPipe, CommonModule, Tag, ReactiveFormsModule, SeriesForm],
  standalone: true,
  templateUrl: './series.html',
  styleUrl: './series.css',
})
export class Series implements OnInit {
  @Input() even!: boolean;
  @Input() series!: SeriesInterface;
  @Output() deleteSeries = new EventEmitter<string>();
  destroyRef = inject(DestroyRef);
  isEditMode: boolean = false;
  viewSettings!: seriesViewSettings;
  constructor(
    private seriesSettings: SeriesSettingsService,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.seriesSettings.viewSettings$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((settings) => {
        this.viewSettings = settings;
        this.cd.detectChanges();
      });
  }
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }
}
