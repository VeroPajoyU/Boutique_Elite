import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { FaRegEye, FaShoppingCart, FaHeart } from "react-icons/fa";
import fetch_data from "../api/api_backend.jsx";
import Login from './Login';

// const ProductCard = ({ product, userId, onFavoriteToggle }) => {
const ProductCard = ({ product, loginState, onLoginState }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [userId, setUserId] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = (data) => {
    setUserId(data.id);
    localStorage.setItem('token', data.token);
    setShowLogin(false);
    onLoginState(true);
    window.location.reload();
  }

  const handleFavoriteToggle = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUserId(null);
      setShowLogin(true);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && loginState) {
      fetch_data(
        '/authT',
        (data) => {
          setUserId(data.id); // Guarda el ID del usuario autenticado
          console.log('[INFO] Usuario autenticado:', data.name);
          console.log('[INFO] Usuario autenticado:', data.id);
          onLoginState(true); // Cambia el estado de login
        },
        { token }
      ).catch((err) => {
        console.error('[ERROR] Token inválido:', err);
        localStorage.removeItem('token'); // Borra el token del almacenamiento local
        setUserId(null); // Borra el ID del usuario autenticado
        loginState(false); // Cambia el estado de login
      })
    } else {
      console.log('[INFO] No hay token almacenado');
      setUserId(null); // Borra el ID del usuario autenticado
      onLoginState(false); // Cambia el estado de login
    }
  },[setUserId]);

  // Verifica si la ruta de la imagen es válida y construye la ruta completa de la imagen
  const imagePath = product.ruta_foto && product.ruta_foto !== 'undefined' 
    ? `/photoProducts/${product.ruta_foto}`
    : '/photoProducts/foto_undefined.jpg';

  return (
    <>
      <Card style={{ width: "17rem", position: "relative", marginTop: "40px", marginRight: "20px", marginLeft: "20px" }}>
        {/* Utiliza la ruta condicional para mostrar la imagen del producto o la imagen predeterminada */}
        <Card.Img variant="top" height="360px" src={imagePath} alt={product.product} />
        <Card.Body>
          <Card.Title>{product.product}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <section className="d-flex align-items-center justify-content-between">
            <h2 className="d-flex align-items-center">${product.price}</h2>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <FaRegEye size={35} color="black" title="Ver detalle" className="me-3" />
              <FaShoppingCart size={35} color="green" title="Añadir al carrito" />
            </div>
          </section>
          <FaHeart
            size={35}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              transform: "translateY(-50%)",
              filter: "drop-shadow(2px 2px 2px black)",
            }}
            color={isFavorite ? "red" : "white"}
            onClick={handleFavoriteToggle}
            title={isFavorite ? "Eliminar de Favoritos" : "Añadir a Favoritos"}
          />
        </Card.Body>
      </Card>
      <Login show={showLogin} handleClose={() => setShowLogin(false)} handleLogin={handleLogin} />
    </>
  );
};

export default ProductCard;