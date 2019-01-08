import { LoginUserModel, LoginModel, LoginResponseModel } from '../model/login-user.model';

let loginPostData: LoginModel;
let loginResponseModel: LoginResponseModel;
let loggedInUserInfo: LoginUserModel;
export class LoginUser {
    public UserInfo = {
        get value(): LoginUserModel {
            return loggedInUserInfo;
        },
        set value(v: LoginUserModel) {
            loggedInUserInfo = v;
        }
    };
    public LoginPostData = {
        get value(): LoginModel {
            return loginPostData;
        },
        set value(v: LoginModel) {
            loginPostData = v;
        }
    };
    public LoginResponseData = {
        get value(): LoginResponseModel {
            return loginResponseModel;
        },
        set value(v: LoginResponseModel) {
            loginResponseModel = v;
        }
    };
}
