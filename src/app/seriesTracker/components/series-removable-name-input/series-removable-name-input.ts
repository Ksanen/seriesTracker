import { Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'seriesRemovableNameInput',
  imports: [FormsModule],
  templateUrl: './series-removable-name-input.html',
  styleUrl: './series-removable-name-input.css',
})
export class SeriesRemovableNameInput {
  name = model('');
  id = input.required<number>();
  removeName = output<number>();
  setName(event: any) {
    this.name.set(event.target.value);
  }
  remove() {
    this.removeName.emit(this.id());
  }
}
