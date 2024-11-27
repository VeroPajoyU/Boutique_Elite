// Products.jsx --> Componente principal que mostrará las cartas y cajas de filtro de productos.
import { useState, useEffect } from 'react';
import ProductCard from "./ProductCard";
import MarksFilter from "./MarksFilter";
import SizesFilter from "./SizesFilter";
import ColorsFilter from './ColorsFilter';
import PriceFilter from "./PriceFilter";
import logo from "../assets/logo_white_all.png";
import fetch_data from "../api/api_backend.jsx";

function Products({ products, marks, sizes, colors, prices, userId, favoritesIds, onMarksSelect, onSizesSelect, onColorsSelect, onPriceSelect, onLogin }) {
  const [selectedMarksIds, setSelectedMarksIds] = useState([]);
  const [selectedSizesIds, setSelectedSizesIds] = useState([]);
  const [selectedColorsIds, setSelectedColorsIds] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    onMarksSelect(selectedMarksIds);
  }, [selectedMarksIds, onMarksSelect]);

  useEffect(() => {
    onSizesSelect(selectedSizesIds);
  }, [selectedSizesIds, onSizesSelect]);

  useEffect(() => {
    onColorsSelect(selectedColorsIds);
  }, [selectedColorsIds, onColorsSelect]);

  useEffect(() => {
    onPriceSelect(minPrice, maxPrice);
  }, [minPrice, maxPrice, onPriceSelect]);

  const handleMarkSelect = (markIds) => { setSelectedMarksIds(markIds) };
  const handleSizeSelect = (sizeIds) => { setSelectedSizesIds(sizeIds) };
  const handleColorSelect = (colorIds) => { setSelectedColorsIds(colorIds) };
  const handlePriceSelect = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const toggleFilters = () => setShowFilters(!showFilters); // Alternar visibilidad de filtros

  return (
    <div className="container-fluid filters-text" >
      <div className="row filters-text">
        {/* Botón para alternar filtros en pantallas pequeñas */}
        <div className="d-md-none mb-3 show-filters-btn">
          <button className="btn btn-primary w-100" onClick={toggleFilters}>
            {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
          </button>
        </div>

        {/* Filtros */}
        <div className={`col-md-3 filters-col ${showFilters ? '' : 'd-none d-md-block'}`}>
          <div className="card position-sticky" style={{ top: "20px" }}>
            <div 
              className="card-body filters-text" 
              style={{ 
                maxHeight: "80vh", overflowY: "auto", 
                fontSize: window.innerWidth > 768 ? "1rem" : window.innerWidth > 576 ? "0.9rem" : "0.8rem"
              }}>
              <h5>Filtros</h5>
              <hr />
              <MarksFilter marks={marks} onMarksSelect={handleMarkSelect} />
              <SizesFilter sizes={sizes} onSizesSelect={handleSizeSelect} />
              <ColorsFilter colors={colors} onColorsSelect={handleColorSelect} />
              <PriceFilter prices={prices} onPriceSelect={handlePriceSelect} />
            </div>
          </div>
        </div>

        {/* Tarjetas de productos */}
        <div className="col-md-9">
          <div className="card">
            <div className="card-body">
              <h5 className='text-center'>
                <img src={logo} alt="Boutique" width={270} height={40} />
              </h5>
              <hr />
              <section className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-3 g-3">
                {products.map((product, index) => (
                  <ProductCard
                    key={index}
                    product={product}
                    userId={userId}
                    favoritesIds={favoritesIds}
                    onLogin={onLogin}
                  />
                ))}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;