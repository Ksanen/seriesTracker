import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SeriesStoreService } from '../../services/seriesStoreService';
import { toSignal } from '@angular/core/rxjs-interop';
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
  store = inject(SeriesStoreService);
  possibleTags = toSignal(this.store.possibleTags, { initialValue: [] });
  addTag() {
    if (this.tagName === '') return;
    this.tagNames.push(this.tagName);
    this.tagNames = [...new Set(this.tagNames)];
    this.addNewTag.emit(this.tagNames);
  }
}
