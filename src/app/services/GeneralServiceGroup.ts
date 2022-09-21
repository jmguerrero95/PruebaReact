import axios from "axios";
import { Navigate } from "react-router-dom";
import { environment } from "../../environments/environments";

export class generalService{
    static baseUrl = environment.baseUrl
    public static get(path:string):Promise<any>{
        const token:any = sessionStorage.getItem("token");
        const config = {
            headers: { authorization: `${token}`}
        }
        return axios.get(
            this.baseUrl+path,
            config
        )
    }
    public static post(path:string, obj:any):Promise<any>{
        const token:any = sessionStorage.getItem("token");
        const config = {
            headers: { authorization: `${token}`}
        }
        return axios.post(this.baseUrl+path, obj, config);
    }
    public static delete(path:string, obj:any):Promise<any>{
        const token:any = sessionStorage.getItem("token");
        const config = {
            headers: { authorization: `${token}`}
        }
        return axios.delete(this.baseUrl+path+obj, config);
    }
    public static update(path:string, id:string, name:string, description:string):Promise<any>{

        let obj=[name,description]
        const token:any = sessionStorage.getItem("token");
        const config = {
            headers: { authorization: `${token}`}
        }
        return axios.patch(this.baseUrl+path+id,{
            name: name,
            description: description
        }, config);
    }
}