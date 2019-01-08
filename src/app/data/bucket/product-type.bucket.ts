import { ProductTypeModel } from '@repository/model/product.model';

export class ProductTypeData {
    private _productTypes: Array<ProductTypeModel>;

    get productTypes(): Array<ProductTypeModel> {
        return this._productTypes;
    }

    set productTypes(v: Array<ProductTypeModel>) {
        this._productTypes = v;
    }
}
