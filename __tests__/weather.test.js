import { stub } from 'sinon';
import Weather from '../src/weather';
import Metaweather from '../src/weather/services/metaweather';

const getStub = stub();
const requestStub = {
    get: getStub,
};


describe('Test weather', () => {
    const city = 'London';
    const weather = 'Heavy Cloud';
    const temp = 19.85;
    const woeid = 44418;
    const baseUrl = 'https://www.metaweather.com/api/location';
    const urlForLocation = `${baseUrl}/search`;
    const urlForweather = `${baseUrl}/${woeid}`;

    const metaweatherData = { weather, temp };

    const cityData = [
        {
            title: 'London',
            location_type: 'City',
            woeid,
            latt_long: '51.506321,-0.12714',
        },
    ];

    const locationData = {
        consolidated_weather: [
            {
                id: 4591010118107136,
                weather_state_name: weather,
                weather_state_abbr: 'hc',
                wind_direction_compass: 'WSW',
                created: '2018-09-15T14:56:02.041287Z',
                applicable_date: '2018-09-15',
                min_temp: 12.147499999999999,
                max_temp: 20.445,
                the_temp: temp,
                wind_speed: 6.032564644848087,
                wind_direction: 245.12623817626485,
                air_pressure: 1026.83,
                humidity: 63,
                visibility: 10.64657400779448,
                predictability: 71,
            },
        ],
    };

    beforeEach(() => {
        getStub
            .withArgs(urlForLocation, { params: { query: city } }).resolves({ data: cityData })
            .withArgs(urlForweather).resolves({ data: locationData });
    });


    afterEach(() => {
        getStub.reset();
    });

    it('Expect get-weather returns {country, city}', async () => {
        const w = new Weather({ request: requestStub });

        const res = await w.getWeather(city);
        expect(res).toEqual(metaweatherData);
    });

    it('Expect get-weather can be added with new services', async () => {
        const w = new Weather({
            serviceName: 'testserv1',
            newServices: new Map([['testserv1', Metaweather]]),
            request: requestStub,
        });

        const res = await w.getWeather(city);
        expect(res).toEqual(metaweatherData);
    });

    it('Expect get-weather return default service is not found', async () => {
        const w = new Weather({ request: requestStub });

        const res = await w.getWeather(city, 'fakeServiceName');
        expect(res).toEqual(metaweatherData);
    });
});
