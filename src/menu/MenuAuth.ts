import { UsuarioService } from "../service/UsuarioService";
import { Usuario } from "../models/Usuario";
import { rl } from "../utils/Readline";
import { pedirNumero, pedirCorreo } from "../exception/Validaciones";

const service = new UsuarioService();

export async function menuAuth(): Promise<Usuario | null> {
    let opcion = 0;
    let usuarioActual: Usuario | null = null;

    do {
        console.log("\nBienvenido");
        console.log("1. Iniciar sesión");
        console.log("2. Registrarse");
        console.log("3. Salir");
        opcion = Number(await rl.question("Opcion: "));

        switch(opcion){
            case 1:
                const correoLogin = await pedirCorreo("Correo: ");
                const contrasenaLogin = await pedirNumero("Contraseña: ");
                usuarioActual = await service.login(correoLogin, contrasenaLogin);
            break;
            case 2:
                const nombreRegistro = await rl.question("Nombre: ");
                const apellidoRegistro = await rl.question("Apellido: ");
                const edadRegistro = await pedirNumero("Edad: ");
                const correoRegistro = await pedirCorreo("Correo: ");
                const contrasenaRegistro = await pedirNumero("Contraseña: ");

                usuarioActual = await service.registrar({
                    nombre: nombreRegistro,
                    apellido: apellidoRegistro,
                    edad: edadRegistro,
                    correo: correoRegistro,
                    contrasena: contrasenaRegistro
                });
            break;
            case 3:
                console.log("Saliendo...");
            break;
            default:
                console.log("Opción inválida. Intente nuevamente.");
            break;
        }
    } while (opcion !== 3 && !usuarioActual);

    return usuarioActual;
}