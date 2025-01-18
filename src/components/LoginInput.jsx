import { useState } from 'react';
import useInput from '../hooks/useInput';
import { login } from '../utils/network-data';
import PropTypes from 'prop-types';

function LoginInput({ onLoginSuccess }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmitEventHandler = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const { error, data } = await login({ email, password });

      setLoading(false);

      if (error) {
        setError('Login gagal. Periksa email atau password anda');
      } else {
        onLoginSuccess(data);
      }
    } catch (err) {
      setLoading(false);
      setError('Terjadi kesalahan saat login. Silakan coba lagi.');
    }
  };

  return (
    <form onSubmit={onSubmitEventHandler} className='input-login'>
      <label>Email</label>
      <input
        type='email'
        placeholder='Masukkan email...'
        value={email}
        onChange={onEmailChange}
        disabled={loading}
        required
      />

      <label>Password</label>
      <input
        type='password'
        placeholder='Masukkan password...'
        value={password}
        onChange={onPasswordChange}
        disabled={loading}
        required
      />
      <button type='submit' disabled={loading}>
        {loading ? 'Loading...' : 'Masuk'}
      </button>
      {error && <p className='confirm-pass'>{error}</p>}
    </form>
  );
}

LoginInput.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

export default LoginInput;
