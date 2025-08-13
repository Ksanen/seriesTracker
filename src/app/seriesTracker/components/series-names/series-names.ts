import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SeriesRemovableNameInput } from '../series-removable-name-input/series-removable-name-input';
import { NamesService } from '../../services/names-service';
import RemovableName from '../../../shared/interfaces/removableName';

@Component({
  selector: 'series-names',
  imports: [SeriesRemovableNameInput],
  standalone: true,
  templateUrl: './series-names.html',
  styleUrl: './series-names.css',
})
export class SeriesNames implements OnInit {
  names: RemovableName[] = [];
  @Output() namesValues = new EventEmitter<string[]>();
  @Input() seriesNames: string[] = [];
  constructor(private namesService: NamesService) {}
  ngOnInit(): void {
    if (this.seriesNames.length === 0) return;
    this.names = this.namesService.createRemovableNamesArray(this.seriesNames);
    this.updateNamesValues();
  }
  addNewName() {
    const newName = this.namesService.addNewName(this.names);
    if (!newName) return;
    this.names.push(newName);
    this.updateNamesValues();
  }
  removeName(id: number) {
    this.names = this.namesService.removeName(this.names, id);
  }
  updateNamesValues() {
    let namesValues = this.names.map((name) => name.value);
    this.namesValues.emit(namesValues);
  }
}
