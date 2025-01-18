import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserLogged } from '../utils/network-data';
import PropTypes from 'prop-types';

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (userData) => {
    localStorage.setItem('accessToken', userData.accessToken);

    try {
      const { error, data: userProfileData } = await getUserLogged();
      if (!error) {
        setAuth(true);
        setUser(userProfileData);
        localStorage.setItem('user', userProfileData.name);
      }
    } catch (error) {
      console.error('Gagal mengambil profil user', error);
    }
  };

  const logout = () => {
    setAuth(false);
    setUser(null);

    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  };

  React.useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('accessToken');

      if (token) {
        try {
          const { error, data: userProfileData } = await getUserLogged();

          if (!error) {
            setAuth(true);
            setUser(userProfileData);
            localStorage.setItem('user', JSON.stringify(userProfileData));
          } else {
            logout();
          }
        } catch (error) {
          console.error('Gagal memvalidasi token', error);
          logout();
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  return useContext(AuthContext);
}

export function PrivateRoute({ children }) {
  const { auth, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!auth && !loading) {
      alert('Silahkan login terlebih dahulu!');
      navigate('/login');
    }
  }, [auth, navigate, loading]);

  if (loading) {
    return null;
  }

  return auth ? children : null;
}

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
};
