import { FormControl, FormGroup, Validators } from '@angular/forms';

const defaultSeriesForm = {
  name: ['', Validators.required],
  type: '',
  genre: '',
  animation: '',
  season: null,
  episode: null,
  watchTimeActive: false,
  watchTime: new FormGroup({
    hours: new FormControl(0),
    minutes: new FormControl(0),
    seconds: new FormControl(0),
  }),
  watched: 0,
};
export default defaultSeriesForm;
