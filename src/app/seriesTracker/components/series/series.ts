import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import SeriesInterface from '../../../shared/interfaces/series';
import { DecimalPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Tag } from '../tag/tag';
import { ReactiveFormsModule } from '@angular/forms';
import { SeriesForm } from './series-form/series-form';
@Component({
  selector: 'series',
  imports: [DecimalPipe, CommonModule, Tag, ReactiveFormsModule, SeriesForm],
  standalone: true,
  templateUrl: './series.html',
  styleUrl: './styl.css',
})
export class Series {
  @Input() even!: boolean;
  @Input() series!: SeriesInterface;
  @Output() deleteSeries = new EventEmitter<string>();
  isEditMode: boolean = false;
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }
}
