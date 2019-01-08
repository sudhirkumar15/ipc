import { AssetModel, AssetLinkTypeModel, AssetProductLinksModel } from '@repository/model/asset.model';
import { ProductModel } from '@repository/model/product.model';

export class AssetLinkData {
    private _assetLinkTypes: Array<AssetLinkTypeModel>;
    private _asset: AssetModel;
    private _products: Array<ProductModel>;
    private _assetProductLink: Array<AssetProductLinksModel>;

    get assetProductLink(): Array<AssetProductLinksModel> {
        return this._assetProductLink;
    }

    set assetProductLink(v: Array<AssetProductLinksModel>) {
        this._assetProductLink = v;
    }

    get products(): Array<ProductModel> {
        return this._products;
    }

    set products(v: Array<ProductModel>) {
        this._products = v;
    }

    get assetLinkTypes(): Array<AssetLinkTypeModel> {
        return this._assetLinkTypes;
    }

    set assetLinkTypes(types: Array<AssetLinkTypeModel>) {
        this._assetLinkTypes = types;
    }

    get asset(): AssetModel {
        return this._asset;
    }

    set asset(asset: AssetModel) {
        this._asset = asset;
    }
}
