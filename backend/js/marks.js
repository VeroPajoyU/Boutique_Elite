import connection from "./database.js";

const get_marks = async () => {
    const query = 
        `SELECT 
            id_marca AS id, 
            nombre_marca AS mark 
        FROM marcas;`;
    const [results] = await connection.query(query);
    
    return results;
};

export default get_marks;