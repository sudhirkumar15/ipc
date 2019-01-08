import { PaginationModel } from '@repository/pagination.model';
import { ApiResponseModel } from '@repository/model/api-response.model';

export interface TenantModel {
  name: string;
  email: string;
  contactEmail: string;
  country: string;
  phone: string;
  company: string;
  type: string;
  parentId: number;
  firstName: string;
  lastName: string;
  password: string;
  isTrial: Boolean;
  trialStartAt: Date;
  trialEndAt: Date;
  contractStartAt: Date;
  contractEndAt: Date;
  createdTime: Date;
  updatedTime: Date;
  isActive: Boolean;
  contacts: Array<ContactModel>;
}
export interface ContactModel {
  firstName: string;
  designation: Boolean;
  email: string;
  phone: string;
  phoneNumber: string;
  countrycode: string;
}
export interface TenantApiResponseModel extends ApiResponseModel {
  data: {
    tenants: Array<TenantModel>;
    _pagination: PaginationModel;
  };
}
export class RegResponseModel {
  token: string;
}
export interface TenantResponseModel extends ApiResponseModel {
  data: {
    tenant: TenantModel;
  };
}

