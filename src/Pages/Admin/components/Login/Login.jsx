import { useState } from 'react';
import axios from 'axios';
import config from '../../../../config';
import './login.css';

const { host } = config;

const Login = (props) => {
  const { setLoggedIn } = props;

  const [fields, setFields] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    if (loading) return;

    for (let field in fields) {
      if (!fields[field].trim()) return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${host}/login`, {...fields});

      setError('');
      localStorage.setItem('token', res.data.token);
      setLoggedIn(true);
    } catch (e) {
      setError(e.response.data.error);
    }

    setLoading(false);
  };

  const onUsernameChange = (e) => {
    setFields({ ...fields, username: e.target.value });
  };

  const onPasswordChange = (e) => {
    setFields({ ...fields, password: e.target.value });
  };

  return (
    <div className="login">
      <div className="login-form">
        <div className="login-title">Войти</div>
        <div className="login-input">
          <label htmlFor="login-username">Имя пользователя</label>
          <input id="login-username" type="text" onChange={onUsernameChange} />
        </div>
        <div className="login-input">
          <label htmlFor="login-password">Пароль</label>
          <input id="login-password" type="password" onChange={onPasswordChange}/>
        </div>
        {error && (
          <div className="login-error">{'' + error}</div>
        )}
        <div className="login-submit" onClick={submit}>Войти</div>
      </div>
    </div>
  );
};

export default Login;
