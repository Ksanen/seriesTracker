import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SeriesStoreService } from '../../services/seriesStoreService';
import { Observable } from 'rxjs';

@Component({
  selector: 'series-error',
  imports: [AsyncPipe],
  standalone: true,
  templateUrl: './series-error.html',
  styleUrl: './series-error.css',
})
export class SeriesError implements OnInit {
  ngOnInit(): void {}
  error$: Observable<string>;
  constructor(private store: SeriesStoreService) {
    this.error$ = this.store.error$;
  }
}
