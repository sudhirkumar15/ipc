import { CountryListReponse } from '../model/country.model';

let countries: CountryListReponse;
export class CommonData {
    public countries = {
        get value(): CountryListReponse {
            return countries;
        },
        set value(v: CountryListReponse) {
            countries = v;
        }
    };
}
