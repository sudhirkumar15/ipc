import { Component, OnInit, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Global } from '../g';
import { FormGroup } from '@angular/forms/src/model';
import { ValidationErrors } from '@angular/forms/src/directives/validators';

let _this;

@Injectable()
export class ErrorService implements OnInit {

    constructor(public global: Global) { _this = this; }

    ngOnInit() {
    }

    private getValidatorSpecificError(languageKey: string, key: string, errvalue: any): string {
        let errorMessage = '';
        languageKey = languageKey.replace(/\.\d+\./g, '_').toLowerCase();
        switch (key) {
            case 'required':
                errorMessage = this.getRequiredMessage(languageKey);
                break;
            case 'pattern':
                errorMessage = this.getPatternMessage(languageKey);
                break;
            case 'minlength':
                errorMessage = this.getMinlengthMessage(languageKey, errvalue);
                break;
            case 'maxlength':
                errorMessage = this.getMaxlengthMessage(languageKey, errvalue);
                break;
            default:
                errorMessage = this.getRequiredMessage(languageKey);
        }
        return errorMessage;
    }

    private getMaxlengthMessage(languageKey: string, errvalue: Object) {
        let errorMessage = '';
        errorMessage = this.global.language[languageKey];
        errorMessage = errorMessage.replace('$$required_length$$', errvalue['requiredLength']);
        errorMessage = errorMessage.replace('$$remaining_legnth$$', (errvalue['requiredLength'] - errvalue['actualLength']).toString());
        return errorMessage;
    }

    private getMinlengthMessage(languageKey: string, errvalue: Object) {
        let errorMessage = '';
        errorMessage = this.global.language[languageKey];
        errorMessage = errorMessage.replace('$$required_length$$', errvalue['requiredLength']);
        errorMessage = errorMessage.replace('$$remaining_legnth$$', (errvalue['requiredLength'] - errvalue['actualLength']).toString());
        return errorMessage;
    }

    private getRequiredMessage(languageKey: string): string {
        return this.global.language[languageKey];
    }

    private getPatternMessage(languageKey: string): string {
        return this.global.language[languageKey];
    }

    setError(error: any) {
        _this.global.apiError = [];
        if (error instanceof HttpErrorResponse && error.error.error) {
            _this.global.apiError[0] = error.error.error.message;
        } else if (typeof error === 'object' && error.message) {
            if (error.details) {
                for (const err of error.details) {
                    _this.global.apiError.push(err.message);
                }
            } else {
                _this.global.apiError[0] = error.message;
            }
        } else {
            _this.global.apiError[0] = _this.global.language[error.details[0].target ? error.details[0].target : 'null'] + ' ' +
                _this.global.language[error.details[0].code ? error.details[0].code : error.code];
        }
        setTimeout(() => {
            _this.global.apiError = '';
        }, 3000);
    }

    isFieldValid(form: FormGroup, field: string, isFormSubmited: boolean) {
        const rt = (
            (!form.get(field).valid && (form.get(field).dirty || form.get(field).touched)) ||
            (form.get(field).untouched && isFormSubmited)
        );
        return rt;
    }

    getErrorMessage(form: FormGroup, formName: string, field: string) {
        const messageKey = formName + '_' + field + '_';
        const controlErrors: ValidationErrors = form.get(field).errors;
        let errorMessage = '';
        if (controlErrors != null) {
            Object.keys(controlErrors).forEach(keyError => {
                const errorMessagekey = `${messageKey}${keyError}`;
                errorMessage = this.getValidatorSpecificError(errorMessagekey, keyError, controlErrors[keyError]);
            });
            return errorMessage;
        }
    }

    displayFieldCss(form: FormGroup, field: string, isFormSubmited: boolean) {
        let isValid = false;
        if (isFormSubmited || form.get(field).dirty || form.get(field).touched) {
            isValid = this.isFieldValid(form, field, isFormSubmited);
            return {
                'is-invalid': isValid,
                'is-valid': !isValid
            };
        } else {
            return {
                'is-invalid': isValid,
                'is-valid': isValid
            };
        }
    }
}
