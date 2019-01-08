import { PaginationModel } from '@repository/pagination.model';

export class Pagination {
    private _pagination;
    constructor() {
        this._pagination = {
            isFirst: false,
            isLast: false,
            pageNumber: 1,
            pageSize: 0,
            totalPages: 0,
            totalCount: 0
        };
    }

    get pagination(): PaginationModel {
        return this._pagination;
    }
    set pagination(v: PaginationModel) {
        this._pagination = v;
    }
}
