import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../components/styleAuth.css';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};
    if (!email) validationErrors.email = 'El email es requerido.';
    if (!password) validationErrors.password = 'La contraseña es requerida.';
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }
    const result = await login(email, password);
    if (result.error) setError({ email: result.error });
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Ingresa tu email" />
          {error.email && <p className="error">{error.email}</p>}
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Ingresa tu contraseña" />
          {error.password && <p className="error">{error.password}</p>}
        </div>
        <button type="submit">Ingresar</button>
        <p>¿No tienes una cuenta? <Link to="/registro">Regístrate</Link></p>
      </form>
    </div>
  );
};

export default Login;
