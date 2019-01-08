import { ApiResponseModel } from '@repository/model/api-response.model';
import { PaginationModel } from '@repository/pagination.model';

export interface UserGroupModel {
    id?: string;
    name: string;
    type: string;
    description: string;
    isActive: boolean;
    instructor: string;
    createdtime: Date;
    updatedTime: Date;
}


export interface UserGroupListApiReponseModel extends ApiResponseModel {
    data: {
        userGroups: Array<UserGroupModel>;
        _pagination: PaginationModel
    };
}