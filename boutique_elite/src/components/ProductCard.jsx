import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { FaRegEye, FaShoppingCart, FaHeart } from "react-icons/fa";
import fetch_data from "../api/api_backend.jsx";

const ProductCard = ({ product, userId, onFavoriteToggle }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Comprueba si el producto ya está en favoritos para este usuario
  useEffect(() => {
    if (userId) {
      const body = {
        action: "CHECK_FAVORITE",
        id_usuario_favorito: userId,
        id_producto_favorito: product.id,
      };

      fetch_data(
        "/favoritos",
        (result) => {
          if (result && result.isFavorite !== undefined) {
            setIsFavorite(result.isFavorite);
          } else {
            console.error("[ERROR] No se pudo verificar el estado de favorito.");
          }
        },
        body,
        (error) => console.error("[ERROR] Falló la comprobación de favoritos:", error)
      );
    }
  }, [userId, product.id]);

  const handleFavoriteToggle = async () => {
    if (!userId) {
      alert("Por favor, inicia sesión para agregar productos a favoritos.");
      return;
    }

    try {
      const body = {
        action: isFavorite ? "REMOVE_FAVORITE" : "ADD_FAVORITE",
        id_usuario_favorito: userId,
        id_producto_favorito: product.id,
      };

      fetch_data(
        "/favoritos",
        (result) => {
          if (result && result.success) {
            setIsFavorite(!isFavorite); // Alterna el estado local
            onFavoriteToggle(product.id); // Notifica al componente padre
          } else {
            console.error("[ERROR] No se pudo actualizar el estado de favorito.");
          }
        },
        body,
        (error) => console.error("[ERROR] Falló la actualización de favoritos:", error)
      );
    } catch (error) {
      console.error("[ERROR] Error al alternar favorito:", error);
    }
  };

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