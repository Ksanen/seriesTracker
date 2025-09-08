import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'series-search',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './series-search.html',
  styleUrl: './series-search.css',
})
export class SeriesSearch {
  name = model<string>();
}
