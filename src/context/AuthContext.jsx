import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('isAuth') === 'true';
    const role = localStorage.getItem('userRole');
    const savedUser = localStorage.getItem('user');
    if (auth && role && savedUser) {
      setIsAuthenticated(auth);
      setUserRole(role);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch('/data/users.json');
      const users = await res.json();
      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!foundUser) {
        return { error: 'Credenciales inválidas' };
      }

      setIsAuthenticated(true);
      setUserRole(foundUser.role);
      setUser({ email: foundUser.email, role: foundUser.role });

      localStorage.setItem('isAuth', 'true');
      localStorage.setItem('userRole', foundUser.role);
      localStorage.setItem(
        'user',
        JSON.stringify({ email: foundUser.email, role: foundUser.role })
      );

      if (foundUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
      return {};
    } catch (error) {
      console.error('Error en el login:', error);
      return { error: 'Error al intentar iniciar sesión' };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUser(null);
    localStorage.removeItem('isAuth');
    localStorage.removeItem('userRole');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
