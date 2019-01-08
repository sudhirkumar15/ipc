import { RoleModel, RoleListAPIResponseModel, RoleResourceAPIResponseModel } from '../model/role.model';

let roleResourcePostData: RoleResourceAPIResponseModel;
let roleListData: RoleListAPIResponseModel;
let addNewRolePostData: RoleModel;
let addRoleActiveTabName: string;
export class RoleData {
    public RoleListData = {

        get value(): RoleListAPIResponseModel {
            return roleListData;
        },
        set value(v: RoleListAPIResponseModel) {
            roleListData = v;
        }
    };

    public RoleResourcePostData = {

        get value(): RoleResourceAPIResponseModel {
            return roleResourcePostData;
        },
        set value(v: RoleResourceAPIResponseModel) {
            roleResourcePostData = v;
        }
    };

    public RoleUserData = {

        get value(): RoleResourceAPIResponseModel {
            return roleResourcePostData;
        },
        set value(v: RoleResourceAPIResponseModel) {
            roleResourcePostData = v;
        }
    };

    public AddNewRolePostData = {

        get value(): RoleModel {
            return addNewRolePostData;
        },
        set value(v: RoleModel) {
            addNewRolePostData = v;
        },
        get activeTabName(): string {
            return addRoleActiveTabName;
        },
        set activeTabName(v: string) {
            addRoleActiveTabName = v;
        }
    };
}

