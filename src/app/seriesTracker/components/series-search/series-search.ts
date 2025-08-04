import {
  Component,
  EventEmitter,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'series-search',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './series-search.html',
  styleUrl: './series-search.css',
})
export class SeriesSearch {
  @Output() nameChange = new EventEmitter<any>();
  name: WritableSignal<string> = signal('');
  newName: string = '';
  changeName() {
    this.name.set(this.newName);
    this.nameChange.emit(this.name());
  }
}
