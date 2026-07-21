import { Rol } from "./Rol";
import { Estado } from "./Estado";

export interface Usuario {
    id: number;
    nombre: string;
    apellido: string;
    edad: number;
    correo: string;
    contrasena: number;
    rol: Rol;
    estado: Estado;
}