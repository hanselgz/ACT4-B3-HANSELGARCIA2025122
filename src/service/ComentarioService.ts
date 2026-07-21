import { Comentario } from "../models/Comentario";
import { ComentarioRepository } from "../data/ComentarioRepository";

export class ComentarioService {
    private repository = new ComentarioRepository();

    async listar(): Promise<Comentario[]> {
        return await this.repository.obtenerComentarios();
    }

    async agregar(comentario: Comentario): Promise<void> {
        try{
            const comentarios = await this.repository.obtenerComentarios();
            const existe = comentarios.some(c => c.id === comentario.id);

            if(existe){
                console.log("El comentario ya existe");
                return;
            }
            comentarios.push(comentario);

            await this.repository.guardarComentarios(comentarios);
            console.log("Comentario agregado correctamente");
        }catch(error){
            console.log("Error al agregar comentario");
        }
    }

    async buscar(id: number): Promise<Comentario | undefined> {
        const comentarios = await this.repository.obtenerComentarios();
        return comentarios.find(c => c.id === id);
    }                      

    async actualizar(comentario: Comentario): Promise<void> {
        try {
            const comentarios = await this.repository.obtenerComentarios();
            const indice = comentarios.findIndex(c => c.id === comentario.id);

            if (indice === -1) {
                console.log("Comentario no encontrado");
                return;
            }

            comentarios[indice] = comentario;
            await this.repository.guardarComentarios(comentarios);
            console.log("Comentario actualizado correctamente");
        } catch (error) {
            console.log("Error al actualizar comentario");
        }
    }

    async eliminar(id: number): Promise<void> {
        try{
            const comentarios = await this.repository.obtenerComentarios();

            const nuevos = comentarios.filter(c => c.id !== id);

            if(nuevos.length < comentarios.length){
                await this.repository.guardarComentarios(nuevos);
                console.log("Comentario eliminado correctamente");
            }else{
                console.log("Comentario no encontrado");
            }
        }catch(error){
            console.log("Error al eliminar comentario");
        }
    }
}   