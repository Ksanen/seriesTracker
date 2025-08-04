import { Component } from '@angular/core';
import { AddTag } from '../add-tag/add-tag';
import { Tag } from '../tag/tag';
import { Series } from '../series/series';
import SeriesInterface from '../../../shared/interfaces/series';

@Component({
  selector: 'series-controls',
  imports: [AddTag, Tag, Series],
  standalone: true,
  templateUrl: './series-controls.html',
  styleUrl: './series-controls.css',
})
export class SeriesControls {
  tagNames: string[] = [];
  removeTag(tagNameToRemove: string) {
    this.tagNames = this.tagNames.filter(
      (tagName) => tagName !== tagNameToRemove
    );
  }
  exampleSeries: SeriesInterface = {
    _id: '1',
    name: 'test',
    season: 1,
    episode: 1,
    type: 'movie',
    genre: 'cartoon',
    watchTime: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    watched: false,
    tagNames: ['cos'],
  };
}
