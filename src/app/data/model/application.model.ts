export interface OnError {
    isFieldValid(field: string);
    getErrorMessage(field: string);
    displayFieldCss(field: string);
}

export interface FilterModel {
    [key: string]: string|number|boolean;
}

export interface DefaultArgs {
    query ?: string;
    sort ?: string;
    filter?: FilterModel;
}
