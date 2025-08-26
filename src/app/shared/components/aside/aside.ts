import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-aside',
  imports: [CommonModule],
  templateUrl: './aside.html',
  styleUrl: './aside.css',
})
export class Aside {
  show = input.required<boolean>();
}
