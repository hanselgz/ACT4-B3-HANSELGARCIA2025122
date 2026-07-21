import { Estado } from "../models/Estado";
import { Rol } from "../models/Rol";
import { UsuarioService } from "../service/UsuarioService";
import { ProductoService } from "../service/ProductoService";
import { ComentarioService } from "../service/ComentarioService";
import {rl} from "../utils/Readline";
import { pedirNumero } from "../exception/Validaciones";
const service = new UsuarioService();
const productoService = new ProductoService();
const comentarioService = new ComentarioService();

export async function namePrincipal() {
    let opcion = 0;
    do{
        console.log("\nMenú Principal");
        console.log("1. Gestionar usuarios");
        console.log("2. Gestionar productos");
        console.log("3. Gestionar Comentarios");
        console.log("4. Salir");
        opcion = Number(await rl.question("Opcion: "));
        switch(opcion){
            case 1:
            let opcionUsuarios = 0;
            do {
                console.log("\nMenú Usuarios");
                console.log("1. Listar usuarios");
                console.log("2. Agregar usuario");
                console.log("3. Buscar usuario");
                console.log("4. Actualizar usuario");
                console.log("5. Eliminar usuario");
                console.log("6. Salir");
                opcionUsuarios = Number(await rl.question("Opcion: ")); 
                switch(opcionUsuarios){
                    case 1:
                        const usuarios = await service.listar();
                        console.log(usuarios);
                    break;
                    case 2:
                        const idAgregar = await pedirNumero("ID del usuario: ");
                        const nombreAgregar = await rl.question("Nombre del usuario: ");
                        const apellidoAgregar = await rl.question("Apellido del usuario: ");
                        const edadAgregar = await pedirNumero("Edad del usuario: ");
                        const correoAgregar = await rl.question("Correo del usuario: ");
                        const contrasenaAgregar = await pedirNumero("Contraseña del usuario: ");
                        const rolTextoAgregar = await rl.question("Rol del usuario(Admin/Usuario): ");
                        const estadoTextoAgregar = await rl.question("Estado(Activo/Inactivo/suspendido): ");

                        await service.agregar({
                            id: idAgregar,
                            nombre: nombreAgregar,
                            apellido: apellidoAgregar,
                            edad: edadAgregar,
                            correo: correoAgregar,
                            contrasena: contrasenaAgregar,
                            rol: rolTextoAgregar.toUpperCase() as Rol,
                            estado: estadoTextoAgregar.toUpperCase() as Estado
                        });
                    break;
                    case 3:
                        const idBuscar = await pedirNumero("ID del usuario a buscar: ");
                        const usuarioEncontrado = await service.buscar(idBuscar);
                        console.log(usuarioEncontrado ?? "Usuario no encontrado");
                    break;
                    case 4:
                        const idActualizar = await pedirNumero("ID del usuario a actualizar: ");
                        const nombreActualizar = await rl.question("Nuevo nombre: ");
                        const apellidoActualizar = await rl.question("Nuevo apellido: ");
                        const edadActualizar = await pedirNumero("Nueva edad: ");
                        const correoActualizar = await rl.question("Nuevo correo: ");
                        const contrasenaActualizar = await pedirNumero("Nueva contraseña: ");
                        const rolTextoActualizar = await rl.question("Rol(Admin/Usuario): ");
                        const estadoTextoActualizar = await rl.question("Estado(Activo/Inactivo/suspendido): ");

                        await service.actualizar({
                            id: idActualizar,
                            nombre: nombreActualizar,
                            apellido: apellidoActualizar,
                            edad: edadActualizar,
                            correo: correoActualizar,
                            contrasena: contrasenaActualizar,
                            rol: rolTextoActualizar.toUpperCase() as Rol,
                            estado: estadoTextoActualizar.toUpperCase() as Estado
                        });
                    break;
                    case 5:
                        const idEliminar = await pedirNumero("ID del usuario a eliminar: ");
                        await service.eliminar(idEliminar);
                    break;
                    case 6:
                        console.log("Volviendo al menú principal...");
                    break;
                    default:
                        console.log("Opción inválida. Intente nuevamente.");
                    break;
                }
            } while (opcionUsuarios !== 6);
            break;
            case 2:
            let opcionProductos = 0;
            do{
                console.log("\nMenú Productos");
                console.log("1. Listar productos");
                console.log("2. Agregar producto");
                console.log("3. Buscar producto");
                console.log("4. Actualizar producto");
                console.log("5. Eliminar producto");
                console.log("6. Salir");
                opcionProductos = Number(await rl.question("Opcion: "));
                switch(opcionProductos){
                    case 1:
                        const productos = await productoService.listar();
                        console.log(productos);
                    break;
                    case 2:
                        const idAgregarProducto = await pedirNumero("ID del producto: ");
                        const nombreAgregarProducto = await rl.question("Nombre del producto: ");
                        const precioAgregarProducto = await pedirNumero("Precio del producto: ");
                        const stockAgregarProducto = await pedirNumero("Stock del producto: ");
                        const categoriaAgregarProducto = await rl.question("Categoría del producto: ");

                        await productoService.agregar({
                            id: idAgregarProducto,
                            nombre: nombreAgregarProducto,
                            precio: precioAgregarProducto,
                            stock: stockAgregarProducto,
                            categoria: categoriaAgregarProducto
                        });
                    break;
                    case 3:
                        const idBuscarProducto = await pedirNumero("ID del producto a buscar: ");
                        const productoEncontrado = await productoService.buscar(idBuscarProducto);
                        console.log(productoEncontrado ?? "Producto no encontrado");
                    break;
                    case 4:
                        const idActualizarProducto = await pedirNumero("ID del producto que quiere actualizar: ");
                        const nombreActualizarProducto = await rl.question("Nuevo nombre: ");
                        const precioActualizarProducto = await pedirNumero("Nuevo precio: ");
                        const stockActualizarProducto = await pedirNumero("Nuevo stock: ");
                        const categoriaActualizarProducto = await rl.question("Nueva categoría: ");

                        await productoService.actualizar({
                            id: idActualizarProducto,
                            nombre: nombreActualizarProducto,
                            precio: precioActualizarProducto,
                            stock: stockActualizarProducto,
                            categoria: categoriaActualizarProducto
                        });
                    break;
                    case 5:
                        const idEliminarProducto = await pedirNumero("ID del producto a eliminar: ");
                        await productoService.eliminar(idEliminarProducto);
                    break;
                    case 6:
                        console.log("Volviendo al menú principal");
                    break;
                    default:
                        console.log("Opción inválida. Intentelo de nuevo.");
                    break;
                }
            }while(opcionProductos !== 6);
            break;
            case 3:
                let opcionComentarios = 0;
                do {
                console.log("\nMenú Comentarios");
                console.log("1. Listar comentarios");
                console.log("2. Agregar comentario");
                console.log("3. Buscar comentario");
                console.log("4. Actualizar comentario");
                console.log("5. Eliminar comentario");
                console.log("6. Salir");
                opcionComentarios = Number(await rl.question("Opcion: "));
                switch(opcionComentarios){
                    case 1:
                        const comentarios = await comentarioService.listar();
                        console.log(comentarios);
                    break;
                    case 2:
                        const idAgregarComentario = await pedirNumero("ID del comentario: ");
                        const contenidoAgregarComentario = await rl.question("Contenido del comentario: ");
                        const autorAgregarComentario = await rl.question("Autor del comentario: ");

                        await comentarioService.agregar({
                            id: idAgregarComentario,
                            contenido: contenidoAgregarComentario,
                            autor: autorAgregarComentario
                        });
                    break;
                    case 3:
                        const idBuscarComentario = await pedirNumero("ID del comentario a buscar: ");
                        const comentarioEncontrado = await comentarioService.buscar(idBuscarComentario);
                        console.log(comentarioEncontrado ?? "Comentario no encontrado");
                    break;
                    case 4:
                        const idActualizarComentario = await pedirNumero("ID del comentario a actualizar: ");
                        const contenidoActualizarComentario = await rl.question("Nuevo contenido: ");
                        const autorActualizarComentario = await rl.question("Nuevo autor: ");

                        await comentarioService.actualizar({
                            id: idActualizarComentario,
                            contenido: contenidoActualizarComentario,
                            autor: autorActualizarComentario
                        });
                    break;
                    case 5:
                        const idEliminarComentario = await pedirNumero("ID del comentario a eliminar: ");
                        await comentarioService.eliminar(idEliminarComentario);
                    break;
                    case 6:
                        console.log("Volviendo al menú principal...");
                    break;
                    default:
                        console.log("Opción inválida. Intente nuevamente.");
                    break;
                }
            }while(opcionComentarios !== 6);
            break;
            case 4:
                console.log("Volviendo al menú principal...");
            break;
            default:
                console.log("Opción inválida. Intente nuevamente.");
            break;
        }
    } while (opcion !== 4);

    rl.close();
}