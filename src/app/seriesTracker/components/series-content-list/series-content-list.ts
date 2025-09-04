import {
  Component,
  ElementRef,
  HostListener,
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
  showScrollUp: boolean = false;
  @ViewChild('top') top!: ElementRef;
  constructor(private hostElement: ElementRef) {}
  @HostListener('scroll', [`$event`])
  onScroll(event: Event) {
    const scrollTop = this.hostElement.nativeElement.scrollTop;
    if (scrollTop === 0) {
      this.showScrollUp = false;
      return;
    }
    this.showScrollUp = true;
    const scrollValue = scrollTop + 10;
    if (!this.top) return;
    this.top.nativeElement.style.top = `${scrollValue}px`;
  }
  toTop() {
    this.hostElement.nativeElement.scrollTop = 0;
  }
}
