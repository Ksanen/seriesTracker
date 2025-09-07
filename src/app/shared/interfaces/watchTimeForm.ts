import { FormControl } from '@angular/forms';

export interface WatchTimeForm {
  hours: FormControl<number | null>;
  minutes: FormControl<number | null>;
  seconds: FormControl<number | null>;
}
