import connection from "./database.js";

const get_sizes = async () => {
    const query = 
        `SELECT 
            id_talla AS id, 
            nombre_talla AS size 
        FROM tallas;`;
    const [results] = await connection.query(query);
    
    return results;
};

export default get_sizes;