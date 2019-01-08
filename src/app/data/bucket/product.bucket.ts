import { ProductListApiResponseModel, ProductModel } from '@repository/model/product.model';
import { UploadHistoryResponseModel, UploadPostModel, UploadInfoResponseModel } from '@repository/model/upload.model';
import {
    AssetsListResponseModel,
    AssetResponseModel,
    AssetProductLinksReponseModel
} from '@repository/model/asset.model';

let uploadHistoryData: UploadHistoryResponseModel;
let uploadInfoData: UploadInfoResponseModel;
let uploadToken: UploadPostModel | null;
let assetsListData: AssetsListResponseModel;
let assetData: AssetResponseModel;
let assetProductLinkData: AssetProductLinksReponseModel;
let productListData: ProductListApiResponseModel;
let productCourseManageAssetsPostData: ProductModel;
let addProductDetailsPostData: ProductModel;
let addProductSettingsPostData: ProductModel;
let addProductActiveTabName: string;
export class ProductData {
    constructor() {
    }
    public uploadList = {
        get value(): UploadHistoryResponseModel {
            return uploadHistoryData;
        },
        set value(v: UploadHistoryResponseModel) {
            uploadHistoryData = v;
        }
    };

    public uploadInfo = {
        get value(): UploadInfoResponseModel {
            return uploadInfoData;
        },
        set value(v: UploadInfoResponseModel) {
            uploadInfoData = v;
        }
    };

    public uploadToken = {
        get value(): UploadPostModel {
            return uploadToken;
        },
        set value(v: UploadPostModel) {
            uploadToken = v;
        }
    };

    public assetList = {
        get value(): AssetsListResponseModel {
            return assetsListData;
        },
        set value(v: AssetsListResponseModel) {
            assetsListData = v;
        }
    };
    public ProductListData = {
        get value(): ProductListApiResponseModel {
            return productListData;
        },
        set value(v: ProductListApiResponseModel) {
            productListData = v;
        }
    };

    public asset = {
        get value(): AssetResponseModel {
            return assetData;
        },
        set value(v: AssetResponseModel) {
            assetData = v;
        }
    };

    public assetProductLink = {
        get value(): AssetProductLinksReponseModel {
            return assetProductLinkData;
        },
        set value(v: AssetProductLinksReponseModel) {
            assetProductLinkData = v;
        }
    };

    public ProductCourseManageAssetsPostData = {
        get value(): ProductModel {
            return productCourseManageAssetsPostData;
        },
        set value(v: ProductModel) {
            productCourseManageAssetsPostData = v;
        }
    };

    public AddProductDetailsPostData = {
        get value(): ProductModel {
            return addProductDetailsPostData;
        },
        set value(v: ProductModel) {
            addProductDetailsPostData = v;
        }
    };

    public AddProductSettingsPostData = {
        get value(): ProductModel {
            return addProductSettingsPostData;
        },
        set value(v: ProductModel) {
            addProductSettingsPostData = v;
        }
    };

    public AddProductActiveTabName = {
        get activeTabName(): string {
            return addProductActiveTabName;
        },
        set activeTabName(v: string) {
            addProductActiveTabName = v;
        }
    };

}
