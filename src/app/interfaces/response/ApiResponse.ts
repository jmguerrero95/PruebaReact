//INTERFACES PARA RESPUESTA
export interface LoginResponse{
    data:any[],
    token:string,
    status:number,
    message:string
}

export interface ListGroup{
    data:any[]
}