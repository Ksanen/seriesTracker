import {
  Component,
  effect,
  inject,
  input,
  OnInit,
  output,
  signal,
  WritableSignal,
} from '@angular/core';
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
  namesValues = output<string[]>();
  seriesNames = input<string[]>([]);
  namesService = inject(NamesService);
  names: WritableSignal<RemovableName[]> = signal([]);
  constructor() {
    effect(() => {
      if (this.seriesNames().length === 0 && this.names().length !== 0) {
        this.names.set([]);
      }
    });
  }
  ngOnInit(): void {
    if (this.seriesNames().length === 0) return;
    this.names.set(
      this.namesService.createRemovableNamesArray(this.seriesNames())
    );
  }
  addNewName() {
    const newName = this.namesService.addNewName(this.names());
    if (!newName) return;
    this.names().push(newName);
    this.updateNamesValues();
  }
  removeName(id: number) {
    this.names.set(this.namesService.removeName(this.names(), id));
  }
  updateNamesValues() {
    let namesValues = this.names().map((name) => name.value);
    this.namesValues.emit(namesValues);
  }
}
