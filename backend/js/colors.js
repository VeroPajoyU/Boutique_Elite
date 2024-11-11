import connection from "./database.js";

const get_colors = async () => {
    const query = 
        `SELECT 
            id_color AS id, 
            nombre_color AS color 
        FROM colores;`;
    const [results] = await connection.query(query);
    
    return results;
};

export default get_colors;