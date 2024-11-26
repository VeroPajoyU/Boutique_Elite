import { useEffect, useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { FaUser, FaSignOutAlt, FaShoppingCart, FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; // Cambiado useHistory por useNavigate
import logo from "../assets/logo_white.png";
import Login from './Login';
import fetch_data from '../api/api_backend';

function Navigation({ categories, onSearchChange, onCategorySelect, loginState }) {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showLogin, setShowLogin] = useState(false); // Estado para manejar el modal de login
  const [user, setUser] = useState(null); // Estado para almacenar el usuario autenticado
  const navigate = useNavigate(); // Para redirigir a diferentes rutas

  const handleSearch = (e) => {
    e.preventDefault();
    onSearchChange(searchText);
  };

  const handleCategorySelect = (categoryId) => {
    onCategorySelect(categoryId);
  };

  const handleLogin = (data) => {
    setUser(data.name); // Guarda los datos del usuario autenticado
    console.log('[INFO] Usuario iniciado sesión:', user);
    localStorage.setItem('token', data.token); // Guarda el token en el almacenamiento local
    console.log('[INFO] Token almacenado:', data.token);
    setShowLogin(false); // Cierra el modal
    loginState(true); // Cambia el estado de login
    window.location.reload(); // Recarga la página
  };

  const handleLogout = () => {
    setUser(null); // Borra el usuario autenticado
    localStorage.removeItem('token'); // Borra el token del almacenamiento local
    console.log('[INFO] Usuario cerró sesión');
    loginState(false); // Cambia el estado de login
  };

  const handleFavoritesClick = () => {
    if (!user) {
      setShowLogin(true); // Si no está logueado, muestra el modal de login
    } else {
      navigate("/favoritos"); // Si está logueado, redirige a favoritos
    }
  };

  // Verifica si hay un token almacenado en el almacenamiento local y si es válido
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && loginState) {
      fetch_data(
        '/authT',
        (data) => {
          setUser(data.name); // Guarda los datos del usuario autenticado
          console.log('[INFO] Usuario autenticado:', data.name);
          console.log('[INFO] Usuario autenticado:', data.id);
          loginState(true); // Cambia el estado de login
        },
        { token }
      ).catch((err) => {
        console.error('[ERROR] Token inválido:', err);
        setUser(null); // Borra el usuario autenticado
        localStorage.removeItem('token'); // Borra el token del almacenamiento local
        loginState(false); // Cambia el estado de login
      })
    } else {
      console.log('[INFO] No hay token almacenado');
      setUser(null); // Borra el usuario autenticado
      loginState(false); // Cambia el estado de login
    }
  },[setUser]);

  return (
    <>
      <Navbar bg="light" expand="lg" className="py-3 sticky-top">
        <Navbar.Brand>
          <img src={logo} alt="Boutique" width={40} height={40} style={{ marginLeft: '10px' }}  />
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
            <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", marginRight: "10px" }}>
                {user ? (
                  <>
                    <span style={{ fontSize: "12px", color: "gray", fontWeight: "bold", textAlign: "center", maxWidth: "90px", whiteSpace: "normal", overflowWrap: "break-word", lineHeight: "0.9" }}>
                      ¡Hola, {user ? user : 'Usuario'}!
                    </span>
                    <FaSignOutAlt
                      size={30}
                      color="red"
                      title="Cerrar sesión"
                      style={{ cursor: "pointer" }}
                      onClick={handleLogout} // Llama a la función de cierre de sesión
                    />
                  </>
                ) : (
                  <FaUser
                    size={30}
                    color="gray"
                    title="Iniciar sesión"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowLogin(true)} // Abre el modal de login
                  />
                )}
              </div>
              <FaShoppingCart size={30} color="green" title="Añadir al carrito" style={{ marginRight: "10px" }} />
              <FaHeart size={30} color="red" title="Ir a Favoritos" onClick={handleFavoritesClick} />
            </div>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Login show={showLogin} handleClose={() => setShowLogin(false)} handleLogin={handleLogin} />
    </>
  );
}

export default Navigation;