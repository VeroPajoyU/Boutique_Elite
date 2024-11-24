import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation.jsx";
import Products from "./components/Products.jsx";
import Cart from './components/Cart.jsx'; // Importa el componente del carrito
import fetch_data from "./api/api_backend.jsx";

function App() {
  const [categories, setCategories] = useState([]);
  const [marks, setMarks] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [products, setProducts] = useState([]);
  const [mmPrices, setMmPrices] = useState([]);
  const [user, setUser] = useState(null); // Simula usuario autenticado
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [selectedMarksIds, setSelectedMarksIds] = useState([]);
  const [selectedSizesIds, setSelectedSizesIds] = useState([]);
  const [selectedColorsIds, setSelectedColorsIds] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [searchText, setSearchText] = useState('');



  useEffect(() => {
    fetch_data("/products", setProducts);
    fetch_data("/categories", setCategories);
    fetch_data("/marks", setMarks);
    fetch_data("/sizes", setSizes);
    fetch_data("/colors", setColors);
    fetch_data("/products/mmprices", setMmPrices);
  }, []);

  const handleCategorySelect = (categoryId) => setSelectedCategoryId(categoryId);
  const handleMarkSelect = (markIds) => setSelectedMarksIds(markIds);
  const handleSizeSelect = (sizeIds) => setSelectedSizesIds(sizeIds);
  const handleColorSelect = (colorIds) => setSelectedColorsIds(colorIds);
  const handlePriceSelect = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
  };
  const handleSearchChange = (searchText) => setSearchText(searchText);

  return (
    <Router>
      <header className="sticky-top">
        <Navigation
          categories={categories}
          onSearchChange={handleSearchChange}
          onCategorySelect={handleCategorySelect}
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
              onMarksSelect={handleMarkSelect} 
              onSizesSelect={handleSizeSelect} 
              onColorsSelect={handleColorSelect} 
              onPriceSelect={handlePriceSelect}
              productsF={handleSearchChange} 
            />
          } />
          <Route path="/carrito" element={
            <Cart userId={user ? user.id : null} /> // Pasa el ID del usuario autenticado al carrito
          } />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
