import { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { FaUser, FaSignOutAlt, FaShoppingCart, FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom'; // Importa Link para la navegación
import logo from "../assets/logo_white.png";
import Login from './Login';

function Navigation({ categories, onSearchChange, onCategorySelect }) {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showLogin, setShowLogin] = useState(false); // Estado para manejar el modal de inicio de sesión 
  const [user, setUser] = useState(null); // Estado para almacenar el usuario autenticado

  const handleSearch = (e) => {
    e.preventDefault();
    onSearchChange(searchText);
  };

  const handleCategorySelect = (categoryId) => {
    onCategorySelect(categoryId);
  };

  const handleLogin = (user) => {
    setUser (user); // Guarda los datos del usuario autenticado
    console.log('[INFO] Usuario iniciado sesión:', user);
    setShowLogin(false); // Cierra el modal
  }

  const handleLogout = () => {
    setUser(null); // Borra el usuario autenticado
    console.log('[INFO] Usuario cerrado sesión');
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
            <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", marginRight: "10px" }}>
                {user ? (
                  <>
                    <span style={{ fontSize: "12px", color: "gray", fontWeight: "bold", textAlign: "center" }}>
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
              <FaShoppingCart 
                size={30} 
                color="green" 
                title="Añadir al carrito" 
                style={{ marginRight: "10px" }}
              />
              {/* <Link to="/favoritos" style={{ marginRight: "10px" }}>
                <FaHeart size={30} color={"white"} title="Ir a Favoritos" style={{ marginRight: "10px" }}/>
              </Link> */}
            </div>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Login show={showLogin} handleClose={() => setShowLogin(false)} handleLogin={handleLogin} />
    </>
  );
}

export default Navigation;