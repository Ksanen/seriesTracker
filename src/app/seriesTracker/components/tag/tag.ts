import { Component, input, output } from '@angular/core';
@Component({
  selector: 'tag',
  imports: [],
  standalone: true,
  templateUrl: './tag.html',
  styleUrl: './tag.css',
})
export class Tag {
  tagRemoved = output<string>();
  tagName = input.required<string>();
  changeMode = input<boolean>(false);
  remove() {
    this.tagRemoved.emit(this.tagName());
  }
}
