import { AbstractControl } from '@angular/forms';
import { UploadApiService } from '@core/upload-window/service/upload-api.service';
import { ValidatorService } from '@shared/service/validator.service';
import { ValidatorApiResponse } from '@repository/model/validator.model';

export class ApiValidator {
    static alreadyexists(api: ValidatorService, resource: string, field: string) {
        return (control: AbstractControl): Promise<any> => {
            const promise = new Promise<any>((resolve, reject) => {
                api.isExists(resource, field , control.value).subscribe(
                    (response: ValidatorApiResponse) => {
                        if (response.data.validators[0].isValid) {
                            resolve(null);
                        } else {
                            resolve({ [response.data.validators[0].code]: true });
                        }
                    },
                    (err) => {
                        resolve({ 'validatator_gateway_error': true });
                    }
                );
            }, );
            return promise;
        };
    }
}
