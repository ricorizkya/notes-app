import React from 'react';
import RegisterInput from '../components/RegisterInput';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RegisterPage() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  React.useEffect(() => {
    if (auth) {
      navigate('/');
    }
  }, [auth, navigate]);

  const onRegisterSuccess = () => {
    alert('Pendaftaran berhasil, silahkan lanjut untuk login');
    navigate('/login');
  };

  return (
    <section className='register-page'>
      <h1 className='text-title'>Aplikasi Catatan</h1>
      <h1>Masukkan data diri anda</h1>
      <RegisterInput onRegisterSuccess={onRegisterSuccess} />
      <p>
        Kembali ke <Link to='/'>Masuk</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
