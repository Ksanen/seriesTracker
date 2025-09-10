import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Component({
  selector: 'loading',
  imports: [],
  templateUrl: './loading.html',
  styleUrl: './loading.css',
})
export class Loading implements OnInit {
  text = input.required();
  destroyRef = inject(DestroyRef);
  direction = 'right';
  dots = signal('..');
  loadingText = computed(() => {
    return `${this.text()}${this.dots()}`;
  });
  ngOnInit(): void {
    interval(300)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updateLoading());
  }
  updateLoading() {
    this.dots.set(this.setNewDotsValue());
    this.selectDirection(this.dots().length);
  }
  setNewDotsValue() {
    const newDotsValue =
      this.direction === 'right'
        ? `${this.dots()}.`
        : this.dots().slice(0, this.dots().length - 1);
    return newDotsValue;
  }
  selectDirection(length: number) {
    switch (length) {
      case 0:
        this.direction = 'right';
        break;
      case 3:
        this.direction = 'left';
    }
  }
}
