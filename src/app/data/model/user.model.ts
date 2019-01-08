import { ApiResponseModel } from './api-response.model';
import { PaginationModel } from '../pagination.model';
import { RoleModel } from '@repository/model/role.model';

export interface UserModel {
    id?: number;
    firstName: string;
    lastName: string;
    type: string;
    email: string;
    password: string;
    phone: string;
    countrycode: string;
    phoneNumber: string;
    roles?: Array<RoleModel>;
}

export interface UserApiPostModel extends ApiResponseModel {
    data: {
        user: UserModel;
    };
}

export interface UserApiResponseModel extends ApiResponseModel {
    data: {
        users: Array<UserModel>;
        _pagination: PaginationModel;
    };
}

