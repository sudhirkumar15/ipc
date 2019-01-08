import { ApiResponseModel } from '@repository/model/api-response.model';
import { PaginationModel } from '@repository/pagination.model';

export interface AssetModel {
    name?: string;
    id?: number;
    assetUniqueId?: string;
    revisionId?: number;
    hash?: string;
    currentVersion?: number;
    currentRevisionId?: number;
    processStatus?: string;
    processStatusMessage?: string;
    previewPath?: string;
    contentType?: string;
    fileSize?: number;
    mimeType?: string;
    isActive?: string;
    isPublished?: string;
    isDeleted?: string;
    createdTime?: Date;
    updatedTime?: Date;
    status?: string;
    description?: string;
    deliveryChannels?: Array<string>;
    meta?: Object;
    file?: File;
}

export interface AssetLinkTypeModel {
    id: string;
    name: string;
    code: string;
    isMultiple: boolean;
    isActive: boolean;
}

export interface AssetProductLinksModel {
    linkTypeId?: number;
    productId?: number;
    assetRevisionId?: number;
    productName: string;
    linkName: string;
    isPublished: boolean;
}

export interface AssetPLinkTypeListResponseModel extends ApiResponseModel {
    data: {
        linkTypes: Array<AssetLinkTypeModel>;
    };
}

export interface AssetsListResponseModel extends ApiResponseModel {
    data: {
        assets: Array<AssetModel>;
        _pagination: PaginationModel;
    };
}
export interface AssetProductLinksReponseModel extends ApiResponseModel {
    data: {
        assetProductLinks: Array<AssetProductLinksModel>;
    };
}

export interface AssetsListResponseModel extends ApiResponseModel {
    data: {
        assets: Array<AssetModel>;
        _pagination: PaginationModel;
    };
}

export interface AssetsListDetailsModel extends ApiResponseModel {
    data: {
        assets: Array<AssetModel>;
        _pagination: PaginationModel;
    };
}

export interface AssetResponseModel extends ApiResponseModel {
    data: {
        asset: AssetModel;
    };
}
