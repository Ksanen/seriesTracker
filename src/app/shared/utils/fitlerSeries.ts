import { SeriesInterface } from '../interfaces/series';
import seriesFilterSettings from '../interfaces/seriesSettings/seriesFilterSettings';

const filterSeries = (
  series: SeriesInterface,
  settings: seriesFilterSettings,
  nameValue: string
) => {
  if (!series.names.some((name) => name.toLowerCase().includes(nameValue))) {
    return false;
  }
  if (settings.type !== '' && series.type !== settings.type) return false;
  if (settings.genre !== '' && series.genre !== settings.genre) return false;
  if (settings.animation !== '' && series.animation !== settings.animation)
    return false;
  if (settings.season !== null && series.season !== settings.season)
    return false;
  if (settings.episode !== null && series.episode !== settings.episode)
    return false;
  if (
    settings.tags.length > 0 &&
    !settings.tags.every((tag) => series.tagNames.includes(tag))
  ) {
    return false;
  }
  if (
    settings.watched !== '' &&
    Boolean(Number(settings.watched)) !== series.watched
  )
    return false;
  return true;
};
export default filterSeries;
