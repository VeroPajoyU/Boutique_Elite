import { useEffect, useState } from "react";
import fetch_data from '../api/api_backend.jsx';
import ProductCard from "./ProductCard.jsx";

const Favorites = ({ userId }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (!userId) {
            alert("Por favor, inicia sesión para ver tus favoritos.");
            return;
        }

        fetch_data("/favoritos/" + userId, setFavorites);
    }, [userId]);

    const handleFavoriteToggle = async (productId) => {
        const isFavorite = favorites.some((fav) => fav.id === productId);
        const action = isFavorite ? "REMOVE_FAVORITE" : "ADD_FAVORITE";

        await fetch_data("/favoritos", null, {
            action,
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
        <div>
            <h2>Favoritos</h2>
            <div className="row">
                {favorites.length === 0 ? (
                    <p>No tienes productos en favoritos.</p>
                ) : (
                    favorites.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            userId={userId}
                            onFavoriteToggle={handleFavoriteToggle}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Favorites;