import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { SeriesViewService } from '../../services/seriesViewService';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'series-database-error',
  imports: [CommonModule],
  templateUrl: './series-database-error.html',
  styleUrl: './series-database-error.css',
})
export class SeriesDatabaseError implements OnInit {
  showDatabaseError: boolean = true;
  destroyRef = inject(DestroyRef);
  constructor(private view: SeriesViewService, private cd: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.view.options$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((options) => {
        this.showDatabaseError = options.showDatabaseError;
        this.cd.detectChanges();
      });
  }
}
