import React from 'react';
import LoginInput from '../components/LoginInput';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const { auth, login } = useAuth();

  React.useEffect(() => {
    if (auth) {
      navigate('/');
    }
  }, [auth, navigate]);

  const handleLoginSuccess = (data) => {
    login(data);
    navigate('/');
  };

  return (
    <div>
      <h1 className='text-title'>Aplikasi Catatan</h1>
      <h1>Login</h1>
      <LoginInput onLoginSuccess={handleLoginSuccess} />
      <h4>
        Belum punya akun? <Link to='/register'>Daftar Disini</Link>
      </h4>
    </div>
  );
}

export default LoginPage;
