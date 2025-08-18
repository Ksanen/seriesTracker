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
  error: string = '';
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
    this.store.addTag(this.tagName).subscribe({
      next: () => {
        this.error = '';
      },
      error: (e) => {
        switch (e.status) {
          case 409:
            this.error = 'this tag already exists';
            break;
          case 400:
            this.error = 'invalid tag';
            break;
        }
        this.cd.detectChanges();
      },
    });
    this.tagName = '';
  }
  delete(tagName: string) {
    this.error = '';
    this.store.deleteTag(tagName);
  }
}
