import { useState } from 'react';
import useInput from '../hooks/useInput';
import { register } from '../utils/network-data';
import PropTypes from 'prop-types';

function RegisterInput({ onRegisterSuccess }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPass, onConfirmPassChange] = useInput('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmitEventHandler = async (event) => {
    event.preventDefault();
    if (password !== confirmPass) {
      setError('Password yang anda masukkan tidak cocok');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await register({ name, email, password });

      if (!response.error) {
        setLoading(false);
        onRegisterSuccess();
      }
    } catch (err) {
      setError('Terjadi kesalahan saat registrasi');
    }
  };

  return (
    <form onSubmit={onSubmitEventHandler} className='input-register'>
      <label>Nama Lengkap</label>
      <input type='text' value={name} onChange={onNameChange} required />
      <label>Email</label>
      <input type='email' value={email} onChange={onEmailChange} required />
      <label>Password</label>
      <input
        type='password'
        autoComplete='new-password'
        value={password}
        onChange={onPasswordChange}
        required
      />
      <label>Konfirmasi Password</label>
      <input
        type='password'
        autoComplete='new-password'
        value={confirmPass}
        onChange={onConfirmPassChange}
        required
      />
      <button type='submit'>{loading ? 'Loading...' : 'Daftar'}</button>
      {error && <p className='confirm-pass'>{error}</p>}
    </form>
  );
}

RegisterInput.propTypes = {
  onRegisterSuccess: PropTypes.func.isRequired,
};

export default RegisterInput;
