import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { SeriesStoreService } from '../../services/seriesStoreService';
import Tag from '../../../shared/interfaces/tag';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'seriesTagSection',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './series-tag-section.html',
  styleUrl: './series-tag-section.css',
})
export class SeriesTagSection implements OnInit {
  destroyRef = inject(DestroyRef);
  tagName: string = '';
  constructor(
    private store: SeriesStoreService,
    private cd: ChangeDetectorRef
  ) {}
  possibleTags!: Tag[];
  ngOnInit(): void {
    this.store.possibleTags
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (possibleTags) => {
          this.possibleTags = possibleTags;
          this.cd.detectChanges();
        },
      });
  }
  addTag() {
    this.store.addTag(this.tagName);
    this.tagName = '';
  }
  delete(tagName: string) {
    this.store.deleteTag(tagName);
  }
}
