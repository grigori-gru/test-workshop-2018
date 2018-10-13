// @flow

import axios from 'axios';
import memo from 'fast-memoize';
import defaultServices from './services';

type Options = {
    serviceName: string,
    newServices: Array<?Object>,
    request: any,
};

const DEFAULT_SERVICE_NAME = 'metaweather';

const initClass = (services: Map<string, Class>, request: Object) => (serviceName) => {
    console.log(services);
    const Service = services.get(serviceName);
    if (Service) {
        return new Service(request);
    }
    console.warn(`Unknown weather service: "${serviceName}". Using default service.`);
    const DefaultService: Class = services.get(DEFAULT_SERVICE_NAME);

    return new DefaultService(request);
};


export default class {
    constructor({
        serviceName = DEFAULT_SERVICE_NAME,
        newServices = [],
        request = axios,
    }: Options) {
        this.defaultServiceName = serviceName;
        this.request = request;
        this.services = new Map([...defaultServices, ...newServices]);
        this.memo = memo(initClass(this.services, this.request));
    }

    getWeather(city: string, serviceName: ?string = this.defaultServiceName) {
        const service = this.memo(serviceName);

        return service.getWeather(city);
    }
}
