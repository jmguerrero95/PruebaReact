//INTERFACE USUARIO PARA LOGIN ALGUNOS PARAMENTROS QUEDAN OPCIONALES PARA FUTURAS IMPLEMENTACIONES
export interface User{
    name?:string,
    email:string,
    password:string,
    repeatPassword?:string
}