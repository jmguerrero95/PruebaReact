//SERVICIO PARA GRUPOS ESPECIFICO
import { Group } from "../../interfaces/group/Group";
import { GroupEdit } from "../../interfaces/group/Group";
import { generalService } from "../GeneralServiceGroup";

export class GroupService {
    public static async listGroup():Promise<Array<string>>{
        return (await generalService.get('/group')).data.groups
    }

    public static async agreGroup(obj:Group):Promise<Array<string>>{
        return (await generalService.post('/group/create', obj)).data
    }

    public static async deletGroup(id:string):Promise<Array<string>>{
        return (await generalService.delete('/group/delete/?id=', id)).data
    }

    public static async updateGroup(id:string, name:string, description:string):Promise<Array<string>>{
        console.log(id)
        console.log(name)
        console.log(description)
        return (await generalService.update('/group/update/?id=', id, name, description)).data
    }
}