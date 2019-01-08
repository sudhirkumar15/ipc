import { PaginationModel } from '../pagination.model';
import { ApiResponseModel } from './api-response.model';

export interface ProductModel {
    id?: number;
    name: string;
    code: string;
    size: string;
    status: string;
    isPublished: boolean;
}

export interface ProductTypeModel {
    id: number;
    parentId: number;
    name: string;
    code: string;
    description: string;
    isActive: string;
}

export interface ProductTypeListApiResponseModel extends ApiResponseModel {
    data: {
        productTypes: Array<ProductTypeModel>;
    };
}

export interface ProductListApiResponseModel extends ApiResponseModel {
    data: {
        products: Array<ProductModel>;
        _pagination: PaginationModel;
    };
}


