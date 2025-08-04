export default interface SeriesSettings {
  filter: {
    Type: string;
    Genre: string;
    watched: boolean;
    tags: string[];
    season: string;
    episode: string;
  };
  view: {
    Name: boolean;
    Season: boolean;
    Episode: boolean;
    Watched: boolean;
    Watchtime: boolean;
    Type: boolean;
    Genre: boolean;
    tags: boolean;
  };
}
