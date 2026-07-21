import {Producto} from '../models/Producto';
import {ProductoRepository} from '../data/ProductoRepository';

export class ProductoService {
    private repository = new ProductoRepository();

    async listar(): Promise<Producto[]> {
        return await this.repository.obtenerProductos();
    }

    async agregar(producto: Producto): Promise<void> {
        try {
            const productos = await this.repository.obtenerProductos();
            const existe = productos.some(p => p.id === producto.id);

            if (existe) {
                console.log("El producto ya existe");
                return;
            }
            productos.push(producto);

            await this.repository.guardarProductos(productos);
            console.log("Producto agregado correctamente");
        } catch (error) {
            console.log("Error al agregar producto");
        } 
    }
    async buscar(id: number): Promise<Producto | undefined> {
        const productos = await this.repository.obtenerProductos();
        return productos.find(p => p.id === id);
    }

    async actualizar(producto: Producto): Promise<void> {
        try {
            const productos = await this.repository.obtenerProductos();
            const indice = productos.findIndex(p => p.id === producto.id);

            if (indice === -1) {
                console.log("Producto no encontrado");
                return;
            }

            productos[indice] = producto;
            await this.repository.guardarProductos(productos);
            console.log("Producto actualizado correctamente");
        } catch (error) {
            console.log("Error al actualizar producto");
        }
    }

    async eliminar(id: number): Promise<void> {
        try {
            const productos = await this.repository.obtenerProductos();

            const nuevos = productos.filter(p => p.id !== id);

            if (nuevos.length < productos.length) {
                await this.repository.guardarProductos(nuevos);
                console.log("Producto eliminado correctamente");
            } else {
                console.log("Producto no encontrado");
            }
        } catch (error) {
            console.log("Error al eliminar producto");
        }
    }
}