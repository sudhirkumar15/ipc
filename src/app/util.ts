import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
let _this;
@Injectable()
export class Util {
    emailPattern: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    phoneNumberPattern: RegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    namePattern: RegExp = /^[a-zA-Z][a-zA-Z0-9_-À-ž]{3,30}$/;
    alphanumericSpecial: RegExp = /^[a-zA-Z0-9_@\.]+$/;
    nameAllPattern: RegExp =  /^[^\s].*$/; // any character not start with space
    readonly nameMinLength = 3;
    readonly nameMaxLength = 50;
    readonly emailMinLength = 3;
    readonly emailMaxLength = 50;
    readonly passwordMinLength = 8;
    readonly passwordMaxLength = 30;
    constructor() {
        _this = this;
    }
    validators = {
        signupEmail: new FormControl(
            '',
            [
                Validators.required,
                Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
            ]
        ),
        signupName: new FormControl(
            '',
            [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(30)
            ]
        ),
        loginName: new FormControl(
            '',
            [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(30)
            ]
        ),
        signupPassword: new FormControl(
            '',
            [
                Validators.minLength(8),
                Validators.required
            ]
        ),
        loginPassword: new FormControl(
            '',
            [
                Validators.minLength(8),
                Validators.required
            ]
        ),
        phoneNo: new FormControl(
            '',
            [
                Validators.required,
                Validators.pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
            ]
        ),
        captcha: new FormControl(
            '',
            Validators.required
        ),
        roleName: new FormControl(
            '',
            [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(30)
            ]
        )
    };
    countryCode = [{ 'countryCode': 'IN', 'countryName': 'INDIA', 'value': '+91' },
    { 'countryCode': 'US', 'countryName': 'USA', 'value': '+1' },
    { 'countryCode': 'GB', 'countryName': 'UK', 'value': '+44' },
    { 'countryCode': 'JP', 'countryName': 'JAPAN', 'value': '+81' },
    { 'countryCode': 'ID', 'countryName': 'INDONESIA', 'value': '+62' }];

    form = {
        signUpForm: new FormGroup(
            {
                signupName: this.validators.signupName,
                signupPassword: this.validators.signupPassword,
                signupEmail: this.validators.signupEmail,
                phoneNo: this.validators.phoneNo,
                captcha: this.validators.captcha
            }
        ),
        loginForm: new FormGroup(
            {
                loginName: this.validators.loginName,
                loginPassword: this.validators.loginPassword
            }
        ),
        createRole: new FormGroup(
            {
                roleName: this.validators.roleName,
            }
        )
    };
}
