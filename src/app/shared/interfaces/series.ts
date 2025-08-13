interface BaseSeries {
  names: string[];
  type: string;
  genre: string;
  animation: string;
  season: number;
  episode: number;
  watchTimeActive: boolean;
  watchTime: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  watched: boolean;
  tagNames: string[];
}

export interface SeriesInterface extends BaseSeries {
  _id: string;
}
export interface SeriesToSend extends BaseSeries {}
