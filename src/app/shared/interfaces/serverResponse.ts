import SeriesInterface from './series';

export default interface ServerResponse {
  success: boolean;
  msg: string;
  series: SeriesInterface;
}
