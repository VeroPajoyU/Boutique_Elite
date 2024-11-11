import connection from "./database.js";

const get_products = async () => {
    const query = 
        `SELECT
            id_producto AS id,
            nombre_producto AS product,
            descripcion_producto AS description,
            costo_producto AS price,
            cantidad_producto AS available_product,
            ruta_foto
        FROM productos p
        JOIN fotos f ON f.id_producto_foto = p.id_producto;`
    const [results] = await connection.query(query);
    
    return results;
};

const get_products_marks = async (req, res, id) => {
    const query = 
        `SELECT
            id_producto AS id,
            nombre_producto AS product,
            descripcion_producto AS description,
            costo_producto AS price,
            cantidad_producto AS available_product,
            ruta_foto
        FROM productos p
        JOIN fotos f ON f.id_producto_foto = p.id_producto
        JOIN marcas m ON m.id_marca = p.id_marca_producto 
        WHERE m.id_marca in (${id});`
    const [results] = await connection.query(query);
    
    return results;
};

const get_products_sizes = async (req, res, id) => {
    const query = 
        `SELECT
            id_producto AS id,
            nombre_producto AS product,
            descripcion_producto AS description,
            costo_producto AS price,
            cantidad_producto AS available_product,
            ruta_foto
        FROM productos p
        JOIN fotos f ON f.id_producto_foto = p.id_producto
        JOIN tallas t ON t.id_talla = p.id_talla_producto 
        WHERE t.id_talla in (${id});`
    const [results] = await connection.query(query);
    
    return results;
};

const get_products_colors = async (req, res, id) => {
    const query = 
        `SELECT
            id_producto AS id,
            nombre_producto AS product,
            descripcion_producto AS description,
            costo_producto AS price,
            cantidad_producto AS available_product,
            ruta_foto
        FROM productos p
        JOIN fotos f ON f.id_producto_foto = p.id_producto
        JOIN colores c ON c.id_color = p.id_color_producto 
        WHERE c.id_color in (${id});`
    const [results] = await connection.query(query);
    
    return results;
};

const get_products_categories = async (req, res, id) => {
    const query = 
        `SELECT
            id_producto AS id,
            nombre_producto AS product,
            descripcion_producto AS description,
            costo_producto AS price,
            cantidad_producto AS available_product,
            ruta_foto
        FROM productos p
        JOIN fotos f ON f.id_producto_foto = p.id_producto
        JOIN categorias c ON c.id_categoria = p.id_categoria_producto
        WHERE c.id_categoria in (${id});`
    const [results] = await connection.query(query);
    
    return results;
};

const get_products_minmax_prices = async () => {
    const query = 
        `SELECT 
            min(costo_producto) AS min_price, 
            max(costo_producto) AS max_price,
            ruta_foto
        FROM productos
        JOIN fotos f ON f.id_producto_foto = p.id_producto;`
    const [results] = await connection.query(query);
    
    return results;
};

const get_products_range_prices = async (req, res, price) => {
    price = price.split(',');
    const query = 
        `SELECT 
            id_producto AS id,
            nombre_producto AS product,
            descripcion_producto AS description,
            costo_producto AS price,
            cantidad_producto AS available_product,
            ruta_foto
        FROM productos
        JOIN fotos f ON f.id_producto_foto = p.id_producto
        WHERE costo_producto BETWEEN ${price[0]} AND ${price[1]};`
    const [results] = await connection.query(query);

    return results;
};

const get_products_search = async (req, res, searchText) => {
    const query = 
      `SELECT 
        id_producto AS id,
        nombre_producto AS product,
        descripcion_producto AS description,
        costo_producto AS price,
        cantidad_producto AS available_product,
        ruta_foto
      FROM productos p
      JOIN fotos f ON f.id_producto_foto = p.id_producto
      WHERE nombre_producto LIKE '%${searchText}%' OR descripcion_producto LIKE '%${searchText}%';`
    const [results] = await connection.query(query);
    
    return results;
  };

export { 
    get_products, 
    get_products_marks, 
    get_products_sizes, 
    get_products_colors, 
    get_products_categories, 
    get_products_minmax_prices,
    get_products_range_prices,
    get_products_search
};