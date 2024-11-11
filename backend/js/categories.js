import connection from "./database.js";

const get_categories = async () => {
    const query = 
        `SELECT 
            id_categoria AS id, 
            nombre_categoria AS category 
        FROM categorias;`;
    const [results] = await connection.query(query);
    
    return results;
};

export default get_categories;