import watchTime from './watchTime';

interface BaseSeries {
  names: string[];
  type: string;
  genre: string;
  animation: string;
  season: number | null;
  episode: number | null;
  watchTimeActive: boolean;
  watchTime: watchTime;
  watched: boolean;
  tagNames: string[];
}

export interface SeriesInterface extends BaseSeries {
  _id: string;
}
export interface SeriesToSend extends BaseSeries {}
