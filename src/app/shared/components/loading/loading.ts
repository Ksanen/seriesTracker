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
    interval(100)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updateLoading());
  }
  updateLoading() {
    let newDotsValue = this.dots();
    newDotsValue =
      this.direction === 'right'
        ? `${newDotsValue}.`
        : this.dots().slice(0, this.dots().length - 1);
    this.dots.set(newDotsValue);
    this.selectDirection(this.dots().length);
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
