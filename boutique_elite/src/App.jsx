// App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importa Router y Routes
import Navigation from "./components/Navigation.jsx";
import Products from "./components/Products.jsx";
import Favorites from "./components/Favorites.jsx";
import Login from "./components/Login.jsx";
import fetch_data from "./api/api_backend.jsx";

function App() {
  const [categories, setCategories] = useState([]);
  const [marks, setMarks] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [products, setProducts] = useState([]);
  const [mmPrices, setMmPrices] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [selectedMarksIds, setSelectedMarksIds] = useState([]);
  const [selectedSizesIds, setSelectedSizesIds] = useState([]);
  const [selectedColorsIds, setSelectedColorsIds] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [favorites, setFavorites] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetch_data("/products", setProducts);
    fetch_data("/categories", setCategories);
    fetch_data("/marks", setMarks);
    fetch_data("/sizes", setSizes);
    fetch_data("/colors", setColors);
    fetch_data("/products/mmprices", setMmPrices);
  }, []);

  useEffect(() => {
    if (selectedCategoryId === 0) {
      fetch_data("/products", setProducts);
    } else {
      fetch_data("/products/categories/" + selectedCategoryId, setProducts);
    }
  }, [selectedCategoryId]);

  useEffect(() => {
    if (selectedMarksIds.length === 0) {
      fetch_data("/products", setProducts);
    } else {
      const marksIdsString = selectedMarksIds.join(',');
      fetch_data("/products/marks/" + marksIdsString, setProducts);
    }
  }, [selectedMarksIds]);

  useEffect(() => {
    if (selectedSizesIds.length === 0) {
      fetch_data("/products", setProducts);
    } else {
      const sizesIdsString = selectedSizesIds.join(',');
      fetch_data("/products/sizes/" + sizesIdsString, setProducts);
    }
  }, [selectedSizesIds]);

  useEffect(() => {
    if (selectedColorsIds.length === 0) {
      fetch_data("/products", setProducts);
    } else {
      const colorsIdString = selectedColorsIds.join(',');
      fetch_data("/products/colors/" + colorsIdString, setProducts);
    }
  }, [selectedColorsIds]);

  useEffect(() => {
    if (minPrice === 0 && maxPrice === 100000) {
      fetch_data("/products", setProducts);
    } else {
      const priceRangeString = minPrice + "," + maxPrice;
      fetch_data("/products/rangeprices/" + priceRangeString, setProducts);
    }
  }, [minPrice, maxPrice]);

  useEffect(() => {
    if (searchText==''){
      fetch_data("/products", setProducts);
    } else {
      fetch_data("/products/search", setProducts, { searchText }); // Enviar el texto de búsqueda en el cuerpo
    }
  }, [searchText]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch_data(
        '/authT',
        (data) => {
          setUserName(data.name);
          setUserId(data.id);
        },
        { token }
      ).catch(() => {
        setUserName(null);
        setUserId(null);
        localStorage.removeItem('token');
      })
    }
  }, setUserName, setUserId);

  const handleCategorySelect = (categoryId) => { setSelectedCategoryId(categoryId) };
  const handleMarkSelect = (markIds) => { setSelectedMarksIds(markIds) };
  const handleSizeSelect = (sizeIds) => { setSelectedSizesIds(sizeIds) };
  const handleColorSelect = (colorIds) => { setSelectedColorsIds(colorIds) };
  const handlePriceSelect = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
  };
  const handleFavoritesChange = (newFavorites) => { setFavorites(newFavorites); };
  const handleSearchChange = (searchText) => { setSearchText(searchText); };
  const handleShowLogin = (showLogin) => { setShowLogin(showLogin); };
  const handleLogin = (data) => {
    setUserName(data.name);
    setUserId(data.id);
    localStorage.setItem('token', data.token);
    setShowLogin(false);
  }
  const handleLogout = () => {
    setUserName(null);
    setUserId(null);
    localStorage.removeItem('token');
  }

  return (
    <>
      <Router>
        <header className="sticky-top">
          <Navigation
            categories={categories}
            user={userName}
            onSearchChange={handleSearchChange}
            onCategorySelect={handleCategorySelect}
            onLogin={handleShowLogin}
            onLogout={handleLogout}
          />
        </header>
        <main>
          <Routes>
            <Route path="/" element={
              <Products 
                products={products}
                marks={marks} 
                sizes={sizes} 
                colors={colors} 
                prices={mmPrices}
                userId={userId}
                onMarksSelect={handleMarkSelect} 
                onSizesSelect={handleSizeSelect} 
                onColorsSelect={handleColorSelect} 
                onPriceSelect={handlePriceSelect}
                onLogin={handleShowLogin}
                // onFavoritesChange={handleFavoritesChange}
              />
            } />
            <Route path="/favoritos" element={
              <Favorites 
                favorites={favorites}
              />
            } />
          </Routes>
        </main>
      </Router>
      <Login
        show={showLogin}
        onLogin={handleLogin}
        onClose={() => setShowLogin(false)}
      />
    </>
  );
}

export default App;