import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import fetch_data from '../api/api_backend.jsx';

const Login = ({ show, handleClose, handleLogin }) => {
    const [login_usuario, setLoginUsuario] = useState('');
    const [password_usuario, setPasswordUsuario] = useState('');
    const [nombre_usuario, setNombreUsuario] = useState('');
    const [email_usuario, setEmailUsuario] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await fetch_data(
                '/login',
                (user) => {
                    handleLogin(user);
                    handleClose();
                },
                { login_usuario, password_usuario }
            );
        } catch (err) {
            setError('Credenciales incorrectas');
        }
    };

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await fetch_data(
                '/register',
                (user) => {
                    handleLogin(user);
                    handleClose();
                },
                { login_usuario, password_usuario, nombre_usuario, email_usuario }
            );
        } catch (err) {
            setError('Error al registrarse');
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <div className="w-100 text-center">
                    <Modal.Title>{isRegistering ? 'Registrarse' : 'Iniciar Sesión'}</Modal.Title>
                </div>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column align-items-center justify-content-center">
                {error && <div className="alert alert-danger text-center w-100">{error}</div>}
                <Form onSubmit={isRegistering ? handleSubmitRegister : handleSubmitLogin} className="w-75 text-center">
                    {isRegistering && (
                        <>
                            <Form.Group controlId="formNombreUsuario" className="mb-3">
                                <Form.Label>Nombre Completo</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresa tu nombre"
                                    value={nombre_usuario}
                                    onChange={(e) => setNombreUsuario(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formEmailUsuario" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Ingresa tu email"
                                    value={email_usuario}
                                    onChange={(e) => setEmailUsuario(e.target.value)}
                                />
                            </Form.Group>
                        </>
                    )}
                    <Form.Group controlId="formLoginUsuario" className="mb-3">
                        <Form.Label>Nombre de Usuario</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingresa tu usuario"
                            value={login_usuario}
                            onChange={(e) => setLoginUsuario(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPasswordUsuario" className="mb-3 position-relative">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Ingresa tu contraseña"
                            value={password_usuario}
                            onChange={(e) => setPasswordUsuario(e.target.value)}
                        />
                        <div
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ position: 'absolute', top: '70%', right: '10px', cursor: 'pointer', transform: 'translateY(-50%)' }}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                        {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
                    </Button>
                </Form>
                <div className="mt-3 text-center">
                    <Button variant="link" onClick={() => setIsRegistering(!isRegistering)}>
                        {isRegistering ? 'Ya tengo una cuenta' : 'Crear una cuenta'}
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default Login;