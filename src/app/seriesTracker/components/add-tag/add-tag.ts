import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'add-tag',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './add-tag.html',
  styleUrl: './add-tag.css',
})
export class AddTag {
  tagName: string = '';
  @Input() tagNames: string[] = [];
  @Output() addNewTag = new EventEmitter<string[]>();

  possibleTags: string[] = ['cos2', 'cos', 'cos3'];
  addTag() {
    const tagToAdd: string | undefined = this.possibleTags.find(
      (tagName) => tagName === this.tagName
    );
    if (!tagToAdd) return;
    const tagExists = this.tagNames.find((tagName) => tagName === this.tagName);
    if (tagExists) return;
    this.tagName = '';
    this.tagNames.push(tagToAdd);
    this.addNewTag.emit(this.tagNames);
    console.log(this.tagNames);
  }
}
