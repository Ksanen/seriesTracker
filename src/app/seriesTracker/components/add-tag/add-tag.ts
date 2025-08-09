import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SeriesStoreService } from '../../services/seriesStoreService';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import Tag from '../../../shared/interfaces/tag';
@Component({
  selector: 'add-tag',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './add-tag.html',
  styleUrl: './add-tag.css',
})
export class AddTag implements OnInit {
  tagName: string = '';
  @Input() tagNames: string[] = [];
  @Output() addNewTag = new EventEmitter<string[]>();
  destroyRef = inject(DestroyRef);
  possibleTags!: Tag[];
  constructor(private store: SeriesStoreService) {}
  ngOnInit(): void {
    this.store.possibleTags
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((tags) => {
        this.possibleTags = tags;
      });
  }
  addTag() {
    if (this.tagName === '') return;
    this.tagNames.push(this.tagName);
    this.addNewTag.emit(this.tagNames);
  }
}
