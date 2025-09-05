import { FormControl } from '@angular/forms';

export interface WatchTimeForm {
  hours: FormControl<number>;
  minutes: FormControl<number>;
  seconds: FormControl<number>;
}
