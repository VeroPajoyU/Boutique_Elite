import { useEffect, useState } from "react";
import fetch_data from '../api/api_backend.jsx';
import ProductCard from "./ProductCard.jsx";
import { useLocation, useNavigate } from "react-router-dom";

const Favorites = () => {
    
    const location = useLocation();
    const navigate = useNavigate();
    const userId = location.state?.userId;
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetch_data(`/favoritos/` + userId, setFavorites);
        console.log(favorites);
    }, [userId, navigate]);

    const handleFavoriteToggle = async (productId) => {
        const isFavorite = favorites.some((fav) => fav.id === productId);
    
        await fetch_data("/favoritos/" + (isFavorite ? "remove" : "add"), null, {
          id_usuario_favorito: userId,
          id_producto_favorito: productId,
        });
    
        setFavorites((prevFavorites) =>
          isFavorite
            ? prevFavorites.filter((fav) => fav.id !== productId)
            : [...prevFavorites, { id: productId }]
        );
      };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Favoritos</h2>
            {favorites.length === 0 ? (
                <p className="text-center">No tienes productos en favoritos.</p>
            ) : (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                    {favorites.map((product) => (
                        <div className="col" key={product.id}>
                            <ProductCard
                                product={product}
                                userId={userId}
                                onFavoriteToggle={handleFavoriteToggle}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;