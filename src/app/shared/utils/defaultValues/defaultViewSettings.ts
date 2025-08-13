import seriesViewSettings from '../../interfaces/seriesSettings/seriesViewSettings';

const defaultViewSettings: seriesViewSettings = {
  name: true,
  season: true,
  episode: true,
  watched: false,
  watchtime: false,
  type: false,
  genre: false,
  animation: false,
  tags: false,
};
export default defaultViewSettings;
