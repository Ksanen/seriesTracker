import { Injectable } from '@angular/core';
import SeriesInterface from '../../shared/interfaces/series';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import ServerResponse from '../../shared/interfaces/serverResponse';
import SeriesToSend from '../../shared/interfaces/seriesToSend';
import Tag from '../../shared/interfaces/tag';

@Injectable({
  providedIn: 'root',
})
export class SeriesApiService {
  constructor(private http: HttpClient) {}
  getAllSeries(): Observable<SeriesInterface[]> {
    return this.http.get<SeriesInterface[]>('http://localhost:3000/api/series');
  }
  getTags() {
    return this.http.get<Tag[]>('http://localhost:3000/api/tags');
  }
  deleteSeries(seriesId: string) {
    return this.http.delete(`http://localhost:3000/api/series/${seriesId}`);
  }
  add(Series: SeriesToSend): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(
      'http://localhost:3000/api/series',
      Series
    );
  }
  update(id: string, Series: SeriesToSend): Observable<ServerResponse> {
    return this.http.patch<ServerResponse>(
      `http://localhost:3000/api/series/${id}`,
      Series
    );
  }
}
