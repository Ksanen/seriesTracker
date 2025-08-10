export default interface SeriesToSend {
  names: string[];
  type: string;
  genre: string;
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
