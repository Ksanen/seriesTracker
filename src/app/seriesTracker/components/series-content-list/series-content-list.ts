import {
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  ViewChild,
} from '@angular/core';
import { SeriesList } from '../series-list/series-list';

@Component({
  selector: 'series-content-list',
  imports: [SeriesList],
  standalone: true,
  templateUrl: './series-content-list.html',
  styleUrl: './series-content-list.css',
})
export class SeriesContentList {
  name = input.required<string>();
  showArrowContainer: boolean = false;
  maxNumberOfSeries: number = 20;
  @ViewChild('arrowContainer') arrowContainer!: ElementRef;
  hostElement = inject(ElementRef);
  @HostListener('scroll', [`$event`])
  onScroll(event: Event) {
    const scrollTop = this.hostElement.nativeElement.scrollTop;
    this.showArrowContainer = scrollTop === 0 ? false : true;
    this.arrowContainer.nativeElement.style.top =
      this.calculateTopValue(scrollTop);
    this.increaseMaxNumberOfSeriesToLoadIfPossible(20);
  }
  calculateTopValue(scrollTop: number) {
    return `${scrollTop + 10}px`;
  }
  increaseMaxNumberOfSeriesToLoadIfPossible(valueToIncrease: number) {
    const scrollTopValue = this.hostElement.nativeElement.scrollTop;
    const scrollTopMaxValue = this.hostElement.nativeElement.scrollTopMax;
    if (scrollTopValue === scrollTopMaxValue) {
      this.maxNumberOfSeries += valueToIncrease;
    }
  }
  toTop() {
    this.hostElement.nativeElement.scrollTop = 0;
  }
}
