import { Injectable } from '@angular/core';
import { SeriesInterface, SeriesToSend } from '../../shared/interfaces/series';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import ServerResponse from '../../shared/interfaces/serverResponse';
import Tag from '../../shared/interfaces/tag';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SeriesApiService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl;
  getAllSeries(): Observable<SeriesInterface[]> {
    return this.http.get<SeriesInterface[]>(`${this.apiUrl}/api/series`);
  }
  getTags() {
    return this.http.get<Tag[]>(`${this.apiUrl}/api/tags`);
  }
  deleteSeries(seriesId: string) {
    return this.http.delete(`${this.apiUrl}/api/series/${seriesId}`);
  }
  add(Series: SeriesToSend): Observable<SeriesInterface> {
    return this.http.post<SeriesInterface>(`${this.apiUrl}/api/series`, Series);
  }
  update(id: string, Series: SeriesToSend): Observable<ServerResponse> {
    return this.http.patch<ServerResponse>(
      `${this.apiUrl}/api/series/${id}`,
      Series
    );
  }
  addTag(tagName: string) {
    return this.http.post<ServerResponse>(`${this.apiUrl}/api/tags`, {
      tagName: tagName,
    });
  }

  /* zwraca serie, które zostały zmienione
    w wyniku usunięcia z nich taga */
  deleteTag(tagName: string) {
    return this.http.delete<SeriesInterface[]>(
      `${this.apiUrl}/api/tags/${tagName}`
    );
  }
}
