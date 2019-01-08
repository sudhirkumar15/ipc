import { ApiResponseModel } from './api-response.model';

export interface Country {
    name: string;
    alpha2Code: string;
    alpha3Code: string;
    callingCodes: Array<string>;
}

export interface CountryListReponse extends ApiResponseModel {
    data: {
        default: string;
        countries: Array<Country>;
    };
}
