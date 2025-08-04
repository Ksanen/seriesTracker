import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Output,
  ChangeDetectorRef,
} from '@angular/core';
import { Tag } from '../tag/tag';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddTag } from '../add-tag/add-tag';
import { SeriesApiService } from '../../services/seriesApiService';
import SeriesToSend from '../../../shared/interfaces/seriesToSend';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'series-add',
  imports: [Tag, FormsModule, AddTag, ReactiveFormsModule],
  standalone: true,
  templateUrl: './series-add.html',
  styleUrl: './series-add.css',
})
export class SeriesAdd {
  @Output() closeComponent = new EventEmitter<null>();
  seriesForm!: FormGroup;
  destroyRef = inject(DestroyRef);
  constructor(
    private fb: FormBuilder,
    private seriesService: SeriesApiService,
    private cd: ChangeDetectorRef
  ) {
    this.seriesForm = this.fb.group({
      name: ['', Validators.required],
      type: '',
      genre: '',
      season: 0,
      episode: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      watched: false,
    });
  }
  tagNames: string[] = [];
  close() {
    this.closeComponent.emit();
  }
  removeTag(tagNameToRemove: string) {
    this.tagNames = this.tagNames.filter(
      (tagName) => tagName !== tagNameToRemove
    );
  }
  onSubmit() {
    const form = this.seriesForm.value;
    const objectToSubmit: SeriesToSend = {
      name: form.name,
      type: form.type,
      genre: form.genre,
      season: form.season,
      episode: form.episode,
      watchTime: {
        hours: form.hours,
        minutes: form.minutes,
        seconds: form.seconds,
      },
      watched: form.watched,
      tagNames: this.tagNames,
    };
    if (this.seriesForm.invalid) {
      console.log('invalid');
      return;
    }
    this.seriesService
      .add(objectToSubmit)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          if (response.success) {
            console.log(response);
            this.close();
            this.cd.detectChanges();
          } else {
            console.log('error1', response);
          }
        },
        error: (e) => {
          switch (e.status) {
            case 400:
              console.log('błąd walidacji');
              break;
            case 500:
              console.log('Internal server error');
              break;
          }
        },
      });
  }
}
