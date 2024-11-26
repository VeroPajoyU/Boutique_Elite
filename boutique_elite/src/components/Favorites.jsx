import { useEffect, useState } from "react";
import fetch_data from '../api/api_backend.jsx';
import ProductCard from "./ProductCard.jsx";
import { useNavigate } from "react-router-dom";

const Favorites = ({ userId }) => {
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            alert("Por favor, inicia sesión para ver tus favoritos.");
            navigate("/");
            return;
        }

        fetch_data("/favoritos/" + userId, setFavorites);
    }, [userId]);

    const handleFavoriteToggle = async (productId) => {
        const isFavorite = favorites.some((fav) => fav.id === productId);
        const action = isFavorite ? "REMOVE_FAVORITE" : "ADD_FAVORITE";

        // Llama al endpoint correcto para agregar o eliminar un favorito
        await fetch_data("/favoritos/" + (isFavorite ? "remove" : "add"), null, {
            id_usuario_favorito: userId,
            id_producto_favorito: productId,
        });

        // Actualiza el estado de favoritos después de agregar/eliminar
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