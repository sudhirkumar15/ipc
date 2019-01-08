import { Injectable } from '@angular/core';
import { LanguageModel } from './data/language.model';
import { environment } from './../environments/environment';
import { AccessNameService } from '@services/access-name.service';
@Injectable()
export class Global {
    token: string;
    language: LanguageModel;
    config: JSON;
    siteConfigURL: string;
    captchaURL = 'https://www.google.com/recaptcha/api/siteverify?secret=6LcnbUsUAAAAAB6KoIlBASgRqeLm8hPEY7JT2464&response=';
    apiError: Array<string>;
    sidePanel = true;
    countryCode = '+91';
    placeholderImg = 'assets/img/placeholder.jpg';
    selectedCountry = 'India';
    readonly maxUploadFileSize = 20; //in MB
    private _apiSuccess: string;

    set apiSuccess(msg: string) {
        if (msg !== '') {
            this.setSuccessTimeout();
        }
        this._apiSuccess = msg;
    }

    get apiSuccess(): string {
        return this._apiSuccess;
    }

    constructor() {
        this.siteConfigURL = this.getSiteConfigUrl();
    }

    setSuccessTimeout() {
        setTimeout(() => {
            this._apiSuccess = '';
        }, 3000);
    }

    getMenu() {
        return [
            {
                name: this.language.tenants,
                url: 'tenants',
                id: 'tenants',
                access: AccessNameService.tenantCreationAccess,
                subMenu: [
                    {
                        name: this.language.registrations,
                        url: 'tenants/add',
                        id: 'tenants_add',
                        access: AccessNameService.tenantCreationAccess
                    }
                ]
            },
            {
                name: this.language.userandRoles,
                url: 'roles',
                id: 'userandRoles',
                access: AccessNameService.userRoleAccess,
                subMenu: [
                    { 'name': this.language.role, 'url': 'roles', id: 'roles' },
                    { 'name': this.language.new, 'url': 'roles/add', id: 'roles_add' },
                    { 'name': this.language.user, 'url': 'roles/users', id: 'roles_users' }
                ]
            },
            {
                name: this.language.sites,
                url: 'sites',
                id: 'sites'
            },
            {
                name: this.language.products,
                url: 'products',
                id: 'products',
                subMenu: [
                    {
                        'name': this.language.upload_label_upload_history,
                        'url': 'products/upload/history',
                        id: 'upload_history',
                    },
                    { 'name': this.language.assets, 'url': 'products/assets', id: 'products_assets' }
                ]
            },
        ];

    }

    getUniqueId() {
        return Math.random().toString(36).substring(2)
            + (new Date()).getTime().toString(36);
    }

    getSiteConfigUrl() {
        return 'siteconfig.json';
    }
}
