import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import '../components/styleAuth.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    // Validaciones
    if (!formData.email) {
      validationErrors.email = 'El email es requerido.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'El email no es válido.';
    }

    if (!formData.password) {
      validationErrors.password = 'La contraseña es requerida.';
    } else if (formData.password.length < 6) {
      validationErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    if (!formData.confirmPassword) {
      validationErrors.confirmPassword = 'Por favor, confirma tu contraseña.';
    } else if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      const response = await fetch('data/users.json');
      const users = await response.json();
      
      // Verificar si el email ya está registrado
      const existingUser = users.find(user => user.email === formData.email);
      if (existingUser) {
        setError({ email: 'Este email ya está registrado.' });
        return;
      }

      // En una aplicación real, aquí enviarías los datos al servidor
      // Por ahora, simularemos un registro exitoso
      Swal.fire({
        title: '¡Registro exitoso!',
        text: 'Por favor, inicia sesión.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/login');
      });
    } catch (err) {
      setError({ auth: 'Error en el registro. Por favor, inténtalo de nuevo más tarde.' });
    }
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ingresa tu email"
          />
          {error.email && <p className="error">{error.email}</p>}
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Ingresa tu contraseña"
          />
          {error.password && <p className="error">{error.password}</p>}
        </div>
        <div>
          <label>Confirmar Contraseña:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirma tu contraseña"
          />
          {error.confirmPassword && <p className="error">{error.confirmPassword}</p>}
        </div>
        {error.auth && <p className="error">{error.auth}</p>}
        <button type="submit">Registrarse</button>
        <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
      </form>
    </div>
  );
};

export default Register;
