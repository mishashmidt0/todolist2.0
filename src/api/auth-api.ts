import axios from "axios";

export class myApi {
    instance = axios.create({
        baseURL: 'https://social-network.samuraijs.com/api/1.1/',
        withCredentials: true,
        headers: {
            "API-KEY": "918ec3c9-ea92-470f-ae86-9d6bbf63b653"
        }
    })
}

class authApi extends myApi {

    login(data: LoginParamsType) {
        return this.instance.post<ResponseType<{ userId?: number }>>(`auth/login`, data)
    }

    logout() {
        return this.instance.delete<ResponseType<{ userId?: number }>>(`auth/login`)
    }
    me() {
        return this.instance.get("auth/me")
    }
}

const authAPI = new authApi()
export default authAPI

//type
export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[],
}