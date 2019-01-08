import { ApiResponseModel } from '@repository/model/api-response.model';

export interface Validator {
    resource: string;
    field: string;
    value: string;
    isValid: boolean;
    message: string;
    code: string;
}

export interface ValidatorApiResponse extends ApiResponseModel {
    data: {
        validators: Array<Validator>;
    };
}
