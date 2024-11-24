import { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = ({ userId }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (userId) {
      axios.get(`/cart/${userId}`).then((response) => {
        setCartItems(Array.isArray(response.data) ? response.data : []);
      }).catch((error) => {
        console.error('Error al cargar el carrito:', error);
      });
    }
  }, [userId]);

  const handleRemove = (productId) => {
    axios.delete(`/cart/${userId}/${productId}`).then(() => {
      setCartItems(cartItems.filter(item => item.id_producto_carrito !== productId));
    });
  };

  return (
    <div>
      <h2>Mi Carrito</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id_producto_carrito}>
              {item.nombre_producto} - ${item.costo_producto} x {item.cantidadproducto_carrito}
              <button onClick={() => handleRemove(item.id_producto_carrito)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
