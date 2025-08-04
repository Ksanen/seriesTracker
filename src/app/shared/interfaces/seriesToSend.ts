export default interface SeriesToSend {
  name: string;
  type: string;
  genre: string;
  season: number;
  episode: number;
  watchTime: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  watched: boolean;
  tagNames: string[];
}
