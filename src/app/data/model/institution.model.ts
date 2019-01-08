import { ApiResponseModel } from './api-response.model';
import { PaginationModel } from '../pagination.model';

export interface InstitutionModel {
    name: string;
    code: string;
    email: string;
    country: string;
    isTrial: Boolean;
    trialStartAt: Date;
    trialEndAt: Date;
    contractStartAt: Date;
    contractEndAt: Date;
    createdTime: Date;
    updatedTime: Date;
    isActive: Boolean;
    contacts: Array<ContactModel>;
    siteId: number;
}
export interface ContactModel {
    name: string;
    designation: Boolean;
    email: string;
    phone: string;
}
export interface InstitutionApiResponseModel extends ApiResponseModel {
    data: {
        institutions: Array<InstitutionModel>;
         _pagination: PaginationModel;
    };
}
