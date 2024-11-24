import connection from "./database.js";

// Agregar un producto a favoritos
export const add_favorite = async (req) => {
    const { id_usuario_favorito, id_producto_favorito } = req.body;
    const query = `INSERT INTO favoritos (id_usuario_favorito, id_producto_favorito) VALUES (?, ?)`;
    await connection.query(query, [id_usuario_favorito, id_producto_favorito]);
    return { message: 'Producto agregado a favoritos' };
};

// Eliminar un producto de favoritos
export const remove_favorite = async (req) => {
    const { id_usuario_favorito, id_producto_favorito } = req.body;
    const query = `DELETE FROM favoritos WHERE id_usuario_favorito = ? AND id_producto_favorito = ?`;
    await connection.query(query, [id_usuario_favorito, id_producto_favorito]);
    return { message: 'Producto eliminado de favoritos' };
};

// Obtener productos favoritos de un usuario
export const get_favorites_by_user = async (req) => {
    const { id_usuario } = req.params;
    const query = `
        SELECT 
            p.id_producto AS id, 
            p.nombre_producto AS product, 
            p.descripcion_producto AS description, 
            p.costo_producto AS price, 
            f.ruta_foto
        FROM favoritos f
        JOIN productos p ON f.id_producto_favorito = p.id_producto
        WHERE f.id_usuario_favorito = ?`;
    const [results] = await connection.query(query, [id_usuario]);
    return results;
};

export default {add_favorite, remove_favorite, get_favorites_by_user};