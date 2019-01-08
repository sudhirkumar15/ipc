export interface Rest {
    get(url: string, params: any, headers?: any);
    post(url: string, params: any, headers: any);
}
