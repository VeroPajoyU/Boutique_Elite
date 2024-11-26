import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { FaRegEye, FaShoppingCart, FaHeart } from "react-icons/fa";
import fetch_data from "../api/api_backend.jsx";
import Login from './Login';

// const ProductCard = ({ product, userId, onFavoriteToggle }) => {
// const ProductCard = ({ product, loginState, onLoginState, isFavorite: initialIsFavorite }) => {
const ProductCard = ({ product, userId, onLogin }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteToggle = async () => {
    if (!userId) {
      onLogin(true);
    } else {
      setIsFavorite(!isFavorite);
      if (isFavorite) {
        fetch_data('/favoritos/remove', ()=>{}, { id_usuario_favorito: userId, id_producto_favorito: product.id });
      } else {
        fetch_data('/favoritos/add', ()=>{}, { id_usuario_favorito: userId, id_producto_favorito: product.id });
      }
    }
  }

  // Verifica si la ruta de la imagen es válida y construye la ruta completa de la imagen
  const imagePath = product.ruta_foto && product.ruta_foto !== 'undefined' 
    ? `/photoProducts/${product.ruta_foto}`
    : '/photoProducts/foto_undefined.jpg';

  return (
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
  );
};

export default ProductCard;