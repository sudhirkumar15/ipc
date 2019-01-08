import { PaginationModel } from '../pagination.model';
import { ApiResponseModel } from './api-response.model';

export interface SiteModel {
    id?: number;
    name: string;
    code: string;
    url: string;
    createdTime: Date;
    updatedTime: Date;
    isActive: boolean;
    status: number;
}

export interface SiteApiResponseModel extends ApiResponseModel {
    data: {
        sites: Array<SiteModel>;
        _pagination: PaginationModel;
    };
}


