import { LoginResponse } from "../../interfaces/response/ApiResponse";
import { User } from "../../interfaces/user/User";
import { generalService } from "../GeneralServiceLogin";

export class AuthService {
    public static async login(obj:User):Promise<LoginResponse>{
        return (await generalService.post('/login', obj)).data
    }
}