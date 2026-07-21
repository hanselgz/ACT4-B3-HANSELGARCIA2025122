import { readFile, writeFile } from "fs/promises";
import { Usuario } from "../models/Usuario";

export class UsuarioRepository {
    //Ruta donde se almacaena mi archivojson
    private ruta = "./src/data/usuarios.json";

    // metodo para obtener usuarios
        async obtenerUsuarios(): Promise<Usuario[]> {
            try{
                const datos = await readFile(this.ruta, "utf8");
                return JSON.parse(datos);
            }catch(error){
                return[];
            }
        }
    

    async guardarUsuarios(usuarios: Usuario[]): Promise<void> {
        try{
            await writeFile( 
                this.ruta,
                JSON.stringify(usuarios, null, 4)
            );
        }catch(error){
            console.log("error al guardar usuarios")
            throw error;
        }
    }
}