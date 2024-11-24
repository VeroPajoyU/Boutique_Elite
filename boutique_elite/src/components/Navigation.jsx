import { useState, useEffect } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { FaUser, FaSignOutAlt, FaShoppingCart, FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; // Para redirigir a rutas
import axios from 'axios'; // Para manejar peticiones HTTP
import logo from "../assets/logo_white.png";
import Login from './Login';

function Navigation({ categories, onSearchChange, onCategorySelect }) {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showLogin, setShowLogin] = useState(false); // Estado para manejar el modal de login
  const [user, setUser] = useState(null); // Estado para almacenar el usuario autenticado
  const [cartCount, setCartCount] = useState(0); // Estado para manejar el contador del carrito
  const navigate = useNavigate(); // Para redirigir a diferentes rutas


  const fetchCartCount = async (userId) => {
    try {
      const response = await axios.get(`/cart/${userId}`);
      const cartItems = Array.isArray(response.data) ? response.data : [];
      const totalItems = cartItems.reduce((total, item) => total + item.cantidadproducto_carrito, 0);
      setCartCount(totalItems);
    } catch (error) {
      console.error('Error al obtener los datos del carrito:', error);
      setCartCount(0); // Resetea el contador en caso de error
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearchChange(searchText);
  };

  const handleCategorySelect = (categoryId) => {
    onCategorySelect(categoryId);
  };

  const handleLogin = (user) => {
    setUser(user); // Guarda los datos del usuario autenticado
    setShowLogin(false); // Cierra el modal
  };

  const handleLogout = () => {
    setUser(null); // Borra el usuario autenticado
    localStorage.removeItem("authToken"); // Limpia token si es utilizado
    setCartCount(0); // Resetea el carrito
    console.log('[INFO] Usuario cerró sesión');
  };

  const handleCartClick = () => {
    if (!user) {
      setShowLogin(true); // Si no está logueado, muestra el modal de login
    } else {
      navigate("/carrito"); // Si está logueado, redirige al carrito
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="py-3 sticky-top">
        <Navbar.Brand>
          <img src={logo} alt="Boutique" width={270} height={40} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" active={selectedCategory === ''} onClick={() => {
              setSelectedCategory('');
              handleCategorySelect(0);
            }}>Todos</Nav.Link>
            {categories.map((category, index) => (
              <Nav.Link href="#" active={selectedCategory === category.category} onClick={() => {
                setSelectedCategory(category.category);
                handleCategorySelect(category.id);
              }} key={index}>{category.category}</Nav.Link>
            ))}
          </Nav>
          <Form onSubmit={handleSearch} className="d-flex align-items-center">
            <FormControl
              type="search"
              placeholder="Buscar productos"
              className="me-2"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button variant="outline-success" type="submit">Buscar</Button>
          </Form>
          <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
            {user ? (
              <>
                <span style={{ fontSize: "12px", color: "gray", fontWeight: "bold", textAlign: "center" }}>
                  ¡Hola, {user.name}!
                </span>
                <FaSignOutAlt
                  size={30}
                  color="red"
                  title="Cerrar sesión"
                  style={{ cursor: "pointer", marginLeft: "10px" }}
                  onClick={handleLogout}
                />
              </>
            ) : (
              <FaUser
                size={30}
                color="gray"
                title="Iniciar sesión"
                style={{ cursor: "pointer", marginRight: "10px" }}
                onClick={() => setShowLogin(true)} // Abre el modal de login
              />
            )}
            <div style={{ position: 'relative', cursor: 'pointer', marginLeft: '20px' }}>
              <FaShoppingCart
                size={30}
                color="green"
                title="Ver carrito"
                onClick={handleCartClick}
              />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-10px',
                  background: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '5px 10px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {cartCount}
                </span>
              )}
            </div>
            <FaHeart size={30} color="red" title="Ir a Favoritos" style={{ marginLeft: '20px' }} />
          </div>
        </Navbar.Collapse>
      </Navbar>
      <Login show={showLogin} handleClose={() => setShowLogin(false)} handleLogin={handleLogin} />
    </>
  );
}

export default Navigation;
