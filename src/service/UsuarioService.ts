import { UsuarioRepository } from "../data/UsuarioRepository";
import { Usuario } from "../models/Usuario";
import { Rol } from "../models/Rol";

export class UsuarioService {
    private repository = new UsuarioRepository();
    
    async listar(): Promise<Usuario[]> {
        return await this.repository.obtenerUsuarios();
    }

    async agregar(usuario: Usuario): Promise<void> {
        try{
            const usuarios = await this.repository.obtenerUsuarios();
            const existe = usuarios.some(u => u.id === usuario.id);

            if(existe){
                console.log("El usuario ya existe");
                return;
            }
            usuarios.push(usuario);

            await this.repository.guardarUsuarios(usuarios);
            console.log("Usuario agregado correctamente");
        }catch(error){
            console.log("Error al agregar usuario");
        }
    }

    async buscar(id: number): Promise<Usuario | undefined> {
        const usuarios = await this.repository.obtenerUsuarios();
        return usuarios.find(u => u.id === id);
    }

    async actualizar(usuario: Usuario): Promise<void> {
    try {
        const usuarios = await this.repository.obtenerUsuarios();
        const indice = usuarios.findIndex(u => u.id === usuario.id);

        if (indice === -1) {
            console.log("Usuario no encontrado");
            return;
        }

        usuarios[indice] = usuario;
        await this.repository.guardarUsuarios(usuarios);
        console.log("Usuario actualizado correctamente");
    } catch (error) {
        console.log("Error al actualizar usuario");
    }
}

    async registrar(datos: Omit<Usuario, "id" | "rol" | "estado">): Promise<Usuario | null> {
        try{
            const usuarios = await this.repository.obtenerUsuarios();
            const existe = usuarios.some(u => u.correo === datos.correo);

            if(existe){
                console.log("El correo ya está registrado");
                return null;
            }

            const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;

            const nuevoUsuario: Usuario = {
                id: nuevoId,
                nombre: datos.nombre,
                apellido: datos.apellido,
                edad: datos.edad,
                correo: datos.correo,
                contrasena: datos.contrasena,
                rol: Rol.USUARIO,
                estado: "ACTIVO"
            };

            usuarios.push(nuevoUsuario);
            await this.repository.guardarUsuarios(usuarios);
            console.log("Usuario registrado correctamente");
            return nuevoUsuario;
        }catch(error){
            console.log("Error al registrar usuario");
            return null;
        }
    }

    async login(correo: string, contrasena: number): Promise<Usuario | null> {
        const usuarios = await this.repository.obtenerUsuarios();
        const usuario = usuarios.find(u => u.correo === correo && u.contrasena === contrasena);

        if(!usuario){
            console.log("Correo o contraseña incorrectos");
            return null;
        }

        if(usuario.estado !== "ACTIVO"){
            console.log("El usuario no está activo");
            return null;
        }

        console.log(`Bienvenido, ${usuario.nombre}`);
        return usuario;
    }

    async eliminar(id: number): Promise<void> {
        try{
            const usuarios = await this.repository.obtenerUsuarios();

            const nuevos = usuarios.filter(u => u.id !== id);

            if(nuevos.length < usuarios.length){
                false;
            }

            await this.repository.guardarUsuarios(nuevos);
            console.log("Usuario eliminado correctamente");
        }catch(error){
            console.log("Error al eliminar usuario");
        }
    }

}