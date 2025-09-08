import { Component, inject, OnInit } from '@angular/core';
import { SeriesViewService } from '../../services/seriesViewService';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'series-error',
  imports: [],
  standalone: true,
  templateUrl: './series-error.html',
  styleUrl: './series-error.css',
})
export class SeriesError implements OnInit {
  ngOnInit(): void {}
  view = inject(SeriesViewService);
  error = toSignal(this.view.error$);
}
