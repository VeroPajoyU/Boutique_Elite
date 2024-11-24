import connection from './database.js'; // Importamos la conexión de database.js

// Agregar un producto al carrito
export const add_to_cart = async (req, res) => {
    const { id_usuario, id_producto, cantidad } = req.body;

    try {
        const query = `
            INSERT INTO carritos (id_usuario_carrito, id_producto_carrito, cantidadproducto_carrito) 
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE cantidadproducto_carrito = cantidadproducto_carrito + ?;
        `;
        await connection.query(query, [id_usuario, id_producto, cantidad, cantidad]);
        res.status(200).json({ message: 'Producto añadido al carrito.' });
    } catch (error) {
        console.error('Error al agregar al carrito:', error);
        res.status(500).json({ error: 'Error al agregar al carrito.' });
    }
};

// Obtener carrito por usuario
export const get_cart_by_user = async (req, res) => {
    const { id_usuario } = req.params;

    try {
        const query = `
            SELECT c.*, p.nombre_producto, p.costo_producto, p.descripcion_producto 
            FROM carritos c 
            JOIN productos p ON c.id_producto_carrito = p.id_producto 
            WHERE c.id_usuario_carrito = ?;
        `;
        const [rows] = await connection.query(query, [id_usuario]);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).json({ error: 'Error al obtener el carrito.' });
    }
};

// Actualizar cantidad de producto en el carrito
export const update_cart_item = async (req, res) => {
    const { id_usuario, id_producto, cantidad } = req.body;

    try {
        const query = `
            UPDATE carritos 
            SET cantidadproducto_carrito = ? 
            WHERE id_usuario_carrito = ? AND id_producto_carrito = ?;
        `;
        await connection.query(query, [cantidad, id_usuario, id_producto]);
        res.status(200).json({ message: 'Cantidad actualizada.' });
    } catch (error) {
        console.error('Error al actualizar el carrito:', error);
        res.status(500).json({ error: 'Error al actualizar el carrito.' });
    }
};

// Eliminar producto del carrito
export const delete_cart_item = async (req, res) => {
    const { id_usuario, id_producto } = req.params;

    try {
        const query = `
            DELETE FROM carritos 
            WHERE id_usuario_carrito = ? AND id_producto_carrito = ?;
        `;
        await connection.query(query, [id_usuario, id_producto]);
        res.status(200).json({ message: 'Producto eliminado del carrito.' });
    } catch (error) {
        console.error('Error al eliminar el producto del carrito:', error);
        res.status(500).json({ error: 'Error al eliminar el producto del carrito.' });
    }
};
