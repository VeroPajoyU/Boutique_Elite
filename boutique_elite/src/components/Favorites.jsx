import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function Favorites({ favorites, userId, favoritesIds, onLogin, onFavoriteToggle }) {
    const[localFavorites, setLocalFavorites] = useState(favorites);

    useEffect(() => {
        setLocalFavorites(favorites);
      }, [favorites]);

    const handleFavoriteToggle = (productId) => {
        setLocalFavorites(localFavorites.filter(product => product.id !== productId));
        onFavoriteToggle(productId);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Favoritos</h2>
            {!favorites.length ? (
                <p className="text-center">No tienes productos en favoritos.</p>
            ): (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                    {favorites.map((product) => (
                        <div className="col" key={product.id}>
                            <ProductCard
                                product={product}
                                userId={userId}
                                favoritesIds={favoritesIds}
                                onLogin={onLogin}
                                onFavoriteToggle={handleFavoriteToggle}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favorites;