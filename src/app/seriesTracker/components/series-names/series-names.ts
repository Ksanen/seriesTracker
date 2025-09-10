import {
  Component,
  effect,
  inject,
  input,
  model,
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
  namesExcludingFirst = model<string[]>([]);
  namesService = inject(NamesService);
  names: WritableSignal<RemovableName[]> = signal([]);
  constructor() {
    effect(() => {
      if (
        this.namesExcludingFirst().length === 0 &&
        this.names().length !== 0
      ) {
        this.names.set([]);
      }
    });
  }
  ngOnInit(): void {
    this.names.set(
      this.namesService.createRemovableNamesArray(this.namesExcludingFirst())
    );
  }
  addNewName() {
    this.names.set(this.namesService.createNewRemovableName(this.names()));
  }
  removeName(id: number) {
    this.names.set(this.namesService.removeName(this.names(), id));
  }
  updateNamesValues() {
    const values = this.namesService.getRemovableNamesValues(this.names());
    this.namesExcludingFirst.set(values);
  }
}
