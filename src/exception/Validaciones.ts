import { rl } from "../utils/Readline";

const dominiosPermitidos = ["gmail.com", "outlook.com", "hotmail.com", "yahoo.com"];

export function esNumero(valor: string): boolean {
    if(valor.trim() === ""){
        return false;
    }
    return !isNaN(Number(valor));
}

export function esCorreoValido(correo: string): boolean {
    const partes = correo.split("@");
    if(partes.length !== 2){
        return false;
    }
    const dominio = partes[1].toLowerCase();
    return dominiosPermitidos.includes(dominio);
}

export async function pedirNumero(mensaje: string): Promise<number> {
    while(true){
        try{
            const valor = await rl.question(mensaje);
            if(!esNumero(valor)){
                throw new Error("Debes ingresar un número válido");
            }
            return Number(valor);
        }catch(error){
            console.log((error as Error).message);
        }
    }
}

export async function pedirCorreo(mensaje: string): Promise<string> {
    while(true){
        try{
            const correo = await rl.question(mensaje);
            if(!esCorreoValido(correo)){
                throw new Error("El correo es inválido, usa un dominio que este correcto como @gmail.com, @outlook.com, @hotmail.com o @yahoo.com");
            }
            return correo;
        }catch(error){
            console.log((error as Error).message);
        }
    }
}