import axios from "axios";
import { environment } from "../../environments/environments";

export class generalService{
    static baseUrl = environment.baseUrl

    public static post(path:string, obj:any):Promise<any>{
        return axios.post(this.baseUrl+path, obj);
    }
}