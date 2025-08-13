import { SeriesInterface } from './series';

interface ServerResponse {
  success: boolean;
  message: string;
  series: SeriesInterface;
}
export default ServerResponse;
