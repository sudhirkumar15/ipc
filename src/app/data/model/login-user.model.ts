import { ApiResponseModel } from './api-response.model';

export class LoginUserModel {
    email: string;
    exp: number;
    iat: number;
    fn: string;
    id: number;
    iss: number;
    sub: string;
    user_roles: Array<number>;
}
export class LoginModel {
    email: string;
    password: string;
}
export interface LoginResponseModel extends ApiResponseModel {
    data: {
        token: string;
    };
}
