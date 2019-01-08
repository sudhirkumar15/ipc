import { UserModel } from '@repository/model/user.model';
import { Pagination } from '@repository/bucket/pagination.bucket';
import { UserGroupModel } from '@repository/model/user-group.model';

export class UserToUserGroupData extends Pagination {
    private _selectedUser: UserModel;
    private _userGroups: Array<UserGroupModel>;
    private _classrooms: Array<UserGroupModel>;

    get selectedUser(): UserModel {
        return this._selectedUser;
    }
    set selectedUser(v: UserModel) {
        this._selectedUser = v;
    }

    get userGroups(): Array<UserGroupModel> {
        return this._userGroups;
    }
    set userGroups(v: Array<UserGroupModel>) {
        this._userGroups = v;
    }

    get classrooms(): Array<UserGroupModel> {
        return this._classrooms;
    }
    set classrooms(v: Array<UserGroupModel>) {
        this._classrooms = v;
    }
}
