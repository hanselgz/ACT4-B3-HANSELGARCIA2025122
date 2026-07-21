import { readFile, writeFile } from "fs/promises";
import { Comentario } from "../models/Comentario";

export class ComentarioRepository {
    private ruta = "./src/data/comentarios.json";

    async obtenerComentarios(): Promise<Comentario[]> {
        try {
            const datos = await readFile(this.ruta, "utf8");
            return JSON.parse(datos);
        } catch (error) {
            return [];
        }
    }

    async guardarComentarios(comentarios: Comentario[]): Promise<void> {
        try {
            await writeFile(
                this.ruta,
                JSON.stringify(comentarios, null, 4)
            );
        } catch (error) {
            console.log("Error al guardar comentarios");
            throw error;
        }   
    }
}   