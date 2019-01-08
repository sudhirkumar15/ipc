import { ApiResponseModel } from './api-response.model';
import { PaginationModel } from '../pagination.model';
import { AssetModel } from './asset.model';

export interface UploadModel {
    id?: number;
    name?: string;
    type: string;
    totalAssets?: number;
    totalProducts?: number;
    totalSize?: number;
    errorCode?: string;
    errorDetails?: string;
    tmpUploadPath?: string;
    credentials?: Credentials;
    assets?: Array<AssetModel>;
    status?: string;
    createdTime?: Date;
    updatedTime?: Date;
}

export interface Credentials {
    accessKeyId: string;
    secretAccessKey: string;
}

export interface UploadPostModel {
    upload: UploadModel;
}

export interface AssetsPostModel {
    assets: Array<AssetModel>;
}

export interface UploadHistoryResponseModel extends ApiResponseModel {
    data: {
        uploads: Array<UploadModel>;
        _pagination: PaginationModel;
    };
}

export interface UploadInfoResponseModel extends ApiResponseModel {
    data: {
        uploads: Array<UploadModel>;
    };
}
