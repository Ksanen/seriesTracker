import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'seriesRemovableNameInput',
  imports: [FormsModule],
  templateUrl: './series-removable-name-input.html',
  styleUrl: './series-removable-name-input.css',
})
export class SeriesRemovableNameInput {
  @Input() name: string = '';
  @Input() id!: number;
  @Output() removeName = new EventEmitter();
  @Output() nameChange = new EventEmitter<string>();
  updateName() {
    this.nameChange.emit(this.name);
  }
  remove() {
    this.removeName.emit(this.id);
  }
}
