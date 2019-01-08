export class RoleService {
  private _roleListDataLoader: boolean;
  constructor() {
    this._roleListDataLoader = true;
  }

  get roleListDataLoader(): boolean {
    return this._roleListDataLoader;
  }
  set roleListDataLoader(roleListDataLoader: boolean) {
    this._roleListDataLoader = roleListDataLoader;
  }
}
