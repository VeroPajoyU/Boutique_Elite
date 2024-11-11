// Favorites.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Si estás usando React Router
import ProductCard from "./ProductCard";

const Favorites = ({ userId }) => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // Obtener productos favoritos al cargar el componente
  useEffect(() => {
    const fetchFavorites = async () => {
      const response = await fetch(`/favoritos/${userId}`);
      const data = await response.json();
      setFavorites(data);
    };

    fetchFavorites();
  }, [userId]);

  const handleFavoriteToggle = async (productId) => {
    const isFavorite = favorites.some(fav => fav.id === productId);
    const url = isFavorite ? '/favoritos' : '/favoritos';
    const method = isFavorite ? 'DELETE' : 'POST';
    const body = JSON.stringify({ id_usuario_favorito: userId, id_producto_favorito: productId });

    await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    });

    // Actualiza la lista de favoritos
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.id !== productId));
    } else {
      const response = await fetch(`/products/${productId}`);
      const product = await response.json();
      setFavorites([...favorites, product]);
    }
  };

  return (
    <div>
      <h2>Favoritos</h2>
      <div className="row">
        {favorites.length === 0 ? (
          <p>No tienes productos en favoritos.</p>
        ) : (
          favorites.map(product => (
            <div key={product.id} className="col-md-3">
              <ProductCard product={product} userId={userId} onFavoriteToggle={handleFavoriteToggle} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;