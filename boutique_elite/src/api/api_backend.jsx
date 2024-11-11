const url = "http://localhost:3000";

const fetch_data = async (endpoint, setState, body = null) => {
  const result = await fetch(url + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null, // Enviar el cuerpo solo si hay datos
  });
  const { data } = await result.json();
  setState(data);
};

export default fetch_data;

/**
 * Este código hace una solicitud HTTP POST a un servidor en http://localhost:3000 
 * con un endpoint dinámico, recibe la respuesta en formato JSON, extrae la propiedad data de esa respuesta, 
 * y actualiza el estado de la aplicación con los datos recibidos. 
 * Es útil para interactuar con una API y manejar los datos de forma eficiente en una aplicación 
 * basada en JavaScript, como React. 
 */