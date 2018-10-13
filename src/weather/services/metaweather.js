// @flow

import debug from 'debug';
import { getUrl } from '../../utils';

const log = debug('weather');
const BASE_URL = 'https://www.metaweather.com/api/location';

export default class {
    constructor(request: any) {
        this.request = request;
    }

    async getWeather(city: string) {
        const { data } = await this.request.get(getUrl(BASE_URL, 'search'), { params: { query: city } });
        log('data', data);

        const [{ woeid }] = data;

        const { data: weatherData } = await this.request.get(getUrl(BASE_URL, woeid));

        const [{ weather_state_name: weather, the_temp: temp }] = weatherData.consolidated_weather;

        return { weather, temp };
    }
}
