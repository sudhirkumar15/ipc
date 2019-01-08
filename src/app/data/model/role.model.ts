import { PaginationModel } from '../pagination.model';
import { ApiResponseModel } from './api-response.model';

export interface RoleModel {
    id: number;
    type: string;
    tenantId: string;
    siteId: string;
    institutionId: string;
    name: string;
    code: string;
    description: string;
    isGlobal: boolean;
    createdTime: Date;
    updatedTime: Date;
    isActive: boolean;
    isSelected?: boolean;
}

export interface RoleListAPIResponseModel extends ApiResponseModel {
    data: {
        roles: Array<RoleModel>;
        _pagination: PaginationModel;
    };
}

export interface RoleResourseModel {
    id: number;
    name?: string;
    code: string;
    url: string;
    resources: Array<RoleResourseModel>;
    operations?: any;
    isChecked?: boolean;
    isOpen?: boolean;
}

export interface RoleResourceAPIResponseModel extends ApiResponseModel {
    data: {
        resourceGroups: Array<RoleResourseModel>;
        _pagination: PaginationModel;
    };
}
