// // PriceFilter.jsx --> Componente de rango de precios.
import { useState, useEffect } from "react";
import { Form } from 'react-bootstrap';

function PriceFilter({ prices, onPriceSelect }) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (prices && prices[0]) {
      const mMinPrices = prices[0].min_price;
      const mMaxPrices = prices[0].max_price;
      setMinPrice(mMinPrices);
      setMaxPrice(mMaxPrices);
      setLoading(false);
    }
  }, [prices]);

  const handleMinPriceChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setMinPrice(Math.min(value, maxPrice));
  };

  const handleMaxPriceChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setMaxPrice(Math.max(value, minPrice));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPriceSelect(minPrice, maxPrice);
  };

  if (loading) {
    return <div className="text-center">Cargando Filtro de Precios...</div>;
  }

  return (
    <div className='container mt-4 accordion'>
      <div className='accordion-item'>
        <Form onSubmit={handleSubmit}>
          <div className="text-center mt-3">
            <h5><Form.Label>Precios</Form.Label></h5>
          </div>
          <div className="accordion-body m-1">
            <Form.Control
              type="range"
              name="minPrice"
              value={minPrice}
              min={prices[0].min_price}
              max={maxPrice}
              onChange={handleMinPriceChange}
            />
            <Form.Control
              type="number"
              name="minPrice"
              value={minPrice}
              min={prices[0].min_price}
              max={maxPrice}
              onChange={handleMinPriceChange}
            />
            <Form.Control
              type="range"
              name="maxPrice"
              value={maxPrice}
              min={minPrice}
              max={prices[0].max_price}
              onChange={handleMaxPriceChange}
            />
            <Form.Control
              type="number"
              name="maxPrice"
              value={maxPrice}
              min={minPrice}
              max={prices[0].max_price}
              onChange={handleMaxPriceChange}
            />
          </div>
          <div className="text-center m-3">
            <button type='submit' className="btn btn-primary">Aplicar</button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default PriceFilter;