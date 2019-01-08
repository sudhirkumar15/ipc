import { UserModel, UserApiResponseModel } from '../model/user.model';

let userListData: UserApiResponseModel;
let addNewUserPostData: UserModel;

export class UserData {
    public UserListData = {
        get value(): UserApiResponseModel {
            return userListData;
        },
        set value(v: UserApiResponseModel) {
            userListData = v;
        }
    };

    public AddNewUserPostData = {
        get value(): UserModel {
            return addNewUserPostData;
        },
        set value(v: UserModel) {
            addNewUserPostData = v;
        }
    };
}
