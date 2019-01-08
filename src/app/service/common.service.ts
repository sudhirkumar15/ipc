import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from './rest-api.service';
import { CommonData } from '../data/bucket/countries.bucket';
import { Country, CountryListReponse } from '../data/model/country.model';
import { ErrorService } from '../service/error.service';

@Injectable()
export class CommonService extends RestApiService {

  constructor(http: HttpClient,
    router: Router,
    private countryStore: CommonData,
    errorService: ErrorService, ) {
    super(http, router, errorService);
  }
  getCountries() {
    this.getCountryList();
    return this.countryStore.countries.value;
  }
  private getCountryList() {
    const params: Object = {};
    params['fields'] = 'name;alpha2Code;alpha3Code;callingCodes';
    const countryListApi = 'https://restcountries.eu/rest/v2/all';
    const response = this.get(countryListApi, params);
    response.subscribe(
      (data: Array<any>) => {
        const res: any = {};
        res.data = {
          default: '',
          countries: []
        };
        // Mocked for PHNX api call
        res.data['countries'] = data;
        res.status = 200;
        this.countryStore.countries.value = res;
      },
      (err: HttpErrorResponse) => {
        this.handleRestError(err);
      }
    );
  }

}
