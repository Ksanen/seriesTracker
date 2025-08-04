import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tag',
  imports: [],
  standalone: true,
  templateUrl: './tag.html',
  styleUrl: './tag.css',
})
export class Tag {
  @Output() tagRemoved = new EventEmitter<string>();
  @Input() tagName!: string;
  @Input() changeMode: boolean = false;
  remove() {
    this.tagRemoved.emit(this.tagName);
  }
}
