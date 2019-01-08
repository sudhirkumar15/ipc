import { TenantModel } from '@repository/model/tenant.model';
import { Pagination } from '@repository/bucket/pagination.bucket';

export class TenantData extends Pagination {
    private _tenants: Array<TenantModel>;
    private _tenant: TenantModel;
    private _activeTabName: string;
    private _error: any;
    constructor() {
        super();
    }

    get tenants(): Array<TenantModel> {
        return this._tenants;
    }
    set tenants(v: Array<TenantModel>) {
        this._tenants = v;
    }

    get tenant(): TenantModel {
        return this._tenant;
    }
    set tenant(v: TenantModel) {
        this._tenant = v;
    }

    get activeTabName(): string {
        return this._activeTabName;
    }

    set activeTabName(v: string) {
        this._activeTabName = v;
    }
    get error(): any {
        return this._error;
    }
    set error(v: any) {
        this._error = v;
    }
}

